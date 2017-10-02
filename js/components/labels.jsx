import React from 'react';
import { Line, Circle } from 'rc-progress';
import LabelItem from './label_item';

const Labels = ({ labels, loading }) => {
  if (loading) {
    return <div className="loader">Loading...</div>
  }

  return(
    <div className="labels">
      {labels.map((label, idx)=>(<div className="label-item" key={idx}><LabelItem label={label} /></div>))}
    </div>
  );
};


export default Labels;
