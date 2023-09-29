import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SeacrhComboBox(props) {
  const handleChange = (event) => {
    props.setKategory(event);
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        options={bookKategory}
        sx={{ width: 300 }}
        onChange={(event, newValue) => {
          handleChange(newValue);
        }}
        renderInput={(params) => <TextField {...params} label={"Book kategory"} />}
      />
    </div>
  );
}

// kategoryes
const bookKategory = [ 'all','art','biography','computers','history','medical','poetry'];
