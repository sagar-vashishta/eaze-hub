import app from './app';

describe('app', () => {

  describe('GitHubController', () => {
    let ctrl;
    const username = 'eaze';

    beforeEach(() => {
      angular.mock.module(app);

      angular.mock.inject(($controller) => {
        ctrl = $controller('GitHubController', {});
      });
    });

    it('should inject the gitHubService', () => {
      expect(ctrl.gitHubService).not.toBe(null);
    });

    it('should get at least 1 repo for eaze', () => {
      ctrl.gitHubService.getRepos(username).then(result => {
        expect(result.data).to.have.length.above(1);
      });
    });

  });
});
