import './symbolCard.css';
import companyIcon from '@/assets/company.svg';
import industryIcon from '@/assets/industry.svg';
import marketCapIcon from '@/assets/market_cap.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import SymbolPrice from './src/SymbolPrice';
import { formatCurrency } from '@/lib';
import * as cn from 'classnames';
import { AnimationEvent, memo, useRef, useState } from 'react';
import { setActiveSymbol } from '@/store/dashboardOptionsSlice';
import Selectable from '@/components/SymbolCard/src/Selectable';

type AnimationType = 'shake' | 'red' | 'green' | undefined;

function getAnimationType(price: number | undefined, prevPrice: number | undefined): AnimationType {
  if (prevPrice === undefined || price === undefined) {
    return undefined;
  }

  if (price / prevPrice >= 1.25) {
    return 'shake';
  }

  const priceChange = Math.abs(price / prevPrice - 1);
  const showGlowEffect = priceChange > 0.05;
  if (!showGlowEffect) {
    return undefined;
  }

  return price - prevPrice > 0 ? 'green' : 'red';
}

function useSymbolCardAnimation(price: number | undefined): [AnimationType, (event: AnimationEvent) => void] {
  const prevPrice = useRef<number | undefined>(undefined);
  const animation = useRef<AnimationType>(undefined);
  const [count, rerender] = useState<number>(0);

  const onAnimationEnd = (event: AnimationEvent) => {
    /**
     *  Shake animation always contains green glow effect.
     *  Glow effect lasts longer so we can clean both animations together to avoid re-renders
     */
    if (event.animationName === 'redGlow' || event.animationName === 'greenGlow') {
      animation.current = undefined;
      /**
       * We need to remove animation class to show animation if the price is increased of reduced twice
       * Maybe it is better to pass ref to SymbolCard to the hook and remove animation class from there to avoid re-render
       */
      const next = count + 1;
      rerender(next > 100 ? 0 : next);
    }
  };

  if (price === prevPrice.current) {
    return [animation.current, onAnimationEnd];
  }

  animation.current = getAnimationType(price, prevPrice.current);
  prevPrice.current = price;
  return [animation.current, onAnimationEnd];
}

type SymbolCardProps = {
  id: string;
  selected: boolean;
};

const SymbolCard = ({ id, selected }: SymbolCardProps) => {
  const dispatch = useAppDispatch();
  const price = useAppSelector((state) => state.prices[id]);
  const [animation, onAnimationEnd] = useSymbolCardAnimation(price);

  const { trend, companyName, industry, marketCap } = useAppSelector((state) => state.stocks.entities[id]);

  const handleClick = () => {
    dispatch(setActiveSymbol(id));
  };
  return (
      <Selectable selected={selected}>
        <div onClick={handleClick} onAnimationEnd={onAnimationEnd} className={cn(
          'symbolCard',
          {
            symbolCard__glowGreen: animation === 'green',
            symbolCard__glowRed: animation === 'red',
            symbolCard__shake: animation === 'shake',
          }
        )}>
          <div className={cn(
            'symbolCard__symbol',
            {
              symbolCard__symbolUp: trend === 'UP',
              symbolCard__symbolDown: trend === 'DOWN'
            }
          )}>{id}</div>
          <SymbolPrice price={formatCurrency(price)} />
          <ListItem iconSrc={companyIcon} spacing="space-between" label={companyName} />
          <ListItem iconSrc={industryIcon} spacing="space-between" label={industry} />
          <ListItem iconSrc={marketCapIcon} spacing="space-between" label={formatCurrency(marketCap)} />
        </div>
      </Selectable>
  );
};
export default memo(SymbolCard);
