import React,{Component} from "react";
import {Spin,Empty,Timeline,Button,Statistic, Row, Col, Icon, Divider} from "antd";
import {lists} from "./api";
import Cards from "./cards";
import {historyLists,historyItems} from "../indexedDB";
import ModalStatus from "../common/modal";
import Error from "../views/error";
import CountUp from "react-countup";

class List extends Component{

  constructor(){
    super();
    this.state = {
      list : [],
      spinning : true,
      cannotLoad: false,
    }
  }

  async componentDidMount(){
    try{
      const l = await new lists().getAll();
      let ds = 0,im = 0;
      l.map(item=>{
        im += item.sum;
        ds += item.fileSize;
      })
      this.setState({
        list : l,
        imageSum : im,
        downloadedSize : Math.round(ds / 1048576 * 100) / 100,
        spinning : false
      });
    }catch(e){
      this.setState({
        cannotLoad : true,
        spinning : false
      });
    }
  }

  executeDelete = async ()=>{
    this.setState({forceRerender:true});
    await new historyLists().deleteAll();
    await new historyItems().deleteAll();
    this.setState({forceRerender:false,list:[],showStatus: false});
  }

  toggleModal = ()=>this.setState({showStatus:!this.state.showStatus});

  render(){
    const {list,spinning,showFull,forceRerender,showStatus,cannotLoad,imageSum,downloadedSize} = this.state;
    if(forceRerender){
      return (null);
    }
    return (
      <Spin spinning={spinning}>
        {cannotLoad && <Error type="error" message="エラー" additionalDescription="データの読み込みができませんでした。"/>}
        {!cannotLoad && <div>
          {list.length === 0 && <Empty description={<span>ダウンロード履歴がありません。<br/>過去のダウンロード履歴がここに表示されます。</span>}/>}
          {list.length > 0 &&
            <div>
              <Row gutter={16} style={{textAlign:"center"}}>
                <Col span={12}>
                  <Statistic title="総枚数" value={imageSum} formatter={(val)=><CountUp end={val}/>} suffix="枚" prefix={<Icon type="file-image" />} />
                </Col>
                <Col span={12}>
                  <Statistic title="容量" value={downloadedSize} formatter={(val)=><CountUp end={val}/>} suffix="MiB" prefix={<Icon type="rise" />} />
                </Col>
              </Row>
              <Divider />
              <Timeline style={{margin:"10px 0"}}>
                {list.sort((a,b)=>{
                  return a.name < b.name ? 1 : -1
                }).map(item=><Cards key={item["name"]} list={item} showFull={showFull}/>) }
                <div style={{display:"block",position:"fixed",top:"11px",right:"13px",zIndex:"10"}}>
                  <Button type="danger" size="large" icon="delete" onClick={this.toggleModal}>
                    履歴を削除
                  </Button>
                </div>
              </Timeline>
            </div>
          }
          {showStatus && <ModalStatus
            execute={this.executeDelete} show={showStatus} toggleModal={this.toggleModal}>
              <p>ダウンロード履歴をすべて削除しますか？</p>
            </ModalStatus>
          }
      </div> }
      </Spin>
    );
  }

}

export default List
