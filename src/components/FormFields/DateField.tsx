import { FormControl, FormHelperText, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface IDateFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function DateField({ name, control, label, disabled, required }: IDateFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl
      fullWidth
      variant="outlined"
      margin="normal"
      size="small"
      disabled={disabled}
      error={invalid}
    >
      <DatePicker
        label={label}
        value={value ?? null}
        onChange={onChange}
        inputFormat="dd/MM/yyyy"
        renderInput={(params) => <TextField error={invalid} {...params} />}
      />

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
