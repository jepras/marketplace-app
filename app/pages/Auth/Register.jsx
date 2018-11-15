import React from 'react';
import { FormattedMessage } from 'react-intl';

export default class Register extends React.Component {
    constructor() {
        super();
    }

    render() {
        

        return (
            <div className="app-register">

                <h1><FormattedMessage id="pages.register"/></h1>

                <p>register</p>
                <form action="/register" method="post">
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
