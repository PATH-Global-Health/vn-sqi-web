import { Card, CardContent, Grid, Typography } from '@mui/material';
import { SurveyStatistic } from 'models';
import * as React from 'react';

export interface ISQiStatisticProps {
  statistic: SurveyStatistic[];
}

export function SQiStatistic({ statistic }: ISQiStatisticProps) {
  const getPercent = (n: number, d: number) => {
    if (d == 0) {
      return 'NaN';
    } else {
      return ` (${((n / d) * 100).toFixed(2)}%)`;
    }
  };
  return (
    <Grid container spacing={2}>
      {statistic.map((item) => (
        <Grid item xs={4} key={item.indicator}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {item.indicator}
              </Typography>
              <Typography variant="h5" component="div">
                {item.numerator}/{item.denominator} {getPercent(item.numerator, item.denominator)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
