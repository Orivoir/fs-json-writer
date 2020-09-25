const fs = require('fs');
const createContentWrite = require('./lib/create-content-write');

function hydrateOptions({isEs6, isNoQuote}) {

  writeJson.details.options.isEs6 = !!isEs6;
  writeJson.details.options.isNoQuote = !!isNoQuote;

  return writeJson.details.options;
}

function writeJson({
  state,
  path,
  isEs6,
  isNoQuote
}) {

  hydrateOptions( { isEs6, isNoQuote } );

  append = createContentWrite( {
    state,
    path,
    isEs6,
    isNoQuote,
    worker: writeJson.details
  } );

  fs.writeFileSync(
    path,
    append,
    {
      encoding: "utf-8"
    }
  );

}

// Promise async writer
writeJson.async = function({
  state,
  path,
  isEs6,
  isNoQuote
}) {

  hydrateOptions( { isEs6, isNoQuote } );

  return new Promise( (resolve,reject) => {

    fs.writeFile(
      path,
      createContentWrite({
        state,
        path,
        isEs6,
        isNoQuote,
        worker: writeJson.details
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

  hydrateOptions( { isEs6, isNoQuote } );

  fs.writeFile(
    path,

    createContentWrite({
      state,
      path,
      isEs6,
      isNoQuote,
      worker: writeJson.details
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

writeJson.details = {
  append: "",
  options: {
    isEs6: null,
    isNoQuote: null
  }
};

module.exports = writeJson;
