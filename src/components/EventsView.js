import React from 'react'

export default function(props) {
  return (
    <div className="Events">
      { props.users.map((u, i) => (
        <div key={i}>{u.fullName}</div>
      ))}
    </div>
  )
}
