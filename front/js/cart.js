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
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < qttModif.length; k++){
      qttModif[k].addEventListener("change" , (event) => {
          event.preventDefault();

          //Selection de l'element à modifier en fonction de son id ET sa couleur
          let quantityModif = produitsDansLocalStorage[k].quantiteProduit;
          let qttModifValue = qttModif[k].valueAsNumber;
          
          const resultFind = produitsDansLocalStorage.find((el) => el.qttModifValue !== quantityModif);

          resultFind.quantiteProduit = qttModifValue;
          produitsDansLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

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
    })
}

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
commander.addEventListener("click", (carotte) => {

  carotte.preventDefault();

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
})