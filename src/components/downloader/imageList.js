import React,{Component} from "react";
import { Layout, Button, Dropdown, Menu } from 'antd';
import Album from "./album";

const { Footer } = Layout;

export class ImageList extends Component{

  constructor(props){
    super(props);
    this.state = {
      origin : this.props.data,
      imageSum : this.props.data.length,
      splitArray : [],
      imageUrls : [],
    }
    this.executeChanger = this.executeChanger.bind(this);
    const interval = ()=>{
      const imageSum = document.querySelectorAll(`.ant-col:not([data-disabled="true"])`).length;
      document.getElementById("selectState").innerHTML = `${imageSum}枚を選択しています`
    };
    if(this.interval) {
        clearInterval(this.interval);
    }
    this.interval = setInterval(interval,300);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
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
    const { splitArray } = this.state;
    const menu = (
      <Menu>
        <Menu.ItemGroup title="ピン留め">
          <Menu.Item key="0">
            <a
              href={null}
              onClick={null}
              >ピン留めされたアイテムに置き換え</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a
              href={null}
              onClick={null}
              >ピン留めされたアイテムを追加</a>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );
    return (
      <div>
        <div>
          {Object.keys(splitArray).map((item,num)=>{
            return (
              <Album key={`${item}-${num}`} album={splitArray[item]} origin={this.state.origin}
                toggleEditor={this.toggleEditor}
                imageSum={this.state.imageSum} executeChanger={this.executeChanger}/>)
          })}
          <span style={{display:"block",position:"fixed",top:"11px",right:"13px",zIndex:"10"}}>
            <Dropdown overlay={menu} trigger={['click']}>
              <Button size="large" icon="menu" style={{marginRight:"15px"}}></Button>
            </Dropdown>
            <Button type="primary" size="large" icon="download">
              Download
            </Button>
          </span>
        </div>
        <Footer id="selectState" style={
            { position: 'fixed', zIndex: 1, width: "100%", bottom: 0, padding: "6px",
               textAlign:"left", fontWeight:"bold", background:"#fff", borderTop:"1px solid #ccc" }}>
        </Footer>
      </div>
    );
  }
}
