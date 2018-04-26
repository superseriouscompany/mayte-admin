import React from 'react'

export default function(props) {
  const {quiz: q, action} = props
  console.log(q)
  const photos = (q.photos || []).concat((q.user.availablePhotos || []).slice(0, 6).map((p) => p.image))

  return (
    <div className="quiz">
      <h3 className="name">
        {q.user.fullName}, {(new Date()).getFullYear() - (q.dob || '').split(' ').slice(-1)[0]}
        <br />
        <a target="_blank" href={q.website}>{q.website}</a>
      </h3>
      <div className="photos">
        {photos.concat(q.user.availablePhotos).filter(p => p).map((p,i) => <img key={i} src={p.url} alt='' />)}
      </div>
      <p className="freeform"><span style={{color: 'gainsboro'}}>Magic?</span> {q.freeform}</p>
      { !q.vipCode ? null :
        <p className="vip">
          <span className="code">{q.vipCode || null}</span>
          {q.referer ? <span className="thumb"><img src={q.referer.imageUrl} alt='' /><div>{q.referer.fullName}</div></span> : null}
        </p>
      }
      { q.status === 'yes' ? null :
        <div className="action">
          <a className="no" onClick={() => action('no', q.user.id)}>No</a>&nbsp;
          <a className="maybe" onClick={() => action('maybe', q.user.id)}>Maybe</a>&nbsp;
          <a className="yes" onClick={() => action('yes', q.user.id)}>Yes</a>&nbsp;
        </div>
      }
    </div>
  )
}
