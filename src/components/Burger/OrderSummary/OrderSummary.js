import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {

  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey} >
          <span style={{ textTransform: 'capitalize' }} >{igKey}</span>: {props.ingredients[igKey]}
        </li>);
    });

  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>Ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout?</p>
      <Button
        btnType='Danger'
        clicked={props.buyCancelled} >
        CANCEL
      </Button>
      <Button
        btnType='Success'
        clicked={props.buyContinued} >
        CONTINUE
      </Button>
    </Auxiliary>
  );
};

export default OrderSummary;
