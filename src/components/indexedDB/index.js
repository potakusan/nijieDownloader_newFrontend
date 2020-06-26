import Dexie from "dexie";
import {timeFormatter} from "../common/functions";

const storageWrapper = class{

  async openTransaction(type,target){
    let pArray = [target.map(t=>t.clear())];
    return this.db.transaction(type,target, async ()=>{
      return Promise.all(pArray)
    })
    .then(result => { return {res:result,error:false} })
    .catch(error => { return {res:error,error:true} });
  }

  _this(){
    return this.db;
  }

  constructor(target = "pinned",keyPath = null){
    this.target = target;
    this.keyPath = keyPath;
    this.allData = null;
    this.db = new Dexie("nijieDL");
    this.db.version(1).stores({
      pinned : "++num,id, title, illustrator, url, current, pageSum, cnt , updatedAt",
      history : "name, sum, fileSize, createdAt",
      historyContent : "++num, title, illustrator, url, current, pageSum, cnt , parent, updatedAt",
    });
    this.db.version(2).stores({
      debugLogs : "++num, createdAt, body, isSuccess",
    });
  }

  groupByItemId(innerArray = false){
    let groups = {};
    const store = this.allData;
    store.forEach(item=>{
      if(!groups[item.id]){
        groups[item.id] = innerArray ? [] : {};
      }
      innerArray ?
      groups[item.id].push(item) :
      groups[item.id][item.current] = item;
    });
    return groups;
  }

}

export const pinnedDB = class extends storageWrapper{

  // Load all pinned-items
  async getAll(){
    const currentData = await this.db.pinned.toArray();
    this.allData = currentData;
    return currentData;
  }

  deleteAll(){
    return this.db.pinned.clear();
  }

  getItem(id){
    return this.db.pinned.where({id:id}).toArray();
  }

  checkDuplication(id,itemNum){
    return this.db.pinned.where({id:id,current:itemNum}).toArray();
  }

  resetItems(id){
    return this.db.pinned.where({id:id}).delete();
  }

  setMultipleItem(items){
    return this.db.pinned.bulkPut(items);
  }

  setItem(item){
    return this.db.pinned.put({
      id : item.id,
      title : item.title,
      illustrator : item.illustrator,
      url : item.url,
      current : item.current,
      pageSum : item.pageSum,
      cnt : item.cnt,
      updatedAt : timeFormatter(3)
    })
  }

  removeItem(id,itemNum){
    return this.db.pinned.where({id:id,current:itemNum}).delete();
  }

}

export const historyLists = class extends storageWrapper{

  async getAll(){
    const currentData = await this.db.history.toArray();
    this.allData = currentData;
    return currentData;
  }

  deleteAll(){
    return this.db.history.clear();
  }

  setMultipleItem(items){
    return this.db.history.bulkPut(items);
  }

  setItem(sum,fileSize){
    return this.db.history.put({
      name : timeFormatter(3),
      sum : sum,
      fileSize : fileSize,
      updatedAt : timeFormatter(3)
    })
  }

  removeItem(title){
    return this.db.history.where({title:title}).delete();
  }

}

export const historyItems = class extends storageWrapper{

  backup(){
    return this.db.historyContent.toArray();
  }

  async getAll(parent){
    const currentData = await this.db.historyContent.where({parent:parent}).toArray();
    this.allData = currentData;
    return currentData;
  }

  async getAllItems(){
    const currentData = await this.db.historyContent.toArray();
    this.allData = currentData;
    return currentData;
  }

  deleteAll(){
    return this.db.historyContent.clear();
  }

  bulkPut(items){
    return this.db.historyContent.bulkPut(items);
  }

  deleteItem(parent){
    return this.db.historyContent.where({parent:parent}).delete();
  }

}

export const debugLogs = class extends storageWrapper{

  async getAllItems(){
    const currentData = await this.db.debugLogs.toArray();
    this.allData = currentData;
    return currentData;
  }

  deleteAll(){
    return this.db.debugLogs.clear();
  }

  bulkPut(items){
    return this.db.debugLogs.bulkPut(items);
  }

  setItem(body,isSuccess = true,){
    return this.db.debugLogs.put({
      createdAt : timeFormatter(3),
      body : body,
      isSuccess : isSuccess,
    })
  }

}

export default storageWrapper;
