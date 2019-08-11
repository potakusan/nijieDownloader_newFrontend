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
