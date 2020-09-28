const generateIndent = require('./generate-indent');

function unminifiedJson(json, onReplace, space) {

  json = JSON.stringify(
    json,
    onReplace instanceof Function ? onReplace: undefined,
    !!space ? space: undefined
  );

  let jsonUnminified = "";

  let depth = 0;

  let isInString = false;

  json.split('').forEach(char => {

    if( char === "'" || char === '"' ) {

      isInString = !isInString;
    }

    if( char === "{"  || char === "[" ) {

      depth++;
      jsonUnminified += char + "\n" + generateIndent( depth );
    }
    else if( char === "}" || char === "]") {

      depth--;
      jsonUnminified += "\n" + generateIndent( depth ) + char ;
    }
    else if( char === "," && !isInString ) {

      jsonUnminified += ",\n" + generateIndent( depth );
    }
    else if( char === ":" && !isInString ) {

      jsonUnminified += char + " ";
    }
    else {

      jsonUnminified += char;
    }

  });

  return jsonUnminified;
}

module.exports = unminifiedJson;
