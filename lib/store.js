import merge from 'ramda/src/merge'

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const exState = {
  forms: [],
  map: {},
  locations: []
}

export const actionTypes = {
  ADD_LOCATION: 'ADD_LOCATION',
  REMOVE_LOCATION: 'REMOVE_LOCATION'
}

// REDUCERS
export const reducer = (state = exState, action) => {
  switch (action.type) {
    case actionTypes.ADD_LOCATION:
      return merge(state, {
        locations: state.locations.concat(action.location)
      })
    default: return state
  }
}

// ACTIONS
export const addLocation = location => dispatch => {
  dispatch({
    type: actionTypes.ADD_LOCATION,
    location
  })
}

export const initStore = (initialState = exState) =>
  createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
