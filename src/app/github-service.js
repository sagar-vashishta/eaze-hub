export default class GitHubService {
  
  constructor($http) {
    this.$http = $http;
  }

  getRepos(username) {
    // TODO: add pagination support
    const per_page = 50;
    const url = `https://api.github.com/users/${username}/repos?per_page=${per_page}`;
    return this.$http.get(url);
  }
}
