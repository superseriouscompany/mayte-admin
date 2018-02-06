import {
  applyMiddleware,
  createStore,
  compose,
  combineReducers,
} from 'redux'

import quizzes from './quizzes'

const reducers = combineReducers({
  quizzes
})

export default createStore(reducers)
