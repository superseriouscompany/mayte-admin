import React from 'react'
import QuizView           from './QuizView'
import '../styles/Quizzes.css'
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
      { 'API doesn\'t return yeses and nos yet' ? null :
        <div className="filter">
          <a className={!props.filter ? 'active' : ''} onClick={() => props.updateFilter(null)}>Waitlist</a>&nbsp;
          <a className={props.filter === 'yes' ? 'active' : ''} onClick={() => props.updateFilter('yes')}>Accepted</a>&nbsp;
          <a className={props.filter === 'no' ? 'active' : ''} onClick={() => props.updateFilter('no')}>Rejected</a>&nbsp;
        </div>
      }
      <h2>{props.loading ? 'loading...' : ''}</h2>
      {
        apps ?
        <div className="quizzes">
          {!props.filter && apps.unread.length ? <div className="unread">
            <h2>
              Unread { apps.unread.length ? `(${apps.unread.length})` : null }
            </h2>
            {
              apps.unread.map((q,i) => <QuizView key={i} filter={props.filter} quiz={q} action={props.action} />)
            }
          </div> : null}
          {!props.filter && apps.maybe.length ? <div className="maybe">
            <h2>
              Maybe { apps.maybe.length ? `(${apps.maybe.length})` : null }
            </h2>
            {
              apps.maybe.map((q,i) => <QuizView key={i} filter={props.filter} quiz={q} action={props.action} />)
            }
          </div> : null}
          { props.filter === 'yes' && apps.yes.length ? <div className="yes">
            <h2>
              Accepted { apps.yes.length ? `(${apps.yes.length})` : null }
            </h2>
            {
              apps.yes.map((q,i) => <QuizView key={i} filter={props.filter} quiz={q} action={props.action} />)
            }
          </div> : null}
          {props.filter === 'no' && apps.no.length ? <div className="no">
            <h2>
              Rejected { apps.no.length ? `(${apps.no.length})` : null }
            </h2>
            {
              apps.no.map((q,i) => <QuizView key={i} filter={props.filter} quiz={q} action={props.action} />)
            }
          </div> : null}
        </div> : null
      }
    </div>
  )
}
