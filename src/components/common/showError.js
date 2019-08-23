import { notification } from "antd";

export default (description,duration = 3,type = 0)=>{
  let mes = {
    message : "Exception Error Occured!",
    description: description,
    duration: duration,
  };
  switch(type){
    case 0: return notification.error(mes);
    case 1: return notification.warning(mes);
  }
}
