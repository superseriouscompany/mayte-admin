import api from '../services/api'
import store from '.'

const adminToken = 'c1b982a0-06f3-11e8-914e-b5b6fc997f54'
const fetchQuizzes = () => {
  return api('/applications', {
    method: 'GET',
    accessToken: adminToken,
  }).then(d => store.dispatch({
    type: 'quizzes.dump',
    payload: d.applications
  }))
}

const initialState = {}
export default (state=initialState, action) => {
  switch (action.type) {
    case 'quizzes.fetch':
      fetchQuizzes()
      return {state, loading: true}
    case 'quizzes.dump':
      return {state, loading: false, queue: action.payload}
    case 'quizzes.action':
      api(`/applications/${action.payload.uid}/status`, {
        method: 'PUT',
        accessToken: adminToken,
        body: {
          status: action.payload.action
        }
      }).then(() => fetchQuizzes())
      return state
    default:
      return state
  }
}
