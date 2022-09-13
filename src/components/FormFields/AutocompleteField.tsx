import { Autocomplete, createFilterOptions, TextField } from '@mui/material';
import * as React from 'react';
import { InputHTMLAttributes } from 'react';
import { Control, Controller, useController } from 'react-hook-form';
import { stringUtils } from 'utils';
import { SelectOption } from './SelectField';

export interface IAutocompleteFieldProps {
  options: SelectOption[];
  name: string;
  label: string;
  control: Control<any>;
  defaultValue?: string;
  helperText?: string;
  otherOptions?: SelectOption[];
}

export const AutocompleteField = ({
  options,
  otherOptions,
  name,
  label,
  control,
  defaultValue,
  helperText,
}: IAutocompleteFieldProps) => {
  const filterOptions = createFilterOptions({
    stringify: (option: SelectOption | string) =>
      typeof option == 'object'
        ? option.label + ' ' + stringUtils.removeVietnameseTones(option.label)
        : option + ' ' + stringUtils.removeVietnameseTones(option),
  });
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  if (otherOptions) {
    options = options.concat(otherOptions);
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Autocomplete
          disablePortal={false}
          freeSolo
          filterOptions={filterOptions}
          size="small"
          options={[...options]}
          getOptionLabel={(option) => {
            return typeof option == 'object'
              ? option?.label ?? options.find(({ value }) => value === option.value)?.label ?? ''
              : options.find(({ value }) => value === option)?.label ?? '';
          }}
          {...field}
          renderInput={(params) => (
            <TextField {...params} error={Boolean(error)} helperText={helperText} label={label} />
          )}
          onChange={(_event, data) =>
            field.onChange(typeof data == 'object' ? data?.value ?? '' : null)
          }
        />
      )}
    />
  );
};
