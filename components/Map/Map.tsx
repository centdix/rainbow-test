import { FC, useRef, useEffect, useState, useCallback, useContext } from "react";
import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api";
import { DirectionsContext } from '../../pages/index.tsx';

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

const Map: FC<Props> = () => {
  const [map, setMap] = useState(null);
  const { directions, setDirections } = useContext(DirectionsContext);
  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  let renderedDirections = directions.map((d, index) => {
    return <DirectionsRenderer key={index} directions={d}/>;
  });

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
      {renderedDirections}
    </GoogleMap>
  );
};

export default Map;
