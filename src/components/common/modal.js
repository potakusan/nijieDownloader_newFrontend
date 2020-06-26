import React,{Component} from "react";
import { Modal } from "antd";

export default class ModalWindow extends Component{

  render(){
    const {show,toggleModal,execute,children} = this.props;
    if(!show){
      return (null);
    }
    return (
      <div>
        <Modal
          title={"確認"}
          centered
          visible={show}
          maskClosable={true}
          closable={true}
          onCancel={toggleModal}
          onOk={execute}
        >
          {children}
        </Modal>
      </div>
    );
  }
}
