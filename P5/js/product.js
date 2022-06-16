//
// Fonction de sauvegarde des informations dans l’espace local courant.
//
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}
//
// Fonction d'accès à des données enregistrées dans le local Storage par clée.
//
function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}
//
// Récupération de la chaine de requête Url de la page actuel (methode window.location).
//
const queryString_url_id = window.location.search;
//
// Récupération de l'Id du produit selectionner avec la méthode UrlSearchParams.
//
const urlSearcheParams = new URLSearchParams(queryString_url_id);
const newUrlSearchParams = urlSearcheParams.get("id");

//
// Fonction asynchrone de récupération du produit selectionner pas Id avec la méthode (Fetch + UrlSearchParams).
//
const fetchDatas = async () => {
  await fetch(
    `https://openclassrooms-project-5.herokuapp.com/${newUrlSearchParams}`
  )
    .then((res) => res.json())
    .then(
      (promise = (datas = promise) => {
        //
        // Création de l'element HTML 'img' + récupération des elements du DOM en spécifiant leurs Id.
        //
        const img = document.createElement("img");
        (img.src = datas.imageUrl), (img.alt = datas.altTxt);
        document.querySelector(".item__img").appendChild(img);
        document.getElementById("title").textContent = datas.name;
        document.getElementById("price").textContent = datas.price;
        document.getElementById("description").textContent = datas.description;
        //
        // Ajout des options de couleurs avec une boucle forEach.
        //
        let optionColors = datas.colors;
        let item_colors = document.getElementById("colors");
        optionColors.forEach(function (element) {
          item_colors[item_colors.options.length] = new Option(element);
        });
      })
    );
};
//
// Initialisation de l'affichage des données API du produit selectionné(Id) pour product.html.
//
fetchDatas();
//
///////////////// OPTION PRODUIT ////////////////
//
let id = newUrlSearchParams;
let colorOption = document.getElementById("colors");
let quantity = document.getElementById("quantity");
const clickButton = document.getElementById("addToCart");
//
// EventListener ajout Panier(addToCart) avec option de produit + quantité + .
//
clickButton.addEventListener("click", (event) => {
  event.preventDefault();
  let product = {
    id: id,
    color: colorOption.value,
    quantity: quantity.valueAsNumber,
  };
  //
  // Fonction qui bloque les tentatives de commande inappropriée.
  //
  function wrongInput(e) {
    if (colors.value == "" || quantity.value <= 0) {
      alert("SVP, choisissez une couleur et un nombre d'article valide");
      e.stopPropagation();
    } else {
    }
  }
  wrongInput();
  //
  // Fonction qui addition les articles dans le panier avec leurs couleurs.
  //
  function addBasket(product) {
    let basket = getBasket();
    let foundProduct = basket.find(
      (p) => p.id === product.id && p.color === product.color
      //
      // Prise en compte de l'id Produit et de sa couleur selectionné pour l'addition de l'article.
      //
    );
    if (foundProduct != undefined) {
      foundProduct.quantity += product.quantity;
      alert(` Vous avez rajouté ${product.quantity} article(s) à votre panier`);
    } else {
      basket.push(product);
      alert(`${product.quantity} Article(s) ajouté à votre panier`);
    }
    //
    // Initialisation de l'accès au local storage avec (set Item) + conversion de la valeur en chaîne JSON.
    //
    saveBasket(basket);
  }
  //
  // Récupération des valeurs du panier (get Item) + conversion de la valeur en objet JSON.
  //
  addBasket(product);
  //
  // Envoi du client sur la page panier(cart.html) apres l'évenement click.
  //
  window.location.href = "./cart.html";
});
