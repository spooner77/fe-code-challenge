import './shakeAnimationContainer.css';
import * as cn from 'classnames';

type SelectableProps = {
  animate: boolean;
  children?: React.ReactNode;
};

const ShakeAnimationContainer = ({ animate, children }: SelectableProps) => {
  return (
    <div className={cn(
      'shakeAnimationContainer',
      {
        shakeAnimationContainer__animate: animate,
      }
    )}>
      {children}
    </div>
  );
};
export default ShakeAnimationContainer;
