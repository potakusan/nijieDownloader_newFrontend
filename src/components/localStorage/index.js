export default class {

  constructor(target = "settings"){
    this._target = target;
    if(!this.item){
      this.item = {
        fileName : "$o",
        downloadType: 0
      };
    }
  }

  set item(newState){
    if(!newState.fileName){
      newState.fileName = "$o";
    }
    return localStorage.setItem(this._target, JSON.stringify(newState) );
  }

  get item(){
    return JSON.parse(localStorage.getItem(this._target));
  }
}
