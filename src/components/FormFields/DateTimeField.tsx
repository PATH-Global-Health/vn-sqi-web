import { FormControl, FormHelperText, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface IDateTimeFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
}

export default function DateTimeField({ name, control, label, disabled }: IDateTimeFieldProps) {
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
      <DateTimePicker
        label={label}
        value={value ?? null}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
      />

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
