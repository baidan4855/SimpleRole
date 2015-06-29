Package.describe({
  name: 'jackjiang:role',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use([
    "underscore",
    "accounts-base",
    "accounts-password"
  ]);
  api.addFiles([
    'role.js'
  ],['client','server']);

  api.addFiles([
    'inject.js',
    'server.js',
    'fixtures.js'

  ],['server']);

  api.addFiles([
    'client.js'
  ],['client']);



  api.export([
    'Roles'
  ]);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('jackjiang:role');
  api.addFiles('role-tests.js');
});
