import localStorage from "../localStorage";
import {timeFormatter}  from "./functions";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {historyLists,historyItems} from "../indexedDB";

export default class{

  constructor(imageSum){
    const t = new localStorage().item;
    this.sum = imageSum;
    this.fileName = t.fileName;
    this.downloadType = t.downloadType;
    this.zip = new JSZip();
    this.date = new Date();

    this.currentName = null;
    this.currentExt = null;
    this.currentItem = null;

    this.proxy = "https://proxy.poyashi.me/?type=nijie&url=";
  }

  async wait(msec = 300){
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve();
      },msec);
    })
  }

  async fetch(include = true){
    await this.wait();
    const res = await fetch(this.proxy + this.currentItem.url, {method:"GET"});
    console.log(this.currentItem,this.currentName,this.currentExt)
    if(!this.currentItem || !this.currentName || !this.currentExt){
      return {"error":true,"reason":"(Process will continue) Invalid URL Parameters sent.(Filename or extension,or both was not found) - currentFile:" + this.currentItem.title};
    }
    if(!res.ok){
      return {"error":true,"reason":"(Process will continue) Response is not valid - Expected 200 but got " + res.status + ". - currentFile:" + this.currentItem.title};
    }
    if(include){
      this.zip.file(this.currentName + this.currentExt,await res.arrayBuffer());
    }
    return {"error":false};
  }

  async downloadIt(downloadedImages){
    try{
      const t = await this.zip.generateAsync({type:"blob"});
      saveAs(t,timeFormatter(0) + ".zip");

      const lists = new historyLists();
      const parent = await lists.setItem(this.sum);

      for(let i = 0; i < downloadedImages.length;++i){
        downloadedImages[i]["parent"] = parent;
      }

      const items = new historyItems();
      await items.bulkPut(downloadedImages);
    }catch(e){
      return {"error":true,"reason":"(Aborted)" + e.message};
    }
  }

  convertFileName(currentItem,iId){
    const d = currentItem.url.match(".+/(.+?)\.[a-z]+([\?#;].*)?$");
    const fileName = d[1];
    this.currentItem = currentItem;
    this.currentExt = currentItem.url.match(/\.(?!.*\.).*$/) ? currentItem.url.match(/\.(?!.*\.).*$/)[0] : ".jpg";
    this.currentName = this.fileName.replace(
      /\$o/g,fileName
    ).replace(
      /\$r/g,timeFormatter(1,this.date)
    ).replace(
      /\$d/g,timeFormatter(2,this.date)
    ).replace(
      /\$n/g,currentItem.current
    ).replace(
      /\$s/g,currentItem.pageSum
    ).replace(
      /\$u/g,currentItem.illustrator
    ).replace(
      /\$l/g,iId
    ).replace(
      /\$i/g,currentItem.id
    ).replace(
      /\$t/g,currentItem.title
    )
    return this;
  }


}
