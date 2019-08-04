import React,{Component} from "react";
import { Layout, Typography } from "antd";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

class Index extends Component{

  render(){
    return (
    <div className="commonPadding">
      <Content>
        <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
          <Typography>
            <Title level={2}>ダウンロード履歴</Title>
            <Paragraph>

            </Paragraph>
          </Typography>
        </div>
      </Content>
    </div>);
  }

}

export default Index
