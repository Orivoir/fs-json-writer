const getExtension = require('./get-extension');
const onLoopObject = require('./loop-object');
const lastAttrIsObject = obj => {

  const attributes = Object.keys( obj );
  const lastAttributeName = attributes[ attributes.length - 1 ];

  return typeof obj[ lastAttributeName ] === "object";

};

const getPrepareJsFile = isEs6 => (
  isEs6 ? "export default": "module.exports ="
);

function createContentWrite({
  path,
  isEs6,
  isNoQuote,
  state
}) {

  global.__append = "";
  global.__depth = 1;
  global.__isPurelyJson = null;
  global.__isNoQuote = isNoQuote;

  const ext = getExtension( path );

  global.__isPurelyJson = ext === "json";

  if( ext === "js" ) {
    global.__append = getPrepareJsFile( isEs6 );
  }

  if(
    global.__isNoQuote &&
    global.__isPurelyJson
  ) {
    // quote is required from JSON syntax
    global.__isNoQuote = false;
  }

  global.__append += ` {\n`;

  onLoopObject( state );

  if(
    global.__isPurelyJson &&
    lastAttrIsObject( state )
  ) {
    // remove last "," from append data

    const lastIndex = global.__append.lastIndexOf(',');

    global.__append = global.__append
      .split('')
      .filter( (_,index) => index !== lastIndex )
      .join('')
    ;
  }

  global.__append += "}\n";

  return global.__append;
}

module.exports = createContentWrite;
