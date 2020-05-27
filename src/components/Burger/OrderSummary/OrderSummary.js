import React, { } from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
  // This cloud be a functional component => doesent have to be class


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
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
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
