import React, { Component } from 'react';


import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     error: null,
    //     intialized: false
    //   };
    // }
    state = {
      initialized: false,
      error: null
    };

    componentDidMount() {
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });
      this.setState({ initialized: true });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    // componentWillMount() {
    //   axios.interceptors.request.use(req => {
    //     this.setState({ error: null });
    //     return req;
    //   });
    //   axios.interceptors.response.use(res => res, error => {
    //     this.setState({ error: error });
    //   });
    // }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      const { initialized } = this.state;
      if (!initialized) return null;
      return (
        <Auxiliary>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliary >
      );
    }
  };
};

export default withErrorHandler;