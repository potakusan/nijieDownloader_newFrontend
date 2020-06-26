import React,{Component} from "react";
import { message, Row, Menu, Typography, Divider, Button, Dropdown, Spin, notification, Affix } from "antd";
import DropDownMenu from "../menu/index";
import Editor from "../common/editor";
import Image from "../common/image";
import {pinnedDB,debugLogs} from "../indexedDB";
import localStorage from "../localStorage";

const { Title } = Typography;

export default class Album extends Component{

  constructor(props){
    super(props);
    const _ls = new localStorage();
    this.state = {
      imageUrls : [],
      currentSelection : {
        "title":"",
        "illustrator":"",
        "id":""
      },
      editorVisible:false,
      storedItems : [],
      spinning : false,
      debugMode : _ls.item.debugMode
    }
    this.storage = new pinnedDB();
    this.debugLogs = new debugLogs();
    this.toggleDisable = this.toggleDisable.bind(this);
    this.togglePinned = this.togglePinned.bind(this);
    this.executeChanger = this.executeChanger.bind(this);
    this.toggleEditor = this.toggleEditor.bind(this);
    this.toggleAllSelection = this.toggleAllSelection.bind(this);
    this.allSelect = this.allSelect.bind(this);
    this.allRemove = this.allRemove.bind(this);
    this.reloadPinnedItems = this.reloadPinnedItems.bind(this);
    this.allPinned = this.allPinned.bind(this);
    this.allRemovePinned = this.allRemovePinned.bind(this);
    this.toggleAllPinnedStatus = this.toggleAllPinnedStatus.bind(this);
    this.criticalMes = (
      <span>
      An error occured while processing your request.<br/>
      Please check the detailed error message shown below.<br/>
      </span>
    );
  }

  async componentDidMount(){
    this.setState({
      storedItems : await this.storage.getItem(this.props.id),
      imageUrls:this.urlOnly()
    });
  }

  inArray =(needle)=>{
    const {disabled} = this.props;
    if(!disabled){
      return false;
    }
    return disabled.indexOf(needle) >= 0;
  }

  urlOnly(){
    const {album} = this.props;
    let returnArray = [];
    for(let j=0; j < album.length; ++j){
      returnArray.push(album[j]["url"]);
    }
    return returnArray;
  }

  // Disabled

  exec = (i) =>{
    const {id,disabled} = this.props;
    const filter = ()=>{
      const newState = disabled.filter(piece => piece !== i);
      return newState;
    }
    if(this.inArray(i)){
      return filter();
    }else{
      let newState = disabled ? disabled : [];
      newState.push(i);
      return newState;
    }
  }

  allSelect(){
    this.props.editDisabled(0,null,this.props.id);
    if(this.state.debugMode){
      this.debugLogs.setItem("Selected all items.");
    }
  }

  allRemove(){
    let newState = [];
    for(let i =0; i < this.props.album.length; ++i){
      newState.push(i+1);
    }
    this.props.editDisabled(1,newState,this.props.id);
    if(this.state.debugMode){
      this.debugLogs.setItem("Unselected all items.");
    }
  }

  toggleAllSelection(){
    let newState = [];
    const {album,id,disabled} = this.props;
    for(let i =0; i < album.length; ++i){
      newState.push(i+1);
    }
    newState = newState.filter((item)=>{
      if(!disabled){return true;}
      return disabled.indexOf(item) === -1
    });
    this.props.editDisabled(1,newState,id);
    if(this.state.debugMode){
      this.debugLogs.setItem("Toggled the selection states of all items in the same album.");
    }
  }

  toggleDisable(e){
    if(e.shiftKey){
      this.toggleAllSelection();
      return;
    }
    let {disabled} = this.state;
    const num = Number(e.currentTarget.getAttribute("data-num"));
    let newState = this.exec(num);
    this.props.editDisabled(1,newState,this.props.id);
    if(this.state.debugMode){
      this.debugLogs.setItem("Toggled the selection state of the item.");
    }
  }

  // Pinned

  pusher(array,item,date = new Date().toString()){
    array.push({
      id : this.props.id,
      title : item["title"],
      illustrator : item["illustrator"],
      url : item["url"],
      current : item["current"],
      pageSum : item["pageSum"],
      cnt : item["cnt"],
      updatedAt : date
    });
    return array;
  }

  async allPinned(){
    const album = this.props.album;
    const {title,id} = album[0];
    try{
      this.toggleSpinner();
      const albumLen = album.length;
      const date = new Date().toString();
      let items = [];
      await this.storage.resetItems(id);
      for(let i = 0;i < albumLen; ++i){
        items = this.pusher(items,album[i]);
      }
      this.storage.setMultipleItem(items);
      message.success(`「${title}」を一括ピン留めしました。`);
      if(this.state.debugMode){
        this.debugLogs.setItem(`Pinned all items in ${title}.`);
      }
      this.reloadPinnedItems();
    }catch(e){
      if(this.state.debugMode){
        this.debugLogs.setItem(`FAILED : Pin all items in ${title} / ${e.message ? e.message : e}.`,false);
      }
      return this.showWarning((
        <p>
          {this.criticalMes}
          <b>{e.message ? e.message : e}</b>
        </p>),0,1
      );
    }
  }

