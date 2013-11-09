'use strict';

angular.module('StartingPointJSApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      {name: 'NodeJS', description: 'Node.js is a platform built on Chrome\'s JavaScript runtime for easily building fast, scalable network applications.'},
      {name: 'ExpressJS', description: 'ExpressJS is a web application framework for node.'},
      {name: 'HTML5 Boilerplate', description: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.'},
      {name: 'AngularJS', description: 'AngularJS is a toolset for building the framework most suited to your application development.'},
      {name: 'Karma', description: 'Spectacular Test Runner for JavaScript.'},
      {name: 'Mocha', description: 'Mocha is a feature-rich JavaScript test framework.'},
      {name: 'Chai', description: 'Chai is a BDD / TDD assertion library.'}
    ];
  });
