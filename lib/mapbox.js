import Mapbox from 'mapbox'
import promisify from 'promisify-node'

import pluck from 'ramda/src/pluck'
import compose from 'ramda/src/compose'
import map from 'ramda/src/map'

const client = new Mapbox(process.env.MAPBOX_API_TOKEN)
const coordinate = c => ({ longitude: c[0], latitude: c[1] })

const getCenters = compose(
  map(coordinate),
  pluck('center')
)

export const searchWaypoint = waypoint => promisify(
  client.geocodeForward(waypoint, { country: 'us' })
)

export const getDirections = waypoints => {
  const waypointCenters = getCenters(waypoints)
  return promisify(
    client.getDirections(waypointCenters, { profile: 'driving' })
  )
}
