import React,{Component} from "react";
import { Typography, Divider } from "antd";

const { Title, Paragraph } = Typography;

class Index extends Component{

  constructor(){
    super();
  }

  render(){
    return (
    <div>
      <Typography>
        <Title level={2}>Nijie Downloaderへようこそ</Title>
        <Paragraph>
          Nijie Downloaderは、エロ画像投稿SNS「ニジエ」から、お好みのエロ画像をローカルに保存するお手伝いをしたり、好きな画像のブックマーク管理を効率的に行うサービスです。<br/>
          Version: 2.0.0 / Fork me on GitHub
          ( <a href="https://github.com/potakusan/nijieDL-new" target="_blank" rel="noopener noreferrer">Bookmarklet(TypeScript)</a> and
          <a href="https://github.com/potakusan/nijieDL-new" target="_blank" rel="noopener noreferrer">Frontend(React/Nodejs)</a> )
        </Paragraph>
      </Typography>
    </div>);
  }

}

export default Index
