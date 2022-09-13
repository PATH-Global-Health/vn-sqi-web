import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { ListPage } from './pages/ListPage';

export default function ReportFeature() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.path} exact>
        <ListPage />
      </Route>
    </Switch>
  );
}
