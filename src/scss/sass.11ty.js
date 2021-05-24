const fs = require('fs');
const path = require('path');
const sass = require('sass');

module.exports = class {
  data() {
    const cssDir = path.join(__dirname, '.');
    const rawFilepath = path.join(cssDir, 'styles.scss');

    return {
      permalink: `css/styles-scss.css`,
      rawFilepath,
      cssDir
    };
  }

  render(data) {
    var result = sass.renderSync({
        file: data.rawFilepath,
        includePaths: [data.cssDir],
        //outputStyle: "compressed"
    });
    return result.css.toString();
  }
};