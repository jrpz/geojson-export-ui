import { formStyles } from '../lib/styles'
import mapboxgl from 'mapbox-gl'

import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

mapboxgl.accessToken = process.env.MAPBOX_API_TOKEN

class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.map = null
    this.state = {
      lng: -76,
      lat: 36,
      zoom: 3
    }
  }

  componentDidMount() {
    const { lat, lng, zoom } = this.state
    const { locations, route } = this.props

    this.map = new mapboxgl.Map({
      container: this.mapEl,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    })
  }

  componentDidUpdate(prevProps) {
    const { locations, route } = this.props
    const prevLocations = prevProps.locations
    const prevRoute = prevProps.route
    const locationsUpdated = prevLocations.length != locations.length
    const routeUpdated = prevRoute != route

    if (locationsUpdated) {
      locations.map(l => {
        const marker = new mapboxgl.Marker()
          .setLngLat(l.center)
          .addTo(this.map);
      })
    }

    if (routeUpdated) {
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: route.geometry
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#800',
          'line-width': 8
        }
      })
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

  renderLocation(location) {
    return (
      <div key={location.id}>{location.place_name}</div>
    )
  }
}

const mapStateToProps = ({ locations, route }) => ({ locations, route })

export default connect(mapStateToProps, null)(MapContainer)
