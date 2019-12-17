import React from 'react'


const Suggestions = (props) => {
  const options = props.results.map(r => (
   <a target="_blank" href={'https://open.spotify.com/artist/' + r.id} >
    <li key={r.id}
    className="spotify-list">
      {r.name}
    </li>
    </a>
  ))
  return <ul>{options}</ul>
}

export default Suggestions