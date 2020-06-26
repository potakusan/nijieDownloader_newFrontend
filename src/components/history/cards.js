import React,{Component} from "react";
import {Timeline} from "antd";
import {items} from "./api";
import {imgToThumbnails} from "../common/functions";
import Lightbox from "../common/lightbox";

class List extends Component{

  constructor(){
    super();
    this.state = {
      isOpen: false,
      index: 0,
      thumbs : [],
      isFull : false,
    }
  }

  async componentDidMount(){
    this.setState({
      thumbs : await new items().getThumbnails(this.props.list.name,false),
    });
  }

  openLightBox = (i)=>this.setState({isOpen:true,index:i});
  closeLightbox = ()=> this.setState({isOpen:false});
  changeIndex = (index) => this.setState({index:index});
  viewFull = async ()=>{
    const newState = !this.state.isFull;
    this.setState({
      isFull : newState,
      thumbs : await new items().getThumbnails(this.props.list.name,newState)
    })
  }

  render(){
    const {list} = this.props;
    const {isOpen,index,thumbs} = this.state;
    return (
      <Timeline.Item>
        <span onClick={this.viewFull}>{list.name} ({list.sum} 枚 / {Math.round(list.fileSize / 1048576 * 100) / 100} MiB)</span>
        <div className="flexImageBoxWrapper">
          {thumbs.map((i,num)=>{
            return (
              <div className="flexImageBox" key={`${list.name} + ${i}`}>
                <img src={imgToThumbnails(i)} alt={"number of" + i} onClick={()=>this.openLightBox(num)}/>
              </div>
            )
          })}
        </div>

        {isOpen && (
          <Lightbox imageUrls={thumbs} index={index} close={this.closeLightbox} move={this.changeIndex}/>
        )}
      </Timeline.Item>
    );
  }

}

export default List
