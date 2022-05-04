import { save_map_reducer_type } from "../types"

const initialState = []

const pastSavedLocations = (state = initialState, { type, payload }) => {
    switch (type) {
        case save_map_reducer_type:
            return [
                ...state,
                payload
            ]
        default:
            return state
    }
}

export default pastSavedLocations;