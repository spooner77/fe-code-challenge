import './SymbolView.css';
import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import { useState } from 'react';
import { isMobile } from '@/lib/utils/isMobile';
import * as cn from 'classnames';

const SymbolsView = () => {
  const isMobileDevice = isMobile();
  console.log("isMobileDevice", isMobileDevice);
  const [activeSymbol, setActiveSymbol] = useState<null | string>(null);
  const handleSymbolClick = (symbolId: string) => {
    setActiveSymbol((s) => (s === symbolId ? null : symbolId));
  };

  return (
      <div className={cn('symbolsView', {
        symbolsView_mobile: isMobileDevice,
        symbolsView_desktop: !isMobileDevice,
      })}>
        {isMobileDevice ? null : <DesktopInfo/>}
        <div className="symbolsView__content">
          <div className="symbolsView__chart">
            <h3>PRICE HISTORY</h3>
            <PriceChart symbolId={activeSymbol} />
          </div>
          <div className="symbolsView__cards">
            <SymbolsGrid onSymbolClick={handleSymbolClick} />
          </div>
        </div>
      </div>
  );
};

export default SymbolsView;
