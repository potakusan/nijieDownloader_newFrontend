import React,{Component} from "react";
import { Layout,Button,Icon } from "antd";
import styles from "./../theme/style.module.css";
const { Header } = Layout;

class PageHeader extends Component{
  constructor(){
    super();
  }

  render(){
    const {children, downloadButton} = this.props;
    return (
      <Header className={styles.header}>
        {children}
        {downloadButton &&
          <span style={{"display":"inline-block","float":"right"}}>
            <Button type="dashed" ghost>
              <Icon type="download" />
              Download
            </Button>
          </span>}
      </Header>
    )
  }
}

export default PageHeader;
