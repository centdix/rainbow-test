import { FC, useRef, useEffect, useState, useCallback } from "react";
import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api";

interface Props {
  className?: string;
  children?: any;
  directions?: any;
}

const containerStyle = {
  height: "100vh",
  width: "100vw",
};

const center = {
  lat: 48.85641,
  lng: 2.2888,
};

const Map: FC<Props> = (directions) => {
  const [map, setMap] = useState(null);
  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
      {directions &&
        directions.directions.map((route) => {
          <DirectionsRenderer directions={route} />;
        })}
    </GoogleMap>
  );
};

export default Map;
