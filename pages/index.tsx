import Map from "@components/Map";
import Controls from "@components/Controls";

export default function Home() {
  return (
    <>
      <div className="flex flex-row font-sans">
        <Controls />
        <Map />
      </div>
    </>
  );
}
