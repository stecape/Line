//dimensione della larghezza base. Quella di progetto è 6, se vuoi scalare gli oggetti più in grande aumentala. Tutte le grandezze sono comunque riferite a 6
var base = 6 //default 6
//altezza testo definita in proporzione alla base.
var texth = base*1.4 //default base*1.4

//stile del colore dei componenti
export const blockStyle = (green) => {
  return {
    color: green ? "#bf360c" : "#78909c",
    fillColor: green ? "#bf360c" : "#78909c",
    fill: green ? "#bf360c" : "#78909c",
    stroke: green ? "#bf360c" : "#78909c"
  };
};
  
//stile del testo dei componenti
export const textStyle = {
  fontFamily: "Verdana",
  fontSize: texth,
  strokeWidth: 0.1,
  fill: 'gray',
  stroke: 'gray'
}

//cancella dei caratteracci che arrivano nelle stringhe restituite dai web server
export const decodeEntities = (str) => {
  if(str && typeof str === 'string') {
    // strip script/html tags
    str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '')
    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '')
  }

  return str
}
  
//base di riferimento per la dimensione di tutto
export const dim = {
  base: base
}

//usata dai componenti per ritornare le coordinate dei propri alla collezione nella FC in cui sono disegnati
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

//usata dai componenti per ottenere le coordinate in cui disegnarsi a partire dalle props x, y, w, h e anchor
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

//usata dai componenti tipo Line per disegnare pallini di connessione e frecce
export const getMarker = (base, x1, y1, x2, y2, type) => {
  let x = parseFloat(x2)-parseFloat(x1)
  let y = parseFloat(y2)-parseFloat(y1)
  var deg = x==0 ? 0 : x<0 || y<0 ? Math.atan(y/x) * 180 / Math.PI + 180 : Math.atan(y/x) * 180 / Math.PI
  var ax = parseFloat(x2)-1.4*base/6
  var ay = parseFloat(y2)+1.5*base/6
  var bx = parseFloat(x2)+1.4*base/6
  var by = parseFloat(y2)
  var cx = parseFloat(x2)-1.4*base/6
  var cy = parseFloat(y2)-1.5*base/6
  var arrow = ax + "," + ay + " " + bx + "," + by + " " + cx + "," + cy
  if (type==="startPoint") return <circle cx={parseFloat(x1)+1} cy={y1} r={2*base/6} transform={'rotate(' + deg + ')'} transform-origin={x1 + " " + y1} /> 
  if (type==="endPoint") return <circle cx={parseFloat(x2)-1} cy={y2} r={2*base/6} transform={'rotate(' + deg + ')'} transform-origin={x2 + " " + y2} /> 
  if (type==="arrow") return <polygon points={arrow} transform={'rotate(' + deg + ')'} transform-origin={x2 + " " + y2} /> 
}


//usata dalle FC per ottenere le coordinate degli anchor dei componenti
export const getAnchors = (base, anchors, ItemID, anchor, offset) => {
  var dx = 0
  var dy = 0
  if (offset) {
    dx = offset[0]*base/6
    dy = offset[1]*base/6
  }
  try {
    return [anchors[ItemID][anchor][0]+dx,anchors[ItemID][anchor][1]+dy];
  } catch {
    return [10, 10];
  }
};