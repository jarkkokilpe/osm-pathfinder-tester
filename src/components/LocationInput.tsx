import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

interface LocationInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  placeholderStyle?: React.CSSProperties;
}

const useStyles = makeStyles({
  placeholder: (props: { placeholderStyle?: React.CSSProperties }) => ({
    '&::placeholder': props.placeholderStyle,
  }),
});

const LocationInput: React.FC<LocationInputProps> = ({ 
  label, value, onChange, style, inputStyle, placeholderStyle }) => {
  const classes = useStyles({ placeholderStyle });

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <TextField
          label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
          style={style}
          InputLabelProps={{
            style: placeholderStyle,
          }}
          InputProps={{
            classes: {
              input: classes.placeholder,
            },
            style: inputStyle,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default LocationInput;