import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import SymbolPrice from '@/components/SymbolPrice';
import { formatCurrency } from '@/lib';

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
      <div className="symbolCard__symbol">{id}</div>
      <SymbolPrice price={formatCurrency(price)} />
      <ListItem Icon={<CompanyIcon />} spacing="space-between" label={companyName} />
      <ListItem Icon={<IndustryIcon />} spacing="space-between" label={industry} />
      <ListItem Icon={<MarketCapIcon />} spacing="space-between" label={formatCurrency(marketCap)} />
    </div>
  );
};
export default SymbolCard;
