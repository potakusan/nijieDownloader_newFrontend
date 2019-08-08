import React,{Component} from "react";
import { message, Row, Menu, Typography, Divider, Button, Dropdown } from 'antd';
import DropDownMenu from "../menu/index";
import Editor from "../common/editor";
import Image from "../common/image";
import storageWrapper from "../localStorage/index";

const { Title } = Typography;

export default class Album extends Component{

  constructor(props){
    super(props);
    this.storage = new storageWrapper();
    this.state = {
      disabled : [],
      imageUrls : [],
      currentSelection : {
        "title":"",
        "illustrator":"",
        "id":""
      },
      editorVisible:false,
      storedItems : this.storage.getItem(this.props.album[0]["id"])
    }
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

  componentDidMount(){
    this.setState({imageUrls:this.urlOnly()});
  }

  inArray =(needle)=>{
    return this.state.disabled.indexOf(needle) >= 0;
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
    const filter = ()=>{
      const disabled = this.state.disabled.filter(piece => piece !== i);
      return disabled;
    }
    if(this.inArray(i)){
      return filter();
    }else{
      let disabled = this.state.disabled;
      disabled.push(i)
      return disabled;
    }
  }

  allSelect(){
    return this.setState({disabled:[]});
  }

  allRemove(){
    let newState = [];
    for(let i =0; i < this.props.album.length; ++i){
      newState.push(i+1);
    }
    return this.setState({disabled:newState});
  }

  toggleAllSelection(){
    let newState = [];
    const current = this.state.disabled;
    for(let i =0; i < this.props.album.length; ++i){
      newState.push(i+1);
    }
    newState = newState.filter((item)=>{
      return current.indexOf(item) === -1
    });
    return this.setState({disabled:newState});
  }

  toggleDisable(e){
    let {disabled} = this.state;
    const num = Number(e.currentTarget.getAttribute("data-num"));
    disabled = this.exec(num);
    return this.setState({
      disabled:disabled
    });
  }

  // Pinned

  allPinned(){
    this.reloadPinnedItems();
    const album = this.props.album;
    const {title,id} = album[0];
    const albumLen = album.length;
    message.info(`「${title}」を一括ピン留めしました。`);
    this.storage.resetItems(id);
    for(let i = 0;i < albumLen; ++i){
      this.storage.setItem(album[i],id,album[i]["current"]);
    }
    this.storage.apply();
    this.reloadPinnedItems();
  }

  allRemovePinned(){
    this.reloadPinnedItems();
    const album = this.props.album;
    const {title,id} = album[0];
    message.info(`「${title}」のピン留めを一括解除しました。`);
    this.storage.resetItems(id);
    this.storage.apply();
    this.reloadPinnedItems();
  }

  togglePinned(e){
    this.reloadPinnedItems();
    const num = e.currentTarget.getAttribute("data-num");
    const item = this.props.album[num-1];
    const title = item.pageSum > 1 ? `${item.title} (${item.current} / ${item.pageSum})` : item.title;
    const itemId = item.id;
    const itemNum = item.current;
    if(this.storage.checkDuplication(itemId,itemNum)){
      message.info(`「${title}」のピン留めを解除しました。`);
      this.storage.removeItem(item,itemId,itemNum);
    }else{
      message.info(`「${title}」をピン留めしました。`);
      this.storage.setItem(item,itemId,itemNum);
    }
    this.storage.apply();
    this.reloadPinnedItems();
  }

  toggleAllPinnedStatus(){
    this.reloadPinnedItems();
    const album = this.props.album;
    const {title,id} = album[0];
    const current = this.storage.getItem(id);
    const albumLen = album.length;
    this.storage.resetItems(id);
    for(let i = 0;i < albumLen; ++i){
      if(current[i+1]){
        continue;
      }
      this.storage.setItem(album[i],id,album[i]["current"]);
    }
    message.info(`「${title}」のピン留め状態を一括反転しました。`);
    this.storage.apply();
    this.reloadPinnedItems();
  }

  reloadPinnedItems(){
    this.storage.reload();
    this.setState({
      storedItems : this.storage.getItem(this.props.album[0]["id"])
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

  render(){
    const {album} = this.props;
    const {title,illustrator,id} = this.props.album[0];
    return (
      <div>
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
          {album.map((item,i)=>{
            return <Image key={`${title}-${i}`} item={item} displaySort={this.props.displaySort}
              openLink={this.openLink} inArray={this.inArray} imageUrls={this.state.imageUrls}
              pinnedStatus={this.state.storedItems ? this.state.storedItems[i+1] : null}
              togglePinned={this.togglePinned} toggleDisable={this.toggleDisable}/>}
          )}
        </Row>
        <Editor visible={this.state.editorVisible} toggleEditor={this.toggleEditor}
          currentSelection={this.state.currentSelection}
          handleChangeTitle={this.handleChangeTitle} handleChangeIllustrator={this.handleChangeIllustrator}
          executeChanger={this.executeChanger}/>
        <Divider />
      </div>
    )
  }
}
