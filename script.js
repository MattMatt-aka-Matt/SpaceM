document.addEventListener('DOMContentLoaded', function() {
    const navbarImages = document.querySelectorAll('.sidebar img');
  
    navbarImages.forEach(img => {
      img.addEventListener('mouseover', function() {
        this.style.transform = 'rotate(360deg)';
        this.style.transition = 'transform 0.5s ease-in-out';
      });
  
      img.addEventListener('mouseout', function() {
        this.style.transform = 'rotate(0deg)';
      });
    });

    // Sélectionnez tous les boutons dans la navbar
    const navButtons = document.querySelectorAll('.navbar a');

    // Fonction pour ajouter l'animation
    function addAnimation(button) {
        button.style.transition = 'transform 0.5s ease, background-color 0.5s ease';
        button.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)'; // Agrandit le bouton
            this.style.backgroundColor = '#444'; // Change la couleur de fond
            this.style.color = 'white'; // Optionnel : change la couleur du texte
        });

        button.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)'; // Remet le bouton à sa taille d'origine
            this.style.backgroundColor = ''; // Remet la couleur de fond d'origine
            this.style.color = ''; // Optionnel : remet la couleur du texte d'origine
        });
    }

    // Appliquez l'animation à tous les boutons
    navButtons.forEach(addAnimation);
});
document.addEventListener('DOMContentLoaded', function() {
    const participateButton = document.querySelector('footer button');

    participateButton.addEventListener('mouseover', function() {
        this.classList.add('animate-button');
    });

    participateButton.addEventListener('animationend', function() {
        this.classList.remove('animate-button');
    });
});
