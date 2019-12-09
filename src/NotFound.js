import React, {Component} from 'react';

import {Router, Switch, Route} from 'react-router';
import Login from './Login'
import Cliente from './Cliente'
// import { NOTFOUND } from 'dns';
// import 

class NotFound extends React.Component {

    render() {
        return(
            <h2>Not Found</h2>
        )
    }
}

export default NotFound;
