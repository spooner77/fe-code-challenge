import './symbol.css';
import * as cn from 'classnames';
import { memo } from 'react';

type SelectableProps = {
  id: string;
  trend?: 'UP' | 'DOWN';
};

const Symbol = ({ id, trend }: SelectableProps) => {
  return (<div className={cn(
    'symbol',
    {
      symbol__symbolUp: trend === 'UP',
      symbol__symbolDown: trend === 'DOWN'
    }
  )}>{id}</div>)
};
export default memo(Symbol);
