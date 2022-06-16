//
// Déclaration de la variable product In Storage associée aux valeurs du local Storage.
//
let productInStorage = JSON.parse(localStorage.getItem("basket"));

function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}
function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

//
// Déclaration de la variable [datas] pour recevoir les valeurs : image, altTxt, nom et prix. (interdite par (OC) dans le local Storage).
//
let datas = [];
//
// Fonction fetch qui récupère les données produits API par Id.
//
async function fetchDatas() {
  let items = document.getElementById("cart__items");
  for (let datas of productInStorage) {
    await fetch(`https://openclassrooms-project-5.herokuapp.com/${datas.id}`)
      .then((res) => res.json())
      .then(
        (data) => (
          (productInStorage.name = data.name),
          (productInStorage.price = data.price),
          (productInStorage.imageUrl = data.imageUrl),
          (productInStorage.altTxt = data.altTxt)
        )
      )
      .catch((error) => alert("connexion au serveur impossible  : " + error));
    //
    // Déclaration des variables pour stockage des elements HTML crée dans le DOM.
    //

    const newArticle = document.createElement("article");
    let newDiv1 = document.createElement("div");
    let newImg = document.createElement("img");
    let newDiv2 = document.createElement("div");
    let newDiv3 = document.createElement("div");
    let newH2 = document.createElement("h2");
    let newP1 = document.createElement("p");
    let newP2 = document.createElement("p");
    let newDiv4 = document.createElement("div");
    let newDiv5 = document.createElement("div");
    let newP3 = document.createElement("p");
    let newInput = document.createElement("input");
    let newDiv6 = document.createElement("div");
    let newP4 = document.createElement("p");
    let totalQuantity = document.getElementById("totalQuantity");
    let totalPrice = document.getElementById("totalPrice");
    items.append(newArticle);
    newArticle.append(newDiv1, newDiv2);
    newDiv1.append(newImg);
    newDiv2.append(newDiv3, newDiv4);
    newDiv3.append(newH2, newP1, newP2);
    newDiv4.append(newDiv5, newDiv6);
    newDiv5.append(newP3, newInput);
    newDiv6.append(newP4);
    newArticle.classList.add("cart__item");
    newDiv1.classList.add("cart__item__img");
    newDiv2.classList.add("cart__item__content");
    newDiv3.classList.add("cart__item__content__description");
    newDiv4.classList.add("cart__item__content__settings");
    newDiv5.classList.add("cart__item__content__settings__quantity");
    newDiv6.classList.add("cart__item__content__settings__delete");
    newP4.classList.add("deleteItem");
    newInput.classList.add("itemQuantity");

    //
    // Corrélation des élements a leurs valeurs recupéré dans [datas] et [product In Storage].
    //
    newH2.textContent = productInStorage.name;
    newP1.textContent = datas.color;
    newP2.textContent = productInStorage.price + ` € `;
    newP3.textContent = ` Qté : `;
    newImg.src = productInStorage.imageUrl;
    newImg.alt = productInStorage.altTxt;

    newInput.setAttribute("name", "itemQuantity");
    newInput.setAttribute("type", "number");
    newInput.setAttribute("min", "1");
    newInput.setAttribute("max", "100");
    newInput.setAttribute("value", datas.quantity);
    newP4.textContent = `Suprimer`;

    ///////////////// AJOUT DES ARTICLES AU PANIER /////////////////
    //
    // Iteration de la quantité de produit deja present dans le storage avec une boucle for + eventChange.
    //

    let cartItem = document.getElementsByClassName("cart__item");
    let itemQuantity = document.querySelectorAll(".itemQuantity");

    for (let j = 0; j < cartItem.length; j++) {
      let quantityProduct = itemQuantity[j];
      let inputChange = productInStorage[j];

      quantityProduct.addEventListener("change", (event) => {
        inputChange.quantity = parseInt(event.target.value);
        saveBasket(productInStorage);
        calculTotal(productInStorage);
      });
    }
    getBasket(productInStorage);

    ///////////////// SUPRESSION ARTICLE(S) /////////////////

    let deleteItem = document.querySelectorAll(".deleteItem");
    //
    // Fonction qui supprime les articles du panier avec une boucle for + methode filter.
    //
    function deleted() {
      for (let k = 0; k < cartItem.length; k++) {
        let supData = deleteItem[k];
        let colorId = productInStorage[k].color;
        let dataId = productInStorage[k].id;

        supData.addEventListener("click", () => {
          let filtration = productInStorage.filter(function (datas) {
            return datas.id != dataId || datas.color != colorId;
          });
          productInStorage = filtration;
          if (cartItem.length > 1) {
            saveBasket(productInStorage);
            window.location.href = "cart.html";
          } else {
            cartItem.length < 1;
            alert("Oups ! panier vide, rendez-vous sur la page d'accueil");
            window.location.href = "home.html";
            saveBasket(productInStorage);
          }
        });
      }
    }
    deleted();
    getBasket(productInStorage);

    ///////////////// CALCUL PRIX * QUANTITE /////////////////
    //
    // Calcul des articles du panier avec une boucle for Of.
    //
    function calculTotal() {
      let totalQ = 0;
      let totalP = 0;
      datas.price = productInStorage.price;

      for (let l = 0; l < productInStorage.length; ++l) {
        datas = productInStorage[l];
        console.log(productInStorage[l].quantity);
        totalQ += productInStorage[l].quantity;
        totalP += productInStorage[l].quantity * productInStorage[l].price;
        console.log();
        saveBasket(productInStorage);
      }
      totalQuantity.textContent = totalQ;
      totalPrice.textContent = totalP;
      saveBasket(productInStorage);
    }

    calculTotal();
  }
}

