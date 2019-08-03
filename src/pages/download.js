import React,{Component} from "react";
import Loading from "../components/loading";
import Error from "../components/error";

import {Image,ImageList} from "../components/imageList";

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
      postData = JSON.parse("[" + decodeURIComponent(postData.value).replace("q=","") + "]");
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
        <div>
          <Loading/>
        </div>
      )
    }
    if(!this.state.postData || this.state.postData.length === 0){
      return (
        <Error
          message={"この機能を使用するにはPOSTメソッドを経由してアクセスしてください。"}
          additionalDescription={
            <span>
              ブックマークレットを介してアクセスしてください。<br/>
              <a>ここをクリック</a>してキューされているデータを呼び出します。
            </span>
          }/>
      );
    }
    return (
    <div>
      <ImageList data={this.state.postData}/>
    </div>
    );
  }

}

export default Downloader
