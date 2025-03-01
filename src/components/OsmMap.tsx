import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import { Pathfinder } from 'osm-pathfinder';
import { RawCoordinates, Coordinates } from 'osm-pathfinder/dist/types/interfaces';
import LocationForm from './LocationForm';
import 'leaflet/dist/leaflet.css';
import { Typography } from '@mui/material';
import L from 'leaflet';

export interface CoordinatesL {
  lat: number;
  lng: number;
}

const parseLocation = (location: string): Coordinates => {
  const [lat, lon] = location.split(',').map(Number);
  return { lat, lon };
};
const parseLocationL = (location: string): CoordinatesL => {
  const [lat, lng] = location.split(',').map(Number);
  return { lat, lng };
};

const createCustomHtmlIcon = (char: string) => {
  return L.divIcon({
    html: `<div style="background-color: rgba(12, 193, 238, 0.75); color: rgb(210, 239, 247); border-radius: 50%; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center;">${char}</div>`,
    className: '',
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
  });
};

const OSMMap: React.FC = () => {
  const [startLocation, setStartLocation] = useState<string>('64.22771862182563, 27.723022703369733');
  const [endLocation, setEndLocation] = useState<string>('64.22708547223502, 27.72572394118406');
  const [locations, setLocations] = useState<string[]>([]);
  const [route, setRoute] = useState<RawCoordinates>([]);
  const [rectangle, setRectangle] = useState<RawCoordinates>([]);

  useEffect(() => {
    const fetchPath = async () => {
      const finder = new Pathfinder();
      const parsedStartLocation = parseLocation(startLocation);
      const parsedEndLocation = parseLocation(endLocation);
      const parsedLocations = locations.map(parseLocation);
      const allLocations = [parsedStartLocation, ...parsedLocations, parsedEndLocation];
      const path = await finder.findMultiPath(allLocations);
    
      console.log('locations', allLocations);
      console.log('path', path);
      setRoute(path);
    };

    fetchPath();
  }, [locations, startLocation, endLocation]);

  const gradientColors = [
    'rgb(4, 56, 69)', 
    'rgb(5, 78, 96)', 
    'rgb(6, 111, 138)', 
    'rgb(8, 132, 163)', 
    'rgb(11, 155, 192)', 
    'rgb(13, 178, 220)', 
    'rgb(14, 207, 255)'];

  const createGradientPolylines = (positions: RawCoordinates, colors: string[]) => {
    const segmentLength = Math.floor(positions.length / colors.length);
    const polylines = [];

    for (let i = 0; i < colors.length; i++) {
      const start = i * segmentLength;
      const end = i === colors.length - 1 ? positions.length - 1 : (i + 1) * segmentLength;
      const segment = positions.slice(start, end + 1);
      polylines.push(
        <Polyline key={i} positions={segment} color={colors[i]} />
      );
    }

    return polylines;
  };

  return (
    <div style={{ display: 'flex', height: '97vh', backgroundColor: '#202020' }}>
      <div style={{ width: '25%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#202020', color: 'white' }}>
      <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Consolas, monospace', textAlign: 'center' }}>
          npm i osm-pathfinder
        </Typography>
        <LocationForm 
          locations={locations} 
          start={startLocation} 
          end={endLocation} 
          onUpdateLocations={setLocations} 
          onUpdateStartLocation={setStartLocation} 
          onUpdateEndLocation={setEndLocation} 
        />
      </div>
      <div style={{ flex: 1 }}>
        <MapContainer center={[64.22, 27.734]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/*<TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
          />*/}
          {createGradientPolylines(route, gradientColors)}
          <Polyline positions={rectangle} />
          <Marker position={parseLocationL(startLocation)} icon={createCustomHtmlIcon('S')}>
            <Popup>
              Start Location
            </Popup>
          </Marker>
          <Marker position={parseLocationL(endLocation)} icon={createCustomHtmlIcon('E')}>
            <Popup>
              End Location
            </Popup>
          </Marker>
          {locations.map((location, index) => {
            const { lat, lon } = parseLocation(location);
            return (
              <Marker key={index} position={[lat, lon]} icon={createCustomHtmlIcon((index + 1).toString())}>
                <Popup>
                  Location {index + 1}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default OSMMap;