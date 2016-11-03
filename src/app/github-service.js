export default class GitHubService {
  
  constructor($http) {
    this.$http = $http;
  }

  getRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`;
    return this.$http.get(url);
  }
}
