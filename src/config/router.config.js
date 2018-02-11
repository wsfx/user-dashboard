
import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import menuData from './menu.config';
const dynamicWrapper = (app, models, components) => {
  let routerDataCache = '';
  
  return dynamic({
    app,
    models: () => Array.from(models, (model) => 
      {
        return import(`../models/${model}.js`)
      }
    ),
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return components.then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache,
        });
      });
    },
  })
}
const getMenuData = (menuData, MenuJson = {}, path = '/') => {
  menuData.map((item) => {
    if (item.children) {
      getMenuData(item.children, MenuJson, path+item.path+'/')
    }
    MenuJson[path+item.path] = item
  })
  return MenuJson
}


export const getRouterData = (app) => {
  const routers = {
    '/': {
      component: dynamicWrapper(app, [], import('../layout/BaseLayout')),
    },
    '/index': {
      component: dynamicWrapper(app, [], import('../routes/IndexPage')),
    },
    '/food/list': {
      component: dynamicWrapper(app, [], import('../routes/IndexPage')),
    },
    '/order/waiting': {
      component: dynamicWrapper(app, ['example'], import('../components/Example')),
    },
    '/order/history': {
      component: dynamicWrapper(app, [], import('../components/Example')),
    },
    '/user': {
      component: dynamicWrapper(app, [], import('../layout/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, [], import('../routes/Login')),
    }
  }
  let menuDataJson = getMenuData(menuData)
  // Object.keys(menuDataJson).map(item => {
  //   if (routers[item]) {
  //     routers[item] = Object.assign(routers[item], menuDataJson[item])
  //   } else {
  //     routers[item] =  menuDataJson[item]
  //   }
  // })
  // console.log(menuDataJson)
  return routers;
}

export const GetMenuJson = getMenuData(menuData)