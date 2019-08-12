import styles from "./../../theme/style.module.css";
import React,{Component} from "react";
import { Popover, Card, Col, Icon } from "antd";
import {imgToThumbnails} from "./functions";
import Lightbox from "./lightbox";

export default class Image extends Component{

  constructor(props){
    super(props);
    this.state = {
      index: 0,
      isOpen: false,
    }
  }

  openLightBox = ()=>this.setState({isOpen:true,index:this.props.item.current -1});
  closeLightbox = ()=> this.setState({isOpen:false});
  changeIndex = (index) => this.setState({index:index});

  render(){
    const {item,imageUrls,toggleDisable,togglePinned,inArray,pinnedStatus,disableButtonIsDisabled} = this.props;
    const {isOpen,index} = this.state;
    const isDisabled = this.props.inArray !== null ? inArray(item.current) : false;
    const title = item.pageSum > 1 ? `${item.title} (${item.current} / ${item.pageSum})` : item.title;
    let actions = [
      <Icon
        type={isDisabled ? "eye" : "eye-invisible"}
        data-num={item.current} style={isDisabled ? {"color":"#ff6000"} : null} onClick={toggleDisable} />,
      <Icon type="pushpin" className={pinnedStatus ? "standPin" : null} data-num={item.current} onClick={togglePinned} />,
    ];
    if(disableButtonIsDisabled === true){
      actions.shift();
    }
    if(!item.title){ return (null); }

    return <Col key={"col-" + item.cnt}
        data-id={item.id}
        data-illustrator={item.illustrator}
        data-title={item.title}
        data-url={item.url}
        data-disabled={isDisabled}
      >
      <Card className="noCardBody"
        cover={
          <Popover content={item.illustrator} title={title} placement="topRight">
            <img alt={item.title}
              src={
                imgToThumbnails(item.url)
              } className={`${styles.ldImg} antCard`} style={isDisabled ? {"filter":"grayscale()"} : null} onClick={this.openLightBox} />
          </Popover>}
        actions={actions}>
      </Card>

      {isOpen && (
        <Lightbox imageUrls={imageUrls} index={index} close={this.closeLightbox} move={this.changeIndex}/>
      )}
    </Col>
  }
}
