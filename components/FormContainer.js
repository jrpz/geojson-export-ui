import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addWaypoint, setRoute } from '../lib/store'

import AddWaypoint from '../components/AddWaypoint'
import Exporter from '../components/Exporter'
import GeoData from '../components/GeoData'

class FormContainer extends Component {
  render() {
    const {
      addWaypoint,
      waypoints,
      setRoute,
      route
    } = this.props

    return (
      <div className="formContainer">
        <div className="formContainer__title">Route Waypoints</div>

        <div className="formContainer__waypoints">
          {waypoints.map(this.renderWaypoint)}
        </div>

        <AddWaypoint addWaypoint={addWaypoint} />

        {
          waypoints.length > 1 &&
          <Exporter
            waypoints={waypoints}
            setRoute={setRoute} />
        }

        { route && <GeoData route={route} /> }

        <style jsx>{`
          .formContainer {
            height: 100%;
            background-color: #174291;
            color: #fafafa;
            padding: 2rem;
          }

          .formContainer__title {
            font-size: 2rem;
            margin-bottom: 1rem;
          }

          .formContainer__waypoints {
            border: 1px solid #009;
            border-bottom: none;
          }

          .formContainer__waypoints div {
            margin: 0.5rem auto;
            background: pink;
          }
        `}</style>
      </div>
    )
  }

  renderWaypoint(waypoint) {
    return (
      <div key={waypoint.id}>
        {waypoint.place_name}
        <style jsx>{`
          div {
            border-bottom: 1px solid #009;
            padding: 1rem;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps =
  ({ waypoints, route }) => ({ waypoints, route })

const mapDispatchToProps = (dispatch) => {
  return {
    addWaypoint: bindActionCreators(addWaypoint, dispatch),
    setRoute: bindActionCreators(setRoute, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer)
