import './symbolPrice.css';

type SymbolCardProps = {
  price: string;
};

const SymbolPrice = ({ price }: SymbolCardProps) => {
  return (
    <div className="symbolPrice">
      <div className="symbolPrice__label">Price:</div>
      <div className="symbolPrice__price">{price}</div>
    </div>
  );
};
export default SymbolPrice;
