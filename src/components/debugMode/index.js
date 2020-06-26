import React,{Component} from "react";
import {Collapse} from "antd";
import {debugLogs} from "../indexedDB";
import localStorage from "../localStorage";
import {timeFormatter} from "../common/functions";
const { Panel } = Collapse;

class debugScreen extends Component{

  constructor(){
    super();
    this.loadLogs = this.loadLogs.bind(this);
    const _ls = new localStorage();
    const {debugMode} = _ls.item;
    this.storage = new debugLogs();
    //initialize storage
    this.storage.deleteAll();
    this.interval = setInterval(this.loadLogs,500);
    this.state = {
      show : debugMode,
      logs : []
    }
  }

  async loadLogs(){
    try{
      this.setState({
        logs: await this.storage.getAllItems()
      });
    }catch(e){
      console.log(e);
    }
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render(){
    if(!this.state.show){
      return (null);
    }
    return (
      <Collapse
        style={{position:"fixed",bottom:"0",right:"0",width:"50%",zIndex:"100"}}
      >
        <Panel header="DebugLogs" key="1">
          <div style={{height:"300px",overflowY:"scroll"}}>
            <p>
              {this.state.logs.length === 0 && <span>{timeFormatter(3)} : Log is entirely empty.</span>}
              {this.state.logs.map(item=>{
                return (<span key={item.num} style={!item.isSuccess ? {color:"#ff0000"} : null}>{item.createdAt} : {item.body}<br/></span>);
              })}
            </p></div>
        </Panel>
      </Collapse>
    );
  }

}

export default debugScreen
