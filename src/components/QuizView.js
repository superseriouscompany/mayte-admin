import React from 'react'

export default function(props) {
  const {quiz: q, action, filter} = props

  const photos = q.photos.concat((q.user.availablePhotos || []).map((p) => p.image))

  return (
    <div className="quiz">
      <h3 className="name">{q.user.fullName}, {(new Date()).getFullYear() - q.dob.split(' ').slice(-1)[0]}</h3>
      <div className="photos">
        {photos.concat(q.user.availablePhotos).filter(p => p).map((p,i) => <img key={i} src={p.url} alt='' />)}
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
