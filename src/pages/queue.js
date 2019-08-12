import React,{Component} from "react";
import { Layout, Typography, Button, Spin } from "antd";
import {ImageList} from "../components/storagedItems/imageList";
import {pinnedDB} from "../components/indexedDB";

const { Title, Paragraph } = Typography;
const { Content, Footer } = Layout;

class Index extends Component{

  constructor(){
    super();
    this.storage = new pinnedDB();
    this.state ={
      pinnedItems : [],
      isRevised : false,
      revisedStates: [],
      willRemove : {},
      spinning:false,
      imageSum : 0
    }
    this.saveData = this.saveData.bind(this);
    this.reloadItems = this.reloadItems.bind(this);
    this.groupedItems = this.groupedItems.bind(this);
    this.execDelete = this.execDelete.bind(this);
  }

  async groupedItems(){
    const items = await this.storage.getAll();
    return {groups:this.storage.groupByItemId(),len:items.length};
  }

  async componentDidMount(){
    const {groups,len} = await this.groupedItems();
    this.setState({
      pinnedItems : groups,
      imageSum : len
    })
  }

  isRevised =(newState,place)=>{
    let {revisedStates,willRemove} = this.state;
    const isAlreadyDeclared = revisedStates.indexOf(place) >= 0;
    const hasChildren = newState.length > 0;
    if(hasChildren && !isAlreadyDeclared){
      revisedStates.push(place);
    }else if(!hasChildren && isAlreadyDeclared){
      revisedStates = revisedStates.filter(v=>v !== place);
    }
    if(hasChildren){
      willRemove[place] = newState;
    }else{
      delete willRemove[place];
    }
    this.setState({
      isRevised:revisedStates.length !== 0,
      revisedStates:revisedStates,
      willRemove:willRemove
    });
  }

  async execDelete(){
    this.setState({spinning:true});
    const keysMapping = (target)=>{
      return Object.keys(target);
    }
    let {pinnedItems} = this.state;
    const {willRemove} = this.state;
    return Promise.all(keysMapping(willRemove).map(async(i)=>{
      const item = willRemove[i];
      for(let j =0;j < item.length; ++j){
        await this.storage.removeItem(i,item[j]);
      }
    }));
  }

  async saveData() {
    await this.execDelete();
    this.reloadItems();
  }

  async reloadItems(){
    const {groups,len} = await this.groupedItems();
    this.setState({
      pinnedItems:groups,
      imageSum : len,
      isRevised: false,
      revisedStates : [],
      willRemove: {},
      spinning: false,
    });
  }

  render(){
    const {pinnedItems,imageSum,spinning} = this.state;
    return (
      <Spin className="commonPadding" spinning={spinning}>
        <Content style={{ padding: '15px 20px' }}>
          <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
            <Typography>
              <Title level={2}>ピン留め</Title>
            </Typography>
            {Object.keys(pinnedItems).map((item,num)=>{
              return <ImageList key={num}
                data={pinnedItems[item]} id={item} isRevised={this.isRevised}
                reload={this.reloadItems}/>
            })}
          </div>
          {this.state.isRevised && <div style={{display:"block",position:"fixed",top:"11px",right:"13px",zIndex:"10"}}>
            <Button type="danger" size="large" icon="save" onClick={this.saveData}>
              反映を保存
            </Button>
          </div>}
          <Footer style={
              { position: "fixed", zIndex: 1, width: "100%", bottom: 0, padding: "6px",
                 textAlign:"left", fontWeight:"bold", background:"#fff", borderTop:"1px solid #ccc" }}>
              {imageSum}枚選択しています
          </Footer>
        </Content>
      </Spin>
    );
  }

}

export default Index
