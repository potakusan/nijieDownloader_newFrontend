import React,{Component} from "react";
import { Layout, Button, Dropdown, Menu } from 'antd';
import Album from "./album";

const { Footer } = Layout;

export class ImageList extends Component{

  constructor(props){
    super(props);
  }

  render(){
    const {data} = this.props;
    return (
      <div>
        <div>
          {Object.keys(data).map((item,num)=>{
            return (null);
          })}
        </div>
      </div>
    );
  }
}
