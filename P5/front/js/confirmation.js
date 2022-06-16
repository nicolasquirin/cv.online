//
// Fonction qui renvoie a la page d'accueil s'il y a actualisation avant le résultat de commande.
//
function actualisation() {
  if (localStorage.length == 0) {
    window.location.href = "home.html";
  } else {
    return;
  }
}
actualisation();
//
// Fonction qui récupère et transmet le numéro de commande.
//
function confirmationOrder() {
  const orderId = document.getElementById("orderId");
  orderId.innerText = localStorage.getItem("orderId");
  console.log(localStorage.length);
  localStorage.clear();
}
confirmationOrder();
//
// Fonction qui renvoie le client sur la page d'accueil apres la confirmation de commande + message apres 2secs.
//
function reload() {
  reloadpage = window.setTimeout(startReload, 2000);
}
function startReload() {
  alert("Félicitation pour votre nouvelle achat, à bientôt sur Kanap.fr !");
  window.location.href = "home.html";
}
reload();
