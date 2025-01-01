import { memo } from 'react';
import './performanceInfo.css';
import UpArrow from '@/assets/up-arrow.svg';
import DownArrow from '@/assets/down-arrow.svg';
import ListItem from '@/components/ListItem';

type TrendLabelProps = {
  volume: number;
  change: number;
};

const VolumeLabel = ({ volume, change }: TrendLabelProps) => {
  const arrow = change > 1 ? UpArrow : DownArrow;
  return <ListItem iconSrc={arrow} label={volume.toString()} />;
};
export default memo(VolumeLabel);
