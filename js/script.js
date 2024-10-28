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
            <th>Minerai</th><th>Or</th><th>Temps initial</th><th>Bonus</th><th>Tech</th><th>Effectuée</th>
          </tr>`;
        table.appendChild(header);

        const tableBody = document.createElement('tbody');
        research.levels.forEach((level, index) => {
          const row = document.createElement('tr');
          row.setAttribute('data-base-time', level.time);

          // Contenu de la ligne avec bouton de marquage
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
            <td><button class="btn btn-success btn-sm mark-done">✓</button></td>
          `;

          // Ajouter l'événement de clic au bouton pour marquer comme effectuée ou non
          row.querySelector('.mark-done').addEventListener('click', (event) => {
            event.stopPropagation(); // Éviter la propagation de l'événement
            toggleResearchCompletion(row, index, tableBody, research.levels, totalsDiv);
          });

          tableBody.appendChild(row);
        });

        table.appendChild(tableBody);
        tableWrapper.appendChild(table);
        cardBody.appendChild(title);
        cardBody.appendChild(tableWrapper);

        // Ajouter le total des ressources sous la table avec IDs pour isoler chaque carte
        const totalsDiv = document.createElement('div');
        totalsDiv.classList.add('text-center', 'mt-3', 'fw-bold');
        totalsDiv.innerHTML = `
          Totaux des Ressources Nécessaires (Niv 1-10) :<br>
          Nourriture: <span class="total-food">${totalFood.toLocaleString('de-DE')}</span> | 
          Pierre: <span class="total-stone">${totalStone.toLocaleString('de-DE')}</span> | 
          Bois: <span class="total-wood">${totalWood.toLocaleString('de-DE')}</span> | 
          Minerai: <span class="total-ore">${totalOre.toLocaleString('de-DE')}</span> | 
          Or: <span class="total-gold">${totalGold.toLocaleString('de-DE')}</span>
        `;
        cardBody.appendChild(totalsDiv);

        cardDiv.appendChild(cardBody);
        colDiv.appendChild(cardDiv);
        researchList.appendChild(colDiv);
      });
    });
  })
  .catch(error => console.error('Erreur:', error));

// Fonction pour marquer ou désélectionner une recherche comme effectuée, avec une logique de cascade
function toggleResearchCompletion(row, index, tableBody, levels, totalsDiv) {
    const isMarkedDone = row.classList.contains('table-success');
    const newStatus = !isMarkedDone;
  
    // Si l'on sélectionne une ligne, toutes les lignes au-dessus doivent être sélectionnées également
    if (newStatus) {
      for (let i = 0; i <= index; i++) {
        const currentRow = tableBody.children[i];
        const button = currentRow.querySelector('.mark-done');
        
        currentRow.classList.add('table-success'); // Marquer en vert
        button.textContent = 'Annuler';
        button.classList.replace('btn-success', 'btn-danger');
        button.disabled = false;
      }
    } else {
      // Si l'on désélectionne une ligne, toutes les lignes en dessous doivent être désélectionnées
      for (let i = index; i < tableBody.children.length; i++) {
        const currentRow = tableBody.children[i];
        const button = currentRow.querySelector('.mark-done');
        
        currentRow.classList.remove('table-success'); // Enlever le marquage vert
        button.textContent = '✓';
        button.classList.replace('btn-danger', 'btn-success');
        button.disabled = false;
      }
    }
  
    // Mettre à jour les totaux restants en fonction de l'état actuel des lignes
    updateRemainingTotals(
      Array.from(tableBody.children).filter(row => !row.classList.contains('table-success')).map(row => levels[row.rowIndex - 1]), 
      totalsDiv
    );
  }
  
  // Fonction pour mettre à jour le total des ressources pour les lignes non effectuées
  function updateRemainingTotals(remainingLevels, totalsDiv) {
    let totalFood = 0, totalStone = 0, totalWood = 0, totalOre = 0, totalGold = 0;
  
    remainingLevels.forEach(level => {
      totalFood += level.cost.food || 0;
      totalStone += level.cost.stone || 0;
      totalWood += level.cost.wood || 0;
      totalOre += level.cost.ore || 0;
      totalGold += level.cost.gold || 0;
    });
  
    // Mise à jour des valeurs affichées dans les totaux pour la carte spécifique
    totalsDiv.querySelector('.total-food').textContent = totalFood.toLocaleString('de-DE');
    totalsDiv.querySelector('.total-stone').textContent = totalStone.toLocaleString('de-DE');
    totalsDiv.querySelector('.total-wood').textContent = totalWood.toLocaleString('de-DE');
    totalsDiv.querySelector('.total-ore').textContent = totalOre.toLocaleString('de-DE');
    totalsDiv.querySelector('.total-gold').textContent = totalGold.toLocaleString('de-DE');
  }