import { Component } from 'react'
import drawRoute from '../lib/drawRoute'

export default ({ route }) =>
  <div>
    <textarea
      readOnly={true}
      value={JSON.stringify(drawRoute(route))}
    />

    <style jsx>{`
      textarea {
        margin: 4rem auto;
        width: 100%;
        height: 40rem;
        border: none;
        padding: 1rem;
      }
    `}</style>
  </div>
