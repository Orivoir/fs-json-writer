/**
 * @description used remove last "," from purely JSON content generated
 * @param {object} obj
 * @return boolean
 */
function lastAttrIsObject(obj) {

  if(
    typeof obj !== "object" ||

    // because typeof null can be object
    !obj
  ) {

    throw RangeError( "arg1: obj, should be a object" );
  }

  const attributes = Object.keys( obj );
  const lastAttributeName = attributes[ attributes.length - 1 ];

  return typeof obj[ lastAttributeName ] === "object";
};

module.exports = lastAttrIsObject;