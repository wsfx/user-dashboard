import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link, Redirect, Switch, Route } from 'dva/router';
import MenuData from '../config/menu.config'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


export default ({routeData}) => {
  return (
    <Sider width={150} style={{ background: '#fff' }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {
          MenuData.map((item, index) => {
            if (item.children) {
              return (
                <SubMenu key={index} title={<span><Icon type="user" />{item.name}</span>}>
                  {item.children.map((item2, index2) => {
                    return (
                      <Menu.Item key={index+'-'+index2}>
                        <Link
                          to={'/'+item.path+'/'+item2.path}
                        >
                          {item2.name}
                        </Link>
                      </Menu.Item>
                    )
                  })}
                </SubMenu>
              )
            } else {
              return (
                <Menu.Item key={index}>
                  <Link
                    to={'/'+item.path}
                  >
                    <Icon type="user" />{item.name}
                  </Link>
                </Menu.Item>
              )
            }
          })
        }
        
      </Menu>
    </Sider>
  )
}