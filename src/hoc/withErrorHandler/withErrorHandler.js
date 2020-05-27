import React, { useState, useEffect } from 'react';


import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);
    // state = {
    //   initialized: false,
    //   error: null
    // };

    const requestInterceptor = axios.interceptors.request.use(req => {
      setError(null);
      return req;
    });
    const responseInterceptor = axios.interceptors.response.use(res => res, err => {
      setError(err);
    });

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      };
    }, [requestInterceptor, responseInterceptor]);

    // componentWillMount() {
    //   axios.interceptors.request.use(req => {
    //     this.setState({ error: null });
    //     return req;
    //   });
    //   axios.interceptors.response.use(res => res, error => {
    //     this.setState({ error: error });
    //   });
    // }

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Auxiliary>
        <Modal
          show={error}
          modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Auxiliary>
    );
  };
};

export default withErrorHandler;