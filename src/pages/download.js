import React,{Component} from "react";
import { Layout } from "antd";
import Loading from "../components/views/loading";
import Error from "../components/views/error";
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
    if(!this.state.postData || this.state.postData.length === 0){
      return (
        <Content style={{ padding: '15px 20px' }}>
          <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
            <Error
              message={"この機能を使用するにはPOSTメソッドを経由してアクセスしてください。"}
              additionalDescription={
                <span>
                  ブックマークレットを介してアクセスしてください。<br/>
                  <a href="#">ここをクリック</a>してキューされているデータを呼び出します。
                </span>
            }/>
        </div>
      </Content>
      );
    }
    return (
      <Content style={{ padding: '15px 20px' }}>
        <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
          <ImageList data={this.state.postData}/>
        </div>
      </Content>
    );
  }

}

export default Downloader
