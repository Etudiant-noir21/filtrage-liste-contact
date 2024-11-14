/*
Exercice 3 : Filtrage d'une liste de contacts (Regex + Local Storage)
Implémente une liste de contacts et un champ de recherche. Stocke les 
contacts dans le Local Storage et utilise des expressions régulières pour la recherche.
Formulaire pour ajouter un contact (nom et numéro).
Sauvegarder les contacts dans le Local Storage.
Champ de recherche avec regex pour filtrer les contacts par nom (par exemple, recherche 
insensible à la casse ou par lettres partielles).
*/
const formulaire = document.getElementById('formulaire')
// recuperation de mon boutton de recherche
const btnSearch = document.querySelector('.btn')
// recuperation de mon input nom
const nom = document.getElementById('nom')
// recuperation de mon input telephone
const telephone = document.getElementById('telephone')
// recuperation de ma liste
const maListe = document.getElementById('liste')
  // recuperation de mon formulaire de recherche
  const inputRecherche = document.querySelector('#search')

// chargement des donnes
chargementDonnees()

// empecher l'envoie par defaut
formulaire.addEventListener('submit',function(event){
    event.preventDefault()
    listeContact(nom.value,telephone.value)
    sauvegardeDonnees()
    formulaire.reset()
})

// fonction pour filtrer la liste de contact 
function listeContact(contenue1,contenue2){
    const ul = document.querySelector('#liste')
   let li = document.createElement('li')
   li.innerHTML = `${contenue1} : ${contenue2}`
   li.classList.add('list-group-item','mb-2')
   ul.appendChild(li)
}

// sauvegarde dans le local Storage
function sauvegardeDonnees(){
    let contact = JSON.parse(localStorage.getItem('contact')) || []
// initialisation des donnes
    const donnesNom = nom.value
    const donnesPhone = telephone.value
//    creation de nouveau contact 
   const nouveauContact = {nom: donnesNom, telephone: donnesPhone}
// ajout des nouveaux contact au tableaux
    contact.push(nouveauContact)
    // enregister la liste mis a jour dans le local storage
    localStorage.setItem('contact',JSON.stringify(contact)) || []

}

// chargement des donnes 
function chargementDonnees(){
    
//    recuperation des donnes dans le local Storage
const contacts = JSON.parse(localStorage.getItem('contact')) || []

// parcourir les contact pour les afficher
contacts.forEach(element => {
    listeContact(element.nom, element.telephone)
});
}

// boutton recherche
const btnRecherche = document.getElementById('btnRecherche')
btnRecherche.addEventListener('click',(e)=>{
    e.preventDefault()
    rechercherContact(inputRecherche.value)
    inputRecherche.value = ''
})

// fonction pour la rechercher un contact
function rechercherContact(elementRechercher){
  
    // recuperation des contact a partir du stockage
const contacts = JSON.parse(localStorage.getItem('contact')) || []

// creation de mon regexp
const regex = new RegExp(elementRechercher,'i')

// filtrer mon tableau 
const resultats = contacts.filter(el=> regex.test(el.nom))

// affichage des resultats de la recherche
  resultatRecherche(resultats) 
}

// fonction resultat de recherche
function resultatRecherche(content){
// recuperation de mon div resultat
const results = document.getElementById('results')
results.innerHTML = ''
content.forEach(element => {
    let p = document.createElement('p')
    p.innerHTML = `${element.nom} : ${element.telephone}`
    results.appendChild(p)
})

}