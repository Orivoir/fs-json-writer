const {expect} = require('chai');

const jsonWrite = require('./../index');
const pathResolver = require('path');

const factory = require('./factory-data/fs-writer.json');

describe('test json-writer: /index', () => {

  describe('synchrone', () => {

    describe('generate file js', () => {

      factory.js.forEach(call => {

        const message = `should generated valid module js syntax`;

        it( message, () => {

          const pathWrite = pathResolver.join( __dirname, call.entry.path );

          jsonWrite({
            path: pathWrite,
            state: call.entry.state
          });

          const generatedJs = require( pathWrite );

          expect( generatedJs )
          .to.deep
          // while js/json generated is valid
          .equal( JSON.parse( JSON.stringify( generatedJs ) ) );

        } );

      });

    } );

    // describe('generate file json', () => {} );

  } );

  describe('async', () => {

    describe('generate file js', () => {

      factory.js.forEach(call => {

        const message = `should generated valid module js syntax`;

        it( message, () => {

          const pathWrite = pathResolver.join( __dirname, call.entry.path );

          jsonWrite.async({
            path: pathWrite,
            state: call.entry.state
          }).then( () => {

            const generatedJs = require( pathWrite );

            expect( generatedJs )
            .to.deep
            // while js/json generated is valid
            .equal( JSON.parse( JSON.stringify( generatedJs ) ) );

          } );

        } );

      });

    } );

    // describe('generate file json', () => {} );

  } );

  describe('legacy async', () => {

    describe('generate file js', () => {

      factory.js.forEach(call => {

        const message = `should generated valid module js syntax`;

        it( message, () => {

          const pathWrite = pathResolver.join( __dirname, call.entry.path );

          jsonWrite.legacyAsync({
            path: pathWrite,
            state: call.entry.state,
            onSuccess: function() {

              const generatedJs = require( pathWrite );

              expect( generatedJs )
              .to.deep
              // while js/json generated is valid
              .equal( JSON.parse( JSON.stringify( generatedJs ) ) );

            }
          });

        } );

      });

    } );

    // describe('generate file json', () => {} );

  } );

} );
