//路由嵌套
import { Route } from 'react-router-dom';
import React from 'react'
import './index.css';


export const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact || false}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export const pleacherCenterComponent = (TargetComponent) => {
  return class extends React.Component {
    render() {
      return (
        <div className="pleacherCenterComponent">
          <TargetComponent />
        </div>
      )
    }
  }
}

export const promiseBindDispatch = (dispacth) => (params) => {
  return new Promise((resolve,reject) => {
    dispacth({
      ...params,
      resolve,
      reject
    })
  })
}