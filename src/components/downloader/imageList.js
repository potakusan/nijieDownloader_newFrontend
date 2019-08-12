import React,{Component} from "react";
import { Layout, Button, Dropdown, Menu } from "antd";
import Album from "./album";
import {pinnedDB} from "../indexedDB";
import Error from "../views/error";
import Loading from "../views/loading";
import DownloadButton from "./buttons";
import NoImg from "./noImg";
const { Footer } = Layout;

export class ImageList extends Component{

  constructor(props){
    super(props);
    this.state = {
      origin : this.props.data,
      imageSum : this.props.data.length,
      splitArray : {},
      disabled : {},
      loading: true
    }
    this.executeChanger = this.executeChanger.bind(this);
    this.editDisabled = this.editDisabled.bind(this);
    this.replaceItemsWithPinned = this.replaceItemsWithPinned.bind(this);
    this.removeAllDownloadedItems = this.removeAllDownloadedItems.bind(this);
  }

  componentDidMount(){
    this.setState({
      splitArray : this.splitArray(),
      loading: false
    })
  }

  async replaceItemsWithPinned(){
    this.setState({loading:true});
    const storage = new pinnedDB();
    const t = await storage.getAll();
    const r = storage.groupByItemId(true);
    this.setState({
      origin: t,
      splitArray : r,
      imageSum : t.length,
      disabled : {},
      loading: false,
    })
  }

  async removeAllDownloadedItems(){
    
  }

  editDisabled(type = 0,newState,id){
    let {disabled} = this.state;
    delete disabled[id];
    if(type === 1){
      disabled[id] = newState;
    }

    let len = this.props.data.length;
    let disabledSum = 0;
    Object.keys(disabled).map(item=>{
      disabledSum += disabled[item].length;
    });

    this.setState({
      disabled: disabled,
      imageSum: len - disabledSum
    })
  }

  splitArray(){
    const {data} = this.props;
    return data.reduce((obj, v, i)=> {
      obj[v.id] = obj[v.id] || [];
      obj[v.id].push(v);
      return obj;
    }, {});
  }

  async executeChanger(newTitle,newIllustrator,id){
    return new Promise((resolve) => {
      let {splitArray} = this.state;
      let target = splitArray[id];
      for(let i =0; i < target.length; ++i){
        target[i]["title"] = newTitle;
        target[i]["illustrator"] = newIllustrator;
      }
      this.setState({splitArray:splitArray});
      resolve();
      return;
    });
  }

  render(){
    const { origin, splitArray, disabled, loading, imageSum } = this.state;
    if(loading){
      return (<Loading/>);
    }
    if(this.props.hasNoItems && origin.length === 0){
      return (<NoImg replaceItemsWithPinned={this.replaceItemsWithPinned}/>);
    }
    return (
      <div>
        <div>
          {Object.keys(splitArray).map((item,num)=>{
            return (
              <Album key={`${item}-${num}`} album={splitArray[item]} origin={this.state.origin}
                toggleEditor={this.toggleEditor} id={item}
                editDisabled={this.editDisabled} disabled={disabled[item]}
                imageSum={this.state.imageSum} executeChanger={this.executeChanger}/>)
          })}
          <DownloadButton splitArray={splitArray} disabled={disabled} imageSum={imageSum}
            replaceItemsWithPinned={this.replaceItemsWithPinned} removeAllDownloadedItems={this.removeAllDownloadedItems}/>
          <Footer style={
              { position: "fixed", zIndex: 1, width: "100%", bottom: 0, padding: "6px",
                 textAlign:"left", fontWeight:"bold", background:"#fff", borderTop:"1px solid #ccc" }}>
              {imageSum}枚選択しています
          </Footer>
        </div>
      </div>
    );
  }
}
