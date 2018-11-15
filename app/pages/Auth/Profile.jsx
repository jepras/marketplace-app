import React from 'react';
import { FormattedMessage } from 'react-intl';

export default class Login extends React.Component {
    constructor() {
        super();
    }

    render() {
        

        return (
            <div className="app-login">

                <h1><FormattedMessage id="pages.login"/></h1>

                <p>profile?</p>
                
            </div>
        );
    }
}
