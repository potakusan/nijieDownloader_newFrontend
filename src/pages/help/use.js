import React,{Component} from "react";
import { Layout, Typography } from "antd";
import HelpBreadcrumb from "./breadcrumb";

const { Title } = Typography;
const { Content } = Layout;

class Use extends Component{

  render(){
    return (
    <div className="commonPadding">
      <HelpBreadcrumb>
        <span>使い方</span>
      </HelpBreadcrumb>
      <Content>
        <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
          <Typography>
            <Title level={2}>使い方</Title>
          </Typography>
        </div>
      </Content>
    </div>);
  }

}

export default Use
