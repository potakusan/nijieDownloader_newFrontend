import React,{Component} from "react";
import { Layout, Typography } from "antd";
import {ImageList} from "../components/queue/imageList";
import storageWrapper from "../components/localStorage";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

class Index extends Component{

  constructor(){
    super();
    this.storage = new storageWrapper();
    this.state ={
      pinnedItems : this.storage.getAll()
    }
  }

  render(){
    return (
    <div className="commonPadding">
      <Content>
        <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
          <Typography>
            <Title level={2}>ピン留め</Title>
          </Typography>
          <ImageList data={this.state.pinnedItems}/>
        </div>
      </Content>
    </div>);
  }

}

export default Index
