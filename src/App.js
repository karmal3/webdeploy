import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Ads } from './components/Ads';
import { AdInfo } from './components/AdInfo';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Categories } from './components/Categories';
import { MyAds } from './components/MyAds';

import './components/css/custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Ads} />
            <Route path='/ads' component={Ads} />
            <Route path='/adinfo' component={AdInfo} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/dashboard' component={Categories} />
            <Route path='/myads' component={MyAds} />

        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
  }
}
