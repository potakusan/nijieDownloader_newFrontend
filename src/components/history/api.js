import {historyLists,historyItems} from "../indexedDB";

export const lists = class{
  constructor(){
    this.db = new historyLists();
  }

  async getAll(){
    return await this.db.getAll();
  }
}

export const items = class{
  constructor(){
    this.db = new historyItems();
  }

  async getThumbnails(parent,isFull = false){
    let thumbs = [];
    const items = await this.db.getAll(parent);
    items.filter((item,i)=>{
      if(i >= 5 && !isFull){
        return;
      }
      return thumbs.push(item.url);
    });
    return thumbs;
  }

}
