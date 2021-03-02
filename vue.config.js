/**
 * @description
 * Module to import SCSS files to each VUE component and Vue application
 */
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "./src/plugins/additionalStyles/main.scss";`
      }
    }
  }
};
