import React, { memo } from 'react';
import './listItem.css';
type ListItemProps = {
  iconSrc: string;
  label: string;
  spacing?:
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline'
    | undefined;
};
const ListItem = ({ iconSrc, label, spacing }: ListItemProps) => {
  return (
    <div style={{ justifyContent: spacing }} className="listItem">
      <div className="listItem__icon"><img src={iconSrc} alt={label} /></div>
      <div className="listItem__value">{label}</div>
    </div>
  );
};

export default memo(ListItem);
