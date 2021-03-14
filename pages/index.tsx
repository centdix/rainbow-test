import Map from "@components/Map";
import Controls from "@components/Controls";
import { useState } from "react";

export default function Home() {
  const [directions, setDirections] = useState(null);

  return (
    <>
      <div className="flex flex-row font-sans">
        <Controls setDirections={setDirections} />
        <Map />
      </div>
    </>
  );
}
