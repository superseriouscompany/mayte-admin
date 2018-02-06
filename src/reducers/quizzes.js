const initialState = {}
export default (state=initialState, action) => {
  switch (action.type) {
    case 'quizzes.fetch':
      return {state, loading: true}
    case 'quizzes.dump':
      return {state, loading: false, queue: action.payload}
    default:
      return state
  }
}
