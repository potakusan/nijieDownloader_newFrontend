import React,{Component} from "react";
import { Layout, Typography,Icon,Divider } from "antd";
import HelpBreadcrumb from "./breadcrumb";

const { Title } = Typography;
const { Content } = Layout;

class Use extends Component{

  render(){
    return (
    <div className="commonPadding">
      <HelpBreadcrumb>
        <span>使い方</span>
      </HelpBreadcrumb>
      <Content>
        <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
          <Typography>
            <Title level={2}>使い方</Title>
            <Title level={4}>ダウンローダー</Title>
            <p>・各画像下部の目のマーク(<Icon type="eye"/>)をクリックすることで、画像を除外(ダウンロード対象から外す)ことができます。除外された画像はサムネイルがモノクロになり、目のマークが変化(<Icon type="eye-invisible" style={{color:"#ff6000"}}/>)します。</p>
            <p>・各画像下部のピンのマーク(<Icon type="pushpin"/>)をクリックすると、画像をピン留め(一時的に保管)することができます。ピン留めしたアイテムは左メニューの「ピン留め」から確認することができ、ダウンローダー右上のハンバーガーボタンをクリックすることでいつでもまとめてダウンローダーに追加・ダウンロードできます。</p>
            <p align="center">
              <img src="https://files.poyashi.me/atOnce.gif" alt="一括選択反転" style={{width:"100%",boxShadow:"0px 0px 3px #222",maxWidth:" 661px"}}/>
            </p>
            <p>・以上のボタン操作は、Shiftキーを押しながら行うことで、同じアルバム内に存在する画像に対し一括反転操作を行うことができます。</p>
            <p>・サムネイルをShiftキーを押下しながらクリックすることでニジエ上で当該画像を表示します。</p>
            <Divider/>
            <p>各アルバムのタイトル横のハンバーガーボタンから、そのアルバムに登録されている画像全てに対し一括の編集を行うことができます。<br/>
            できる操作は以下の通り：<br/>
            ・選択状態をすべて選択/除外/一括反転<br/>
            ・一括ピン留め/解除/反転<br/>
            ・基本情報の変更（画像タイトル名、投稿者名）
            ・画像をニジエ上で開く
            </p>
            <Divider/>
            <p align="center">
              <img src="https://files.poyashi.me/download.png" alt="ダウンローダーボタン" style={{width:"100%",boxShadow:"0px 0px 3px #222",maxWidth:" 353px"}}/>
            </p>
            <p>ダウンローダー右上のハンバーガーボタンから、各種操作を実行できます。<br/>
            ・編集状態をリセット(除外状態のリセット)><br/>
            ・ダウンローダー上のアイテムをピン留めされたアイテムに置き換え<br/>
            ・ダウンロード済アイテムを一括除外
            </p>
            <p>
              すべての操作を完了したら、右上の「Download」ボタンをクリックすることで、画像をダウンロードします。
            </p>
            <p align="center">
              <img src="https://files.poyashi.me/progress.png" alt="ダウンロードの進捗表示" style={{width:"100%",boxShadow:"0px 0px 3px #222",maxWidth:" 453px"}}/>
            </p>
            <p>
              ダウンロードを開始すると、モーダルウィンドウにダウンロードの進捗が表示されます。<br/>
              右下の中止ボタンをクリックすることで、いつでもダウンロードを途中でやめることができます。
            </p>
            <Title level={4}>ピン留め</Title>
            <p>ピン留め済みアイテム一覧を表示します。</p>
            <p>ピン留め状態を変更した場合、右上のセーブボタンをクリックすることではじめて反映されます。</p>
            <Title level={4}>履歴</Title>
            <p>過去にダウンロードした画像は履歴として蓄積されます。<br/>
            ダウンロード総量等を確認できるほか、ダウンローダーにおいて、すでにダウンロードした画像を対象から除外することができます。</p>
          <Title level={4}>設定/初期化</Title>
            <p>
            <b>設定</b><br/>
            ダウンローダーに関する設定を行えます。<br/>
            ・保存書式の設定<br/>
            ダウンロードされる画像のファイル名書式を設定します。詳細は「カスタム書式設定」を御覧ください。<br/>
            ・完了アラートの表示<br/>
            storage=3使用時、ダウンロード完了時に表示されるアラートを無くします。<br/>
            (ダウンロード確認はブックマークレットのパラメータで設定します。)
            ・ダウンロード方式<br/>
            BlobとStreams APIから設定します。<br/>
            (現在はBlobのみ設定できます)
            </p>
            <p>
              <b>初期化/インポート・エキスポート</b><br/>
              蓄積されたデータをすべて削除したり、各種データのバックアップを作成できます。
            </p>
          </Typography>
        </div>
      </Content>
    </div>);
  }

}

export default Use
