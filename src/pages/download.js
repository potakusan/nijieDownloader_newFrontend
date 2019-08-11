import React,{Component} from "react";
import { Layout } from "antd";
import Loading from "../components/views/loading";
import {htmlEntities} from "../components/common/functions";

import {ImageList} from "../components/downloader/imageList";

const { Content } = Layout;

class Downloader extends Component{

  state = {
    loaded : false,
    postData : []
  }

  constructor(){
    super();
    this.initializer = this.initializer.bind(this);
  }

  initializer(){
    let postData = document.getElementById("temp");
    if(postData){
      postData = JSON.parse("[" + htmlEntities(decodeURIComponent(postData.value).replace("q=","")) + "]");
    }
    return this.setState({
      loaded: true,
      postData : postData
    });
  }

  componentDidMount(){
    this.initializer();
  }

  render(){
    if(!this.state.loaded){
      return (
        <Content style={{ padding: '15px 20px' }}>
          <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
            <Loading/>
          </div>
        </Content>
      )
    }
    return (
      <Content style={{ padding: '15px 20px' }}>
        <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
          <ImageList data={this.state.postData} hasNoItems={!this.state.postData || this.state.postData.length === 0}/>
        </div>
      </Content>
    );
  }

}

export default Downloader
