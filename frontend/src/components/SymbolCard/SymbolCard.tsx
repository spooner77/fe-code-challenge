import './symbolCard.css';
import companyIcon from '@/assets/company.svg';
import industryIcon from '@/assets/industry.svg';
import marketCapIcon from '@/assets/market_cap.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import SymbolPrice from './src/SymbolPrice';
import { formatCurrency } from '@/lib';
import * as cn from 'classnames';
import { AnimationEvent, memo, useReducer, useRef } from 'react';
import { setActiveSymbol } from '@/store/dashboardOptionsSlice';
import ShadowContainer from '@/components/SymbolCard/src/ShadowContainer';
import Symbol from '@/components/SymbolCard/src/Symbol';
import ShakeAnimationContainer from '@/components/SymbolCard/src/ShakeAnimationContainer';

type AnimationType = 'shake' | undefined;

function getAnimationType(price: number | undefined, prevPrice: number | undefined): AnimationType {
  if (prevPrice === undefined || price === undefined) {
    return undefined;
  }

  if (price / prevPrice >= 1.25) {
    return 'shake';
  }

  return undefined;
}

type GlowEffectType = 'priceUp' | 'priceDown' | undefined;

function getGlowEffectType(price: number | undefined, prevPrice: number | undefined): GlowEffectType {
  if (prevPrice === undefined || price === undefined) {
    return undefined;
  }

  const priceChange = Math.abs(price / prevPrice - 1);
  const showGlowEffect = priceChange > 0.05;
  if (!showGlowEffect) {
    return undefined;
  }

  return price - prevPrice > 0 ? 'priceUp' : 'priceDown';
}

function useSymbolCardAnimation(price: number | undefined): [AnimationType, GlowEffectType, (event: AnimationEvent) => void] {
  const glowAnimationTimer = useRef<number | undefined>(undefined);
  const prevPrice = useRef<number | undefined>(undefined);
  const animation = useRef<AnimationType>(undefined);
  const glowEffect = useRef<GlowEffectType>(undefined);
  const [, forceUpdate] = useReducer(count => count + 1, 0);

  const onAnimationEnd = (event: AnimationEvent) => {
    /**
     *  Shake animation always contains green glow effect.
     *  Glow effect lasts longer so we can clean both animations together to avoid re-renders
     */
    if (event.animationName === 'shake') {
      animation.current = undefined;
      forceUpdate();
    }
  };

  /**
   * return the same value if price is the same
   */
  if (price === prevPrice.current) {
    return [animation.current, glowEffect.current, onAnimationEnd];
  }

  animation.current = getAnimationType(price, prevPrice.current);
  glowEffect.current = getGlowEffectType(price, prevPrice.current);
  prevPrice.current = price;

  /**
   * create timer to clean glow effect
   */
  if (glowEffect.current !== undefined) {
    if (glowAnimationTimer.current) {
      clearTimeout(glowAnimationTimer.current);
    }

    glowAnimationTimer.current = window.setTimeout(() => {
      glowEffect.current = undefined;
      glowAnimationTimer.current = undefined;
      forceUpdate();
    }, 2000);
  }

  return [animation.current, glowEffect.current, onAnimationEnd];
}

type SymbolCardProps = {
  id: string;
  selected: boolean;
};

const SymbolCard = ({ id, selected }: SymbolCardProps) => {
  const dispatch = useAppDispatch();
  const price = useAppSelector((state) => state.prices[id]);
  const [animation, glowEffect, onAnimationEnd] = useSymbolCardAnimation(price);

  const { trend, companyName, industry, marketCap } = useAppSelector((state) => state.stocks.entities[id]);

  const handleClick = () => {
    dispatch(setActiveSymbol(id));
  };

  return (
    <div onClick={handleClick} onAnimationEnd={onAnimationEnd} className={cn('symbolCard', {
      symbolCard__selected: selected
    })}>
      <ShakeAnimationContainer animate={animation === 'shake'}>
        <ShadowContainer selected={selected} glowEffect={glowEffect}>
          <Symbol id={id} trend={trend ?? undefined} />
          <SymbolPrice price={formatCurrency(price)} />
          <ListItem iconSrc={companyIcon} spacing="space-between" label={companyName} />
          <ListItem iconSrc={industryIcon} spacing="space-between" label={industry} />
          <ListItem iconSrc={marketCapIcon} spacing="space-between" label={formatCurrency(marketCap)} />
        </ShadowContainer>
      </ShakeAnimationContainer>
    </div>
  );
};
export default memo(SymbolCard);
