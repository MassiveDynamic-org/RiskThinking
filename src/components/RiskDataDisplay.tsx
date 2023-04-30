import { DataItem, RiskItem } from '../types/data';
import GoogleMapReact from 'google-map-react';
import { useState,useCallback } from 'react';
import PlaceIcon from '@material-ui/icons/Place';

interface RiskDataDisplayProps {
  data: RiskItem[];
}
interface Markers {
  name : string,
  reskLevel:number,
  lat:number,
  lng:number
}

const map_api_key= process.env.GOOGLE_MAP_API_KEY || "";
const RiskDataDisplay = ({ data }: RiskDataDisplayProps) => {
  const [bounds, setBounds] = useState(null);

  const handleBoundsChange = useCallback(({ bounds }:any) => {
    setBounds(bounds);
  }, []);
  return (
    <div style={{ height: '100vh', width: '100%' }}>
    <h2 className="text-2xl ">Locations </h2>

      <GoogleMapReact
        bootstrapURLKeys={{ key: map_api_key }}
        defaultCenter={{ lat: 59.95, lng: -119.27337 }}
        defaultZoom={1}
        onChange={handleBoundsChange}
      >
      {data.map((marker,index) => (
          <Marker
            key={index}
            lat={marker.Lat}
            lng={marker.Long}
            name={marker.Asset_Name}
            reskLevel = {marker.Risk_Rating*100}
          />
      ))}
      </GoogleMapReact>
    </div>

  );
};
function Marker({ name,reskLevel,lat,lng }:Markers) {
  return (
    <div style={{ color: (reskLevel<30)?'#D2222D': (reskLevel>=30 && reskLevel<= 80) ? '#FFBF00':'#238823' }}>
      <PlaceIcon style={{ color: (reskLevel<30)?'#D2222D': (reskLevel>=30 && reskLevel<= 80) ? '#FFBF00':'#238823', fontSize:"28px"}}  />
      {name}
    </div>
  );
}
export default RiskDataDisplay;
