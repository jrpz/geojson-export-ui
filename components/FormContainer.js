import { formStyles } from '../lib/styles'

import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addLocation } from '../lib/store'

import AddLocation from '../components/AddLocation'

class FormContainer extends Component {
  render() {
    const { addLocation, locations } = this.props
    return (
      <div className="formContainer">
        <div className="formContainer__title">Locations</div>

        <div className="formContainer__locations">
          {locations.map(this.renderLocation)}
        </div>

        <AddLocation addLocation={addLocation} />
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
            margin: 0.5rem auto;
            border-bottom: 1px solid #009;
            padding-bottom: 0.5rem;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = ({ locations }) => ({ locations })

const mapDispatchToProps = (dispatch) => {
  return {
    addLocation: bindActionCreators(addLocation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer)
