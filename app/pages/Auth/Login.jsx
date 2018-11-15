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

                <p>whatup?</p>
                <form action="/login" method="post">
                    <div>
                    <label>Username:</label>
                    <input type="text" name="username"/><br/>
                    </div>
                    <div>
                    <label>Password:</label>
                    <input type="password" name="password"/>
                    </div>
                    <div>
                    <input type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        );
    }
}
