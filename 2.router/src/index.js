/*
 * @Description: 
 * @Author: yjy
 * @Date: 2022-07-17 11:23:41
 * @LastEditTime: 2022-09-04 16:26:11
 * @LastEditors: yjy
 * @Reference: 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from './react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import User from './components/User';
function App() {
  return <Router>
      <Route path='/' component={ Home }/>
      <Route path='/user' component={ User }/>
      <Route path='/profile' component={ Profile }/>
  </Router>
}

ReactDOM.render( <App /> , document.getElementById('root'));
