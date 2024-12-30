import './SymbolPrice.css';

type SymbolCardProps = {
  price: string;
};

const SymbolPrice = ({ price }: SymbolCardProps) => {
  return (
    <div className="symbolPrice">
      <div className="symbolPrice__label">PRICE:</div>
      <div className="symbolPrice__price">{price}</div>
    </div>
  );
};
export default SymbolPrice;
