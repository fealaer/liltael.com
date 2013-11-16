'use strict';

angular.module('startingPointJsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      {name: 'NodeJS', description: 'Node.js is a platform built on Chrome\'s JavaScript runtime for easily building fast, scalable network applications.'},
      {name: 'ExpressJS', description: 'ExpressJS is a web application framework for node.'},
      {name: 'HTML5 Boilerplate', description: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.'},
      {name: 'AngularJS', description: 'AngularJS is a toolset for building the framework most suited to your application development.'},
      {name: 'Karma', description: 'Spectacular Test Runner for JavaScript.'},
      {name: 'Jasmine', description: 'Jasmine is a behavior-driven development framework for testing JavaScript code.'}
    ];
  });
