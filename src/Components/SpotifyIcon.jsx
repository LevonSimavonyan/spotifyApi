import React from 'react'

function SpotifyIcon({imageUrl,name,followers}) {
  return (
    <div>
      <img src={imageUrl} alt="" />
<h2>{name}</h2>
<p>{followers}</p>
    </div>
  )
}

export default SpotifyIcon
