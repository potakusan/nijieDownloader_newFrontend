import styles from "./../theme/style.module.css";
import React,{Component} from "react";
import { message,Layout, Popover, Card, Row, Col, Icon, Menu, Typography, Divider, Button, Dropdown } from 'antd';
import Lightbox from "react-image-lightbox";
const { Meta } = Card;
const { SubMenu } = Menu;
const { Footer } = Layout;
const { Title } = Typography;

export class ImageList extends Component{

  constructor(props){
    super(props);
    this.state = {
      origin : this.props.data,
      imageSum : this.props.data.length,
      splitArray : [],
      imageUrls : [],
    }
  }

  componentDidMount(){
    this.setState({
      splitArray : this.splitArray()
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

  render(){
    const {imageUrls,origin,imageSum,splitArray} = this.state;
    return (
      <div>
        <div className="commonPadding">
            {Object.keys(splitArray).map((item,num)=>{
              return (
                <Album key={`${item}-${num}`} album={splitArray[item]} origin={this.state.origin}
                  imageSum={this.state.imageSum}/>)
            })}
        </div>
        <Footer style={
            { position: 'fixed', zIndex: 1, width: "100%", bottom: 0, padding: "6px",
               textAlign:"left", fontWeight:"bold", background:"#fff", borderTop:"1px solid #ccc" }}>
          {imageSum}枚を選択しています
        </Footer>
      </div>
    );
  }
}

export class Album extends Component{

  constructor(props){
    super(props);
    this.state = {
      disabled : [],
      imageUrls : [],
    }
    this.toggleDisable = this.toggleDisable.bind(this);
    this.togglePinned = this.togglePinned.bind(this);
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

  toggleDisable(e){
    let {origin,imageSum} = this.props;
    let {disabled} = this.state;
    const num = Number(e.currentTarget.getAttribute("data-num"));
    const len = origin.length;
    const exec = (i) =>{
      const filter = ()=>{
        disabled = disabled.filter(piece => piece !== i);
        imageSum++;
        return;
      }
      return this.inArray(i) ? filter() : disabled.push(i) && imageSum--;
    }
    if(e.shiftKey){
      for (let i = 0; i < len; ++i){
        if(origin[i]["title"] === origin[num]["title"]){
          exec(i);
        }
      }
    }else{
      exec(num);
    }
    return this.setState({
      disabled:disabled
    });
  }

  togglePinned(e){
    const item = this.state.origin[num];
    const num = e.currentTarget.getAttribute("data-num");
    const title = item.pageSum > 1 ? `${item.title} (${item.current} / ${item.pageSum})` : item.title;
    message.info(`「${this.state.origin[num]["title"]}」をピン留めしました。`);
  }

  render(){
    const {album} = this.props;
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a>選択/除外の一括反転</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a>情報の変更</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a>一括ピン留め</a>
        </Menu.Item>
        <Menu.Item key="3">
          <a>アルバムに一括追加</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Title level={4}>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="primary" icon="menu" type="dashed" className="grayButton"></Button>
          </Dropdown>
          &nbsp;
          {album[0]["title"]}&nbsp;<span className="smallText">{album[0]["illustrator"]}</span>
        </Title>
        <Row gutter={16}>
          {album.map((item,i)=>{
            return <Image key={`${album[0]["title"]}-${i}`} item={item} displaySort={this.props.displaySort}
              openLink={this.openLink} inArray={this.inArray} imageUrls={this.state.imageUrls}
              togglePinned={this.togglePinned} toggleDisable={this.toggleDisable}/>}
          )}
        </Row>
        <Divider />
      </div>
    )
  }
}

export class Image extends Component{

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
    const {item,imageUrls,toggleDisable,togglePinned,inArray} = this.props;
    const {isOpen,index} = this.state;
    const isDisabled = inArray(item.cnt);
    const title = item.pageSum > 1 ? `${item.title} (${item.current} / ${item.pageSum})` : item.title;
    return <Col key={"col-" + item.cnt}>
      <Card className="noCardBody"
        cover={
          <Popover content={item.illustrator} title={title}>
            <img src={
              item.url.replace(this.beforeReplace[0],this.afterReplace[0]).replace(this.beforeReplace[1],this.afterReplace[1])
            } className={`${styles.ldImg} antCard`} style={isDisabled ? {"filter":"grayscale()"} : null} onClick={this.openLightBox} />
          </Popover>}
        actions={[
          <Icon type={isDisabled ? "eye" : "eye-invisible"} data-num={item.cnt} style={isDisabled ? {"color":"#ff6000"} : null} onClick={toggleDisable} />,
          <Icon type="pushpin" onClick={togglePinned} />,
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
