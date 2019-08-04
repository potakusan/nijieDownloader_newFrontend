
const storageWrapper = class{

  constructor(target = "pinned"){
    this.target = target;
    this.allData = this.loadAllItems();
  }

  loadAllItems(){
    let all = this.getContent();
    if(!all){
      localStorage.setItem(this.target,JSON.stringify({}));
      all = {};
    }
    return all;
  }

  getContent = ()=> JSON.parse(localStorage.getItem(this.target));

  reload(){
    this.allData = this.loadAllItems();
  }

  getItem(targetId){
    return this.allData[targetId];
  }

  checkDuplication(itemId,itemNum){
    if(!this.allData[itemId]){return false;}
    return this.allData[itemId][itemNum] ? true : false;
  }

  resetItems(itemId){
    delete this.allData[itemId];
  }

  setItem(newItem,itemId,itemNum){
    if(!this.allData[itemId]){
      this.allData[itemId] = {
        [itemNum] : newItem
      }
      return;
    }
    this.allData[itemId][itemNum] = newItem;
  }

  removeItem(title,itemId,itemNum){
    delete this.allData[itemId][itemNum];
  }

  apply(){
    localStorage.setItem(this.target,JSON.stringify(this.allData));
  }

}

export default storageWrapper;

/*

pinned = {
  {
    "title":string,
    "url":string,
    "illustrator":string,
    "current":number,
    "pageSum":number,
    ...
  },...
}

albumFolder = {
  "folders" : [
    "album_name1","album_name2","album_name3",...
  ]
}

album_name1 = {
  {
    "title":string,
    "url":string,
    "illustrator":string,
    "current":number,
    "pageSum":number,
    ...
  },...
}

 */
