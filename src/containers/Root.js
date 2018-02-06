import React, { Component } from 'react'
import Quizzes from './Quizzes.js' // not working without extension?

class Root extends Component {
  render() {
    return (
      <div id="App">
        <Quizzes />
      </div>
    );
  }
}

export default Root;
