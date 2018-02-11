import React, {Component} from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import { getRouterData } from './config/router.config'

const isLoginFn = () => {
  if (window.localStorage.getItem('user')) {
    return true
  } else {
    return false
  }
}

const Authenticate = (BaseLayout) => {
  return class extends Component {
    constructor (props) {
      super(props)
      this.state = {
        isLogin: true
      }
    }

    componentDidMount () {
      this.setState({
        isLogin: isLoginFn()
      })
    }

    render () {
      if (this.state.isLogin) {
        return (<BaseLayout {...this.props} />)
      } else {
        return (<Redirect to='/user' />)
      }
    }
  }
}

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const BaseLayout = routerData['/'].component
  const UserLayout = routerData['/user'].component
  const AuthenticateComponent = Authenticate(BaseLayout)
  return (
    <Router history={history}>
      <Switch>
        <Route path="/user" component={UserLayout} />
        <Route path="/" component={AuthenticateComponent} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
