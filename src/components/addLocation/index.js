import React, { useMemo, useState } from 'react';
import "./style.css"
import MapComponent from "../mapComponent"
import { useDispatch } from 'react-redux';
import { update_map_reducer_type } from '../../redux/types';

export const AddLocation = ({ marker, setMarker, setIsShowMap, mapReducer, handleSubmitSaveLocation, pastSavedLocations, cancelSaveLocation }) => {
    const { locationName: locationNameReducer, locationType } = mapReducer
    const [locationName, setlocationName] = useState(locationNameReducer)
    const dispatch = useDispatch()

    const saveInStore = (property, value) => {
        dispatch({ type: update_map_reducer_type, payload: { [property]: value } })
    }

    const previewMap = useMemo(
        () => <MapComponent
            marker={marker}
            setMarker={setMarker}
            pastSavedLocations={pastSavedLocations}
            setIsShowMap={setIsShowMap}
        />
        , [])

    return (
        <div className="container">
            <div className="top-box">
                <p>Share location</p>
            </div>
            <div className="box">
                <div className="form-control">
                    <label htmlFor="location_name" className="label-form">Location name:</label>
                    <input
                        value={locationName}
                        onChange={(e) => setlocationName(e.target.value)}
                        onBlur={() => saveInStore("locationName", locationName)}
                        id="location_name"
                        className="input-form px-10"
                    />
                </div>

                <div className="form-control">
                    <label className="label-form">Location on map:</label>
                    <div className="perview-map" onClick={() => setIsShowMap(true)}>
                        {previewMap}
                    </div>
                </div>

                <div className="form-control">
                    <label htmlFor="location_type" className="label-form">Location type:</label>
                    <select
                        onChange={(e) => saveInStore("locationType", e.target.value)}
                        id="location_type"
                        className="select-form classic"
                        value={locationType}
                    >
                        <option value="Busines">Busines</option>
                        <option value="Personal">Personal</option>
                    </select>
                </div>

                <div className="form-control">
                    <label className="label-form">Logo:</label>
                    <div className="logo-map" onClick={()=>alert("لوگو پیش فرض در نظر گرفته شده است.")}>
                        <div className="top-box text-center">
                            <p>Upload</p>
                        </div>
                        <div className="box text-center">
                            <img src="https://img.icons8.com/fluency/48/000000/upload--v16.png" className="img-upload" alt="upload" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="buttons">
                <button
                    className="button button-cancel"
                    onClick={cancelSaveLocation}
                >
                    Cancle
                </button>
                <button
                    className="button button-save"
                    onClick={handleSubmitSaveLocation}
                >
                    Save
                </button>
            </div>
        </div >
    )
}
