import React, {Component} from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';


import Example from '../components/Example'
import {getRoutes} from '../utils/utils'
import {GetMenuJson} from '../config/router.config'
import SlideMenu from '../components/SlideMenu'

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './BaseLayout.less'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const getRedirectData = () => {
  let MenuJson = Object.keys(GetMenuJson);
  let RedirectArr = Array.from(MenuJson, (key) => {
   
    if (key.substr(1).split('/').length <= 1) {
      return {
        from: key
      }
    }
  }).filter(item => {return item});

  RedirectArr.unshift({
    from: '/',
    to: RedirectArr[0].from
  })

  RedirectArr = Array.from(RedirectArr, (item) => {
    MenuJson.find((value) => {
      if (value.indexOf(item.from) >= 0) {
        if (value != item.from && !item.to) {
          item.to = value
        }
      }
    })
    return item
  })

  return RedirectArr;
}

export default class BaseLayout extends Component {
  render () {
    const {
      match,
      routerData
    } = this.props
    const redirectArr = getRedirectData();
    const routeData = getRoutes(match.path, routerData)
    return (
      <Layout>
        <Header className="header" style={{ background: '#fff', padding: 0 }}>
          <div className="logo">
            <img src="https://fuss10.elemecdn.com/0/14/ac5312aebbc978c824acc62128e0csvg.svg" />
          </div>
        </Header>
        <Layout>
          <Sider width={150} style={{ background: '#fff' }}>
            <SlideMenu routeData={routeData}/>
          </Sider>
          <Layout style={{ background: '#f5f5f5', padding: 0 }}>
            <Content style={{  padding: 24, margin: 0, minHeight: 280 }}>
              <Switch>
                {redirectArr.map((item, index) => {
                  if (item.to) {
                    return <Redirect exact key={index} from={item.from} to={item.to} />
                  }
                })}
              </Switch>
              <Switch>
                {routeData.map(item => <Route path={item.path} exact={true} key={item.path} component={item.component} />)}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}