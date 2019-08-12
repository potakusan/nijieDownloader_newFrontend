import React,{Component} from "react";
import { Layout, Typography } from "antd";
import HelpBreadcrumb from "./breadcrumb";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

class Setup extends Component{

  render(){
    return (
    <div className="commonPadding">
      <HelpBreadcrumb>
        <span>カスタム書式</span>
      </HelpBreadcrumb>
      <Content>
        <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
          <Typography>
            <Title level={2}>カスタム書式</Title>
            <Paragraph>
              <p>
                Nijie Downloaderでは、ダウンロードする画像のファイル名およびディレクトリ名に好きな名前を付けることができます。<br/>
                その際に使用できる変数は以下のとおりです。
              </p>
              <p>
                ・$o -> オリジナルのファイル名<br/>
                ・$r -> ダウンロード日時<br/>
                ・$d -> ダウンロード時刻<br/>
                ・$n -> 同一アルバム内n枚目<br/>
                ・$s -> 同一アルバム内画像総数<br/>
                ・$u -> 投稿者名<br/>
                ・$l ->投稿者のユーザーID(*一部例外的なファイル名になっているものに関してはunknownが出力されます)<br/>
                ・$i -> アルバムID<br/>
                ・$t -> アルバムのタイトル
              </p>
              <p>
                また、半角スラッシュを入力することで、そこでディレクトリを分けることが可能です。
              </p>
              <p>
                以上をもとに、いくつか例を挙げて紹介します。<br/>
                ①たとえば「<a href="http://nijie.info/view.php?id=323652" target="_blank" rel="noreferrer noopener">抱え橙</a>」(「ツデロー」さんのアップロードした単一画像)を、2019/08/12 15:25に「$r-$d/$u($l)/$t-$i/$o」という書式でダウンロードした場合、ダウンロードされるZIPファイルの中身は次のようになります。<br/>
                「20190812-1525/ツデロー(45134)/抱え橙-323652/45134_20190720173340_0.png」<br/>
                ②次に、「<a href="http://nijie.info/view.php?id=324039" target="_blank" rel="noreferrer noopener">最近のえっち落書き</a>」（「YUTAKA」さんのアップロードした、5枚の画像が含まれるアルバム）を、上記と同様の書式でダウンロードした場合、次のようになります。<br/>
                「20190812-1525/YUTAKA(49418)/最近のえっち落書き-324039/」という多階層ディレクトリが作成され、そこに「49418_20190722223616_0.png」以下5枚の画像が格納されます。
              </p>
              <p>
                このように、ダウンロード段階で画像を整理することができ、オフライン下において好きな画像をいつでも楽しむことができます。
              </p>
            </Paragraph>
          </Typography>
        </div>
      </Content>
    </div>);
  }

}

export default Setup
