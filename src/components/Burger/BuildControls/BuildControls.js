import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'Salad' },
  { label: 'Bacon', type: 'Bacon' },
  { label: 'Cheese', type: 'Cheese' },
  { label: 'Meat', type: 'Meat' }
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
