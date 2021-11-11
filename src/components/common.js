
export const blockStyle = (green) => {
  return {
    color: green ? "#bf360c" : "#78909c",
    fillColor: green ? "#bf360c" : "#78909c",
    fill: green ? "#bf360c" : "#78909c",
    stroke: green ? "#bf360c" : "#78909c"
  };
};
  
export const textStyle = {
  fontFamily: "Verdana",
  fontSize: 8,
  strokeWidth: 0.1,
  fill: 'gray',
  stroke: 'gray'
}

export const decodeEntities = (str) => {
  if(str && typeof str === 'string') {
    // strip script/html tags
    str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '')
    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '')
  }

  return str
}