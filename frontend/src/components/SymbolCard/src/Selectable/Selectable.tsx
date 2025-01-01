import './Selectable.css';
import * as cn from 'classnames';

type SelectableProps = {
  selected: boolean;
  children?: React.ReactNode;
};

const Selectable = ({ selected, children }: SelectableProps) => {
  return (
    <div className={cn('selectableContainer', { selectableContainer__selected: selected })}>
      {children}
    </div>
  );
};
export default Selectable;
