//ON RECUPERE L'ID PRODUIT VIA L'URL AVEC SEARCHPARAMS

let params = new URL (document.location).searchParams;
let id = params.get("id");

//ON RECUPERE LES INFOS API AVEC FETCH

fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
      appendData(data);
  })
  .catch(function (err) {
      console.log('error: ' + err);
  });

//ON INSERE LES INFOS PRODUITS DANS LE HTML

function appendData(data){
    document.querySelector('.item__img img').src = data.imageUrl;
    document.getElementById('title').innerHTML = data.name;
    document.getElementById('price').innerHTML = data.price;
    document.getElementById('description').innerHTML = data.description;
    var colorsContainer = document.getElementById('colors');
    for (var i = 0; i < data.colors.length; i++) {
        var option = document.createElement("option");
        option.value = data.colors[i];
        option.innerHTML = data.colors[i];
        colorsContainer.appendChild(option);
    } 

//AJOUT PANIER QUAND ON CLIQUE SUR LE BOUTON

    var ajouterPanier = document.getElementById('addToCart');
    var quantite = document.getElementById('quantity');
    ajouterPanier.addEventListener("click", (event)=>{
        event.preventDefault();

        var colorsValue = colorsContainer.value;
        let optionsProduit = {
            idProduit: id,
            nomProduit: data.name,
            prixProduit: data.price,
            couleurProduit: colorsValue,
            quantiteProduit: quantite.value
            }
        console.log(optionsProduit);
    });

//LOCAL STORAGE 
}





