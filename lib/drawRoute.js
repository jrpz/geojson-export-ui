import shortid from 'shortid'

export default (route) => ({
  id: `route-${shortid()}`,
  type: 'line',
  source: {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: route.geometry
    }
  },
  layout: {
    'line-join': 'round',
    'line-cap': 'round'
  },
  paint: {
    'line-color': '#ff5c57',
    'line-width': 4
  }
})
