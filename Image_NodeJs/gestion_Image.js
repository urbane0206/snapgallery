const fs = require('fs');

// Sélectionnez l'élément input de type file
const inputElement = document.querySelector('input[type="file"]');

// Ajoutez un écouteur d'événement pour l'événement "change"
inputElement.addEventListener('change', handleImageChange);

// Fonction pour gérer le changement d'image
function handleImageChange(event) {
    // Récupérer le fichier sélectionné
    const selectedImage = event.target.files[0];

    // Afficher les informations du fichier dans la console
    console.log('Nom du fichier:', selectedImage.name);
    console.log('Taille du fichier:', selectedImage.size, 'octets');
    console.log('Type de fichier:', selectedImage.type);

    // Vous pouvez ensuite utiliser les informations du fichier selon vos besoins
}
