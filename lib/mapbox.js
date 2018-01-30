import Mapbox from 'mapbox'
import promisify from 'promisify-node'

const client = new Mapbox(process.env.MAPBOX_API_TOKEN)

export const searchLocation = location => promisify(
  client.geocodeForward(location, { country: 'us' })
)
