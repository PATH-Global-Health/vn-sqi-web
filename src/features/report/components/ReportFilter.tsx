import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  Autocomplete,
  Card,
  CardContent,
  createFilterOptions,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { ListParam, Province } from 'models';
import * as React from 'react';
import { stringUtils } from 'utils';
import { string } from 'yup/lib/locale';

export interface IReportFilterProps {
  filter: ListParam;
  provinces: Province[];
  onChange: (newFilter: ListParam) => void;
}

export function ReportFilter({ filter, provinces, onChange }: IReportFilterProps) {
  const filterOptions = createFilterOptions({
    stringify: (option: string) => option + ' ' + stringUtils.removeVietnameseTones(option),
  });
  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <DatePicker
                label="Từ ngày"
                value={filter.from ?? null}
                onChange={(value) => {
                  onChange({ ...filter, from: value });
                }}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
              />
            </Grid>
            <Grid item xs={4}>
              <DatePicker
                label="Đến ngày"
                value={filter.to ?? null}
                onChange={(value) => {
                  onChange({ ...filter, to: value });
                }}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                disablePortal
                size="small"
                id="province"
                filterOptions={filterOptions}
                options={provinces.map((s) => s.label)}
                onChange={(_event, data) => {
                  let province = provinces.find((s) => s.label == data);
                  if (province) {
                    onChange({ ...filter, province: province.value });
                  }
                }}
                renderInput={(params) => <TextField {...params} label="Tỉnh/thành" />}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                <Grid item>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      onChange({ ...filter });
                    }}
                  >
                    <RestartAltIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
