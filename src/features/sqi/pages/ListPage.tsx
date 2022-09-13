import { Box, LinearProgress, Pagination, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { sqiApi } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { FromToParam, ListParam, SurveyPayload, SurveyStatistic } from 'models';
import * as React from 'react';
import { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { SQiStatistic } from '../components/SQiStatistic';
import { SurveyFilter } from '../components/SurveyFilter';
import { SurveyTable } from '../components/SurveyTable';
import { sqiActions } from '../sqiSlice';

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
    width: '900%',
  },
}));

export function ListPage() {
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const data = useAppSelector((s: RootState) => s.sqi.data);
  const statistic = useAppSelector((s: RootState) => s.sqi.statistic);

  const pagination = useAppSelector((s: RootState) => s.sqi.pagination);
  const dataFilter = useAppSelector((s: RootState) => s.sqi.dataParams);
  const loading = useAppSelector((s: RootState) => s.sqi.loading);
  const classes = useStyles();

  useEffect(() => {
    dispatch(sqiActions.get(dataFilter));
  }, [dispatch, dataFilter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      sqiActions.setFilter({
        ...dataFilter,
        pageIndex: page - 1,
      })
    );
  };

  const handleDelete = async (survey: SurveyPayload) => {
    try {
      await sqiApi.delete(survey?.id || '');
      const newFilter = { ...dataFilter };
      dispatch(sqiActions.setFilter(newFilter));
    } catch (error) {
      console.log('Failed to fetch student', error);
    }
  };

  const handleFilterChange = (newFilter: ListParam) => {
    console.log(newFilter);
    dispatch(sqiActions.setFilter(newFilter));
  };

  const handleExportExcel = async () => {
    const result = await sqiApi.export(dataFilter as FromToParam);
    const url = window.URL.createObjectURL(result);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `survey.xlsx`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleContainer}>
        <Typography variant="h4">Quản lý danh sách khảo sát</Typography>
      </Box>

      <Box mb={3}>
        <SurveyFilter filter={dataFilter as ListParam} onChange={handleFilterChange} />
      </Box>
      <Box mb={3}>
        <SQiStatistic statistic={statistic as SurveyStatistic[]} />
      </Box>

      <SurveyTable data={data} onRemove={handleDelete} onExportExcel={handleExportExcel} />

      <Box my={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination.totalCount / pagination.pageSize)}
          page={pagination?.pageIndex + 1}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
