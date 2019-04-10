import React, { Suspense } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Spin } from 'antd';
import { RouteWithSubRoutes, pleacherCenterComponent } from '../../util';
import { Link } from 'react-router-dom'
import style from './index.less';

const { Header, Sider, Content } = Layout;
const Loading = pleacherCenterComponent(Spin);
export default class Main extends React.Component {
  state = {
    collapsed: false,
  };
  componentDidMount() {

  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  onMenuClick = ({ key }) => {
    this.props.history.push(key)
  }
  render() {
    const { routes, location } = this.props
    const menus = [
      {
        icon: 'desktop',
        title: '首页',
        path: '/'
      },
      {
        icon: 'user',
        title: '用户管理',
        path: '/account'
      },
      {
        icon: 'file-text',
        title: '文章管理',
        path: '/article'
      },
      {
        icon: 'tags',
        title: '标签管理',
        path: '/tags'
      }
    ]
    return (
      <Layout style={{ height: '100%' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className={style.logo}>Blog Admin</div>
          <Menu theme="dark" mode="inline" onClick={this.onMenuClick}  defaultSelectedKeys={[`${location.pathname}`]} inlineCollapsed={this.state.collapsed}>
            {
              menus.map(item => {
                return (
                  <Menu.Item key={item.path}>
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className={style.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
           <Suspense fallback={<Loading/>}>
            {
              routes && routes.map((route, index) => (
                <RouteWithSubRoutes key={index} {...route} />
              ))
            }
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    )
  }
}