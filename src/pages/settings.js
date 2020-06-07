import React,{Component} from "react";
import { Button, Icon, Form, Input, Layout, Typography, Checkbox, Radio,Spin,message,Switch } from "antd";
import { Link } from "react-router-dom";

import Export from "../components/export";
import localStorage from "../components/localStorage";

const { Title, Paragraph } = Typography;
const { Content } = Layout;
const { TextArea } = Input;

class Settings extends Component{

  constructor(){
    super();
    this._ls = new localStorage();
    const {fileName,downloadType,noAlertOnSuccess,debugMode} = this._ls.item;
    this.state = {
      fileName :  fileName ? fileName :  "$o",
      downloadType : downloadType,
      debugMode : debugMode,
    }
    this.saveSettings = this.saveSettings.bind(this);
  }

  saveSettings(){
    this._ls.item = this.state;
    message.success("設定を保存しました。");
  }

  handleFileNameChange = (e)=> this.setState({fileName:e.target.value});
  handleRadioChange = (e)=> this.setState({downloadType:e.target.value})
  toggleDebugMode = (checked,e)=> this.setState({debugMode:checked});

  render(){
    return (
      <Spin className="commonPadding" spinning={false}>
        <Content style={{ padding: '15px 20px' }}>
          <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
            <Typography>
              <Title level={2}>設定</Title>
              <Paragraph>
                <p>設定内容は「設定を保存」ボタンをクリックすることで反映されます。</p>
                <Title level={4}>保存書式</Title>
                <p style={{marginBottom:"2px"}}>
                  ダウンロードする際のファイル名の書式を設定します。半角スラッシュで階層わけができるほか、<Link to="/help/customPresets">カスタム書式</Link>を使用できます。
                </p>
                <Input placeholder="書式を設定..." className="fullWidth" style={{margin:"6px 0"}}
                  value={this.state.fileName} onChange={this.handleFileNameChange}/>
                <Title level={4}>ダウンロード方式</Title>
                <Radio.Group onChange={this.handleRadioChange} value={this.state.downloadType}>
                  <Radio value={0}>Blob Only</Radio>
                  <Radio value={1} disabled>Streams API</Radio>
                </Radio.Group>
                <p>ダウンロード方式を変更します。</p>
                <Title level={4}>デバッグモード(β)</Title>
                <Switch defaultChecked onChange={this.toggleDebugMode} checked={this.state.debugMode} />
                <p>デバッグモードを有効化します。（バグが発生した場合、デバッグモードの出力結果を添付の上msqkn310 at gmail.comまでお問い合わせください）<br/>
                デバッグスクリーンはページを再読み込み後表示されます。</p>
                <Button type="primary" size="large" icon="save" onClick={this.saveSettings}>
                  設定を保存
                </Button>
              </Paragraph>
            </Typography>
            <Export settings={this._ls.item}/>
          </div>
        </Content>
      </Spin>
    );
  }

}

export default Settings
