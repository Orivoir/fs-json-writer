const generateIndent = require('./generate-indent');

global.__isArrayLoop = false;

function persistDataType( value ) {

  if( typeof value === "string" ) {

    return '"' + value + '"';
  } else {

    return value;
  }
}

function getPropertyWrite( property ) {

  const stringType = global.__isNoQuote ? "": '"';

  return stringType + property  + stringType;
}

function depthEnd() {

  if( global.__depth > 1 ) {
    global.__depth--;
    global.__append += generateIndent( global.__depth ) + ( global.__isArrayLoop ? "]": "}");

    // finish run currently depth object
    global.__isArrayLoop = false;

    global.__append += ",";

    global.__append += "\n";
  }

}


function onLoopObject( obj ) {

  Object.keys( obj ).forEach( (property,key) => {

    if( !global.__isArrayLoop ) {

      global.__append += generateIndent( global.__depth ) + getPropertyWrite( property ) + ": ";
    }

    if( typeof obj[ property ] === "object" ) {

      global.__depth++;

      if( obj[property] instanceof Array ) {
        global.__append += " [";
        global.__isArrayLoop = true;
      } else {
        global.__append += " {";
      }

      global.__append += "\n";
      onLoopObject( obj[ property ] );

    } else {

      if(
        obj[ property ] instanceof Function &&
        global.__isPurelyJson
      ) {
        obj[ property ] = `[Function ${obj[property].name} (${obj[property].length})]`;
      }

      if( global.__isArrayLoop ) {

        global.__append += generateIndent( global.__depth );
      }

      global.__append += persistDataType( obj[property] ) ;

      if( key < (Object.keys( obj ).length-1) ) {

        global.__append += ",";
      }

      global.__append += "\n";
    }

  } );

  depthEnd();

}

module.exports = onLoopObject;
