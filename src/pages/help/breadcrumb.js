import React,{Component} from "react";
import { Icon, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

class HelpBreadcrumb extends Component{

  render(){
    const {children} = this.props;
    return (
    <div className="commonPadding">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Icon type="home" />
          <span><Link to="/">ホーム</Link></span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Icon type="question-circle" />
          <span><Link to="/help/">ヘルプ</Link></span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {children}
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>);
  }

}

export default HelpBreadcrumb
