import { combineReducers } from 'redux';
import mapReducer from "./map/reducer"
import pastSavedLocations from "./map/pastSavedLocations"

const rootReducer = combineReducers({
    mapReducer,
    pastSavedLocations
})

export default rootReducer