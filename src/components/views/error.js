import React,{Component} from "react";
import { Alert } from 'antd';

export default class Loader extends Component{

  render(){
    const {message,additionalDescription} = this.props;
    return (
      <div style={{width:"100%"}}>
        <Alert
          message={message}
          description={additionalDescription}
          type="info"
          showIcon
        />
      </div>
    );
  }
}
