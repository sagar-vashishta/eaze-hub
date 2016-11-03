export default class GitHubService {
  
  constructor($http) {
    this.$http = $http;
  }

  getRepos(username) {
    // TODO: add pagination support
    const url = `https://api.github.com/users/${username}/repos?per_page=100`;
    return this.$http.get(url);
  }
}
