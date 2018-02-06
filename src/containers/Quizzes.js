import React, {Component} from 'react'
import QuizzesView from '../components/QuizzesView'
import {connect} from 'react-redux'

class Quizzes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: null
    }
  }
  componentDidMount() {
    this.props.fetch()
  }
  render() {
    const {props, state} = this
    return <QuizzesView {...props.quizzes} {...state}
             updateFilter={(f) => this.setState({filter: f})}
             quizzes={!state.filter ? props.quizzes.queue : props.quizzes.queue.filter(q => q.status === state.filter)} />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    quizzes: state.quizzes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch: () => {
      return dispatch({type: 'quizzes.fetch'})
    },
    action: (action, uid) => {
      return dispatch({type: 'quizzes.action', payload: {action, uid}})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quizzes)
