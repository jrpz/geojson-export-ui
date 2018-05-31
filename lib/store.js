import merge from 'ramda/src/merge'

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const exState = {
  forms: [],
  map: {},
  waypoints: []
}

export const actionTypes = {
  ADD_WAYPOINT: 'ADD_WAYPOINT',
  REMOVE_WAYPOINT: 'REMOVE_WAYPOINT',
  SET_ROUTE: 'SET_ROUTE'
}

// REDUCERS
export const reducer = (state = exState, action) => {
  switch (action.type) {
    case actionTypes.ADD_WAYPOINT:
      return merge(state, {
        waypoints: state.waypoints.concat(action.waypoint)
      })

    case actionTypes.SET_ROUTE:
      return merge(state, { route: action.route })

    default: return state
  }
}

// ACTIONS
export const addWaypoint = waypoint => dispatch =>
  dispatch({
    type: actionTypes.ADD_WAYPOINT,
    waypoint
  })

export const setRoute = route => dispatch =>
  dispatch({
    type: actionTypes.SET_ROUTE,
    route
  })

export const initStore = (initialState = exState) =>
  createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
