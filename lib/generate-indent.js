function generateIndent( depth ) {

  if( typeof depth !== "number" ) {

    throw new RangeError("arg1: depth, should be a number");
  }

  depth = parseInt( depth );

  return Array.from(
    Array( depth ).keys()
  )
  .map( () => "\t" )
  .join('');
}

module.exports = generateIndent;