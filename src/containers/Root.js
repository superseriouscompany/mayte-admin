import React, { Component } from 'react'
import Quizzes              from './Quizzes'
import Events               from './Events'
import {Provider}           from 'react-redux'
import store                from '../reducers'
import '../styles/App.css'

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <div id="Root">
          <Quizzes />
        </div>
      </Provider>
    )
  }
}

export default Root;
