import './SymbolView.css';
import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import { isMobile } from '@/lib/utils/isMobile';
import * as cn from 'classnames';

const SymbolsView = () => {
  const isMobileDevice = isMobile();
  return (
      <div className={cn('symbolsView', {
        symbolsView_mobile: isMobileDevice,
        symbolsView_desktop: !isMobileDevice,
      })}>
        {isMobileDevice ? null : <DesktopInfo/>}
        <div className="symbolsView__content">
          <div className="symbolsView__chart">
            <h3>PRICE HISTORY</h3>
            <PriceChart />
          </div>
          <div className="symbolsView__cards">
            <SymbolsGrid />
          </div>
        </div>
      </div>
  );
};

export default SymbolsView;
