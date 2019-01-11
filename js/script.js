$(document).ready(function () {
  let ALL_FURNITURE = [];
  function getFurniture() {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://it771mq5n2.execute-api.us-west-2.amazonaws.com/production/furniture`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
  getFurniture().then(function (response) {
    ALL_FURNITURE = JSON.parse(response).body.data;
    ALL_FURNITURE.forEach((element) => {
      $("#result").append(`<li>
        <img src=${element.imageUrl}><br>
        <b>Name:</b><br>${element.name}<br>
        <b>Type:</b><br>${element.type}<br>
        </li><hr>`);
    });
  });

  $("button").on("click", function (event) {
    $("#result").empty();
    event.target.value !== "all" ?
      ALL_FURNITURE.filter(ele => ele.type === event.target.value).forEach((element) => {
        $("#result").append(`<li>
        <img src=${element.imageUrl}><br>
        <b>Name:</b><br>${element.name}<br>
        <b>Type:</b><br>${element.type}<br>
        </li><hr>`);
      }) :
      ALL_FURNITURE.forEach((element) => {
        $("#result").append(`<li>
        <img src=${element.imageUrl}><br>
        <b>Name:</b><br>${element.name}<br>
        <b>Type:</b><br>${element.type}<br>
        </li><hr>`);
      });
  });
});

