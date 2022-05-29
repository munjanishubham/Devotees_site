import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


const PrivatePanditRoute = ({component: Component, 
    authPandit: {isPanditAuthenticated, loadingPandit},
    ...rest}) => (
        <Route
            {...rest}
            render = {props =>     
                !isPanditAuthenticated && !loadingPandit ? (
                    <Redirect to="/loginPandit" />
                ) : (
                    <Component {...props} />
                )
            }
        />
);

PrivatePanditRoute.propTypes = {
    authPandit: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    authPandit: state.authPandit
});

export default connect(mapStateToProps)(PrivatePanditRoute);
