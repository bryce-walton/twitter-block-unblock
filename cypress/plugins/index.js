const cypressTypeScriptPreprocessor = require("./cy-ts-preprocessor");

module.exports = on => {
  on("file:preprocessor", cypressTypeScriptPreprocessor);
};

module.exports = on => {
  on('task', {
    log (message) {
      console.log(message);
      return null
    }
  });
};