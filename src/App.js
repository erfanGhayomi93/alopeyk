import React, { useState } from "react";
import { AddLocation } from "./components/addLocation";
import MapComponent from "./components/mapComponent";
import "./App.css";
import { useDispatch, useSelector } from 'react-redux';
import { save_map_reducer_type } from "./redux/types";

const initialViewState = {
  latitude: 35.6892,
  longitude: 51.389,
}

export default function App() {
  const [isShowMap, setIsShowMap] = useState(false)
  const [marker, setMarker] = useState(initialViewState);
  const dispatch = useDispatch()
  const mapReducer = useSelector(state => state.mapReducer)
  const pastSavedLocations = useSelector(state => state.pastSavedLocations)

  const handleSubmitSaveLocation = () => {
    dispatch({ type: save_map_reducer_type, payload: { latitude: marker.latitude, longitude: marker.longitude } })
    alert("موقعیت شما در نقشه ثبت شد")
  }

  const cancelSaveLocation = () => {
    setMarker(initialViewState)
  }

  return (
    <div className="root">
      {
        isShowMap ?
          <MapComponent
            marker={marker}
            setMarker={setMarker}
            setIsShowMap={setIsShowMap}
            pastSavedLocations={pastSavedLocations}
          />
          :
          <AddLocation
            setIsShowMap={setIsShowMap}
            marker={marker}
            setMarker={setMarker}
            mapReducer={mapReducer}
            handleSubmitSaveLocation={handleSubmitSaveLocation}
            pastSavedLocations={pastSavedLocations}
            cancelSaveLocation={cancelSaveLocation}
          />
      }
    </div>
  )
}