fetchDatas();

///////////////// FORMULAIRE /////////////////

//
// Recuperation des noeuds elements dans le DOM avec index pairs input/erreur
//

const questionInput = document.querySelectorAll(
  ".cart__order__form__question input"
);
const questionText = document.querySelectorAll(
  ".cart__order__form__question p"
);
//Input
inputFN = questionInput[0];
inputLN = questionInput[1];
inputAddress = questionInput[2];
inputCity = questionInput[3];
inputEmail = questionInput[4];
// Erreur :
errFN = questionText[0];
errLN = questionText[1];
errAddress = questionText[2];
errCity = questionText[3];
errEmail = questionText[4];

contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};
products = [];

//
// Déclaration et récupération des elements pour les evènements change.
//
subBtn = document.getElementById("order");
validForm = false;
//
// Fonction de vérification Regex pour les valeurs entrées.
//
function validFN(firstName) {
  if (firstName.length == 0) {
    errFN.innerHTML = "Prenom non renseigné";
    validForm = false;
  } else if (!/[0-9]/.test(firstName)) {
    errFN.innerHTML = "";
    validForm = true;
  } else {
    errFN.innerHTML = "Votre prénom ne peut contenir que des lettres";
    validForm = false;
  }
}
inputFN.addEventListener("change", (e) => {
  validFN(e.target.value);
  contact.firstName = e.target.value;
});

function validLN(lastName) {
  if (lastName.length == 0) {
    errLN.innerHTML = "Nom de famille non renseigné";
    validForm = false;
  } else if (!/[0-9]/.test(lastName)) {
    errLN.innerHTML = "";
    validForm = true;
  } else {
    errLN.innerHTML = "Votre Nom ne peut contenir que des lettres";
    validForm = false;
  }
}
inputLN.addEventListener("change", (e) => {
  validLN(e.target.value);
  contact.lastName = e.target.value;
});

function validAddress(address) {
  if (address.length == 0) {
    errAddress.innerHTML = "Addresse non renseigné";
    validForm = false;
  } else {
    errAddress.innerHTML = "";
    validForm = true;
  }
}
inputAddress.addEventListener("change", (e) => {
  validAddress(e.target.value);
  contact.address = e.target.value;
});

function validCity(city) {
  if (city.length == 0) {
    errCity.innerHTML = "Ville non renseigné";
    validForm = false;
  } else {
    errCity.innerHTML = "";
    validForm = true;
  }
}
inputCity.addEventListener("change", (e) => {
  validCity(e.target.value);
  contact.city = e.target.value;
});

function validEmail(email) {
  let emailReg = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (email.length == 0) {
    errEmail.innerHTML = "E-mail non renseigné";
    validForm = false;
  } else if (emailReg.test(email)) {
    errEmail.innerHTML = "";
    validForm = true;
  } else {
    errEmail.innerHTML = "E-mail non valide";
    validForm = false;
  }
}
inputEmail.addEventListener("change", (e) => {
  validEmail(e.target.value);
  contact.email = e.target.value;
});

//
// Fonction event Onsubmit pour l'envoi du formulaire client avec un changement de comportement par défaut de l’élément(preventDefault).
//
function sendForm() {
  let sendFormBtn = document.querySelector("form");

  sendFormBtn.addEventListener("submit", function (event) {
    event.preventDefault();
    //
    // Fonction asynchrone qui envoie 'contact' et [products] par methode POST a l'API.
    //
    async function clientData() {
      await fetch(
        "https://openclassrooms-project-5.herokuapp.com/api/products/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contact: contact, products: products }),
        }
      )
        //
        // Recupération de la réponse en JSON.
        //
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          orderId = data.orderId;
          localStorage.setItem("orderId", data.orderId);
          console.log(orderId);
        });

      if (orderId != undefined || orderId != "") {
        location.href = "confirmation.html?" + orderId + "#orderId";
      } else {
        alert = "Erreur lors du chargement de vos données";
      }
    }
    //
    // Fonction qui récupère les données [datas] dans [localStorage] avec son Id.
    //
    function collectDatasOnStorage() {
      for (let datas of productInStorage) {
        products.push(datas.id);
      }
    }
    //
    // Fonction de verification du formulaire, si valide commande en cours sinon erreur inputvalue du formulaire.
    //
    function validationForm() {
      if (validForm == true) {
        alert("Commande en cours");
        collectDatasOnStorage(products);
        clientData();
      } else {
        validFN(inputFN.value);
        validLN(inputLN.value);
        validAddress(inputAddress.value);
        validCity(inputCity.value);
        validEmail(inputEmail.value);
      }
    }
    validationForm();
  });
}
sendForm();
//
// Fonction qui renvoie le client a la page d'accueil si le panier est vide.
//
function reloadpage() {
  if (productInStorage == null) {
    alert("Oups ! panier vide, rendez-vous sur la page d'accueil");
    window.location.href = "home.html";
  } else {
  }
}
reloadpage();
