import React,{Component} from "react";
import { Layout, Button, Dropdown, Menu, Spin, message, Empty, Switch, Typography } from "antd";
import Album from "./album";
import {pinnedDB,historyItems} from "../indexedDB";
import Loading from "../views/loading";
import DownloadButton from "./buttons";
import NoImg from "./noImg";
const { Footer } = Layout;
const { Title } = Typography;

export class ImageList extends Component{

  constructor(props){
    super(props);
    this.state = {
      spinning : false,
      origin : this.props.data,
      imageSum : this.props.data.length,
      splitArray : {},
      disabled : {},
      loading: true,
      showType : true,
    }
    this.executeChanger = this.executeChanger.bind(this);
    this.editDisabled = this.editDisabled.bind(this);
    this.resetAllEdit = this.resetAllEdit.bind(this);
    this.replaceItemsWithPinned = this.replaceItemsWithPinned.bind(this);
    this.removeAllDownloadedItems = this.removeAllDownloadedItems.bind(this);
  }

  componentDidMount(){
    this.setState({
      splitArray : this.splitArray(),
      loading: false
    })
  }

  resetAllEdit(){
    this.setState({
      origin: this.props.data,
      splitArray : this.splitArray(),
      imageSum : this.props.data.length,
      disabled : {},
      loading: false,
    });
    this.succeed();
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
    });
    this.succeed();
  }

  async removeAllDownloadedItems(){
    this.toggleSpinning();
    const { splitArray } = this.state;
    const storage = new historyItems();
    const items = await storage.getAllItems();
    let disabled = {};
    Object.keys(splitArray).map(a=>{
      splitArray[a].map(b=>{
        items.some(c=>{
          if(c.url === b.url){
            if(!disabled[a]){ disabled[a] = []; }
            disabled[a].push(c.current);
          }
        })
      })
    });
    if(!disabled){
      return;
    }
    this.setState({
      disabled : disabled,
      spinning : false
    });
    this.succeed();
  }

  succeed = ()=> message.success("操作が完了しました。");

  toggleSpinning = ()=> this.setState({spinning:!this.state.spinning});

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
    const { origin, splitArray, disabled, loading, imageSum, spinning, showType } = this.state;
    if(loading){
      return (<Loading/>);
    }
    if(this.props.hasNoItems && origin.length === 0){
      return (<NoImg replaceItemsWithPinned={this.replaceItemsWithPinned}/>);
    }
    return (
      <Spin spinning={spinning}>
        <div>
          <Title level={4}>画像一覧</Title>
          <div style={{clear:"both"}} className={!showType ? "isSimpleDisplay" : "isDetailedDisplay"}>
            {origin.length === 0 && <Empty style={{marginTop:"20px"}} description={<span>ダウンロードできる画像はありません。</span>}/>}
            {Object.keys(splitArray).map((item,num)=>{
              return (
                <Album key={`${item}-${num}`} album={splitArray[item]} origin={this.state.origin} showType={showType}
                  toggleEditor={this.toggleEditor} id={item}
                  editDisabled={this.editDisabled} disabled={disabled[item]}
                  imageSum={this.state.imageSum} executeChanger={this.executeChanger}/>)
              })}
          </div>
          <DownloadButton splitArray={splitArray} disabled={disabled} imageSum={imageSum}
            resetAllEdit={this.resetAllEdit}
            replaceItemsWithPinned={this.replaceItemsWithPinned} removeAllDownloadedItems={this.removeAllDownloadedItems}/>
          <Footer style={
              { position: "fixed", zIndex: 1, width: "100%", bottom: 0, padding: "6px",
                 textAlign:"left", fontWeight:"bold", background:"#fff", borderTop:"1px solid #ccc" }}>
              {imageSum}枚選択しています
              <Switch style={{position:"absolute",right:"250px"}} checkedChildren="個別表示" unCheckedChildren="シンプル表示" onChange={
                ()=>this.setState({showType:!showType})
              } checked={showType}/>
          </Footer>
        </div>
      </Spin>
    );
  }
}
