import angular from 'angular';

import GitHubController from "./github-controller";
import GitHubService from "./github-service";

import 'bootstrap/dist/css/bootstrap.css';
import '../css/app.css';

let app = () => {
  return {
    template: require('./github.html'),
    controller: 'GitHubController',
    controllerAs: 'app'
  }
};

export default angular.module('app', [])
  .directive('app', app)
  .service('GitHubService', GitHubService)
  .controller('GitHubController', GitHubController);
