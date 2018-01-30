import debounce from 'lodash.debounce'
import isEmpty from 'ramda/src/isEmpty'

import { searchLocation } from '../lib/mapbox'

import { Component } from 'react'
import { addLocationStyle } from '../lib/styles'

const hasResults = results =>
  results.type === 'FeatureCollection'

export default class AddLocation extends Component {
  constructor() {
    super()

    this.state = {
      location: '',
      results: []
    }

    this.handleAddLocation = this.handleAddLocation.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderResults = this.renderResults.bind(this)
  }

  handleChange(e) {
    const { value } = e.target
    this.setState({ location: value })
  }

  handleAddLocation(location) {
    const { addLocation } = this.props
    this.setState({ results: [] })
    addLocation(location)
  }

  handleSearch() {
    const { location } = this.state
    searchLocation(location)
      .then(results => this.setState({ results: results.entity }))
      .catch(err => console.log('err', err))
  }

  render() {
    const { location, results } = this.state

    return (
      <div className="addLocation">
        <input
          type="text"
          value={location}
          onChange={this.handleChange}
        />

        <button onClick={this.handleSearch.bind(this)}>Search</button>

        {hasResults(results) && this.renderResults()}

        <style jsx>{addLocationStyle}</style>
      </div>
    )
  }

  renderLocation(location) {
    const { id, place_name } = location
    return (
      <div
        className="addLocation__location"
        key={id}
        onClick={() => this.handleAddLocation(location)}
      >
        {place_name}
        <style jsx>{`
          border-bottom: 1px solid whitesmoke
          padding: 1rem 0;
          cursor: pointer;
        `}</style>
      </div>
    )
  }

  renderResults() {
    const { results } = this.state

    return (
      <div className="addLocation__results">
        {results.features.map(this.renderLocation.bind(this))}
        <style jsx>{`
          div {
            font-size: 1.0rem;
            margin: 0.5rem auto;
          }
        `}</style>
      </div>
    )
  }
}
