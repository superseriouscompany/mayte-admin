import React, {Component} from 'react'
import QuizzesView from '../components/QuizzesView'
import {connect} from 'react-redux'

class Quizzes extends Component {
  componentDidMount() {
    this.props.fetch()
  }
  render() {
    return <QuizzesView {...this.props} />
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
