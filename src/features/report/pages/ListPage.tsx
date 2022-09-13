import {
  Backdrop,
  Box,
  CircularProgress,
  LinearProgress,
  Pagination,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { reportApi } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import Popup from 'components/Common/Popup';
import { ListParam, Report, ReportCreateModel, ReportSyncModel } from 'models';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import CreateReportForm from '../components/CreateReportForm';
import { ReportFilter } from '../components/ReportFilter';
import { ReportTable } from '../components/ReportTable';
import { reportActions } from '../reportSlice';
import location from 'api/locations.json';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: 13,
  },

  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 16,
  },

  loading: {
    position: 'absolute',
    top: -4,
    width: '100%',
  },
}));

const initialValues: ReportCreateModel = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
} as ReportCreateModel;

export function ListPage() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const data = useAppSelector((s: RootState) => s.report.data);
  const [openPopup, setOpenPopup] = useState(false);

  const filter = useAppSelector((s: RootState) => s.report.params);
  const pagination = useAppSelector((s: RootState) => s.report.pagination);
  const loading = useAppSelector((s: RootState) => s.report.loading);
  const classes = useStyles();

  useEffect(() => {
    dispatch(reportActions.get(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      reportActions.setFilter({
        ...filter,
        pageIndex: page - 1,
      })
    );
  };

  const handleFilterChange = (newFilter: ListParam) => {
    dispatch(reportActions.setFilter(newFilter));
  };

  const handleCreate = () => {
    setOpenPopup(true);
  };

  const handleCreateSubmit = async (formValues: ReportCreateModel) => {
    try {
      setOpen(true);
      await reportApi.create(formValues);
      dispatch(reportActions.get(filter));
    } catch (error) {
    } finally {
      setOpen(false);
    }
  };

  const handleSync = async (report: Report) => {
    try {
      setOpen(true);
      await reportApi.sync({
        year: report.year,
        month: report.month,
        province_code: report.province_code,
      } as ReportSyncModel);
      dispatch(reportActions.get(filter));
    } catch (error) {
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box className={classes.root}>
        {loading && <LinearProgress className={classes.loading} />}

        <Box className={classes.titleContainer}>
          <Typography variant="h4">Quản lý dữ liệu tổng hợp</Typography>
        </Box>

        <Box mb={3}>
          <ReportFilter filter={filter} provinces={location} onChange={handleFilterChange} />
        </Box>
        <Box mb={3}>
          <ReportTable
            data={data}
            provinces={location}
            onCreate={handleCreate}
            onSync={handleSync}
          />
        </Box>
        <Box my={2} display="flex" justifyContent="center">
          <Pagination
            color="primary"
            count={Math.ceil(pagination.totalCount / pagination.pageSize)}
            page={pagination?.pageIndex + 1}
            onChange={handlePageChange}
          />
        </Box>
        <Popup title="Tổng hợp dữ liệu" openPopup={openPopup} onClose={() => setOpenPopup(false)}>
          <CreateReportForm onSubmit={handleCreateSubmit} initialValues={initialValues} />
        </Popup>
      </Box>
    </>
  );
}
