import React, {Component} from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import { Layout } from "antd";

import Index  from "../pages/index";
import Downloader from "../pages/download";
import HelpIndex from "../pages/help/index";
import HelpSetup from "../pages/help/setup";
import HelpUse from "../pages/help/use";
import HelpLog from "../pages/help/log";
import HelpCustomPresets from "../pages/help/customPresets";
import Queue from "../pages/queue";
import History from "../pages/history";
import Settings from "../pages/settings";
import Header from "../components/views/header";
import WebSider from "../components/views/sider";

class MainContent extends Component {

  render(){
    const currentPage = this.props.location.pathname.slice(1);
    return(
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        Nijie Downloader
      </Header>
      <Layout style={{marginTop:"64px"}}>
        <WebSider history={this.props.history} currentPage={currentPage}/>
        <Layout>
          <Switch>
            <Route path="/home" exact={true} component={Index} />
            <Route path="/downloader" exact={true} component={Downloader} />
            <Route path="/help/" exact={true} component={HelpIndex} />
            <Route path="/help/setup" exact={true} component={HelpSetup} />
            <Route path="/help/use" exact={true} component={HelpUse} />
            <Route path="/help/customPresets" exact={true} component={HelpCustomPresets} />
            <Route path="/help/log" exact={true} component={HelpLog} />
            <Route path="/queue" exact={true} component={Queue} />
            <Route path="/history" exact={true} component={History} />
            <Route path="/settings" exact={true} component={Settings} />
          </Switch>
        </Layout>
      </Layout>
    </Layout>);
  }

}

export default withRouter(MainContent);
