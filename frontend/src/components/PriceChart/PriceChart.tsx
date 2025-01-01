import { lazy, Suspense, useEffect } from 'react';
import './priceChart.css';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchPriceHistory, selectors } from '@/store/priceHistorySlice';
import Loading from '@/components/Loading';
import { selectActiveSymbol } from '@/store/dashboardOptionsSlice';

const Chart = lazy(() => import('./src/Chart.js'));

const PriceChart = () => {
  const dispatch = useAppDispatch();
  const symbolId = useAppSelector(selectActiveSymbol);
  useEffect(() => {
    if (symbolId) {
      const promise = dispatch(fetchPriceHistory(symbolId));
      return () => {
        promise.abort();
      };
    }
  }, [dispatch, symbolId]);

  const apiState = useAppSelector(selectors.apiState);
  const data = useAppSelector(selectors.selectPriceHistory);
  const symbolInfo = useAppSelector(selectors.selectSymbolInfo);

  if (!symbolId) return <div className="priceChart">Select stock</div>;
  if (apiState.loading)
    return (<div className="priceChart">
      <Loading />
    </div>);
  if (apiState.error) return <div className="priceChart">Failed to get price history!</div>;

  return (
    <div className="priceChart">
      <Suspense fallback={<Loading />}>
        <div>{symbolInfo}</div>
        <Chart data={data} />
      </Suspense>
    </div>
  );
};

export default PriceChart;
