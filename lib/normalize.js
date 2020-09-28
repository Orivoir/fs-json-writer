function normalize( {
  content,
  extension,
  isEs6,
  isNoQuote
} ) {

  if( extension === "json" ) {

    return content;

  } else {

    content = (!isEs6 ? "module.exports = ": "export default ") + content;

    return content;
  }

}

module.exports = normalize;
