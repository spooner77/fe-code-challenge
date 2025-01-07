import React from 'react';
import ListItem from '@/components/ListItem';
import { stockTypes } from '@/lib/types';
import HappyFaceIcon from '@/assets/happy.svg';
import NeutralFaceIcon from '@/assets/neutral.svg';
import SadFaceIcon from '@/assets/sad.svg';

type TopHeadlineProps = {
  bias: stockTypes.Bias;
  headline: string;
};

function getIcon(bias: stockTypes.Bias) {
  switch (bias) {
    case 'POSITIVE':
      return HappyFaceIcon;
    case 'NEUTRAL':
      return NeutralFaceIcon;
    case 'NEGATIVE':
      return SadFaceIcon;
  }
}

const TopHeadline = ({ bias, headline }: TopHeadlineProps) => {
  return <ListItem iconSrc={getIcon(bias)} label={headline} />;
};

export default TopHeadline;
