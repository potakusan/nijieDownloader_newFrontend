import React,{Component} from "react";
import Error from "../views/error";

export default class NoImg extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div style={{ background: '#fff', minHeight: 280 }} className="commonPadding">
        <Error
          message={"この機能を使用するにはPOSTメソッドを経由してアクセスしてください。"}
          additionalDescription={
            <span>
              ブックマークレットを介してアクセスしてください。<br/>
            <a href={null} onClick={this.props.replaceItemsWithPinned}>ここをクリック</a>してキューされているデータを呼び出します。
            </span>
        }/>
      </div>
    );
  }
}
