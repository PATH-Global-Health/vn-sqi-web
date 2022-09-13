import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Card, CardContent, Grid, IconButton, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { ListParam } from 'models';
import * as React from 'react';

export interface ISurveyFilterProps {
  filter: ListParam;
  onChange: (newFilter: ListParam) => void;
}

export function SurveyFilter({ filter, onChange }: ISurveyFilterProps) {
  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DatePicker
                label="Từ ngày"
                value={filter.from ?? null}
                onChange={(value) => {
                  onChange({ ...filter, from: value });
                }}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="Đến ngày"
                value={filter.to ?? null}
                onChange={(value) => {
                  onChange({ ...filter, to: value });
                }}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
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
