import React,{Component} from "react";
import { Layout, Typography } from "antd";
import HelpBreadcrumb from "./breadcrumb";

const { Title } = Typography;
const { Content } = Layout;

class Spec extends Component{

  render(){
    return (
    <div className="commonPadding">
      <HelpBreadcrumb>
        <span>利用推奨環境・利用規約</span>
      </HelpBreadcrumb>
      <Content>
        <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
          <Typography>
            <Title level={2}>利用推奨環境</Title>
            <Title level={4}>必須要件</Title>
            <p>以下の要件を満たさない環境下では、本サービスをお使いいただけません。</p>
            <ol>
              <li>Fetch APIを利用できること</li>
              <li>Web Storage APIを利用できること</li>
              <li>IndexedDB APIを利用できること</li>
              <li>ECMAScript6(ES2015)を解釈できるブラウザ</li>
            </ol>
            <p>最新版のGoogle ChromeやFirefoxでは動作します。<br/>
            Internet Explorer11以下、プライベートブラウジングが有効化された各ブラウザ等では動作しません。</p>
            <Title level={2}>利用規約</Title>
            <p>この利用規約（以下本規約）は、
              <a href="https://twitter.com/_2R5" target="_blank" rel="noopener noreferrer">@_2R5</a>
              （以下甲）が提供するサービス（以下本サービス）の利用条件を定めるものです。<br/>
            ユーザー（以下乙）は、本規約に従い、本サービスをご利用いただく必要があります。
            </p>
            <h4>第一条</h4>
            <p>本規約は、本サービスに関わる甲乙間の一切の関係に適用される。</p>
            <h4>第二条</h4>
            <p>乙は、本サービスの利用にあたり、以下の行為をしてはならない。</p>
            <ol>
              <li>法令または公序良俗に反する行為</li>
              <li>本サービスの不具合を意図的に利用する行為</li>
              <li>本サービスを介し、第三者により運営されるサービスの運営を妨害し、または本サービスもしくは当該サービスを運用しているサーバーまたはネットワークの機能を破壊または妨害する行為</li>
              <li>その他、本サービスの利用上不適切と推断される行為</li>
            </ol>
            <h4>第三条</h4>
            <p>甲は、以下のいずれかの事由があると判断したとき、乙に対し事前に通知することなく、本サービスの一部または全部の提供を停止、または中断することができる。</p>
            <ol>
              <li>本サービスを運用しているシステムの保守点検または更新を行う場合</li>
              <li>不可抗力により、本サービスの継続的な提供が困難となった場合</li>
              <li>本サービスを運用しているシステムが事故により停止した場合</li>
              <li>その他、甲が本サービスの継続的な提供が困難であると判断した場合</li>
            </ol>
            <h4>第四条</h4>
            <p>甲は、以下のいずれかの事由があると判断したとき、乙に対し事前に通知することなく、乙の本サービスの一部または全部の利用を制限することができる。</p>
            <ol>
              <li>本規約の条項に違反した場合</li>
              <li>甲が、乙の本サービスの利用につき適当でないと判断した場合</li>
            </ol>
            <h4>第五条</h4>
            <p>甲は、乙に対し事前に通知することなく、本サービスの内容を変更、または本サービスの提供を中止することができるものとし、これにより乙に生じた損害について一切の責任を負わない。</p>
            <h4>第六条</h4>
            <p>甲は、法令等の定めがある場合を除き、必要を要したときに、乙に対し事前に通知することなく、本規約を変更することができる。</p>
            <h4>附則</h4>
            <p>令和元年8月23日 初版</p>
          </Typography>
        </div>
      </Content>
    </div>);
  }

}

export default Spec
