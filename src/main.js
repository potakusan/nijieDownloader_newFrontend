import React, {Component} from "react";
import { BrowserRouter, Route, Link, withRouter, Switch } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Icon } from "antd";

import Index  from "./pages/index";
import Downloader from "./pages/download";
import Header from "./components/header";
const { Sider, Content } = Layout;
const { SubMenu } = Menu;

class MainContent extends Component {

  state = {
    collapsed: true,
  };

  constructor(){
    super();
  }

  click = (v) =>{
    if(v.key === "noOpen1" || v.key === "noOpen2"){
      return false;
    }
    this.props.history.push(`/${v.key}`);
  }

  render(){
    const currentPage = this.props.location.pathname.slice(1);
    return(
    <Layout style={{ minHeight: '100vh' }}>
      <Header downloadButton={currentPage === "downloader"}>
        Nijie
      </Header>
      <Layout>
        <Sider collapsed={this.state.collapsed}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.click} selectedKeys={[currentPage]}>
          <Menu.Item key="home">
            <Icon type="home" />
            <span>ホーム</span>
          </Menu.Item>
          <SubMenu
              key="help"
              title={
                <span>
                  <Icon type="question-circle" />
                  <span>ヘルプ</span>
                </span>
          }>
            <Menu.ItemGroup title="全般">
              <Menu.Item key="help/setup">セットアップ</Menu.Item>
              <Menu.Item key="help/use">使い方</Menu.Item>
              <Menu.Item key="help/log">更新履歴</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="downloader">
            <Icon type="cloud-download" />
            <span>ダウンローダー</span>
          </Menu.Item>
          <Menu.Item key="queue">
            <Icon type="pushpin" />
            <span>ピン留め</span>
          </Menu.Item>
          <Menu.Item key="savedItems">
            <Icon type="database" />
            <span>アルバム</span>
          </Menu.Item>
          <Menu.Item key="history">
            <Icon type="history" />
            <span>履歴</span>
          </Menu.Item>
          <Menu.Item key="settings">
            <Icon type="setting" />
            <span>設定</span>
          </Menu.Item>
          <SubMenu
              key="bulb"
              title={
                <span>
                  <Icon type="bulb" />
                  <span>関連サービス</span>
                </span>
          }>
            <Menu.ItemGroup title="関連サービス">
              <Menu.Item key="noOpen1"><a href="https://wank.work" target="_blank" rel="noreferrer noopener">Sikolog</a></Menu.Item>
              <Menu.Item key="noOpen2"><a href="https://poyashi.me" target="_blank" rel="noreferrer noopener">その他</a></Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: '15px 20px' }}>
          <div style={{ background: '#fff', minHeight: 280 }}>
            <Switch>
              <Route path="/home" exact={true} component={Index} />
              <Route path="/downloader" exact={true} component={Downloader} />
            </Switch>
          </div>
        </Content>
      </Layout>
      </Layout>
    </Layout>);
  }

}

export default withRouter(MainContent);
