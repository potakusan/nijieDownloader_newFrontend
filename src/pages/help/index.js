import React,{Component} from "react";
import { Layout, Typography, Card } from "antd";
import { Link } from "react-router-dom";
import HelpBreadcrumb from "./breadcrumb";

const { Title } = Typography;
const { Content } = Layout;

class Use extends Component{

  render(){
    return (
    <div className="commonPadding">
      <HelpBreadcrumb/>
      <Content>
        <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
          <Typography>
            <Title level={2}>ヘルプ</Title>
            <Card size="small" title={<Link to="/help/setup">セットアップ</Link>} className="smallMargin">
              <p>ニジエダウンローダをお使いいただくにあたっての準備事項</p>
            </Card>
            <Card size="small" title={<Link to="/help/use">使い方</Link>} className="smallMargin">
              <p>ニジエダウンローダの使い方、設定項目等の紹介</p>
            </Card>
            <Card size="small" title={<Link to="/help/customPresets">カスタム書式設定</Link>} className="smallMargin">
              <p>ダウンロードする画像ファイルに適用できるカスタム書式についての説明</p>
            </Card>
            <Card size="small" title={<Link to="/help/spec">利用推奨環境・利用規約</Link>} className="smallMargin">
              <p>ニジエダウンローダをお使いいただくにあたっての動作要件および利用規約</p>
            </Card>
            <Card size="small" title={<Link to="/help/log">更新履歴</Link>} className="smallMargin">
              <p>ニジエダウンローダの過去のアップデートログ</p>
            </Card>
          </Typography>
        </div>
      </Content>
    </div>);
  }

}

export default Use
