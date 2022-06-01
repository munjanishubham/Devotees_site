import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import '../../App.css';

const Landing = ({isPanditAuthenticated, isUserAuthenticated}) => {
    if(isPanditAuthenticated){
        return <Redirect to="/dashboard" />
    } else if(isUserAuthenticated) {
        return <Redirect to="/appointment" />
    }

    return (
        <Fragment>
            <section id="landing">
                <div className="container">
                    <div className="heading">
                        <h1 className="main-heading">Aapki Puja Hamare Saath</h1>
                        <h2 className="main-heading">Book Your <span className="main-span">Appointment.</span></h2>
                    </div>
                    <div className="signup">
                        <div className="pandit-signup">
                            <h2 className=" item heading-sub"><strong>For Pandits</strong></h2>
                            <p className="item description">Welcome pandit. Here you can register yourselves and can help the users</p>
                            <Link to="/registerPandit" type="button" className="item btn btn-info">Sign Up</Link>
                        </div>
                        <div className="user-signup">
                            <h2 className="item heading-sub"><strong>For Users</strong></h2>
                            <p className="item special description">Welcome user, let us help you for the auspicious program that you want to perform.</p>
                            <Link to="/registerUser" className="item btn btn-outline-info">Sign Up</Link>
                        </div>
                    </div>
                    <br />
                    <div className="img">
                        <div className="img-1">
                            <img src={require("../../img/temple.svg")}  />
                        </div>
                    </div>
                </div>
                <br />
            </section>
        </Fragment>
    );
};
Landing.propTypes = {
    isPanditAuthenticated: PropTypes.bool.isRequired,
    isUserAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isPanditAuthenticated: state.authPandit.isPanditAuthenticated,
    isUserAuthenticated: state.authUser.isUserAuthenticated
});

export default connect(mapStateToProps)(Landing);
