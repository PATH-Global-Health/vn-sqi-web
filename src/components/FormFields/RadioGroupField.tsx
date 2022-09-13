import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import * as React from 'react';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioOption {
  label?: string;
  value: number | string;
}

export interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: RadioOption[];
}

export function RadioGroupField({ name, control, label, disabled, options }: RadioGroupFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof options[0].value === 'number') {
      onChange(Number.parseInt(event.target.value));
    } else {
      onChange(event.target.value);
    }
  };

  return (
    <FormControl error={invalid} disabled={disabled}>
      <FormLabel>{label}</FormLabel>

      <RadioGroup name={name} value={value} onChange={handleOnChange} onBlur={onBlur}>
        {options.map((option) => {
          return (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label ? option.label : ''}
            />
          );
        })}
      </RadioGroup>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
