import mapboxgl from 'mapbox-gl'

import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import drawRoute from '../lib/drawRoute'

mapboxgl.accessToken = process.env.MAPBOX_API_TOKEN

class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.map = null
    this.state = {
      lng: -76,
      lat: 36,
      zoom: 4
    }
  }

  componentDidMount() {
    const { lat, lng, zoom } = this.state
    const { waypoints, route } = this.props

    this.map = new mapboxgl.Map({
      container: this.mapEl,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    })
  }

  componentDidUpdate(prevProps) {
    const { waypoints, route } = this.props
    const prevWaypoints = prevProps.waypoints
    const prevRoute = prevProps.route
    const waypointsUpdated = prevWaypoints.length != waypoints.length
    const routeUpdated = prevRoute != route

    if (waypointsUpdated) {
      waypoints.map(l => {
        const marker = new mapboxgl.Marker()
          .setLngLat(l.center)
          .addTo(this.map);
      })
    }

    if (routeUpdated) {
      this.map.addLayer(drawRoute(route))
    }
  }

  render() {
    return (
      <div className="mapContainer">
        <div className="map" ref={el => this.mapEl = el}></div>
        <style jsx>{`
          .map {
            position: absolute;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    )
  }

  renderWaypoint(waypoint) {
    return (
      <div key={waypoint.id}>{waypoint.place_name}</div>
    )
  }
}

const mapStateToProps = ({ waypoints, route }) => ({ waypoints, route })

export default connect(mapStateToProps, null)(MapContainer)
