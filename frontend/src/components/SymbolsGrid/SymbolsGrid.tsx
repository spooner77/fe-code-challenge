import './SymbolGrid.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';
import { selectActiveSymbol, selectShowCardInfo } from '@/store/dashboardOptionsSlice';
import * as cn from 'classnames';

const SymbolsGrid = () => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const activeSymbol = useAppSelector(selectActiveSymbol);
  const showCardInfo = useAppSelector(selectShowCardInfo);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  return (
    <div className={cn(
      'symbolGrid',
      {
        symbolGrid__symbolSelected: activeSymbol !== null,
        symbolGrid__showCardInfo: !showCardInfo,
      },
    )}>
      {stockSymbols.map((id) => (
        <SymbolCard key={id} id={id} selected={id === activeSymbol} />
      ))}
    </div>
  );
};

export default SymbolsGrid;
