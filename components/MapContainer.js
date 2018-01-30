import { formStyles } from '../lib/styles'

import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class MapContainer extends Component {
  render() {
    const { locations } = this.props
    return (
      <div className="mapContainer">
      </div>
    )
  }

  renderLocation(location) {
    return (
      <div key={location.id}>{location.place_name}</div>
    )
  }
}

const mapStateToProps = ({ locations }) => ({ locations })

export default connect(mapStateToProps, null)(MapContainer)
