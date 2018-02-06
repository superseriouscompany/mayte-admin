import api from '../services/api'
import store from '.'
const initialState = {}
export default (state=initialState, action) => {
  switch (action.type) {
    case 'quizzes.fetch':
      setTimeout(() => {
          store.dispatch({type: 'quizzes.dump', payload: ['a', 'b', 'c']})
      }, 3000)
      return {state, loading: true}
    case 'quizzes.dump':
      return {state, loading: false, queue: action.payload}
    default:
      return state
  }
}
