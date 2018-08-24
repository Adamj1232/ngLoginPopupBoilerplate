// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    // './e2e/**/feedback.e2e-spec.ts'
    // './e2e/**/device-details.e2e-spec.ts'
    // './e2e/**/device.e2e-spec.ts'
    // './e2e/**/ooc-admin.e2e-spec.ts',
    // './e2e/**/device-show.e2e-spec.ts'
    // './e2e/**/*.e2e-spec.ts'
    // './e2e/self-service.e2e-spec.ts'
    // './e2e/device-groups.e2e-spec.ts',
    // './e2e/device-groups-create.e2e-spec.ts'
    // './e2e/timeline.e2e-spec.ts'
    // './e2e/role-admin.e2e-spec.ts'
    './e2e/edit-user.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },
  onPrepare() {
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
