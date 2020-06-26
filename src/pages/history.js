import React,{Component} from "react";
import { Layout, Typography, Spin } from "antd";
import HistoryView from "../components/history";

const { Title } = Typography;
const { Content } = Layout;

class History extends Component{

  render(){
    return (
      <Spin className="commonPadding" spinning={false}>
        <Content style={{ padding: '15px 20px' }}>
          <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
            <Typography>
              <Title level={2}>ダウンロード履歴</Title>
            </Typography>
            <HistoryView/>
          </div>
        </Content>
      </Spin>
    );
  }

}

export default History
