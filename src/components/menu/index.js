import React,{Component} from "react";
import { Menu, Dropdown } from "antd";

export default class DropDownMenu extends Component{

  openLink = ()=> window.open( "//nijie.info/view.php?id=" + this.props.id );

  render(){
    const {
      children,
      id,
      allSelect,
      allRemove,
      toggleAllSelection,
      toggleEditor,
      allPinned,
      allRemovePinned,
      toggleAllPinnedStatus,
      disableStatusButtons
    } = this.props;

    const menu = (
      <Menu>
        {!disableStatusButtons &&
          <Menu.ItemGroup title="選択状態">
            <Menu.Item key="0">
              <span
                onClick={allSelect}
                data-id={id}
              >すべて選択</span>
            </Menu.Item>
            <Menu.Item key="1">
              <span
                onClick={allRemove}
                data-id={id}
              >すべて除外</span>
            </Menu.Item>
            <Menu.Item key="2">
              <span
                onClick={toggleAllSelection}
                data-id={id}
              >選択/除外の一括反転</span>
            </Menu.Item>
          </Menu.ItemGroup>
        }
        <Menu.ItemGroup title="ピン留め">
          <Menu.Item key="3">
            <span
              onClick={allPinned}
              >一括ピン留め</span>
          </Menu.Item>
          <Menu.Item key="4">
            <span
              onClick={allRemovePinned}
              >一括ピン留め解除</span>
          </Menu.Item>
          <Menu.Item key="5">
            <span
              onClick={toggleAllPinnedStatus}
              >ピン留め状態の一括反転</span>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="その他">
          <Menu.Item key="7">
            <span
              onClick={toggleEditor}
              data-id={id}>情報の変更</span>
          </Menu.Item>
          <Menu.Item key="8">
            <span
              onClick={this.openLink}>ニジエ上で開く</span>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );

    return (
      <Dropdown
        overlay={menu}
        trigger={["hover"]}>
        {children}
      </Dropdown>)
  }

}
