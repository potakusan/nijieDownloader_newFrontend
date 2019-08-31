import React,{Component} from "react";
import { Card, Layout, Typography } from "antd";
import HelpBreadcrumb from "./breadcrumb";

const { Title } = Typography;
const { Content } = Layout;

class Log extends Component{

  render(){
    return (
    <div className="commonPadding">
      <HelpBreadcrumb>
        <span>更新履歴</span>
      </HelpBreadcrumb>
      <Content>
        <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
          <Typography>
            <Title level={2}>更新履歴</Title>
            <Card type="inner" bordered={true} title="2019/08/25 v2.0.0">
              v2公開
            </Card>
          </Typography>
        </div>
      </Content>
    </div>);
  }

}

export default Log
