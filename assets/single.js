// 6.4.4 near end
var repoNameEl = document.querySelector("#repo-name");
// 6.3.6 
var limitWarningEl = document.querySelector("#limit-warning");
// 6.3.5 (end)
var issueContainerEl = document.querySelector("#issues-container");

// 6.4.4 mid/btm
var getRepoName = function () {
  // 6.4.5 grab repo name from url query string
  var queryString = document.location.search;
  var repoName = queryString.split("=")[1];

  // 6.4.5
  if (repoName) {
    repoNameEl.textContent = repoName;

    getRepoIssues(repoName);
  } else {
    //  " if no repo was given, redirect to the homepage
    document.location.replace("./index.html");
  }
  //getRepoIssues(repoName);
  //repoNameEl.textContent = repoName;
  //console.log(repoName);
};


var displayWarning = function (repo) {
  // 6.3.6 add text to warning container
  limitWarningEl.textContent = "To see more than 30 issues, visit ";

  var linkEl = document.createElement("a");
  linkEl.textContent = "See more Issues on GitHub.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");

  // 6.3.6 append to warning container
  limitWarningEl.appendChild(linkEl);
};

var getRepoIssues = function (repo) {
  // 6.3.4 
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

  fetch(apiUrl).then(function (response) {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        // 6.3.5 pass response data to dom function
        displayIssues(data);

        // 6.3.6 check if api has paginated issues
        if (response.headers.get("link")) {
          displayWarning(repo);
        }
      });
    } else {
      // removed 6.4.5: alert("There was a problem with your request!");
      // 6.4.5 if not successful, redirect to homepage
      document.location.replace("./index.html");
    }
  });
  // removed per 6.4.5: console.log(repo);
};

// 6.3.5
var displayIssues = function (issues) {
  // 6.3.5 (end)
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
    return;
  }

  // 6.3.5 loop over the response data and create an <a> element for each issue
  for (var i = 0; i < issues.length; i++) {
    // create a link element to take users to the issue on github
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");
    // 6.3.5 create a span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    //  " append to container
    issueEl.appendChild(titleEl);

    //  " create a type element
    var typeEl = document.createElement("span");

    //  " check if the issue is an actual issue or a pull request
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent = "(Issue)";
    }

    // " append to container
    issueEl.appendChild(typeEl);

    // 6.3.5 (end)
    issueContainerEl.appendChild(issueEl);

  }



};

// removed 6.4.4 mid/btm...getRepoIssues("facebook/react");
getRepoName();