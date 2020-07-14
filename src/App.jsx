import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';

import history from 'modules/history';
import theme from 'modules/theme';

import Home from 'routes/Home';
import NotFound from 'routes/NotFound';

import GlobalStyles from 'controls/GlobalStyles';
import SystemAlerts from 'features/systemAlerts';

export class App extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <Helmet
            defer={false}
            htmlAttributes={{ lang: 'en-us' }}
            encodeSpecialCharacters={true}
            defaultTitle={'title'}
            titleTemplate={`%s | title`}
            titleAttributes={{ itemprop: 'name', lang: 'en-us' }}
          />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
          <SystemAlerts />
          <GlobalStyles />
        </ThemeProvider>
      </Router>
    );
  }
}

export default hot(App);
