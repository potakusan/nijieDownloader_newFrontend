import React, {Component} from "react";
import { Layout, Menu, Icon } from "antd";
const { Sider } = Layout;
const { SubMenu } = Menu;

export default class WebSider extends Component{

  state = {
    collapsed: false,
  };

  click = (v) =>{
    if(v.key === "noOpen1" || v.key === "noOpen2"){
      return false;
    }
    this.props.history.push(`/${v.key}`);
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render(){
    const {currentPage} = this.props;
    if(currentPage === "/" || currentPage === ""){
      this.props.history.replace(`/home`);
    }
    return (
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" onClick={this.click} selectedKeys={[currentPage]}>
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
              <Menu.Item key="help/">目次</Menu.Item>
              <Menu.Item key="help/setup">セットアップ</Menu.Item>
              <Menu.Item key="help/use">使い方</Menu.Item>
              <Menu.Item key="help/customPresets">カスタム書式設定</Menu.Item>
              <Menu.Item key="help/spec">利用推奨環境・規約</Menu.Item>
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
          <Menu.Item key="history">
            <Icon type="history" />
            <span>履歴</span>
          </Menu.Item>
          <Menu.Item key="settings">
            <Icon type="setting" />
            <span>設定・初期化</span>
          </Menu.Item>
          <SubMenu
            key="bulb"
            title={
              <span>
                <Icon type="bulb" />
                <span>関連サービス</span>
              </span>
          }>
            <Menu.ItemGroup title="Relations">
              <Menu.Item key="noOpen1"><a href="https://wank.work" target="_blank" rel="noreferrer noopener">Sikolog</a></Menu.Item>
              <Menu.Item key="noOpen2"><a href="https://poyashi.me" target="_blank" rel="noreferrer noopener">Others</a></Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}
