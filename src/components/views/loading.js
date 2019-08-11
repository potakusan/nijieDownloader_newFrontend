import React,{Component} from "react";
import { Spin } from "antd";

export default class Loader extends Component{

  render(){
    return (
      <div style={{width:"100%",textAlign:"center"}}>
        <Spin tip="Now loading, please wait for a while" size="large" />
      </div>
    );
  }
}
