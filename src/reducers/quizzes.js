import api from '../services/api'
import store from '.'
const initialState = {}
export default (state=initialState, action) => {
  switch (action.type) {
    case 'quizzes.fetch':
      api('/applications', {
        method: 'GET',
        accessToken: 'c1b982a0-06f3-11e8-914e-b5b6fc997f54',
      }).then(d => store.dispatch({
        type: 'quizzes.dump',
        payload: d.applications
      }))
      return {state, loading: true}
    case 'quizzes.dump':
      console.log(action.payload)
      return {state, loading: false, queue: action.payload}
    default:
      return state
  }
}
