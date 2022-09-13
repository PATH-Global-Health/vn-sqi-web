import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PageNotFound, PrivateRoute } from 'components/Common';
import { AppLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import SurveyPage from 'features/sqi/pages/SurveyPage';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './i18n/i18n';

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/customer-survey/:app">
            <SurveyPage />
          </Route>
          <PrivateRoute path="">
            <AppLayout />
          </PrivateRoute>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </LocalizationProvider>
    </>
  );
}

export default App;
