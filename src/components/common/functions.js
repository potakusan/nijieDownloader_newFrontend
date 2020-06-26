import moment from "moment";
require("moment/locale/ja");

export const htmlEntities = (text) =>{
  const entities = [
    ["amp", "&"],
    ["#039", "\'"],
  ];

  for ( let i = 0, max= entities.length;  i < max; ++i ) {
      text = text.replace( "&quot;", "\"" ).replace( new RegExp( "&"+entities[i][0]+";", "g" ), entities[i][1] );
  }
  return text;
}

export const timeFormatter = (type = 0,date = new Date()) =>{
  const m = moment(date);
  switch (type){
    case 0:
    return m.format("YYYYMMDDHHmmss");
    case 1:
    return m.format("YYYYMMDD");
    case 2:
    return m.format("HHmmss");
    case 3:
    return m.format("YYYY-MM-DD HH:mm:ss");
  }
}

export const imgToThumbnails = (url)=>{

  const thumbsize = 150;
  const beforeReplace = [
    new RegExp(/\/nijie_picture\//g),
    new RegExp(/\/dojin_main\//g),
  ]
  const afterReplace = [
    `/__rs_l${Number(thumbsize+50)}x${Number(thumbsize+50)}/nijie_picture/`,
    `/__rs_l${Number(thumbsize+50)}x${Number(thumbsize+50)}/dojin_main/`
  ];

  return url.replace(beforeReplace[0],afterReplace[0]).replace(beforeReplace[1],afterReplace[1]);

}
