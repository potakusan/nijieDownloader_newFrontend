import React,{Component} from "react";
import { Layout, Typography,Spin } from "antd";
const { Title, Paragraph } = Typography;
const { Content } = Layout;

class Index extends Component{

  render(){
    return (
    <Spin className="commonPadding" spinning={false}>
      <Content style={{ padding: '15px 20px' }}>
        <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
          <Typography>
            <Title level={2}>404 Page Not Found</Title>
            <Paragraph>
              <p>
                The page you requested could not be found on this server.
              </p>
            </Paragraph>
          </Typography>
        </div>
      </Content>
    </Spin>);
  }

}

export default Index
