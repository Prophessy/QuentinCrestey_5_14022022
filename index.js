 fetch('http://localhost:3000/api/products')
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
      appendData(data);
  })
  .catch(function (err) {
      console.log('error: ' + err);
  });

  function appendData(data) {
  var mainContainer = document.getElementById('items');
  for (var i = 0; i < data.length; i++) {
      var a = document.createElement("a");
      a.href = './product.html?id=' + data[i]._id;
      var article = document.createElement("article");
      a.appendChild(article);
      var img = document.createElement("img");
      img.src = data[i].imageUrl;
      img.alt = data[i].altTxt;
      article.appendChild(img);
      var h3 = document.createElement("h3");
      h3.innerHTML = data[i].name;
      article.appendChild(h3);
      var p = document.createElement("p");
      p.innerHTML = data[i].description;
      article.appendChild(p);
      mainContainer.appendChild(a);
  }
}
