const getExtension = require('./get-extension');
const onLoopObject = require('./loop-object');

const getPrepareJsFile = isEs6 => (
  isEs6 ? "export default": "module.exports ="
);

function createContentWrite({
  path,
  isEs6,
  isNoQuote,
  state,
  worker
}) {

  let {append, isPurelyJson, options} = worker;

  const ext = getExtension( path );

  isPurelyJson = ext === "json";

  if( ext === "js" ) {
    append = getPrepareJsFile( isEs6 );
  }

  if(
    isNoQuote &&
    isPurelyJson
  ) {
    // quote is required from JSON syntax
    isNoQuote = false;
  }

  append += ` {\n`;

  append += onLoopObject( state, {...options, isPurelyJson} );

  append += "}\n";

  return append;
}

module.exports = createContentWrite;
