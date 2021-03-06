import styles from "./../../theme/style.module.css";
import React,{Component} from "react";
import { Layout } from "antd";
const { Header } = Layout;

class PageHeader extends Component{

  render(){
    const {children} = this.props;
    return (
      <Header className={styles.header} style={{borderBottom:"1px solid #003a8c"}}>
        {children}
      </Header>
    )
  }
}

export default PageHeader;
