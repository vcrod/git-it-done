var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
// 6.2.5 (middle of lesson)
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
console.log(repoContainerEl);
var getUserRepos = function (user) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  var displayRepos = function (repos, searchTerm) {
    // 6.2.6 check if api returned any repos 
    if (repos.length === 0) {
      repoContainerEl.textContent = "No repositories found.";
      return;
    }
    // 6.2.5 clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    console.log(repos);
    console.log(searchTerm);

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
      // format repo name
      var repoName = repos[i].owner.login + "/" + repos[i].name;

      // create container for each repo
      var repoEl = document.createElement("a");
      repoEl.classList = "list-item flex-row justify-space-between align-center";
      repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

      // create a span element to hold repository name
      var titleEl = document.createElement("span");
      titleEl.textContent = repoName;

      // append to container 
      repoEl.appendChild(titleEl);

      // create a status element
      var statusEl = document.createElement("span");
      statusEl.classList = "flex-row align-center";

      // check if current repo has issues or not
      if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML =
          "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
      } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
      }

      // append to container
      repoEl.appendChild(statusEl);

      //append container to the dom
      repoContainerEl.appendChild(repoEl);

      console.log(repoName);
    }

  };

  // make a request to the url + updated 6.2.6
  fetch(apiUrl)
    .then(function (response) {
      // 6.2.6 request was sucessful
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
          console.log(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      // 6.2.6 Notice this '.catch()' getting chained onto the end of the '.then()' method
      alert("Unable to connect to GitHub");
    });
};

var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }

  console.log(event);
}

// 6.2.5 create a function to display repos


//console.log("outside");
//console.log(response);
var response = fetch("https://api.github.com/users/octocat/repos");
console.log(response);


userFormEl.addEventListener("submit", formSubmitHandler);