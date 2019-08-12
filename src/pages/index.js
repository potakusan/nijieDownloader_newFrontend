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
            <Title level={2}>Nijie Downloaderへようこそ</Title>
            <Paragraph>
              Nijie Downloaderは、エロ画像投稿SNS「ニジエ」から、お好みのエロ画像をローカルに保存したり、好きな画像のブックマーク管理を補助するサービスです。<br/>
              Version: 2.0.0 / Fork me on GitHub
              ( <a href="https://github.com/potakusan/nijieDL-new" target="_blank" rel="noopener noreferrer">Bookmarklet(TypeScript)</a>&nbsp;and&nbsp;
              <a href="https://github.com/potakusan/nijieDownloader_newFrontend/tree/dev" target="_blank" rel="noopener noreferrer">Frontend(React/Nodejs)</a> )
            </Paragraph>
          </Typography>
        </div>
      </Content>
    </Spin>);
  }

}

export default Index