  async allRemovePinned(){
    const album = this.props.album;
    const {title,id} = album[0];
    try{
      this.toggleSpinner();
      message.success(`「${title}」のピン留めを一括解除しました。`);
      await this.storage.resetItems(id);
      this.reloadPinnedItems();
      if(this.state.debugMode){
        this.debugLogs.setItem(`Unpinned all items in ${title}.`);
      }
    }catch(e){
      if(this.state.debugMode){
        this.debugLogs.setItem(`FAILED : Unpin all items in ${title} / ${e.message ? e.message : e}.`,false);
      }
      return this.showWarning((
        <p>
          {this.criticalMes}
          <b>{e.message ? e.message : e}</b>
        </p>),0,1
      );
    }
  }

  async togglePinned(e){
    const num = e.currentTarget.getAttribute("data-num");
    const item = this.props.album[num-1];
    const title = item.pageSum > 1 ? `${item.title} (${item.current} / ${item.pageSum})` : item.title;
    const itemId = item.id;
    const itemNum = item.current;
    try{
      if(e.shiftKey){
        this.toggleAllPinnedStatus();
        return;
      }
      this.toggleSpinner();
      const duplication = await this.storage.checkDuplication(itemId,itemNum);
      if(duplication.length > 0){
        message.success(`「${title}」のピン留めを解除しました。`);
        await this.storage.removeItem(itemId,itemNum);
      }else{
        message.success(`「${title}」をピン留めしました。`);
        await this.storage.setItem(item);
      }
      if(this.state.debugMode){
        this.debugLogs.setItem(`toggled the pinned state of item named ${title}.`);
      }
      this.reloadPinnedItems();
    }catch(e){
      if(this.state.debugMode){
        this.debugLogs.setItem(`FAILED : toggle the pinned state of item named ${title} / ${e.message ? e.message : e}.`,false);
      }
      return this.showWarning((
        <p>
          {this.criticalMes}
          <b>{e.message ? e.message : e}</b>
        </p>),0,1
      );
    }
  }

  async toggleAllPinnedStatus(){
    this.toggleSpinner();
    const {id, album} = this.props;
    const {title} = album[0];
    const current = this.state.storedItems;
    const albumLen = album.length;
    let items = [];
    this.storage.resetItems(id);
    for(let i = 0;i < albumLen; ++i){
      if(current.some(v=>v.current === album[i]["current"])){
        continue;
      }
      items = this.pusher(items,album[i]);
    }
    this.storage.setMultipleItem(items);
    message.success(`「${title}」のピン留め状態を一括反転しました。`);
    if(this.state.debugMode){
      this.debugLogs.setItem(`toggled the pinned state of all items in ${title}.`);
    }
    this.reloadPinnedItems();
  }

  async reloadPinnedItems(){
    this.setState({
      storedItems : await this.storage.getItem(this.props.album[0]["id"]),
      spinning : false
    });
  }

  async executeChanger(){
    const {title,illustrator,id} = this.state.currentSelection;
    return await this.props.executeChanger(title,illustrator,id);
  }

  toggleEditor(e){
    const item = this.props.album[0];
    this.setState({
      editorVisible: !this.state.editorVisible,
      currentSelection:{
        "title":item["title"],
        "illustrator":item["illustrator"],
        "id":item["id"]
      }
    });
  };

  handleChangeTitle = (e)=>{
    let newSelection = this.state.currentSelection;
    newSelection.title = e.target.value;
    this.setState({currentSelection:newSelection});
  }

  handleChangeIllustrator = (e)=>{
    let newSelection = this.state.currentSelection;
    newSelection.illustrator = e.target.value;
    this.setState({currentSelection:newSelection});
  }

  toggleSpinner = ()=> this.setState({spinning:!this.state.spinning})

  showWarning(description,duration = 3,type = 0){
    let mes = {
      message : "Exception Error Occured!",
      description: description,
      duration: duration,
    };
    switch(type){
      case 0: return notification.error(mes);
      case 1: return notification.warning(mes);
    }
  }

  render(){
    const {album, showType} = this.props;
    let {title,illustrator,id} = this.props.album[0];
    const content = () => (
      album.sort((a,b)=>{
        return a.current > b.current ? 1 : -1;
      }).map((item,i)=>{
        return <Image key={`${title}-${i}`} item={item} displaySort={this.props.displaySort}
          openLink={this.openLink} inArray={this.inArray} imageUrls={this.state.imageUrls}
          pinnedStatus={this.state.storedItems.some((elm)=>{
            return elm.current === item.current
          })}
          togglePinned={this.togglePinned} toggleDisable={this.toggleDisable}/>
      })
    )

    if(!showType){
      return content();
    }

    return (
      <div ref={dom => {
          this.container = dom;
        }}>
      <Spin spinning={this.state.spinning} tip="変更を保存しています">
        <Affix target={()=> this.container}>
          <Title level={4}>
            <DropDownMenu
              id={id}
              allSelect={this.allSelect} allRemove={this.allRemove}
              toggleAllSelection={this.toggleAllSelection} toggleEditor={this.toggleEditor}
              allPinned={this.allPinned} allRemovePinned={this.allRemovePinned}
              toggleAllPinnedStatus={this.toggleAllPinnedStatus}>
              <Button type="primary" icon="menu" type="dashed" className="grayButton"></Button>
            </DropDownMenu>
            &nbsp;
            {title}&nbsp;<span className="smallText">{illustrator}</span>
          </Title>
        </Affix>
        <Row gutter={16}>
          {content()}
        </Row>
        <Editor visible={this.state.editorVisible} toggleEditor={this.toggleEditor}
          currentSelection={this.state.currentSelection}
          handleChangeTitle={this.handleChangeTitle} handleChangeIllustrator={this.handleChangeIllustrator}
          executeChanger={this.executeChanger}/>
        <Divider />
      </Spin>
    </div>
    )
  }
}
