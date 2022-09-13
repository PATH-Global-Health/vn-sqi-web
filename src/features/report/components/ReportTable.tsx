import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import PublishIcon from '@mui/icons-material/Publish';
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Province, Report } from 'models';
import * as React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const useStyles = makeStyles((theme) => ({
  table: {},
  edit: {
    marginRight: 4,
  },
}));

export interface IReportTableProps {
  data?: Report[];
  provinces: Province[];
  onCreate?: () => void;
  onSync?: (report: Report) => void;
}

export function ReportTable({ data, provinces, onCreate, onSync }: IReportTableProps) {
  const classes = useStyles();

  const getProvince = (code: string) => {
    const province = provinces.find((s) => s.value === code);
    if (province) {
      return province.label;
    }
    return code;
  };

  const getTotal = (indicator: string, report: Report) => {
    var data = report.datas.filter((s) => s.indicator_code === indicator);
    var numerator = data.reduce((sum, item) => {
      return sum + item.data._value;
    }, 0);
    var denominator = data.reduce((sum, item) => {
      return sum + item.data.denominatorValue;
    }, 0);
    return `${numerator}/${denominator}`;
  };

  const handleSync = (report: Report) => {
    onSync?.(report);
  };

  return (
    <>
      <Toolbar style={{ backgroundColor: 'white' }}>
        <Grid container direction="row" justifyContent="flex-end" alignItems="center">
          <Grid item>
            <Tooltip title="Tổng hợp dữ liệu">
              <IconButton
                color="primary"
                onClick={() => {
                  onCreate?.();
                }}
              >
                <DataSaverOnIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ngày tổng hợp</TableCell>
              <TableCell>Năm</TableCell>
              <TableCell>Tháng</TableCell>
              <TableCell>Tỉnh/thành</TableCell>
              <TableCell>Clients_ExpStigma</TableCell>
              <TableCell>Clients_ExpIPV</TableCell>
              <TableCell>Clients_knowVL</TableCell>
              <TableCell>Clients_NoExpStigma</TableCell>
              <TableCell>Clients_NoExpIPV</TableCell>
              <TableCell align="center">Đồng bộ PQM</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((item: Report) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date?.toISOString().split('T')[0]}</TableCell>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{getProvince(item.province_code)}</TableCell>
                  <TableCell>{getTotal('Clients_ExpStigma', item)}</TableCell>
                  <TableCell>{getTotal('Clients_ExpIPV', item)}</TableCell>
                  <TableCell>{getTotal('Clients_knowVL', item)}</TableCell>
                  <TableCell>{getTotal('Clients_NoExpStigma', item)}</TableCell>
                  <TableCell>{getTotal('Clients_NoExpIPV', item)}</TableCell>
                  <TableCell align="center">
                    {item.isSync && <CheckCircleOutlineIcon color="success" />}
                  </TableCell>
                  <TableCell align="right" style={{ marginRight: 5 }}>
                    <Tooltip title="Đồng bộ PQM" placement="left">
                      <IconButton size="small" color="primary" onClick={() => handleSync(item)}>
                        <PublishIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
