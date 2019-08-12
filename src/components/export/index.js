import React,{Component} from "react";
import { Button, Icon, Input, Typography  } from "antd";
import { Link } from "react-router-dom";
import {pinnedDB,historyItems,historyLists} from "../indexedDB";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

class Settings extends Component{

  constructor(props){
    super(props);
    this.pinnedDB = new pinnedDB();
    this.historyItems = new historyItems();
    this.historyLists = new historyLists();
    this.exportData = this.exportData.bind(this);
    this.importData = this.importData.bind(this);
    this.state = {
      data : null
    }
  }

  async exportData(){
    let data = {
      settings : this.props.settings,
      pinnedItems : await this.pinnedDB.getAll(),
      historyLists : await this.historyLists.getAll(),
      historyItems : await this.historyItems.backup(),
    };
    this.setState({
      data : JSON.stringify(data)
    });
  }

  importData(){

  }

  render(){
    return (
      <Typography>
        <Paragraph>
          <Title level={2}>初期化</Title>
          <p>各種保存済みデータを削除します。</p>
          <div className="groupButtons">
            <Button type="danger">
              <Icon type="pushpin" />
              ピン留めされたアイテムを削除
            </Button>
            <Button type="danger">
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
            <Button type="primary" onClick={this.importData}>
              <Icon type="import" />
              インポート
            </Button>
          </div>
          <TextArea rows={4} className="upsideDown" value={this.state.data}
            placeholder="ここにエキスポートデータが表示されます。&#13;&#10;インポートする場合はここにコピー&ペーストしてください。"/>
          <p>
            <b>エクスポート</b><br/>
            上記ボタンをクリック後、上のテキストボックスに表示されるテキストデータを保管してください。
          </p>
          <p>
            <b>インポート</b><br/>
            エキスポートで作成したテキストデータを上記フォームにコピペ後、インポートボタンをクリックしてください。
          </p>
        </Paragraph>
      </Typography>
    );
  }

}

export default Settings
