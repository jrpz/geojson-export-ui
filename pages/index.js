import { bodyStyle } from '../lib/styles'

import React from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import { initStore, addLocation } from '../lib/store'

import FormContainer from '../components/FormContainer'

const MapContainer = dynamic(
  import('../components/MapContainer'),
  { ssr: false }
)

class App extends React.Component {
  static getInitialProps({ reduxStore, req }) {
    const isServer = !!req
    return { isServer }
  }

  render () {
    return (
      <main>
        <Head>
          <title>GeoJSON Exporter</title>
          <link href="https://fonts.googleapis.com/css?family=VT323" rel="stylesheet" />
          <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.0/mapbox-gl.css' rel='stylesheet' />
        </Head>

        <section className="left">
          <FormContainer addLocation={this.props.addLocation} />
        </section>

        <section className="right">
          <MapContainer />
        </section>

        <style jsx global>{bodyStyle}</style>
      </main>
    )
  }
}


export default connect()(App)
