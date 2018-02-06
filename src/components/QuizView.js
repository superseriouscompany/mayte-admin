import React from 'react'

export default function(props) {
  const {quiz: q, action, filter} = this.props

  return (
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
