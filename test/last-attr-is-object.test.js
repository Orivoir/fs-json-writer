const {expect} = require('chai');

const lastAttrIsObject = require('./../lib/last-attr-is-object');

const factory = require('./factory-data/last-attr-is-object.json');

describe('test lastAttrIsObject: /lib/last-attr-is-object', () => {

  describe('return value', () => {

    factory.forEach( call => {

      const message = `should return: ${call.output}`;

      it( message, () => {

        expect( lastAttrIsObject( call.entry ) ).to.be.equal( call.output );

      } );

    } );

  } );

  describe('RangeError', () => {

    [
      null,
      false,
      true,
      NaN,
      Infinity,
      42,
      "hi world!"
    ]
    .forEach( argError => {

      const fxThrow = () => lastAttrIsObject(  argError );

      const message = `should throw with: ${argError}`;

      it( message, () => {

        expect(fxThrow).to.throw( RangeError , "arg1: obj, should be a object" );

      } );

    } );

  } );

} );
