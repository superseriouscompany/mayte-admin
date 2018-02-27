import React, {Component} from 'react'
import {connect}          from 'react-redux'
import EventsView         from '../components/EventsView'
import {graph}            from '../services/api'

class Events extends Component {
  constructor(props) {
    super(props)
    this.state = { users: [] }
  }

  componentDidMount() {
    return graph('c1b982a0-06f3-11e8-914e-b5b6fc997f54', `{
      users {
        fullName
      }
    }`).then((data) => {
      const {users} = data
      this.setState({users})
    }).catch(alert)
  }

  render() {
    return (
      <EventsView {...this.props}
        users={this.state.users}/>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
