import React, { Component } from 'react';

import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    // alert('you continue');
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Jack Power',
        address: {
          street: 'Teststreet 1',
          zipCode: '123456',
          country: 'Finland'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fast'
    };
    axios.post('/orders.json', order)
      .then(resp => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {

    let form = (
      <form>
        <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
        <Input inputtype="input" type="email" name="email" placeholder="Your Email" />
        <Input inputtype="input" type="text" name="street" placeholder="Street" />
        <Input inputtype="input" type="number" name="postalCode" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler} >ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData} >
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;