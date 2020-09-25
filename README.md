# [fs-json-writer](https://npmjs.com/package/fs-json-writer)

> Generate JSON file content readable by a human

The native solution [fs.writeFile](https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_fs_writefile_file_data_options_callback) combined with [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) generate a minified content because **JSON.stringify** is designed for
data transfer.

This package full rewrite a *JavaScript Object Notation* with resolve tabulation depth and resolve nested object/array.

## installation

in depending your need you can install at **dev-dependencies**

```bash
> npm install --save fs-json-writer
```

or with yarn

```bash
> yarn add fs-json-writer
```


## usage

### json file

```js
const jsonWriter = require('fs-json-writer');
const path = require('path');


const myHumanJson = {

  version: "1.0.0",
  details: "this is a stable version with goodly peoples ^.^"
};

jsonWriter({

  path: path.join( __dirname, "./file-name.json" ),

  state: myHumaJson
});

```

output *(filename.json)*
```json
{
  "version": "1.0.0",
  "details": "this is a stable version with goodly peoples ^.^"
}
```

This encoding use is always **UTF-8** for write a **JSON** content
and `path` argument should be a **absolute path**

## js file

```js
const jsonWriter = require('fs-json-writer');
const path = require('path');


const myHumanJson = {

  version: "1.0.0",
  details: "this is a stable version with goodly peoples ^.^"
};

jsonWriter({

  path: path.join( __dirname, "./file-name.js" ),
  state: myHumaJson,

  isEs6: true,
  isNoQuote: true
});

```

extension of filename determined if content should be JS or JSON file.

output *(filename.js)*
```js
export default {
  version: "1.0.0",
  details: "this is a stable version with goodly peoples ^.^"
}
```


### nested

```js
const jsonWriter = require('fs-json-writer');
const path = require('path');


const myHumanJson = {

  version: "1.0.0",
  details: "this is a stable version with goodly peoples ^.^",

  contributor: [
    "Mr.Goodman",
    "Mr.Goodman-2",
    "Mr.Goodman-3"
  ]
};

jsonWriter({

  path: path.join( __dirname, "./file-name.js" ),
  state: myHumaJson,

  isEs6: true,
  isNoQuote: true
});

```

You can nested objects any depth.

output *(filename.js)*
```js
export default {
  version: "1.0.0",
  details: "this is a stable version with goodly peoples ^.^",

  contributor: [
    "Mr.Goodman",
    "Mr.Goodman-2",
    "Mr.Goodman-3"
  ]
}
```

### reject

During generate of JSON file if argument `state` is a [not circular structure JSON](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Erreurs/Cyclic_object_value)
the functions is remplaced with string value contains function name,
any other value is convert with native method `object.toString()`.

If method **toString** not implemeted on target object throw **TypeError**


> This package has been developed for the need of package [react-native-style-parser](https://npmjs.com/package/react-native-style-parser)
and have been export because hight high reusability

Please if you detect any bugs/undetermined comportement open new [issue](https://github.com/Orivoir/fs-json-writer/issues)
