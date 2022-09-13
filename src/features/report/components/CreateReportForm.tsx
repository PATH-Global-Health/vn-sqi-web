import { ReportCreateModel } from 'models';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { SelectField, SelectOption } from 'components/FormFields';

export interface ICreateReportFormProps {
  initialValues?: ReportCreateModel;
  onSubmit?: (formValues: ReportCreateModel) => void;
}

const schema = yup.object().shape({
  month: yup.number().typeError('').required('').min(1, '').max(12, ''),
  year: yup
    .number()
    .typeError('')
    .required('')
    .min(new Date().getFullYear() - 10, '')
    .max(new Date().getFullYear(), ''),
});

export default function CreateReportForm({ initialValues, onSubmit }: ICreateReportFormProps) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const yearOptions: SelectOption[] = [];
  const monthOptions: SelectOption[] = [];
  var year = new Date().getFullYear();
  for (let i = 0; i < 11; i++) {
    yearOptions.push({
      label: (year - i).toString(),
      value: year - i,
    });
  }

  for (let i = 1; i < 13; i++) {
    monthOptions.push({
      label: i.toString(),
      value: i,
    });
  }

  const {
    control,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm<ReportCreateModel>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const handleFormSubmit = async (formValues: ReportCreateModel) => {
    onSubmit?.(formValues);
  };

  return (
    <Box maxWidth={600} minWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <SelectField name="year" options={yearOptions} label="Năm" control={control} />
        <SelectField name="month" options={monthOptions} label="Tháng" control={control} />
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;Đồng ý
          </Button>
        </Box>
      </form>
    </Box>
  );
}
