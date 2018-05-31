import { Component } from 'react'

import { getDirections } from '../lib/mapbox'

export default class Exporter extends Component {
  constructor(props) {
    super(props)
  }

  handleClick(e) {
    const { waypoints, setRoute } = this.props

    getDirections(waypoints)
      .then(r => setRoute(r.entity.routes[0]))
      .catch(err => console.log('Error: ', err))
  }

  render() {
    return (
      <button onClick={this.handleClick.bind(this)}>
        <span>Draw Route</span>
        <style jsx>{`
          button {
            border: 1px solid #009;
            background-color: #090;
            height: 5rem;
            width: 100%;
            cursor: pointer;
            bottom: 0;
          }

          button:hover {
            background-color: #0a0;
          }

          span {
            color: white;
            font-size: 1.6rem;
          }
        `}</style>
      </button>
    )
  }
}
