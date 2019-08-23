import React,{Component} from "react";
import { Alert } from "antd";

export default class Error extends Component{

  render(){
    const {message,additionalDescription,type} = this.props;
    return (
      <div style={{width:"100%"}}>
        <Alert
          message={message}
          description={additionalDescription}
          type={type ? type : "info"}
          showIcon
        />
      </div>
    );
  }
}
