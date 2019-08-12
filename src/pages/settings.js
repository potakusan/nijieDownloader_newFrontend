import React,{Component} from "react";
import { Button, Icon, Form, Input, Layout, Typography, Checkbox, Radio,Spin } from "antd";
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
    const {fileName,noAlertOnSuccess} = this._ls.item;
    this.state = {
      fileName :  fileName ? fileName :  "$o",
      noAlertOnSuccess : noAlertOnSuccess ? noAlertOnSuccess : false,
      downloadType : 0,
      spinning: false,
    }
    this.saveSettings = this.saveSettings.bind(this);
  }

  saveSettings(){
    this._ls.item = this.state;
  }

  handleFileNameChange = (e)=> this.setState({fileName:e.target.value});
  handleCheckChange = (e)=> this.setState({noAlertOnSuccess:e.target.checked});
  handleRadioChange = (e)=> this.setState({downloadType:e.target.value})

  render(){
    const {spinning} = this.state;
    return (
      <Spin className="commonPadding" spinning={spinning}>
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
                <Title level={4}>そのままダウンロード</Title>
                <Checkbox className="nosel"
                  checked={this.state.noAlertOnSuccess} onChange={this.handleCheckChange}
                >完了アラートを表示しない</Checkbox>
                <p>ブックマークレットのパラメータでstorage=3を設定している場合に、ダウンロード完了時のアラートを表示するか否かを設定します。</p>
                <Title level={4}>ダウンロード方式</Title>
                <Radio.Group onChange={this.handleRadioChange} value={this.state.downloadType}>
                  <Radio value={0}>Blob</Radio>
                  <Radio value={1}>Stream(β版提供)</Radio>
                </Radio.Group>
                <p>Blob方式の場合、ダウンロードできるファイルサイズの上限がブラウザおよびお使いのマシンのスペックにより上下します。<br/>
                Chromeの場合2GB、Firefoxの場合800MB程度となります。</p>
                <p>Stream方式の場合、使用可能なブラウザが限定されます。また、アルバムごとにZIPファイルがダウンロードされます。</p>
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
