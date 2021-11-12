var base = 10 //default 6
var texth = base*1.4 //default base*1.4

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
  fontSize: texth,
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
  
export const dim = {
  base: base
}

export const anchorsSet = (anchor, x, y, w, h) => {
  switch (anchor) {
    case 0:
      return [
        [x, y],
        [x + w/2, y - h/2],
        [x + w, y],
        [x + w/2, y + h/2]
      ];

    case 1:
      return [
        [x - w/2, y + h/2],
        [x, y],
        [x + w/2, y + h/2],
        [x, y + h]
      ];

    case 2:
      return [
        [x - w, y],
        [x - w/2, y - h/2],
        [x, y],
        [x - w/2, y + h/2]
      ];

    case 3:
      return [
        [x - w/2, y - h/2],
        [x, y - h],
        [x + w/2, y - h/2],
        [x, y]
      ];

    default:
      return [
        [x, y],
        [x, y],
        [x, y],
        [x, y]
      ];
  }
};

export const getCoord = (anchor, x, y, w, h) => {
  switch (anchor) {
    case 0:
      return [x, y - h/2];

    case 1:
      return [x - w/2, y];

    case 2:
      return [x - w, y - h/2];

    case 3:
      return [x - w/2, y - h];

    default:
      return [x, y];
  }
};