import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import store from './../store';
import 'notification-service-js';
import CustomEvent from 'custom-event-js';

import noInternet from 'no-internet';
import isEmpty from 'lodash/isEmpty';

import { pushNotification, removeNotification } from './../actions/notification';
import Navbar from '../components/dumb/Navbar'

// Services
import Alert from './../services/Alert';
import Notification from './../services/Notification';

// Pages
import Home from './Home/Home';
import About from './About/About';
import Resize_SubPub from './Resize_SubPub/Resize_SubPub';
import Page_Visibility_API from './Page_Visibility_API/Page_Visibility_API';
import Components_Communication from './Components_Communication/Components_Communication';
import Login from './Auth/Login';
import Logout from './Auth/Logout';
import Register from './Auth/Register';

function mapStateToProps(store, props) {
    return {
        alert: store.alert,
        weather: store.weather,
        weatherCities: store.weatherCities,
        notification: store.notification
    };
}

class App extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        noInternet({callback: (offline) => {
            if (offline && isEmpty(this.props.notification.message)) {
                store.dispatch(pushNotification('You are offline 😎'));
            } else if (!offline && !isEmpty(this.props.notification.message)) {
                store.dispatch(removeNotification());
            }
        }});

        CustomEvent.DISPATCH('WEB_COMP_SHOW_NOTIFICATION', {
            type: 'success',
            message: 'Welcome! I\'m notification-service based on Custom Element'
        });
    }

    render() {
        let alertStore = this.props.alert;
        let notificationStore = this.props.notification;

        return (
            <div className="app">
                <Navbar /><p>hej</p>
                {/* OldNav
                <ul className="app-navigation">
                    <li><Link to="/"><FormattedMessage id="pages.home"/></Link></li>
                    <li><Link to="/about"><FormattedMessage id="pages.about"/></Link></li>
                    <li><Link to="/resize"><FormattedMessage id="pages.resize_subpub"/></Link></li>
                    <li><Link to="/visibility"><FormattedMessage id="pages.page_visibility_api"/></Link></li>
                    <li><Link to="/communication"><FormattedMessage id="pages.components_communication"/></Link></li>
                </ul> */}

                <Route exact path="/" render={() => <Home {...this.props} /> } />
                <Route path="/about" render={() => <About {...this.props} /> } />
          
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/register" component={Register} />


            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(App));
