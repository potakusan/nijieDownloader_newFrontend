import React,{Component} from "react";
import { message, Row, Menu, Typography, Divider, Button, Dropdown, Spin } from "antd";
import DropDownMenu from "../menu/index";
import Editor from "../common/editor";
import Image from "../common/image";
import {pinnedDB} from "../indexedDB";

const { Title } = Typography;

export default class Album extends Component{

  constructor(props){
    super(props);
    this.state = {
      imageUrls : [],
      currentSelection : {
        "title":"",
        "illustrator":"",
        "id":""
      },
      editorVisible:false,
      storedItems : [],
      spinning : false
    }
    this.storage = new pinnedDB();
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
  }

  allRemove(){
    let newState = [];
    for(let i =0; i < this.props.album.length; ++i){
      newState.push(i+1);
    }
    this.props.editDisabled(1,newState,this.props.id);
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
    this.toggleSpinner();
    const album = this.props.album;
    const {title,id} = album[0];
    const albumLen = album.length;
    const date = new Date().toString();
    let items = [];
    await this.storage.resetItems(id);
    for(let i = 0;i < albumLen; ++i){
      items = this.pusher(items,album[i]);
    }
    this.storage.setMultipleItem(items);
    message.info(`「${title}」を一括ピン留めしました。`);
    this.reloadPinnedItems();
  }

  async allRemovePinned(){
    this.toggleSpinner();
    const album = this.props.album;
    const {title,id} = album[0];
    message.info(`「${title}」のピン留めを一括解除しました。`);
    await this.storage.resetItems(id);
    this.reloadPinnedItems();
  }

  async togglePinned(e){
    if(e.shiftKey){
      this.toggleAllPinnedStatus();
      return;
    }
    this.toggleSpinner();
    const num = e.currentTarget.getAttribute("data-num");
    const item = this.props.album[num-1];
    const title = item.pageSum > 1 ? `${item.title} (${item.current} / ${item.pageSum})` : item.title;
    const itemId = item.id;
    const itemNum = item.current;
    const duplication = await this.storage.checkDuplication(itemId,itemNum);
    if(duplication.length > 0){
      message.info(`「${title}」のピン留めを解除しました。`);
      await this.storage.removeItem(itemId,itemNum);
    }else{
      message.info(`「${title}」をピン留めしました。`);
      await this.storage.setItem(item);
    }
    this.reloadPinnedItems();
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
    message.info(`「${title}」のピン留め状態を一括反転しました。`);
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

  render(){
    const {album} = this.props;
    let {title,illustrator,id} = this.props.album[0];
    return (
      <Spin spinning={this.state.spinning} tip="変更を保存しています">
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
        <Row gutter={16}>
          {album.sort((a,b)=>{
            return a.current > b.current ? 1 : -1;
          }).map((item,i)=>{
            return <Image key={`${title}-${i}`} item={item} displaySort={this.props.displaySort}
              openLink={this.openLink} inArray={this.inArray} imageUrls={this.state.imageUrls}
              pinnedStatus={this.state.storedItems.some((elm)=>{
                return elm.current === item.current
              })}
              togglePinned={this.togglePinned} toggleDisable={this.toggleDisable}/>}
          )}
        </Row>
        <Editor visible={this.state.editorVisible} toggleEditor={this.toggleEditor}
          currentSelection={this.state.currentSelection}
          handleChangeTitle={this.handleChangeTitle} handleChangeIllustrator={this.handleChangeIllustrator}
          executeChanger={this.executeChanger}/>
        <Divider />
      </Spin>
    )
  }
}
