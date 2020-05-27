import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';



const BurgerBuilder = props => {
  const { onInitIngredients } = props;
  // constructor(props){
  //   super(props);
  //   this.state = {...}
  // }

  // state = {
  //   // ingredients: null,
  //   // totalPrice: 4,
  //   // rdyToBuy: false,
  //   buying: false,
  //   // loading: false,
  //   // error: false
  // };

  const [buying, setBuying] = useState(false);

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);
  // componentDidMount() {
  //   props.onInitIngredients();
  //   // axios.get('https://react-my-burger-5158b.firebaseio.com/ingredients.json')
  //   //   .then(resp => {
  //   //     this.setState({ ingredients: resp.data });
  //   //   })
  //   //   .catch(error => {
  //   //     this.setState({ error: true });
  //   //   });
  // }

  const updateRdyToBuyState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients
  //   });
  //   this.updateRdyToBuyState(updatedIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients
  //   });
  //   this.updateRdyToBuyState(updatedIngredients);
  // };

  const buyHandler = () => {
    if (props.isAuthenticated) {
      setBuying(true);
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const buyCancelHandler = () => {
    setBuying(false);
  };

  const buyContinueHandler = () => {
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push('price=' + props.price);
    // const queryStr = queryParams.join('&');
    // props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryStr
    // });
    props.onInitPurchase();
    props.history.push('/checkout');

  };

  const disableInfo = {
    ...props.ings
  };

  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }
  let orderSummary = null;
  let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (props.ings) {
    burger = (
      <Auxiliary>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disableInfo}
          price={props.price}
          rdyToBuy={updateRdyToBuyState(props.ings)}
          buying={buying}
          ordered={buyHandler}
          isAuth={props.isAuthenticated}
        />
      </Auxiliary>
    );
    orderSummary = <OrderSummary
      ingredients={props.ings}
      price={props.price}
      buyCancelled={buyCancelHandler}
      buyContinued={buyContinueHandler}
    />;
  }
  // if (this.state.loading) {
  //   orderSummary = <Spinner />;
  // }
  return (
    <Auxiliary>
      <Modal
        show={buying}
        modalClosed={buyCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Auxiliary>
  );
};

const mapStateToPorps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};


export default connect(mapStateToPorps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));