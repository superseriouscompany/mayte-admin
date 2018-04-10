import api from '../services/api'
import store from '.'

const adminToken = window.location.href.match(/localhost/) && false ?
  '024b5390-392e-11e8-a81f-33816d5d3fa7' : '4c4e37e0-3c68-11e8-821f-313a9bedfba0'

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
