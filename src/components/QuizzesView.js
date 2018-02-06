import React, {Component} from 'react'
import '../styles/Quizzes.css'

class QuizView extends Component {
  render() {
    const {quiz: q, action, filter} = this.props
    return(
      <div className="quiz">
        {filter === q.status ? null : <h2 className="status">{q.status}</h2>}
        <h3 className="name">{q.user.fullName}, {q.user.id}, {q.email}</h3>
        <h4 className="dob">{q.dob}</h4>
        <div className="photos">
          {q.photos.filter(p => p).map((p,i) => <img key={i} src={p.url} alt='' />)}
        </div>
        <p className="freeform">{q.freeform}</p>
        <p className="vip">
          <span className="code">{q.vipCode || null}</span>
          {q.referer ? <span className="thumb"><img src={q.referer.imageUrl} alt='' /><div>{q.referer.fullName}</div></span> : null}
        </p>
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

  const apps = !props.queue ? null : {
    unread: props.queue.filter(q => q.status === 'unread'),
    maybe: props.queue.filter(q => q.status === 'maybe'),
    yes: props.queue.filter(q => q.status === 'yes'),
    no: props.queue.filter(q => q.status === 'no'),
  }

  return(
    <div>
      <h1>Unicorn Applications</h1>
      <div className="filter">
        <button onClick={() => props.updateFilter(null)}>all</button>
        <button onClick={() => props.updateFilter('unread')}>unread</button>
        <button onClick={() => props.updateFilter('maybe')}>maybe</button>
        <button onClick={() => props.updateFilter('no')}>rejected</button>
        <button onClick={() => props.updateFilter('yes')}>accepted</button>
      </div>
      <h2>{props.loading ? 'loading' : ''}</h2>
      {
        apps ?
        <div className="quizzes">
          {!props.filter || props.filter === 'unread' ? <div className="unread">
            <h1>Unread ({apps.unread.length})</h1>
            {
              apps.unread.map((q,i) => <QuizView key={i} filter={props.filter} quiz={q} action={props.action} />)
            }
          </div> : null}
          {!props.filter || props.filter === 'maybe' ? <div className="maybe">
            <h1>Maybe ({apps.maybe.length})</h1>
            {
              apps.maybe.map((q,i) => <QuizView key={i} filter={props.filter} quiz={q} action={props.action} />)
            }
          </div> : null}
          {!props.filter || props.filter === 'no' ? <div className="no">
            <h1>Rejected ({apps.no.length})</h1>
            {
              apps.no.map((q,i) => <QuizView key={i} filter={props.filter} quiz={q} action={props.action} />)
            }
          </div> : null}
          {!props.filter || props.filter === 'yes' ? <div className="yes">
            <h1>Accepted ({apps.yes.length})</h1>
            {
              apps.yes.map((q,i) => <QuizView key={i} filter={props.filter} quiz={q} action={props.action} />)
            }
          </div> : null}
        </div> : null
      }
    </div>
  )
}
