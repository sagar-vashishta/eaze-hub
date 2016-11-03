import orderBy from 'lodash.orderby';
import GitHubService from "./github-service";

export default class GitHubController {

  constructor(GitHubService) {
    this.gitHubService = GitHubService;
  }

  getRepos() {
    this.repos = [];
    this.loading = true;
    
    if (!this.username) {
      this.error = 'Please enter a username.';
      this.loading = false;
      return;
    }

    this
      .gitHubService
      .getRepos(this.username)
      .then(result => {
        this.loading = false;
        this.error = false;
        if (result.data.length) {
          this.repos = orderBy(result.data, ['watchers', 'name'], ['desc', 'asc']);
        } else {
          this.error = 'Could not find any repos.';
        }
      })
      .catch(error => {
        this.loading = false;
        this.error = error.data.message;
      });
  }
}
