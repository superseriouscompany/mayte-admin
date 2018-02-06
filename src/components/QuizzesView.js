import React, {Component} from 'react'

class QuizView extends Component {
  render() {
    const {quiz: q, action} = this.props
    return(
      <div className="application">
        <h2>{q.status}</h2>
        <h3>{q.user.fullName}, {q.user.id},{q.email}</h3>
        <h4>{q.dob}</h4>
        {q.photos.filter(p => p).map((p,i) => <img key={i} width="200px" height="auto" src={p.url} alt='' />)}
        <p>{q.freeform}</p>
        <p>{q.vipCode || null} {q.referer ? <span>{q.referer.fullName} <img src={q.referer.imageUrl} alt='' /></span> : null}</p>
        { q.status !== 'yes' ?
          <div className="action">
            <button onClick={() => action('no', q.user.id)}>reject</button>
            <button onClick={() => action('maybe', q.user.id)}>maybe</button>
            <button onClick={() => action('yes', q.user.id)}>accept</button>
          </div> : null }
      </div>
    )
  }
}

export default (props) => {

  const apps = !props.quizzes.queue ? null : {
    unread: props.quizzes.queue.filter(q => q.status === 'unread'),
    maybe: props.quizzes.queue.filter(q => q.status === 'maybe'),
    yes: props.quizzes.queue.filter(q => q.status === 'yes'),
    no: props.quizzes.queue.filter(q => q.status === 'no'),
  }

  return(
    <div>
      <h1>Unicorn Applications</h1>
      <h2>{props.quizzes.loading ? 'loading' : ''}</h2>
      {
        apps ?
        <div className="quizzes">
          <div className="unread">
            <h1>Unread ({apps.unread.length})</h1>
            {
              apps.unread.map((q,i) => <QuizView key={i} quiz={q} action={props.action} />)
            }
          </div>
          <div className="maybe">
            <h1>Maybe ({apps.maybe.length})</h1>
            {
              apps.maybe.map((q,i) => <QuizView key={i} quiz={q} action={props.action} />)
            }
          </div>
          <div className="no">
            <h1>Rejected ({apps.no.length})</h1>
            {
              apps.no.map((q,i) => <QuizView key={i} quiz={q} action={props.action} />)
            }
          </div>
          <div className="yes">
            <h1>Accepted ({apps.yes.length})</h1>
            {
              apps.yes.map((q,i) => <QuizView key={i} quiz={q} action={props.action} />)
            }
          </div>
        </div> : null
      }
    </div>
  )
}
