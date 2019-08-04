import React,{Component} from "react";
import { Layout } from 'antd';
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
    const { imageSum,splitArray } = this.state;
    return (
      <div>
        <div>
            {Object.keys(splitArray).map((item,num)=>{
              return (
                <Album key={`${item}-${num}`} album={splitArray[item]} origin={this.state.origin}
                  toggleEditor={this.toggleEditor}
                  imageSum={this.state.imageSum} executeChanger={this.executeChanger}/>)
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
