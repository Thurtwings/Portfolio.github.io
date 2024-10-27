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

        // Création de la carte pour chaque recherche
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
          row.setAttribute('data-base-time', level.time); // Enregistre le temps de base pour le recalcul

          // Contenu du popover pour chaque niveau
          const popoverContent = `
            <strong>${research.name} - Niveau ${level.level}</strong><br>
            <strong>Nourriture:</strong> ${level.cost.food.toLocaleString('de-DE')}<br>
            <strong>Pierre:</strong> ${level.cost.stone.toLocaleString('de-DE')}<br>
            <strong>Bois:</strong> ${level.cost.wood.toLocaleString('de-DE')}<br>
            <strong>Minerai:</strong> ${level.cost.ore.toLocaleString('de-DE')}<br>
            <strong>Or:</strong> ${level.cost.gold.toLocaleString('de-DE')}<br>
            <strong>Temps de recherche réel:</strong> ${level.time}<br>
            <strong>Bonus:</strong> ${level.bonus}
          `;

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

          // Ajouter les attributs pour activer le popover au survol
          row.setAttribute('data-bs-toggle', 'popover');
          row.setAttribute('data-bs-html', 'true');
          row.setAttribute('data-bs-content', popoverContent);

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

        // Préparation des données pour le graphique
        const levelLabels = research.levels.map(level => `Niv ${level.level}`);
        const foodCosts = research.levels.map(level => level.cost.food || 0);
        const stoneCosts = research.levels.map(level => level.cost.stone || 0);
        const woodCosts = research.levels.map(level => level.cost.wood || 0);
        const oreCosts = research.levels.map(level => level.cost.ore || 0);
        const goldCosts = research.levels.map(level => level.cost.gold || 0);

        // Initialisation du graphique empilé
        new Chart(chartCanvas, {
          type: 'bar',
          data: {
            labels: levelLabels,
            datasets: [
              { label: 'Nourriture', data: foodCosts, backgroundColor: 'rgba(255, 99, 132, 0.7)' },
              { label: 'Pierre', data: stoneCosts, backgroundColor: 'rgba(54, 162, 235, 0.7)' },
              { label: 'Bois', data: woodCosts, backgroundColor: 'rgba(75, 192, 192, 0.7)' },
              { label: 'Minerai', data: oreCosts, backgroundColor: 'rgba(153, 102, 255, 0.7)' },
              { label: 'Or', data: goldCosts, backgroundColor: 'rgba(255, 206, 86, 0.9)' }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: `Coûts en ressources pour ${research.name}` }
            },
            scales: {
              y: {
                beginAtZero: true,
                stacked: true // Empile les barres pour chaque niveau
              },
              x: {
                stacked: true // Assure que les barres sont empilées horizontalement
              }
            }
          }
        });

        cardDiv.appendChild(cardBody);
        colDiv.appendChild(cardDiv);
        researchList.appendChild(colDiv);
      });
    });

    // Initialiser les popovers avec un déclenchement au survol (hover)
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.forEach(popoverTriggerEl => {
      new bootstrap.Popover(popoverTriggerEl, {
        trigger: 'hover' // Activer le popover au survol
      });
    });
  })
  .catch(error => console.error('Erreur:', error));
