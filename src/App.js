import React, { Suspense } from 'react';
import { HashRouter, BrowserRouter } from "react-router-dom";
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux';
import configureStore from './store/index';
import { Switch } from 'react-router-dom';
import routes from './routes/index';
import { RouteWithSubRoutes, pleacherCenterComponent } from './util'
import { Spin } from 'antd';

const Loading = pleacherCenterComponent(Spin);

const store = configureStore();
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
        <Suspense fallback={<Loading/>}>
          <Switch>
            {
              routes && routes.map((route, index) => (
                <RouteWithSubRoutes key={index} {...route} />
              ))
            }
          </Switch>
          </Suspense>
        </HashRouter>
      </Provider>
    )
  }
}

export default hot(module)(App)