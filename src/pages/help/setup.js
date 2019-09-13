import React,{Component} from "react";
import { Layout, Typography } from "antd";
import HelpBreadcrumb from "./breadcrumb";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

class Setup extends Component{

  render(){
    return (
    <div className="commonPadding">
      <HelpBreadcrumb>
        <span>セットアップ</span>
      </HelpBreadcrumb>
      <Content>
        <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
          <Typography>
            <Title level={2}>セットアップ</Title>
            <Paragraph>
              下記ブックマークレットを登録してください。
              <pre style={{margin:"10px",padding:"15px",whiteSpace:"pre-wrap",border:"1px solid #ccc"}}>&#106;&#x61;&#118;&#97;&#115;&#x63;&#x72;&#x69;&#112;&#x74;&#58;&#x28;&#102;&#117;&#x6e;&#x63;&#116;&#105;&#111;&#110;&#x28;&#x29;&#x20;&#123;&#x20;&#106;&#x61;&#x76;&#97;&#x73;&#x63;&#x72;&#105;&#x70;&#116;&#58;&#x20;&#x28;&#x66;&#117;&#110;&#x63;&#116;&#105;&#111;&#110;&#40;&#100;&#x2c;&#32;&#115;&#41;&#x20;&#123;&#32;&#x73;&#x20;&#61;&#32;&#x64;&#46;&#x63;&#x72;&#101;&#97;&#x74;&#x65;&#69;&#108;&#x65;&#109;&#x65;&#x6e;&#x74;&#x28;&#x27;&#x73;&#99;&#x72;&#105;&#112;&#116;&#x27;&#x29;&#59;&#x20;&#x73;&#46;&#x73;&#x72;&#99;&#x20;&#x3d;&#32;&#x27;&#47;&#47;&#110;&#105;&#x6a;&#105;&#101;&#46;&#112;&#111;&#121;&#97;&#115;&#104;&#105;&#x2e;&#109;&#101;&#x2f;&#109;&#97;&#105;&#110;&#x2e;&#106;&#115;&#63;&#x76;&#x3d;&#39;&#32;&#x2b;&#x20;&#x4e;&#117;&#x6d;&#x62;&#x65;&#114;&#40;&#77;&#x61;&#x74;&#104;&#x2e;&#102;&#108;&#111;&#111;&#x72;&#x28;&#x4d;&#x61;&#116;&#104;&#46;&#x72;&#x61;&#x6e;&#x64;&#111;&#x6d;&#x28;&#41;&#x20;&#42;&#32;&#x31;&#48;&#48;&#x30;&#x30;&#48;&#48;&#48;&#41;&#41;&#32;&#43;&#x20;&#39;&#x26;&#115;&#116;&#x6f;&#114;&#x61;&#103;&#x65;&#x3d;&#48;&#x26;&#110;&#x6f;&#99;&#x6f;&#110;&#x66;&#61;&#x30;&#x26;&#102;&#110;&#x61;&#109;&#x65;&#x3d;&#x22;&#x22;&#39;&#59;&#32;&#100;&#x2e;&#x62;&#x6f;&#100;&#121;&#x2e;&#97;&#x70;&#112;&#x65;&#x6e;&#x64;&#x43;&#x68;&#x69;&#108;&#x64;&#40;&#115;&#41;&#59;&#x20;&#x7d;&#41;&#x28;&#x64;&#x6f;&#99;&#117;&#109;&#101;&#x6e;&#x74;&#41;&#32;&#x7d;&#x29;&#40;&#x29;&#x3b;
              </pre>
              <p align="center">
                <img src="https://files.poyashi.me/nijieDL.gif" alt="when you use Chrome" style={{width:"100%",boxShadow:"0px 0px 3px #222",maxWidth:" 661px"}}/><br/>
                (Chromeの場合はブックマークバーにD&Dするだけ)
              </p>
            </Paragraph>
          </Typography>
          <Typography>
            <Title level={2}>初期設定</Title>
            <Paragraph>
              <p>ブックマークレットのURLパラメータにおいて、各種動作設定を行うことができます。</p>
              <Title level={4}>&storage=0 (default)</Title>
              <p>画像データ取得後、ダウンローダーに移動します。</p>
              <Title level={4}>&storage=2</Title>
              <p>画像データをキューし、まとめてダウンローダに送信できます。</p>
              <p><b>&noconf=0 (default)</b></p>
              <p><b>&noconf=1</b><br/>
              画像データ取得後、ダウンローダにデータを送信しません。<br/>
              ニジエトップページにてブックマークレットを実行することで、キューされている画像データをまとめて送信します。
              </p>
              <Title level={4}>&storage=3</Title>
              <p>ブックマークレット実行時、ニジエ外に移動することなくその場で画像をダウンロードします。</p>
              <p><b>&noconf=0 (default)</b></p>
              <p><b>&noconf=1</b><br/>
              ダウンロード確認ダイアログを非表示にします。
              </p>
              <p><b>&fname=""</b><br/>
              storage=3設定時、保存する画像の命名規則は当パラメータのダブルコーテーションに囲まれる形で入力してください。<br/>
              なお、スラッシュによる階層分けは使用できません。<br/>
              命名規則については「<Link to="./customPresets">カスタム書式</Link>」を参照してください。
              </p>
            </Paragraph>
          </Typography>
        </div>
      </Content>
    </div>);
  }

}

export default Setup
