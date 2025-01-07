import './shadowContainer.css';
import * as cn from 'classnames';

type SelectableProps = {
  selected: boolean;
  glowEffect?: 'priceUp' | 'priceDown' | undefined;
  children?: React.ReactNode;
};

const ShadowContainer = ({ glowEffect, selected, children }: SelectableProps) => {
  return (
    <div className={cn(
      'shadowContainer',
      {
        shadowContainer__priceUp: glowEffect === 'priceUp',
        shadowContainer__priceDown: glowEffect === 'priceDown',
        shadowContainer__selected: selected
      }
    )}>
      {children}
    </div>
  );
};
export default ShadowContainer;
