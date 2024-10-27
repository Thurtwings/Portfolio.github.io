fetch('JSON/data.json')
  .then(response => response.json())
  .then(data => {
    const researchList = document.getElementById('research-list');

    Object.keys(data).forEach(category => {
      const categoryData = data[category];

      // Titre de la catégorie
      const categoryTitle = document.createElement('h2');
      categoryTitle.classList.add('category-title');
      categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      researchList.appendChild(categoryTitle);

      categoryData.forEach(research => {
        // Calcul des totaux pour chaque ressource
        let totalFood = 0, totalStone = 0, totalWood = 0, totalOre = 0, totalGold = 0;

        research.levels.forEach(level => {
          totalFood += level.cost.food || 0;
          totalStone += level.cost.stone || 0;
          totalWood += level.cost.wood || 0;
          totalOre += level.cost.ore || 0;
          totalGold += level.cost.gold || 0;
        });

        // Créer une carte Bootstrap pour chaque recherche
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-12');

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'research-card', 'shadow-sm', 'mb-4');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title', 'text-center');
        title.textContent = research.name;

        const tableWrapper = document.createElement('div');
        tableWrapper.classList.add('table-wrapper');

        const table = document.createElement('table');
        table.classList.add('table', 'table-bordered', 'table-sm', 'text-center');

        const header = document.createElement('thead');
        header.innerHTML = `
          <tr class="table-dark">
            <th>Niveau</th><th>Nourriture</th><th>Pierre</th><th>Bois</th>
            <th>Minerai</th><th>Or</th><th>Temps initial</th><th>Bonus</th><th>Tech</th>
          </tr>`;
        table.appendChild(header);

        const tableBody = document.createElement('tbody');
        research.levels.forEach((level, index) => {
          const row = document.createElement('tr');
          row.setAttribute('data-base-time', level.time); // Enregistrer le temps de base pour le recalcul
          row.innerHTML = `
            <td>${level.level}</td>
            <td>${level.cost.food.toLocaleString('de-DE')}</td>
            <td>${level.cost.stone.toLocaleString('de-DE')}</td>
            <td>${level.cost.wood.toLocaleString('de-DE')}</td>
            <td>${level.cost.ore.toLocaleString('de-DE')}</td>
            <td>${level.cost.gold.toLocaleString('de-DE')}</td>
            <td class="research-time">${level.time}</td>
            <td>${level.bonus}</td>
            <td>${level.technoblades}</td>
          `;
          tableBody.appendChild(row);
        });

        table.appendChild(tableBody);
        tableWrapper.appendChild(table);
        cardBody.appendChild(title);
        cardBody.appendChild(tableWrapper);

        // Ajouter le total des ressources sous la table
        const totalsDiv = document.createElement('div');
        totalsDiv.classList.add('text-center', 'mt-3', 'fw-bold');
        totalsDiv.innerHTML = `
          Totaux des Ressources Nécessaires (Niv 1-10) :<br>
          Nourriture: ${totalFood.toLocaleString('de-DE')} | 
          Pierre: ${totalStone.toLocaleString('de-DE')} | 
          Bois: ${totalWood.toLocaleString('de-DE')} | 
          Minerai: ${totalOre.toLocaleString('de-DE')} | 
          Or: ${totalGold.toLocaleString('de-DE')}
        `;
        cardBody.appendChild(totalsDiv);

        // Création du graphique des coûts sous la table
        const chartCanvas = document.createElement('canvas');
        chartCanvas.classList.add('cost-chart');
        cardBody.appendChild(chartCanvas);

        const levelLabels = research.levels.map(level => `Niv ${level.level}`);
        const foodCosts = research.levels.map(level => level.cost.food || 0);
        const stoneCosts = research.levels.map(level => level.cost.stone || 0);
        const woodCosts = research.levels.map(level => level.cost.wood || 0);
        const oreCosts = research.levels.map(level => level.cost.ore || 0);
        const goldCosts = research.levels.map(level => level.cost.gold || 0);

        new Chart(chartCanvas, {
          type: 'bar',
          data: {
            labels: levelLabels,
            datasets: [
              { label: 'Nourriture', data: foodCosts, backgroundColor: 'rgba(255, 99, 132, 0.5)' },
              { label: 'Pierre', data: stoneCosts, backgroundColor: 'rgba(54, 162, 235, 0.5)' },
              { label: 'Bois', data: woodCosts, backgroundColor: 'rgba(75, 192, 192, 0.5)' },
              { label: 'Minerai', data: oreCosts, backgroundColor: 'rgba(153, 102, 255, 0.5)' },
              { label: 'Or', data: goldCosts, backgroundColor: 'rgba(255, 206, 86, 0.5)' }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: `Coûts en ressources pour ${research.name}` }
            },
            scales: { y: { beginAtZero: true } }
          }
        });

        cardDiv.appendChild(cardBody);
        colDiv.appendChild(cardDiv);
        researchList.appendChild(colDiv);
      });
    });
  })
  .catch(error => console.error('Erreur:', error));

  function updateResearchTimes() {
    const speedBonus = parseFloat(document.getElementById('research-speed').value) || 0;
    const researchList = document.querySelectorAll('.research-card');
  
    researchList.forEach((researchCard) => {
      const levels = researchCard.querySelectorAll('tr');
      levels.forEach((row, index) => {
        if (index > 0) { // Ignorer l'en-tête
          const baseTime = row.getAttribute('data-base-time'); // Format attendu: "jours:heures:minutes"
          
          if (baseTime) {
            const timeParts = baseTime.split(':');
            const days = parseInt(timeParts[0], 10) || 0;
            const hours = parseInt(timeParts[1], 10) || 0;
            const minutes = parseInt(timeParts[2], 10) || 0;
  
            // Calcul précis du temps total en minutes
            const totalMinutes = (days * 1440) + (hours * 60) + minutes;
  
            // Application du bonus de vitesse de recherche avec la bonne formule
            const adjustedMinutes = totalMinutes / (1 + speedBonus / 100);
            const recalculatedTime = formatTime(adjustedMinutes);
            row.querySelector('.research-time').textContent = recalculatedTime;
          }
        }
      });
    });
  }
  
  function formatTime(totalMinutes) {
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${days}j ${hours}h ${minutes}m`;
  }
  