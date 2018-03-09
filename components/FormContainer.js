import { formStyles } from '../lib/styles'

import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addLocation, setRoute } from '../lib/store'

import AddLocation from '../components/AddLocation'
import Exporter from '../components/Exporter'

class FormContainer extends Component {
  render() {
    const {
      addLocation,
      locations,
      setRoute
    } = this.props

    return (
      <div className="formContainer">
        <div className="formContainer__title">Route Cities</div>

        <div className="formContainer__locations">
          {locations.map(this.renderLocation)}
        </div>

        <AddLocation addLocation={addLocation} />

        { locations.length > 1 &&
          <Exporter locations={locations} setRoute={setRoute} /> }

        <style jsx>{formStyles}</style>
      </div>
    )
  }

  renderLocation(location) {
    return (
      <div key={location.id}>
        {location.place_name}
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

const mapStateToProps = ({ locations }) => ({ locations })

const mapDispatchToProps = (dispatch) => {
  return {
    addLocation: bindActionCreators(addLocation, dispatch),
    setRoute: bindActionCreators(setRoute, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer)
