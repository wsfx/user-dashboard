import React from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import Example from '../components/Example'
import dynamic from 'dva/dynamic';
import {getRoutes} from '../utils/utils'

const Ab = function () {
  return (
    <div>userYEM</div>
  )
}
export default ({match, routerData}) => {
  const routeData = getRoutes(match.path, routerData)
  return (
    <div>
      内容
      {/* <Switch>
        <Redirect exact from="/user" to="/user/login" />
      </Switch> */}
      <Switch>
        {routeData.map(item => <Route path={item.path} exact={true} key={item.path} component={item.component} />)}
      </Switch>
    </div>
  )
}