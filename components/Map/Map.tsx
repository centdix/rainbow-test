import { FC, useRef, useEffect, useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

interface Props {
  className?: string;
  children?: any;
}

const containerStyle = {
  height: "100vh",
  width: "100vw",
};

const center = {
  lat: 48.85641,
  lng: 2.2888,
};

const Map: FC<Props> = ({}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyABF6S20JPVTeR78NHd7htMhBJ6EBqP2PE",
  });
  const [map, setMap] = useState(null);
  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    ></GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
