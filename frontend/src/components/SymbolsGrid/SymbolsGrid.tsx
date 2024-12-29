import './SymbolGrid.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';
type SymbolsGridProps = {
  onSymbolClick: (symbolId: string) => void;
};

const SymbolsGrid = ({ onSymbolClick }: SymbolsGridProps) => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector((state) => state.prices);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  return (
    <div className="symbolGrid">
      {stockSymbols.map((id) => (
        <SymbolCard price={prices[id]} onClick={onSymbolClick} key={id} id={id} />
      ))}
    </div>
  );
};

export default SymbolsGrid;
