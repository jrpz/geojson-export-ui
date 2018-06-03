import debounce from 'lodash.debounce'
import isEmpty from 'ramda/src/isEmpty'

import { searchWaypoint } from '../lib/mapbox'

import { Component } from 'react'

const hasResults = results =>
  results.type === 'FeatureCollection'

export default class AddWaypoint extends Component {
  constructor() {
    super()

    this.state = {
      waypoint: '',
      results: {}
    }

    this.handleAddWaypoint = this.handleAddWaypoint.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.renderResults = this.renderResults.bind(this)
  }

  handleAddWaypoint(waypoint) {
    const { addWaypoint } = this.props
    this.setState({ results: [] })
    addWaypoint(waypoint)
  }

  handleChange(e) {
    const { value } = e.target
    this.setState({ waypoint: value })
  }

  handleFocus(e) {
    this.setState({ waypoint: '' })
  }

  handleKeyPress(e) {
    const { waypoint } = this.state
    if (e.keyCode === 13) {
      this.handleSearch()
    }
  }

  handleSearch() {
    const { waypoint } = this.state
    searchWaypoint(waypoint)
      .then(results => this.setState({ results: results.entity }))
      .catch(err => console.log('err', err))
  }

  render() {
    const { waypoint, results } = this.state

    return (
      <div className="addWaypoint">
        <input
          type="text"
          value={waypoint}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyPress.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          placeholder="Enter waypoint..."
        />

        {hasResults(results) && this.renderResults()}

        <style jsx>{`
          .addWaypoint {
            padding: 1.5rem 0;
          }

          input {
            width: 100%;
            border: none;
            height: 4rem;
            padding: 1rem;
            font-size: 1.6rem;
          }
        `}</style>
      </div>
    )
  }

  renderWaypoint(waypoint) {
    const { id, place_name } = waypoint
    return (
      <div
        className="addWaypoint__waypoint"
        key={id}
        onClick={() => this.handleAddWaypoint(waypoint)}
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
      <div className="addWaypoint__results">
        {results.features.map(this.renderWaypoint.bind(this))}
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
