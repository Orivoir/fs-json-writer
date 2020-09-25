const pathResolver = require('path');

function getExtension( path ) {

  const filename = pathResolver.basename( path );

  const ext = filename.split('.').slice( -1 )[0].toLocaleLowerCase();

  return ext;
}

module.exports = getExtension;
