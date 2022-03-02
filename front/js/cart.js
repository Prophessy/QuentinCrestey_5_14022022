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

//Bouton supprimer du panier

let boutonSupprimer = document.querySelectorAll('.deleteItem');

for (let s = 0; s < boutonSupprimer.length; s++) {
    boutonSupprimer[s].addEventListener("click", (event) => {
        event.preventDefault();

        let selectionnerIdPourSuppression = produitsDansLocalStorage[s].idProduit;
        let selectionnerCouleursPourSuppression = produitsDansLocalStorage[s].couleurProduit;

        produitsDansLocalStorage = produitsDansLocalStorage.filter(element => element.idProduit !== selectionnerIdPourSuppression);
        localStorage.setItem("produit", JSON.stringify(produitsDansLocalStorage));

    })
}