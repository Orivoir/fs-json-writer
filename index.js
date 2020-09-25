const fs = require('fs');
const createContentWrite = require('./lib/create-content-write');

global.__depth = 1;
global.__append = 1;

// if is a JS or JSON file
global.__isPurelyJson = null;

function writeJson({
  state,
  path,
  isEs6,
  isNoQuote
}) {

  append = createContentWrite( {
    state,
    path,
    isEs6,
    isNoQuote
  } );

  fs.writeFileSync(
    path,
    append,
    {
      encoding: "utf-8"
    }
  );

}

// Promise async writing
writeJson.async = function({
  state,
  path,
  isEs6,
  isNoQuote
}) {

  return new Promise( (resolve,reject) => {

    fs.writeFile(
      path,
      createContentWrite({
        state,
        path,
        isEs6,
        isNoQuote
      }),
      error => {

        if( error ) {
          reject( error );
        } else {

          resolve( {
            state,
            path
          } );

        }
      }
    )

  } );

};

// permuted callback system natively used from file system module async
writeJson.legacyAsync = function({
  state,
  path,
  isEs6,
  isNoQuote,
  callback,
  onError,
  onSuccess
}) {

  fs.writeFile(
    path,
    createContentWrite({
      state,
      path,
      isEs6,
      isNoQuote
    }),
    error => {

      if( error ) {

        if( onError instanceof Function ) {

          onError( error );
        } else if( callback instanceof Function ) {

          callback( error );
        }

      } else {

        if( onSuccess instanceof Function ) {

          onSuccess( {
            state,
            path
          } );
        } else if( callback instanceof Function ) {

          callback( {
            state,
            path
          } );
        }

      }
    }
  )

};

module.exports = writeJson;
