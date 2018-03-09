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
      results: {}
    }

    this.handleAddLocation = this.handleAddLocation.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.renderResults = this.renderResults.bind(this)
  }

  handleAddLocation(location) {
    const { addLocation } = this.props
    this.setState({ results: [] })
    addLocation(location)
  }

  handleChange(e) {
    const { value } = e.target
    this.setState({ location: value })
  }

  handleKeyPress(e) {
    const { location } = this.state
    if (e.keyCode === 13) {
      this.handleSearch()
    }
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
          onKeyDown={this.handleKeyPress.bind(this)}
          placeholder="Search..."
        />

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
          div {
            border-bottom: 1px solid #009;
            padding: 1rem;
            cursor: pointer;
          }
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
            font-size: 1.4rem;
            margin: 0.5rem auto;
            border: 1px solid #009;
            border-bottom: none;
          }
        `}</style>
      </div>
    )
  }
}
