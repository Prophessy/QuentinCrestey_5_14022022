let produitsDansLocalStorage = JSON.parse(localStorage.getItem("produit"));

var mainContainer = document.getElementById('cart__items');
let affichagePanierDansHtml = []

if (produitsDansLocalStorage === null || produitsDansLocalStorage == 0) {
  mainContainer.innerHTML = '<p>Ajoutez des produits à votre panier !</p>';
}
else {
  for (var i = 0; i < produitsDansLocalStorage.length; i++) {

      affichagePanierDansHtml = affichagePanierDansHtml +
          `<article class="cart__item" data-id="${produitsDansLocalStorage[i].idProduit}">
                  <div class="cart__item__img">
                    <img src="${produitsDansLocalStorage[i].imgProduit}" alt="Photographie d'un canapé">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${produitsDansLocalStorage[i].nomProduit}</h2>
                      <p>${produitsDansLocalStorage[i].couleurProduit}</p>
                      <p>${produitsDansLocalStorage[i].prixProduit}</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" id="${produitsDansLocalStorage[i].idProduit}" name="itemQuantity" min="1" max="100" value="${produitsDansLocalStorage[i].quantiteProduit}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
          </article>`
      mainContainer.innerHTML = affichagePanierDansHtml;
  }
}

//Prix total et quantitée totale 

let quantiteTotaleContainer = document.getElementById('totalQuantity');
quantiteTotaleContainer.innerHTML = getNumberProduct();
let prixTotalContainer = document.getElementById('totalPrice');
prixTotalContainer.innerHTML = getTotalPrice();

function getNumberProduct() {
    let number = 0
    for (let produit of produitsDansLocalStorage) {
        number += Number(produit.quantiteProduit);
    }
    return number;
}

function getTotalPrice() {
    let total = 0
    for (let produit of produitsDansLocalStorage) {
        total += Number(produit.quantiteProduit) * produit.prixProduit;
    }
    return total;
}

//Changer la quantité de manière dynamique dans le panier

function modifyQtt() {
  let quantiteDeLaDiv = document.querySelectorAll(".itemQuantity");
  
  for (let i = 0; i < quantiteDeLaDiv.length; i++){
    quantiteDeLaDiv[i].addEventListener("change" , (event) => {
          event.preventDefault();

          //Selection de l'element à modifier en fonction de son id ET sa couleur
          let valueDeQuantiteDeLaDiv = quantiteDeLaDiv[i].value;
          
          const resultFind = produitsDansLocalStorage.find((el) => el.idProduit == event.target.id);

          resultFind.quantiteProduit = valueDeQuantiteDeLaDiv;
          produitsDansLocalStorage[i].quantiteProduit = resultFind.quantiteProduit;

          localStorage.setItem("produit", JSON.stringify(produitsDansLocalStorage));
        
          // refresh rapide
        location.reload();
      })
  }
}
modifyQtt();

//Bouton supprimer du panier

let boutonSupprimer = document.querySelectorAll('.deleteItem');

for (let s = 0; s < boutonSupprimer.length; s++) {
    boutonSupprimer[s].addEventListener("click", () => {

        let selectionnerIdPourSuppression = produitsDansLocalStorage[s].idProduit;
        let selectionnerCouleurPourSuppression = produitsDansLocalStorage[s].couleurProduit;

        produitsDansLocalStorage = produitsDansLocalStorage.filter(patate => patate.couleurProduit !== selectionnerCouleurPourSuppression || patate.idProduit !== selectionnerIdPourSuppression);
        localStorage.setItem("produit", JSON.stringify(produitsDansLocalStorage));
        
        boutonSupprimer[s].closest("article").remove();

        location.reload();
    })
}

//Selection id form

let firstNameSelection = document.getElementById('firstName');
let lastNameSelection = document.getElementById('lastName');
let addressSelection = document.getElementById('address');
let citySelection = document.getElementById('city');
let emailSelection = document.getElementById('email');

//Regex 

function ValidateEmail() 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailSelection.value))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

function ValidateAddress()
{
  if (/^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/.test(addressSelection.value))
   {
     return (true)
   }
     alert("You have entered an invalid address!")
     return (false)
 }

 function ValidateFirstName()
{
  if (/^[a-zA-Z ,.'-]+$/.test(firstNameSelection.value))
   {
     return (true)
   }
     alert("You have entered an invalid first name!")
     return (false)
 }

 function ValidateLastName()
{
  if (/^[a-zA-Z ,.'-]+$/.test(lastNameSelection.value))
   {
     return (true)
   }
     alert("You have entered an invalid last name!")
     return (false)
 }

 function ValidateCity()
{
  if (/^[a-zA-Z ,.'-]+$/.test(citySelection.value))
   {
     return (true)
   }
     alert("You have entered an invalid city!")
     return (false)
 }
 

//Validation avec regex

emailSelection.addEventListener('change', function() {
  ValidateEmail(this);
});

addressSelection.addEventListener('change', function() {
  ValidateAddress(this);
});

firstNameSelection.addEventListener('change', function() {
  ValidateFirstName(this);
});

lastNameSelection.addEventListener('change', function() {
  ValidateLastName(this);
});

citySelection.addEventListener('change', function() {
  ValidateCity(this);
});

//Formulaire d'envoi 

let commander = document.getElementById('order')
commander.addEventListener("click", (carotte) => {

  carotte.preventDefault();

  if (ValidateEmail(emailSelection) && ValidateAddress(addressSelection) && ValidateFirstName(firstNameSelection) && ValidateLastName(lastNameSelection) && ValidateCity(citySelection)) {
  let idProduitFormulaire = [];
  for (let i = 0; i < produitsDansLocalStorage.length; i++) {
    idProduitFormulaire.push(produitsDansLocalStorage[i].idProduit);
  }
  
  const order = {
    contact : {
        firstName: firstNameSelection.value,
        lastName: lastNameSelection.value,
        address: addressSelection.value,
        city: citySelection.value,
        email: emailSelection.value,
    },
    products: idProduitFormulaire,
} 

const options = {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
        'Accept': 'application/json', 
        "Content-Type": "application/json" 
    },
};

fetch("http://localhost:3000/api/products/order", options)
.then((response) => response.json())
.then((data) => {
    console.log(data);
    localStorage.clear();
    localStorage.setItem("orderId", data.orderId);

    document.location.href = "confirmation.html";
})
.catch((err) => {
    alert ("Problème avec fetch : " + err.message);
});
}})