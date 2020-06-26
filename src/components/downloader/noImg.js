import React,{Component} from "react";
import Error from "../views/error";

export default class NoImg extends Component{
  render(){
    return (
      <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
        <Error
          message={"この機能を使用するにはPOSTメソッドを経由してアクセスしてください。"}
          additionalDescription={
            <span>
              ブックマークレットを介してアクセスしてください。<br/>
            <span style={{textDecoration:"underline"}} onClick={this.props.replaceItemsWithPinned}>ここをクリック</span>してキューされているデータを呼び出します。
            </span>
        }/>
      </div>
    );
  }
}
