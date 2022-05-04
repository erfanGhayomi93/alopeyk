import Map, { FullscreenControl, Marker, NavigationControl, Popup } from "react-map-gl";
import React, { useCallback, useMemo, useState } from "react";
import Pin from "../pin";
import "./style.css"


export default function MapComponent({ marker, setMarker, setIsShowMap, pastSavedLocations }) {
  const [showPopup, setshowPopup] = useState(false)

  const onMarkerDrag = useCallback((event) => {
    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat
    });
  }, []);

  const pins = useMemo(
    () =>
      <Marker
        longitude={marker.longitude}
        latitude={marker.latitude}
        anchor="bottom"
        draggable
        onDragEnd={onMarkerDrag}
        onClick={e => {
          e.originalEvent.stopPropagation();
          setshowPopup(true);
        }}
      >
        <Pin size={30} />
      </Marker>
    , []
  );

  const onMove = useCallback((evt) => {
    setMarker(evt.viewState);
  }, []);

  const savedLocations = useMemo(
    () =>
      pastSavedLocations.map((item, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={item.longitude}
          latitude={item.latitude}
          anchor="bottom"
        >
          <Pin />
        </Marker>
      )),
    []
  );

  return (
    <div className="container-map">
      <Map
        {...marker}
        zoom={14}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onMove={onMove}
        mapboxAccessToken="pk.eyJ1IjoiZXJmdXVuZ2giLCJhIjoiY2wybjE0NDc0MTJkZjNrbnFuZ3JjcGN1cSJ9.5-eB4-MQ7RvwoVfHf-THSg"
      >
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />

        {savedLocations}

        {pins}

        {
          showPopup && (
            <Popup
              className="w-250"
              latitude={marker.latitude}
              longitude={marker.longitude}
              anchor="top"
              closeButton={true}
              closeOnClick={true}
              tipSize={12}
              onClose={() => setshowPopup(false)}
            >
              <div className="popup-map">
                <p className="popup-header">Location details</p>
                <p className="popup-details">details</p>
                <div className="buttons">
                  <button className="button button-cancel p-5" onClick={() => setshowPopup(false)}>close</button>
                  <button className="button button-edit p-5" onClick={() => setIsShowMap(false)} >edit</button>
                </div>
              </div>
            </Popup>
          )
        }
      </Map>
    </div>
  );
}
