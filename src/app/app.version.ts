//http://stackoverflow.com/questions/34907682/how-to-display-app-version-in-angular2/35494456
declare function require(moduleName: string): any;
export const { version: appVersion } = require('../../package.json');
