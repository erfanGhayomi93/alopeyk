import { update_map_reducer_type } from "../types"

const initialState = {
    locationName: "",
    locationType: "Busines",
    srcLogo: ""
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case update_map_reducer_type:
            return {
                ...state,
                ...payload
            }
        default:
            return state
    }
}
