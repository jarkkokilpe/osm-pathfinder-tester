import React, { useState } from 'react';
import LocationInput from './LocationInput';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

interface LocationFormProps {
  start: string;
  end: string;
  locations: string[];
  onUpdateLocations: (locations: string[]) => void;
  onUpdateStartLocation: (startLocation: string) => void;
  onUpdateEndLocation: (endLocation: string) => void;
}

const LocationForm: React.FC<LocationFormProps> = ({ 
  start, 
  end, 
  locations, 
  onUpdateLocations,
  onUpdateStartLocation,
  onUpdateEndLocation,
 }) => {
  const [localLocations, setLocalLocations] = useState<string[]>(locations);
  const [startLocation, setStartLocation] = useState<string>(start);
  const [endLocation, setEndLocation] = useState<string>(end);

  const handleAddLocation = () => {
    if (localLocations.length < 3) {
      setLocalLocations([...localLocations, '']);
    }
  };

  const handleRemoveLocation = (index: number) => {
    if (localLocations.length >= 0) {
      const newLocations = localLocations.filter((_, i) => i !== index);
      setLocalLocations(newLocations);
    }
  };

  const handleUpdateLocation = (index: number, value: string) => {
    const newLocations = [...localLocations];
    newLocations[index] = value;
    setLocalLocations(newLocations);
  };
  
  const handleUpdateStartLocation = (value: string) => {
    setStartLocation(value);
  };
  
  const handleUpdateEndLocation = (value: string) => {
    setEndLocation(value);
  };

  const handleApply = () => {
    onUpdateLocations(localLocations);
    onUpdateStartLocation(startLocation);
    onUpdateEndLocation(endLocation);
  };

  const inputStyle = {
    color: 'white', // Text color
    backgroundColor: '#333', // Background color
  };

  const placeholderStyle = {
    color: 'white', // Placeholder text color
  };

  return (
    <div style={{ width: '100%' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <LocationInput
            label={'Start Location'}
            value={startLocation}
            onChange={(value) => handleUpdateStartLocation(value)}
            style={{ width: '100%' }}
            inputStyle={inputStyle}
            placeholderStyle={placeholderStyle}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <LocationInput
            label={'End Location'}
            value={endLocation}
            onChange={(value) => handleUpdateEndLocation(value)}
            style={{ width: '100%' }}
            inputStyle={inputStyle}
            placeholderStyle={placeholderStyle}
          />
        </Grid>
      </Grid>
      {localLocations.map((location, index) => (
        <Grid container spacing={2} key={index} alignItems="center">
          <Grid item xs={9}>
            <LocationInput
              label={`Location ${index + 1}`}
              value={location}
              onChange={(value) => handleUpdateLocation(index, value)}
              style={{ width: '100%' }}
              inputStyle={inputStyle}
              placeholderStyle={placeholderStyle}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleRemoveLocation(index)}
              disabled={localLocations.length <= 0}
            >
              X
            </Button>
          </Grid>
        </Grid>
      ))}

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <div style={{ height: '20px' }}></div>
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddLocation}
            disabled={localLocations.length >= 3}
          >
            Add location
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" onClick={handleApply}>
            Search path
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default LocationForm;