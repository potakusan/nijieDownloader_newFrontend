import styles from "./../../theme/style.module.css";
import React,{Component} from "react";
import { Popover, Card, Col, Icon } from 'antd';
import Lightbox from "react-image-lightbox";

export default class Image extends Component{

  constructor(props){
    super(props);
    this.state = {
      index: 0,
      isOpen: false,
    }
    this.openLink = this.openLink.bind(this);
  }

  thumbsize = 150;
  beforeReplace = [
    new RegExp(/\/nijie_picture\//g),
    new RegExp(/\/dojin_main\//g),
  ]
  afterReplace = [
    `/__rs_l${Number(this.thumbsize+50)}x${Number(this.thumbsize+50)}/nijie_picture/`,
    `/__rs_l${Number(this.thumbsize+50)}x${Number(this.thumbsize+50)}/dojin_main/`
  ];

  openLightBox = (e)=>{
    this.setState({isOpen:true,index:this.props.item.current -1});
  }

  openLink(e){
    window.open("//nijie.info/view.php?id=" + this.props.item["id"]);
  }

  render(){
    const {item,imageUrls,toggleDisable,togglePinned,inArray,pinnedStatus} = this.props;
    const {isOpen,index} = this.state;
    const isDisabled = inArray(item.current);
    const title = item.pageSum > 1 ? `${item.title} (${item.current} / ${item.pageSum})` : item.title;
    return <Col key={"col-" + item.cnt}
        data-id={item.id}
        data-illustrator={item.illustrator}
        data-title={item.title}
        data-url={item.url}
        data-disabled={isDisabled}
      >
      <Card className="noCardBody"
        cover={
          <Popover content={item.illustrator} title={title}>
            <img alt={item.title} src={
              item.url.replace(this.beforeReplace[0],this.afterReplace[0]).replace(this.beforeReplace[1],this.afterReplace[1])
            } className={`${styles.ldImg} antCard`} style={isDisabled ? {"filter":"grayscale()"} : null} onClick={this.openLightBox} />
          </Popover>}
        actions={[
          <Icon type={isDisabled ? "eye" : "eye-invisible"} data-num={item.current} style={isDisabled ? {"color":"#ff6000"} : null} onClick={toggleDisable} />,
          <Icon type="pushpin" className={pinnedStatus ? "standPin" : null} data-num={item.current} onClick={togglePinned} />,
          <Icon type="plus-circle" />,
          <Icon type="link" onClick={this.openLink}/>]}>
      </Card>

      {isOpen && (
        <Lightbox
          mainSrc={imageUrls[index]}
          nextSrc={imageUrls[(index + 1) % imageUrls.length]}
          prevSrc={imageUrls[(index + imageUrls.length - 1) % imageUrls.length]}
          onCloseRequest={() => this.setState({ isOpen: false })}
          onMovePrevRequest={() =>
            this.setState({
              index: (index + imageUrls.length - 1) % imageUrls.length,
            })
          }
          onMoveNextRequest={() =>
            this.setState({
              index: (index + 1) % imageUrls.length,
            })
          }
        />
      )}
    </Col>
  }
}
