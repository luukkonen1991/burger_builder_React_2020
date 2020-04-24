import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'salad', type: 'salad' },
  { label: 'bacon', type: 'bacon' },
  { label: 'cheese', type: 'cheese' },
  { label: 'meat', type: 'meat' }
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls} >
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
        />
      ))}
    </div>
  );
};

export default BuildControls;
