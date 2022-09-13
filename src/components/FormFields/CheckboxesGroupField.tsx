import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  TextField,
} from '@mui/material';
import * as React from 'react';
import { InputHTMLAttributes, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { string } from 'yup/lib/locale';

export interface RadioOption {
  label?: string;
  value: number | string;
}

export interface CheckboxesFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: RadioOption[];
}

export function CheckboxesField({ name, control, label, disabled, options }: CheckboxesFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const _id = event.target.name;
    let id: number | string;
    if (typeof options[0].value == 'number') {
      id = Number.parseInt(_id);
    } else {
      id = _id;
    }
    const isExisted = (value as []).findIndex((s) => s == id);
    let newValue: any[];
    if (isExisted > -1) {
      newValue = (value as []).filter((s) => s != id);
    } else {
      newValue = [...value];
      newValue.push(id);
    }
    onChange(newValue);
  }

  return (
    <FormControl error={invalid} disabled={disabled}>
      <FormLabel>{label}</FormLabel>
      {options.map((k) => {
        let label = k.label;
        if (!label) {
          label = '';
        }
        const checked = (value as []).filter((s) => s == k.value).length > 0;
        return (
          <FormGroup key={k.value}>
            <FormControlLabel
              control={
                <Checkbox checked={checked} onChange={handleOnChange} name={k.value.toString()} />
              }
              label={label}
            />
          </FormGroup>
        );
      })}

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
