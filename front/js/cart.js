let produitsDansLocalStorage = JSON.parse(localStorage.getItem("produit"));

var mainContainer = document.getElementById('cart__items');
let affichagePanierDansHtml = []

for (var i = 0; i < produitsDansLocalStorage.length; i++) {

    affichagePanierDansHtml = affichagePanierDansHtml +
        `<article class="cart__item">
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
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitsDansLocalStorage[i].quantiteProduit}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
        </article>`
    mainContainer.innerHTML = affichagePanierDansHtml;
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

var quantityInputs = document.getElementsByClassName('itemQuantity');
for (var i = 0; i < quantityInputs.length; i++) {
  var input = quantityInputs[i];
  input.addEventListener('change', quantityChanged);
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  localStorage.setItem("produit", JSON.stringify(produitsDansLocalStorage));
  getNumberProduct();
  getTotalPrice();
}

console.log(quantityInputs);

//Bouton supprimer du panier

let boutonSupprimer = document.querySelectorAll('.deleteItem');

for (let s = 0; s < boutonSupprimer.length; s++) {
    boutonSupprimer[s].addEventListener("click", () => {

        let selectionnerIdPourSuppression = produitsDansLocalStorage[s].idProduit;
        let selectionnerCouleurPourSuppression = produitsDansLocalStorage[s].couleurProduit;

        produitsDansLocalStorage = produitsDansLocalStorage.filter(element => element.idProduit !== selectionnerIdPourSuppression && element.couleurProduit !== selectionnerCouleurPourSuppression);
        localStorage.setItem("produit", JSON.stringify(produitsDansLocalStorage));

    })
}

//let boutonSupprimer = document.querySelectorAll('.deleteItem');

//for (let s = 0; s < boutonSupprimer.length; s++) {
  //boutonSupprimer[s].addEventListener("click", function(event) {
    //var boutonClick = event.target
    //boutonClick.parentElement.parentElement.parentElement.parentElement.remove()

  //})
//}

//Regex 

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}
//Verification que le formulaire est correct avec regex 

//Formulaire d'envoi 

let firstNameSelection = document.getElementById('firstName');
let lastNameSelection = document.getElementById('lastName');
let addressSelection = document.getElementById('address');
let citySelection = document.getElementById('city');
let emailSelection = document.getElementById('email');


let commander = document.getElementById('order')
commander.addEventListener("click", () => {
  
  const contact = {
    firstName: firstNameSelection.value,
    lastName: lastNameSelection.value,
    address: addressSelection.value,
    city: citySelection.value,
    email: emailSelection.value
  }

  const promise = fetch("http://localhost:3000/api", {
  method: "POST",
  body: JSON.stringify(contact),
  headers: {
    "Content-Type": "application/json",
  }
})
});