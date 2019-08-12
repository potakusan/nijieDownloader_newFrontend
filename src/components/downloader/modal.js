import React,{Component} from "react";
import { Layout, Button, Modal, Progress } from "antd";
import { Link } from "react-router-dom";

export default class ModalWindow extends Component{

  render(){
    const {p,c,s,closeModal,currentItem,currentNum,imageSum,cancelButton} = this.props;
    if(!currentItem){
      return (null);
    }
    return (
      <div>
        <Modal
          title={p === 100 ? "完了" : "ダウンロードしています"}
          centered
          visible={s}
          maskClosable={c}
          closable={c}
          footer={
            [
              <Button key="cancelButton" onClick={this.handleCancel} disabled={p === 100} onClick={cancelButton}>
                中止
              </Button>
            ]
          }
          onCancel={closeModal}
          width={600}
        >
        <Progress percent={p} status={p === 100 ? null : "active"}/>
        { p === 100 &&
          <p align="center">
            ダウンロードが完了しました。<br/>
            過去ダウンロードしたファイル一覧は「<Link to="/history">履歴</Link>」より確認できます。
          </p>
        }
        { p < 100 &&
          <p align="center">
            <b>Total : {currentNum} of {imageSum}</b><br/>
            {currentItem["title"]} by {currentItem["illustrator"]} ( {currentItem["current"]} of {currentItem["pageSum"]} )<br/>
            {currentItem["url"]}
          </p>
        }
        </Modal>
      </div>
    );
  }
}
