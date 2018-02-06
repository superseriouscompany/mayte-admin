import React, {Component} from 'react'

export default class QuizzesView extends Component {
  render() {
    return(
      <div>
        <h1>wats gerd</h1>
        <h2>{this.props.quizzes.loading ? 'loading' : ''}</h2>
        {
          this.props.quizzes.queue ?
          this.props.quizzes.queue.map((q,i) => {
            return(
              <div className="application" key={i}>
                <h2>{q.status} - {q.email}</h2>
                <h4>{q.dob}</h4>
                {q.photos.filter(p => p).map((p,i) => <img key={i} width="200px" height="auto" src={p.url} />)}
                <p>{q.freeform}</p>
                <p>{q.vipCode || null} {q.referer ? <span>{q.referer.fullName} <img src={q.referer.imageUrl} /></span> : null}</p>
              </div>
            )
          }) : null
        }
      </div>
    )
  }
}
