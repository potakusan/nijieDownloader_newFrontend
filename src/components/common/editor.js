import React,{Component} from "react";
import { Modal, Button, Form, Input, Icon, Spin } from 'antd';

export default class Editor extends Component{

  constructor(props){
    super(props);
    this.state = {
      isProcessing : false,
    }
    this.handleChangeProgress = this.handleChangeProgress.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  handleChangeProgress(){
    return new Promise(async (resolve) => {
      const {title,illustrator} = this.state;
      this.setState({isProcessing:true});
      await this.props.executeChanger(title,illustrator);
      resolve();
    });
  }

  async handleOk(){
    if(this.state.isProcessing){return;}
    this.handleChangeProgress();
    this.props.toggleEditor();
    setTimeout(()=>{
      this.setState({isProcessing:false});
    },500);
  };

  handleCancel = () => {
    if(this.state.isProcessing){return;}
    this.props.toggleEditor();
  }

  handleChangeTitle = (e)=>this.setState({title : e.target.value})
  handleChangeIllustrator = (e)=>this.setState({illustrator : e.target.value})

  render() {
    const { isProcessing } = this.state;
    const {
      visible,
      currentSelection,
      handleChangeTitle,
      handleChangeIllustrator } = this.props;
    return (
      <div>
        <Modal
          title="情報の変更"
          visible={visible}
          footer={[
            <Button key="back" onClick={isProcessing ? ()=>{return} : this.props.toggleEditor}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={isProcessing ? ()=>{return} : this.handleOk}>
              Edit
            </Button>,
          ]}
        >
          <Spin tip="変更を保存しています" spinning={isProcessing}>
            <p>アイテムに登録された情報を変更します。</p>
            <Form className="editor-form">
              <Form.Item className="fullWidth">
                <Input
                  prefix={<Icon type="file-image" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange={handleChangeTitle}
                  value={currentSelection.title}
                  readOnly={isProcessing}
                  placeholder="タイトル"
                />
              </Form.Item>
              <Form.Item className="fullWidth">
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange={handleChangeIllustrator}
                  value={currentSelection.illustrator}
                  readOnly={isProcessing}
                  placeholder="作者名"
                />
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
      </div>
    );
  }

}
