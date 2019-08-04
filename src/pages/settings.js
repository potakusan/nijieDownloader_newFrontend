import React,{Component} from "react";
import { Button, Icon, Form, Input, Layout, Typography, Checkbox  } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;
const { Content } = Layout;
const { TextArea } = Input;

class Index extends Component{

  render(){
    return (
    <div className="commonPadding">
      <Content>
        <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
          <Typography>
            <Title level={2}>設定</Title>
            <Paragraph>
              <Title level={4}>保存書式</Title>
              <p>ダウンロードする際のファイル名の書式を設定します。半角スラッシュで階層わけができるほか、<Link to="/help/customPresets">カスタム書式</Link>を使用できます。</p>
              <Form layout="inline" className="commonPadding fullWidth">
                <Input placeholder="書式を設定..."/>
              </Form>
              <Title level={4}>そのままダウンロード</Title>
              <Checkbox>完了アラートを表示しない</Checkbox>
              <p>ブックマークレットのパラメータでstorage=3を設定している場合に、ダウンロード完了時のアラートを表示するか否かを設定します。</p>
              <Title level={4}>初期化</Title>
              <p>各種保存済みデータを削除します。</p>
              <div className="groupButtons">
                <Button type="danger">
                  <Icon type="pushpin" />
                  ピン留めされたアイテムを削除
                </Button>
                <Button type="danger">
                  <Icon type="database" />
                  アルバムされたアイテムを削除
                </Button>
                <Button type="danger">
                  <Icon type="history" />
                  ダウンロード履歴を削除
                </Button>
              </div>
              <Title level={4}>インポート/エクスポート</Title>
              <p>保存済みデータをエクスポート、またはインポートします。</p>
              <div className="groupButtons">
                <Button type="primary">
                  <Icon type="export" />
                  エキスポートデータを作成
                </Button>
                <Button type="primary">
                  <Icon type="import" />
                  インポート
                </Button>
              </div>
              <TextArea rows={4} className="upsideDown" />
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
        </div>
      </Content>
    </div>);
  }

}

export default Index
