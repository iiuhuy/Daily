(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function logA() {
    console.log('function logA called');
  }

  logA();

}));
