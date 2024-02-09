function init(apiUrl) {
  document.addEventListener('DOMContentLoaded', () => {
    getPlanets(apiUrl);
  });
}

// Fonction asynchrone pour récupérer les images des planètes depuis l'API Google Custom Search
async function searchPlanetImages(planetName) {
  const apiKey = 'AIzaSyAQ7nnje0RyDVE05F4U_bJj8YSh7mhFhXk'; // Remplacez par votre clé d'API Google
  const cx = 'a078502ba5284453a'; // Remplacez par votre identifiant de recherche personnalisée
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&searchType=image&q=${planetName}`;
  
  try {
      const response = await fetch(url);
      const data = await response.json();
      return data.items[0].link; // Renvoie le lien de la première image trouvée
  } catch (error) {
      console.error('Error fetching images:', error);
      return null;
  }
}

// Fonction asynchrone pour récupérer les données des planètes depuis l'API
async function getPlanets(apiUrl) {
  let allPlanets = [];
  let nextPageUrl = apiUrl;

  while (nextPageUrl) {
    const data = await fetchPlanets(nextPageUrl);
    allPlanets = allPlanets.concat(data.results);
    nextPageUrl = data.next;
  }

  // Pour chaque planète, récupérer l'image correspondante et afficher les détails
  for (const planet of allPlanets) {
      planet.image = await searchPlanetImages(planet.name);
  }

  displayPlanets(allPlanets);
}

// Fonction pour effectuer la requête fetch à l'API
async function fetchPlanets(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Fonction pour afficher les données des planètes sur la page
function displayPlanets(planetsData) {
  const planetsList = document.getElementById('planets-list');
  planetsList.innerHTML = ''; // Nettoyer la liste avant d'afficher les nouvelles planètes

  planetsData.forEach(planetData => {
    const planetElement = document.createElement('div');
    planetElement.classList.add('planet');
    planetElement.dataset.population = planetData.population;
    planetElement.planetData = planetData; // Stocker les données de la planète
    planetElement.innerHTML = `
      <div class="planet-name">${planetData.name}</div>
      <div class="terrain">${planetData.terrain || 'Non disponible'}</div>
    `;
    planetsList.appendChild(planetElement);
    planetElement.addEventListener('click', () => displayPlanetDetails(planetData));
  });

  // Mise à jour du nombre de planètes trouvées
  const planetCountElement = document.getElementById('planet-count');
  planetCountElement.textContent = `${planetsData.length} resultat(s)`;
}

// Fonction pour afficher les détails d'une planète spécifique
function displayPlanetDetails(planet) {
  const planetDetails = document.getElementById('planet-details');
  planetDetails.innerHTML = `
    <h2 style="color: #5e96b7;">${planet.name}</h2>
    <p class="detail-title">Population:</p> ${planet.population}
    <div class="detail-item">
      <img src="assets/cercle.png" alt="Diamètre" class="detail-icon">
      <span class="detail-title">Diamètre:</span> ${planet.diameter}
    </div>
    <div class="detail-item">
      <img src="assets/climat.png" alt="Climat" class="detail-icon">
      <span class="detail-title">Climat:</span> ${planet.climate}
    </div>
    <div class="detail-item">
      <img src="assets/magnet.png" alt="Gravité" class="detail-icon">
      <span class="detail-title">Gravité:</span> ${planet.gravity}
    </div>
    <div class="detail-item">
      <img src="assets/tree.png" alt="Terrain" class="detail-icon">
      <span class="detail-title">Terrain:</span> ${planet.terrain}
    </div>
    <div class="detail-item">
      <img src="${planet.image}" alt="${planet.name}" class="planet-detail-image"> <!-- Ajout de l'image -->
    </div>
    <div class="detail-button">
      <button class="btn">EN SAVOIR PLUS</button>
    </div>
  `;
  planetDetails.style.display = 'block';
}
// Fonction pour filtrer les planètes par population
function filterByPopulation() {
  const selectedValue = document.getElementById('population-select').value;
  const [min, max] = selectedValue.split('-');
  const planets = document.getElementsByClassName('planet');

  let visiblePlanets = 0; // Variable pour compter les planètes visibles

  for (const planetElement of planets) {
    const population = parseInt(planetElement.dataset.population);
    let shouldDisplay = selectedValue === 'all' ||
                        (selectedValue === 'unknown' && isNaN(population)) ||
                        (!isNaN(population) && parseInt(population) >= parseInt(min) && (max === '' || parseInt(population) <= parseInt(max)));

    if (shouldDisplay) {
      planetElement.style.display = 'block';
      visiblePlanets++; // Incrémenter le nombre de planètes visibles
    } else {
      planetElement.style.display = 'none';
    }
  }

  // Mise à jour du nombre de planètes trouvées après filtrage
  const planetCountElement = document.getElementById('planet-count');
  planetCountElement.textContent = `${visiblePlanets} resultat(s)`;
}

// Initialisation de l'application avec l'URL de l'API
init('https://swapi.dev/api/planets/');
