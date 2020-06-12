(function() {
  var moduleList = [
    // index.js
    function(require, module, exports) {
      const moduleA = require("./moduleA");
      console.log("moduleA", moduleA);
    },
    // moduleA.js
    function(require, module, exports) {
      module.exports = new Date().getTime();
    }
  ];

  var moduleDepIdList = [{ "./moduleA": 1 }, {}];

  function require(id, parentId) {
    var currentModuleId =
      parentId !== undefined ? moduleDepIdList[parentId][id] : id;
     var module = {exports}
    }
  // var module = {exports: {}}
  // moduleList[0](null, module, module)
})();
