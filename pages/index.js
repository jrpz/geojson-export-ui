import { bodyStyle } from '../lib/styles'

import React from 'react'
import Head from 'next/head'

import { bindActionCreators } from 'redux'
import { initStore, addLocation } from '../lib/store'
import withRedux from 'next-redux-wrapper'

import FormContainer from '../components/FormContainer'
import MapContainer from '../components/MapContainer'

class App extends React.Component {
  static getInitialProps({ store, isServer }) {
    return { isServer }
  }

  render () {
    return (
      <main>
        <Head>
          <title>GeoJSON Exporter</title>
          <link href="https://fonts.googleapis.com/css?family=VT323" rel="stylesheet" />
        </Head>

        <section>
          <FormContainer
            addLocation={this.props.addLocation}
          />
        </section>

        <section>
          <MapContainer />
        </section>

        <style jsx global>{bodyStyle}</style>
      </main>
    )
  }
}


export default withRedux(initStore, null, null)(App)
