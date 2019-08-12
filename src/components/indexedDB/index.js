import Dexie from "dexie";
import {timeFormatter} from "../common/functions";

const storageWrapper = class{

  constructor(target = "pinned",keyPath = null){
    this.target = target;
    this.keyPath = keyPath;
    this.allData = null;
    this.db = new Dexie("nijieDL");
    this.db.version(1).stores({
      pinned : "++num,id, title, illustrator, url, current, pageSum, cnt , updatedAt",
      history : "name, sum, createdAt",
      historyContent : "++num, title, illustrator, url, current, pageSum, cnt , parent, updatedAt"
    })
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

  async getItem(id){
    return await this.db.pinned.where({id:id}).toArray();
  }

  async checkDuplication(id,itemNum){
    return await this.db.pinned.where({id:id,current:itemNum}).toArray();
  }

  async resetItems(id){
    return await this.db.pinned.where({id:id}).delete();
  }

  async setMultipleItem(items){
    return await this.db.pinned.bulkPut(items);
  }

  async setItem(item){
    return await this.db.pinned.put({
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

  async removeItem(id,itemNum){
    return await this.db.pinned.where({id:id,current:itemNum}).delete();
  }

}

export const historyLists = class extends storageWrapper{

  async getAll(){
    const currentData = await this.db.history.toArray();
    this.allData = currentData;
    return currentData;
  }

  async deleteAll(){
    return await this.db.history.clear();
  }

  async setItem(sum){
    return await this.db.history.put({
      name : timeFormatter(3),
      sum : sum,
      updatedAt : timeFormatter(3)
    })
  }

  async removeItem(title){
    return await this.db.history.where({title:title}).delete();
  }

}

export const historyItems = class extends storageWrapper{

  async backup(){
    const currentData = await this.db.historyContent.toArray();
    return currentData;
  }

  async getAll(parent){
    const currentData = await this.db.historyContent.where({parent:parent}).toArray();
    this.allData = currentData;
    return currentData;
  }

  async deleteAll(){
    return await this.db.historyContent.clear();
  }

  async bulkPut(items){
    return await this.db.historyContent.bulkPut(items);
  }

  async deleteItem(parent){
    return await this.db.historyContent.where({parent:parent}).delete();
  }

}

export default storageWrapper;
