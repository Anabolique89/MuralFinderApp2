import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const LegalCheckbox = ({ checked, onChange }) => {
  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={onChange} color="primary" />}
      label="Is the place still legal?"
    />
  );
};

export default LegalCheckbox;
