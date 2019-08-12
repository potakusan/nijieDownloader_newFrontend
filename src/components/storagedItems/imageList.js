import React,{Component} from "react";
import { Layout, Button, Dropdown, Menu, Typography, Row, message } from "antd";
import Image from "../common/image";
import DropDownMenu from "../menu/index";
import {inArray} from "../common/functions";

const { Title } = Typography;

export class ImageList extends Component{

  constructor(props){
    super(props);
    const {data} = this.props;
    let items = [] ,urls = [], title,illustrator,len;
    Object.keys(data).map((eachObj,i)=>{
      urls.push(data[eachObj]["url"]);
      items.push(data[eachObj]);
      len++;
      if(i === 0){
        title = data[eachObj]["title"];
        illustrator = data[eachObj]["illustrator"];
      }
    });
    this.state = {
      urls : urls,
      willRemove : [],
      title : title,
      illustrator : illustrator,
      editorVisible:false,
    }
    this.togglePinned = this.togglePinned.bind(this);
    this.allPinned = this.allPinned.bind(this);
    this.allRemovePinned = this.allRemovePinned.bind(this);
    this.toggleAllPinnedStatus = this.toggleAllPinnedStatus.bind(this);
    this.reloadPinnedItems = this.reloadPinnedItems.bind(this);
    this.toggleEditor = this.toggleEditor.bind(this);
    this.judgeIsDevised = this.judgeIsDevised.bind(this);
  }

  inArray =(needle)=>{
    return this.state.willRemove.indexOf(needle) >= 0;
  }

  judgeIsDevised(newState){
    this.props.isRevised(newState,this.props.id);
  }

  allPinned(){
    const album = this.props.album;
    const {title,id} = album[0];
    const albumLen = album.length;
    message.info(`「${title}」を一括ピン留めしました。`);
    this.storage.resetItems(id);
    for(let i = 0;i < albumLen; ++i){
      this.storage.setItem(album[i],id,album[i]["current"]);
    }
    this.storage.apply();
  }

  allRemovePinned(){
    const album = this.props.album;
    const {title,id} = album[0];
    message.info(`「${title}」のピン留めを一括解除しました。`);
    this.storage.resetItems(id);
    this.storage.apply();
  }

  togglePinned(e){
    const num = Number(e.currentTarget.getAttribute("data-num"));
    const item = this.props.data[num];
    const title = item.pageSum > 1 ? `${item.title} (${item.current} / ${item.pageSum})` : item.title;
    const itemId = item.id;
    let newState = this.state.willRemove;
    if(!this.inArray(num)){
      message.info(`「${title}」のピン留めを解除しました。`);
      newState.push(num)
      this.setState({willRemove:newState});
    }else{
      message.info(`「${title}」をピン留めしました。`);
      newState = newState.filter(v=>v !== num);
      this.setState({willRemove:newState});
    }
    this.judgeIsDevised(newState);
  }

  toggleAllPinnedStatus(){
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
  }

  reloadPinnedItems(){
    this.props.reload();
  }

  render(){
    const {data,id} = this.props;
    const {urls,willRemove,title,illustrator,imageSum} = this.state;
    return (
      <div>
        <Title level={4}>
          <DropDownMenu
            id={id}
            disableStatusButtons={true} toggleEditor={this.toggleEditor}
            allPinned={this.allPinned} allRemovePinned={this.allRemovePinned}
            toggleAllPinnedStatus={this.toggleAllPinnedStatus}>
            <Button type="primary" icon="menu" type="dashed" className="grayButton"></Button>
          </DropDownMenu>
          &nbsp;
          {title}&nbsp;<span className="smallText">{illustrator}</span>
        </Title>
        <Row gutter={16}>
          {Object.keys(data).map((item,i)=>{
            return <Image key={`${title}-${i}`} item={data[item]} displaySort={this.props.displaySort}
              pinnedStatus={!this.inArray(data[item]["current"])} imageUrls={urls}
              openLink={this.openLink} inArray={null} disableButtonIsDisabled={true}
              togglePinned={this.togglePinned}/>}
          )}
        </Row>
      </div>
    );

  }
}
