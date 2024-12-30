import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import SymbolPrice from './src/SymbolPrice';
import { formatCurrency } from '@/lib';
import * as cn from 'classnames';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  const { trend, companyName, industry, marketCap } = useAppSelector((state) => state.stocks.entities[id]);
  const handleOnClick = () => {
    onClick(id);
  };
  return (
    <div onClick={handleOnClick} className="symbolCard">
      <div className={cn(
        'symbolCard__symbol',
        {
          symbolCard__symbol_up: trend === "UP",
          symbolCard__symbol_down: trend === "DOWN",
        },
      )}>{id}</div>
      <SymbolPrice price={formatCurrency(price)} />
      <ListItem Icon={<CompanyIcon />} spacing="space-between" label={companyName} />
      <ListItem Icon={<IndustryIcon />} spacing="space-between" label={industry} />
      <ListItem Icon={<MarketCapIcon />} spacing="space-between" label={formatCurrency(marketCap)} />
    </div>
  );
};
export default SymbolCard;
