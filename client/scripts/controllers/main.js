'use strict';

angular.module('liltaelApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      {name: 'Yeoman', description: 'It\'s a workflow; a collection of tools and best practices working in harmony to make developing for the web even better.'},
      {name: 'Grunt', description: 'The JavaScript Task Runner.'},
      {name: 'Bower', description: 'A package manager for the web'},

      {name: 'AngularJS', description: 'AngularJS is a toolset for building the framework most suited to your application development.'},
      {name: 'jQuery', description: 'jQuery is a fast, small, and feature-rich JavaScript library.'},
      {name: 'HTML5 Boilerplate', description: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.'},
      {name: 'Bootstrap', description: 'Sleek, intuitive, and powerful mobile first front-end framework for faster and easier web development.'},

      {name: 'NodeJS', description: 'Node.js is a platform built on Chrome\'s JavaScript runtime for easily building fast, scalable network applications.'},
      {name: 'ExpressJS', description: 'ExpressJS is a web application framework for node.'},

      {name: 'MongoDB', description: 'MongoDB is a cross-platform document-oriented NoSQL database system.'},
      {name: 'Mongoose', description: 'Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.'},

      {name: 'Karma', description: 'Spectacular Test Runner for JavaScript.'},
      {name: 'Mocha', description: 'Mocha is a feature-rich JavaScript test framework running on node.js and the browser, making asynchronous testing simple and fun.'}
    ];
  });
