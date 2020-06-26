import React,{Component} from "react";
import Lightbox from "react-image-lightbox";

export default class Image extends Component{

  render(){
    const {imageUrls,index,close,move} = this.props;
    return (
      <Lightbox
        mainSrc={imageUrls[index]}
        nextSrc={imageUrls[(index + 1) % imageUrls.length]}
        prevSrc={imageUrls[(index + imageUrls.length - 1) % imageUrls.length]}
        onCloseRequest={() => close()}
        onMovePrevRequest={() =>move((index + imageUrls.length - 1) % imageUrls.length)}
        onMoveNextRequest={() =>move((index + 1) % imageUrls.length)}
      />
    );
  }
}
