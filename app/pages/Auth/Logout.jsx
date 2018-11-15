import React from 'react';
import { FormattedMessage } from 'react-intl';

export default class Logout extends React.Component {
    constructor() {
        super();
    }

    render() {
        

        return (
            <div className="app-logout">

                <h1><FormattedMessage id="pages.logout"/></h1>

                <p>whatup? logging out?</p>
            </div>
        );
    }
}
