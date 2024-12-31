import './SymbolGrid.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';

const SymbolsGrid = () => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  return (
    <div className="symbolGrid">
      {stockSymbols.map((id) => (
        <SymbolCard key={id} id={id} />
      ))}
    </div>
  );
};

export default SymbolsGrid;
