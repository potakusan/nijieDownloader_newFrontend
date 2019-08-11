import Dexie from "dexie";

const storageWrapper = class{

  constructor(target = "pinned",keyPath = null){
    this.target = target;
    this.keyPath = keyPath;
    this.allData = null;
    this.db = new Dexie("nijieDL");
    this.db.version(1).stores({
      pinned : "++id,itemId, title, illustrator, url, current, pageSum, cnt , updatedAt",
      albums : "name, sum, updatedAt",
      albumContent : "itemId, title, illustrator, url, current, pageSum, cnt , updatedAt",
      history : "name, sum, createdAt",
      historyContent : "itemId, title, illustrator, url, current, pageSum, cnt , updatedAt"
    })
  }

  // Load all pinned-items
  async getAll(){
    const currentData = await this.db.pinned.toArray();
    this.allData = currentData;
    return currentData;
  }

  async getItem(itemId){
    return await this.db.pinned.where({itemId:itemId}).toArray();
  }

  async checkDuplication(itemId,itemNum){
    return await this.db.pinned.where({itemId:itemId,current:itemNum}).toArray();
  }

  async resetItems(itemId){
    return await this.db.pinned.where({itemId:itemId}).delete();
  }

  async setMultipleItem(items){
    return await this.db.pinned.bulkPut(items);
  }

  async setItem(item){
    return await this.db.pinned.put({
      itemId : item.id,
      title : item.title,
      illustrator : item.illustrator,
      url : item.url,
      current : item.current,
      pageSum : item.pageSum,
      cnt : item.cnt,
      updatedAt : new Date().toString()
    })
  }

  async removeItem(itemId,itemNum){
    return await this.db.pinned.where({itemId:itemId,current:itemNum}).delete();
  }


}

/*
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

  getAll(){
    return this.allData;
  }

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

  replaceAll(newItems){
    this.allData = newItems;
  }

  apply(){
    return new Promise(resolve=>{
      localStorage.setItem(this.target,JSON.stringify(this.allData));
    }
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

albumFolder = [
  "album_name1","album_name2","album_name3",...
]

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

downloadHistory = [
  "history_name1","history_name2","history_name3",...
]

history_name1 = {
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

export default storageWrapper;
