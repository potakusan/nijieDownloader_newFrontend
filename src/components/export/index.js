import React,{Component} from "react";
import { Button, Icon, Input, Typography, message, Upload } from "antd";
import { Link } from "react-router-dom";
import {pinnedDB,historyItems,historyLists} from "../indexedDB";
import { saveAs } from "file-saver";
import { timeFormatter }  from "../common/functions";
import ModalStatus from "../common/modal";
import showError from "../common/showError";
import localStorage from "../localStorage";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

class Settings extends Component{

  constructor(props){
    super(props);
    this.pinnedDB = new pinnedDB();
    this.historyItems = new historyItems();
    this.historyLists = new historyLists();
    this._ls = new localStorage();
    this.exportData = this.exportData.bind(this);
    this.importData = this.importData.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.executeDelete = this.executeDelete.bind(this);
    this.state = {
      data : null,
      showDeletePinnedItemsDialog : false,
      showDeleteHistoryDialog : false,
    }
  }

  async exportData(){
    let s = this._ls.item;
    delete s["spinning"];
    let data = {
      settings : JSON.stringify(s),
      pinnedItems : await this.pinnedDB.getAll(),
      historyLists : await this.historyLists.getAll(),
      historyItems : await this.historyItems.backup(),
    };
    const fileName = `export_${timeFormatter(0)}.json`;
    const blob = new Blob([JSON.stringify(data)],{ type: "text/plain;charset=utf-8"});
    saveAs(blob,fileName);
    message.success(<span>データを書き出しました。書き出されたファイル:{fileName}</span>)
  }

  importData(file){
    const errorMes = (e) => {
      message.error("読み込みに失敗しました。エラーメッセージを確認してください。");
      return (
        <p>
          An error occured while processing your request.<br/>
          Please check the detailed error message shown below.<br/>
        <b>{e.message || e}</b></p>
      );
    }
    try{
      message.info(`読み込んでいます : ${file.name}`);
      if(file.type !== "application/json"){
        message.error("選択されたファイルは読み込み可能な形式ではありません。");
      }
      const fs = new FileReader();
      fs.onload = async event =>{
        try{
          const res = JSON.parse(event.target.result);
          if(!res.settings && !res.pinnedItems && !res.historyLists && !res.historyItems){
            message.error("インポートするデータがありません。");
          }
          if(res.settings){
            this._ls.item = JSON.parse(res.settings);
            message.success("設定をインポートしました。");
          }
          if(res.pinnedItems){
            await this.pinnedDB.deleteAll();
            await this.pinnedDB.setMultipleItem(res.pinnedItems);
            message.success("ピン留めされたアイテムをインポートしました。");
          }
          if(res.historyLists){
            await this.historyLists.deleteAll();
            await this.historyLists.setMultipleItem(res.historyLists);
            message.success("総合ダウンロード履歴をインポートしました。");
          }
          if(res.historyItems){
            await this.historyItems.deleteAll();
            await this.historyItems.bulkPut(res.historyItems);
            message.success("個別ダウンロード履歴をインポートしました。");
          }
          return false;
        }catch(e){
          showError(errorMes(e),0,1);
        }
      }
      fs.readAsText(file);
      return false;
    }catch(e){
      showError(errorMes(e),0,1);
      return false;
    }
  }

  toggleModal(target){
    const t = target === "pinned" ? "showDeletePinnedItemsDialog" : "showDeleteHistoryDialog";
    return this.setState({
      [t] : !this.state[t]
    })
  }

  async executeDelete(target){
    if(target === 0){
      await this.pinnedDB.deleteAll();
    }else{
      const db = this.historyItems._this();
      const {res,error} = await this.historyItems.openTransaction(
        "rw",
        [db.history,db.historyContent]
      );
      if(error){
        message.error("An error occured and unable to execute the processes.");
        return;
      }
    }
    message.success("処理を完了しました。");
    this.setState({
      showDeleteHistoryDialog: false,
      showDeletePinnedItemsDialog : false,
    });
  }

  render(){
    const {showDeleteHistoryDialog,showDeletePinnedItemsDialog} = this.state;
    return (
      <Typography>
        <Paragraph>
          <Title level={2}>初期化</Title>
          <p>各種保存済みデータを削除します。</p>
          <div className="groupButtons">
            <Button type="danger" onClick={()=>this.toggleModal("pinned")}>
              <Icon type="pushpin" />
              ピン留めされたアイテムを削除
            </Button>
            <Button type="danger" onClick={()=>this.toggleModal("history")}>
              <Icon type="history" />
              ダウンロード履歴を削除
            </Button>
          </div>
          <Title level={4}>インポート/エクスポート</Title>
          <p>
            保存済みデータをエクスポート、またはインポートします。<br/>
            エキスポート対象は「ピン留めアイテム」「ダウンロード履歴」「設定内容」です。
          </p>
          <div className="groupButtons">
            <Button type="primary" onClick={this.exportData}>
              <Icon type="export" />
              エキスポートデータを作成
            </Button>
            <Upload name="file"
              showUploadList={false}
              beforeUpload={(f)=>this.importData(f)}>
              <Button type="primary">
                <Icon type="import" />
                インポート
              </Button>
            </Upload>
          </div>
          <p>
            <b>エクスポート</b><br/>
            上記ボタンをクリックすると、エキスポートデータがJSON形式で書き出され、自動でダウンロードされます。
          </p>
          <p>
            <b>インポート</b><br/>
            インポートボタンをクリックし、インポートしたいファイルを選択してください。
          </p>
        </Paragraph>
        {showDeletePinnedItemsDialog && <ModalStatus
          execute={()=>this.executeDelete(0)} show={showDeletePinnedItemsDialog} toggleModal={()=>this.toggleModal("pinned")}>
            <p>ピン留めされたアイテムをすべて削除しますか？</p>
          </ModalStatus>
        }
        {showDeleteHistoryDialog && <ModalStatus
          execute={()=>this.executeDelete(1)} show={showDeleteHistoryDialog} toggleModal={()=>this.toggleModal("history")}>
            <p>ダウンロード履歴をすべて削除しますか？</p>
          </ModalStatus>
        }
      </Typography>
    );
  }

}

export default Settings
