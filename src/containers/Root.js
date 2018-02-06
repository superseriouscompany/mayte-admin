import React, { Component } from 'react'
import Quizzes from './Quizzes.js' // not working without extension?
import {Provider} from 'react-redux'
import store from '../reducers'

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
