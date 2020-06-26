import React,{Component} from "react";
import {Modal} from "antd";
import {pinnedDB} from "../indexedDB";

class Test extends Component{

  constructor(){
    super();
    this.state = {
      show : false,
      errors : []
    }
  }

  async componentDidMount(){
    let errors = [];
    if(!window.fetch){
      errors.push(<span>・(致命的エラー)fetch APIを利用できません。</span>);
    }
    if(!("localStorage" in window)){
      errors.push(<span>・(致命的エラー)localStorageを利用できません。</span>);
    }
    try{
      const db = new pinnedDB();
      await db.getAll();
    }catch(e){
      errors.push(<span>・(致命的エラー)IndexedDBを利用できません。プライベートブラウジング時、このエラーが表示される場合があります。</span>)
    }
    if(errors.length === 0){
      return;
    }
    Modal.warning({
      title: "警告",
      width: 820,
      content: (
        <span>
          以下の理由により、お使いのブラウザではニジエダウンローダの一部または全ての機能をご利用いただけません。<br/>
        ヘルプ>利用推奨環境をご確認ください。<br/>
        {errors.map(item=>{ return (<span>{item}<br/></span>) })}
        </span>),
      okText: "確認",
    });
  }

  render(){
    return (null);
  }

}

export default Test
