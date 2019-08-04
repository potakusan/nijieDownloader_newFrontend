import React,{Component} from "react";
import { Layout, Typography } from "antd";
import HelpBreadcrumb from "./breadcrumb";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

class Setup extends Component{

  render(){
    return (
    <div className="commonPadding">
      <HelpBreadcrumb>
        <span>カスタム書式</span>
      </HelpBreadcrumb>
      <Content>
        <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
          <Typography>
            <Title level={2}>カスタム書式</Title>
            <Paragraph>
              <p></p>
            </Paragraph>
          </Typography>
        </div>
      </Content>
    </div>);
  }

}

export default Setup
