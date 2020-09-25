const generateIndent = require('./generate-indent');
const lastAttrIsObject = require('./last-attr-is-object');

function persistDataType( value ) {

  if( typeof value === "string" ) {

    return '"' + value + '"';
  } else {

    return value;
  }
}

function getPropertyWrite( property ) {

  const stringType = onLoopObject.details.options.isNoQuote ? "": '"';

  return stringType + property  + stringType;
}

// after finish run a object/array
function depthEnd(obj) {

  // if last attribute of currently object is a *depth* object
  // should remove currently last "," because not natural skip by loop ( local of @arg obj object )
  if(
    onLoopObject.details.options.isPurelyJson &&
    lastAttrIsObject(obj)
  ) {
    // remove last "," from append data

    const lastIndex = onLoopObject.details.append.lastIndexOf(',');

    onLoopObject.details.append = onLoopObject.details.append
      .split('')
      .filter( (_,index) => index !== lastIndex )
      .join('')
    ;
  }

  if( onLoopObject.details.depth > 1 ) {
    onLoopObject.details.depth--;
    onLoopObject.details.append += generateIndent( onLoopObject.details.depth ) + ( onLoopObject.details.isArrayLoop ? "]": "}");

    // finish run currently depth object
    onLoopObject.details.isArrayLoop = false;

    onLoopObject.details.append += ",";

    onLoopObject.details.append += "\n";
  }

}

function onLoopObject( obj, options ) {

  if( typeof options === "object" ) {

    onLoopObject.details.options = options;
  }

  Object.keys( obj ).forEach( (property,key) => {

    if( !onLoopObject.details.isArrayLoop ) {
      onLoopObject.details.append += generateIndent( onLoopObject.details.depth ) + getPropertyWrite( property ) + ": ";
    }

    if( typeof obj[ property ] === "object" ) {

      onLoopObject.details.depth++;

      if( obj[property] instanceof Array ) {
        onLoopObject.details.append += " [";
        onLoopObject.details.isArrayLoop = true;
      } else {
        onLoopObject.details.append += " {";
      }

      onLoopObject.details.append += "\n";
      onLoopObject( obj[ property ] );

    } else {

      if(
        obj[ property ] instanceof Function &&
        onLoopObject.details.options.isPurelyJson
      ) {
        obj[ property ] = `[Function ${obj[property].name} (${obj[property].length})]`;
      }

      if( onLoopObject.details.isArrayLoop ) {

        onLoopObject.details.append += generateIndent( onLoopObject.details.depth );
      }

      onLoopObject.details.append += persistDataType( obj[property] ) ;

      if( key < (Object.keys( obj ).length-1) ) {

        onLoopObject.details.append += ",";
      }

      onLoopObject.details.append += "\n";
    }

  } );

  depthEnd( obj );

  return onLoopObject.details.append;
}

onLoopObject.details = {

  isArrayLoop: false,
  append: "",
  depth: 1,
  options: null
};

module.exports = onLoopObject;
