import React, {Component} from 'react'

export default class QuizzesView extends Component {
  render() {
    return(
      <div>
        <h1>wats gerd</h1>
        <h2>{this.props.quizzes.loading ? 'loading' : ''}</h2>
        {
          this.props.quizzes.queue ?
          this.props.quizzes.queue.map(q => q) : null
        }
      </div>
    )
  }
}
