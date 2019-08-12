import React,{Component} from "react";
import {Spin,Empty,Timeline,Button} from "antd";
import {lists} from "./api";
import Cards from "./cards";
import {historyLists,historyItems} from "../indexedDB";
import ModalStatus from "../common/modal";

class List extends Component{

  constructor(){
    super();
    this.state = {
      list : [],
      spinning : true,
    }
  }

  async componentDidMount(){
    this.setState({
      list : await new lists().getAll(),
      spinning : false
    });
  }

  executeDelete = async ()=>{
    this.setState({forceRerender:true});
    await new historyLists().deleteAll();
    await new historyItems().deleteAll();
    this.setState({forceRerender:false,list:[],showStatus: false});
  }

  toggleModal = ()=>this.setState({showStatus:!this.state.showStatus});

  render(){
    const {list,spinning,showFull,forceRerender,showStatus} = this.state;
    if(forceRerender){
      return (null);
    }
    return (
      <Spin spinning={spinning}>
        {list.length === 0 && <Empty description={<p>ダウンロード履歴がありません。<br/>過去のダウンロード履歴がここに表示されます。</p>}/>}
        {list.length > 0 &&
          <Timeline style={{margin:"10px 0"}}>
            {list.sort((a,b)=>{
              return a.name < b.name ? 1 : -1
            }).map(item=><Cards key={item["name"]} list={item} showFull={showFull}/>) }
            <div style={{display:"block",position:"fixed",top:"11px",right:"13px",zIndex:"10"}}>
              <Button type="primary" size="large" icon="delete" onClick={this.toggleModal}>
                履歴を削除
              </Button>
            </div>
          </Timeline>
        }
        {showStatus && <ModalStatus
          execute={this.executeDelete} show={showStatus} toggleModal={this.toggleModal}>
            <p>ダウンロード履歴を削除しますか？</p>
          </ModalStatus>
        }
      </Spin>
    );
  }

}

export default List
