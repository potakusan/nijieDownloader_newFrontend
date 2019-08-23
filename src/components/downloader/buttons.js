import React,{Component} from "react";
import { Layout, Button, Dropdown, Menu, notification } from "antd";
import downloader from "../common/downloader";
import showError from "../common/showError";
import ModalStatus from "./modal";

export default class DownloadButton extends Component{

  constructor(props){
    super(props);
    this.initialState = {
      downloading: false,
      showStatus : false,
      progress : 0,
      canCloseModal : false,
      currentItem:null,
      currentNum:0,
      speed : 0,
      size: 0,
      sum : 0,
    }
    this.state = Object.assign({},this.initialState);
    this.download = this.download.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
    this.cancelled = this.cancelled.bind(this);
  }

  closeModal = ()=>this.setState({showStatus:false,downloading:false,progress:0,currentItem:null,currentNum:0});
  cancel = ()=> {
    notification.info({
      key: "stopping",
      message : "キャンセルしています...",
      description : "進行中のダウンロードをキャンセルしています。"
    });
    this.setState({downloading:false});
  }

  toggleStatus(target){
    let newState = this.state;
    Object.keys(target).map(item=>{
      newState[item] = target[item];
    })
    this.setState(newState);
  }


  async download(){
    try{
      this.toggleStatus({"downloading":true,"showStatus":true,"canCloseModal":false});
      const {splitArray,disabled,imageSum} = this.props;
      const exec = new downloader(imageSum);
      const startTime = new Date().getTime();
      let downloadedImages = [];
      let currentProgress = 0,keys = [];
      const download = Object.keys(splitArray).map(item=>keys.push(item));
      for(let i = 0; i < keys.length; ++i){
        const c = splitArray[keys[i]];
        //最初のイラストのファイル名は必ず先頭に作者IDが来るっぽい（未検証）
        const illustratorId = c[0]["url"].match(".+/(.+?)\.[a-z]+([\?#;].*)?$")[1].match(/^.*?(?=_)/)[0];
        for(let j = 0, len = c.length; j < len; ++j){
          if(disabled && disabled[keys[i]] && disabled[keys[i]][j]){
            continue;
          }
          if(!this.state.downloading){
            //cancelled
            this.cancelled();
            return;
          }
          currentProgress++;
          const current = c[j];
          this.toggleStatus({"currentItem":current,"currentNum":currentProgress});
          const {error,reason,information} = await exec.convertFileName(c[j],illustratorId).fetch();
          const requiredTime = new Date().getTime() - startTime;
          if(error){
            showError(reason);
          }
          downloadedImages.push(current);
          const newSum = Number(this.state.sum) + Number(information.size);
          this.setState({
            progress : Math.round(currentProgress / imageSum * 100),
            size : information.size,
            sum : newSum,
            speed : newSum / (requiredTime / 1000),
          });
        }
      }
      await exec.downloadIt(downloadedImages,this.state.sum);
      this.setState({
        canCloseModal: true,
        progress: 100,
      });
    }catch(e){
      showError((
        <p>
          An error occured while processing your request.<br/>
          Please check the detailed error message shown below.<br/>
        <b>{e.message ? e.message : e}</b></p>),0,1);
      this.toggleStatus({"canCloseModal":true});
    }
  }

  cancelled(){
    notification.info({
      key: "stopping",
      message : "キャンセルしました",
      description : "進行中のダウンロードをキャンセルしました。",
      duration: 3
    });
    this.setState(this.initialState);
  }

  render(){
    const menu = (
      <Menu>
        <Menu.ItemGroup title="リセット">
          <Menu.Item key="0">
            <a
              href={null}
              onClick={this.props.resetAllEdit}
              >編集状態をリセット</a>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="ピン留め">
          <Menu.Item key="0">
            <a
              href={null}
              onClick={this.props.replaceItemsWithPinned}
              >ピン留めされたアイテムに置き換え</a>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="一括除外">
          <Menu.Item key="0">
            <a
              href={null}
              onClick={this.props.removeAllDownloadedItems}
              >ダウンロード済みアイテムを除外</a>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
    const {showStatus,progress,canCloseModal,currentItem,currentNum,information} = this.state;
    return (
      <div>
        <div style={{display:"block",position:"fixed",top:"11px",right:"13px",zIndex:"10"}}>
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <Button size="large" icon="menu" style={{marginRight:"15px"}}></Button>
          </Dropdown>
          <Button type="primary" size="large" icon="download" onClick={this.download}>
            Download
          </Button>
          {showStatus && <ModalStatus
            imageSum={this.props.imageSum} currentNum={currentNum} cancelButton={this.cancel} state={this.state}
            s={showStatus} p={progress} c={canCloseModal} closeModal={this.closeModal} currentItem={currentItem}/>}
        </div>
      </div>
    );
  }
}
