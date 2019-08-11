import React,{Component} from "react";
import { Menu, Dropdown } from "antd";

export default class DropDownMenu extends Component{

  constructor(props){
    super(props);
  }

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
              <a
                href={null}
                onClick={allSelect}
                data-id={id}
              >すべて選択</a>
            </Menu.Item>
            <Menu.Item key="1">
              <a
                onClick={allRemove}
                data-id={id}
              >すべて除外</a>
            </Menu.Item>
            <Menu.Item key="2">
              <a
                onClick={toggleAllSelection}
                data-id={id}
              >選択/除外の一括反転</a>
            </Menu.Item>
          </Menu.ItemGroup>
        }
        <Menu.ItemGroup title="ピン留め">
          <Menu.Item key="3">
            <a
              onClick={allPinned}
              >一括ピン留め</a>
          </Menu.Item>
          <Menu.Item key="4">
            <a
              onClick={allRemovePinned}
              >一括ピン留め解除</a>
          </Menu.Item>
          <Menu.Item key="5">
            <a
              onClick={toggleAllPinnedStatus}
              >ピン留め状態の一括反転</a>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="アルバム">
          <Menu.Item key="6">
            <a>アルバムに一括追加</a>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="その他">
          <Menu.Item key="7">
            <a
              onClick={toggleEditor}
              data-id={id}>情報の変更</a>
          </Menu.Item>
          <Menu.Item key="8">
            <a
              onClick={this.openLink}>ニジエ上で開く</a>
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
