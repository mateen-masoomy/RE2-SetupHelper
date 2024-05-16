/**
 * @typedef {import("../types/scenario.types").Scenario} Scenario
 * @typedef {import("../types/scenario.types").ItemIndexes} ItemIndexes
 * @typedef {import("../types/scenario.types").Items} Items
 */

class ScenarioBuilder {
  /**
   * The collection of item indexes
   * @type {ItemIndexes}
   */
  #itemIndexes;

  /**
   * The collection of found items
   * @type {string[]}
   */
  #foundItems = [];

  /**
   * The number of players
   * @type {number}
   */
  #numberOfPlayers;

  /**
   * The current scenario
   * @type {Scenario}
   */
  currentScenario;

  /**
   * Build a scenario
   * @param {Scenario} scenario The scenario to build
   * @param {number} numberOfPlayers The number of players
   */
  buildScenario = (scenario, numberOfPlayers) => {
    this.#clearGrid();

    this.currentScenario = JSON.parse(JSON.stringify(scenario));
    this.#numberOfPlayers = numberOfPlayers;

    this.#itemIndexes = {
      a: this.#shuffle(scenario.items.a.map((val, index) => index)),
      b: this.#shuffle(scenario.items.b.map((val, index) => index)),
    };

    this.#buildDetails(scenario);

    this.#buildRoom(
      scenario.floors,
      scenario.startingRooms.p1.floor,
      scenario.startingRooms.p1.roomIndex
    );

    if (numberOfPlayers > 1) {
      this.#buildRoom(
        scenario.floors,
        scenario.startingRooms.p2.floor,
        scenario.startingRooms.p2.roomIndex
      );
    }
  };

  /**
   * Build Room
   * @description Render a room on the grid
   * @param {Object.<string, Floor>} floors - The collection of rooms for the floor
   * @param {number} floorNumber The floor number
   * @param {number} index                - The index of the room to build
   */
  #buildRoom(floors, floorNumber, index) {
    var floor = floors[floorNumber];
    var config = floor.rooms[index];

    var labelCell = document.querySelector(
      '#cell_' + floor.label.position.x + 'x' + floor.label.position.y
    );
    labelCell.classList.add('label-cell');

    var labelEl = document.createElement('div');
    labelEl.classList.add('board-label');
    labelEl.classList.add('floor-label');
    labelEl.textContent = floor.label.text;

    labelCell.appendChild(labelEl);

    config.tiles.forEach((tileConfig) => {
      var cell = document.querySelector(
        '#cell_' + tileConfig.position.x + 'x' + tileConfig.position.y
      );
      cell.classList.add(config.type);

      cell.innerHTML = '';

      var multiIcons = [];

      if (tileConfig.label) {
        cell.classList.add('label-cell');

        var cellLabelEl = document.createElement('div');
        cellLabelEl.classList.add('board-label');
        cellLabelEl.classList.add('room-label');
        cellLabelEl.textContent = tileConfig.label;

        cell.appendChild(cellLabelEl);
      }

      if (tileConfig.walls) {
        tileConfig.walls.forEach((wallDirection) => {
          cell.classList.add('wall-' + wallDirection);
        });
      }

      if (tileConfig.doors) {
        tileConfig.doors.forEach((door) => {
          cell.classList.add('door-' + door.direction);
          if (typeof door.connectingRoomIndex !== 'undefined') {
            cell.addEventListener('click', () => {
              if (door.keyRequired) {
                if (!this.#foundItems.includes(door.keyRequired)) {
                  cell.classList.remove('door-' + door.direction);
                  cell.classList.add('locked-door-' + door.direction);

                  document.querySelector('.notifier').innerHTML =
                    'Locked: <span class="emphasis">' +
                    door.keyRequired +
                    '</span> required.';
                  document
                    .querySelector('.notifier-container')
                    .classList.remove('hidden');
                } else {
                  if (!door.unlocked) {
                    document.querySelector('.notifier').innerHTML =
                      'Unlocked with <span class="emphasis">' +
                      door.keyRequired +
                      '</span>';
                    document
                      .querySelector('.notifier-container')
                      .classList.remove('hidden');
                    door.unlocked = true;
                  }
                  cell.classList.add('door-' + door.direction);
                  cell.classList.remove('locked-door-' + door.direction);
                  this.#buildRoom(
                    floors,
                    floorNumber,
                    door.connectingRoomIndex
                  );
                }
              } else
                this.#buildRoom(floors, floorNumber, door.connectingRoomIndex);
            });
          }
        });
      }

      if (tileConfig.p1StartingPoint) {
        cell.innerHTML +=
          '<span class="fa-stack"><i class="fa-solid fa-shield fa-stack-2x"></i><span class="fa-solid fa-stack-1x fa-inverse">1</span></span>';
        cell.querySelector('.fa-stack').addEventListener('click', () => {
          document.querySelector(
            '.notifier'
          ).innerHTML = `<span class="emphasis">${
            this.#numberOfPlayers > 2 ? 'Players 1 and 3' : 'Player 1'
          }</span> start position`;
          document
            .querySelector('.notifier-container')
            .classList.remove('hidden');
        });
      }

      if (tileConfig.p2StartingPoint) {
        cell.innerHTML +=
          '<span class="fa-stack"><i class="fa-solid fa-shield fa-stack-2x"></i><span class="fa-solid fa-stack-1x fa-inverse">2</span></span>';
        cell.querySelector('.fa-stack').addEventListener('click', () => {
          document.querySelector(
            '.notifier'
          ).innerHTML = `<span class="emphasis">${
            this.#numberOfPlayers === 4 ? 'Players 2 and 4' : 'Player 2'
          }</span> starting position`;
          document
            .querySelector('.notifier-container')
            .classList.remove('hidden');
        });
      }

      if (tileConfig.enemies) {
        tileConfig.enemies.forEach((enemy) => this.#generateEnemy(cell, enemy));
      }

      if (tileConfig.item) {
        cell.innerHTML +=
          '<span class="fa-stack item"><i class="fa-solid fa-circle fa-stack-2x"></i><span class="fa-solid fa-stack-1x fa-inverse">!</span></span>';
        console.log(JSON.stringify(this.#itemIndexes));
        console.log(tileConfig.item);
        var itemIndex = this.#itemIndexes[tileConfig.item].pop();
        console.log(itemIndex);
        console.log(this.currentScenario.items);
        var item = this.currentScenario.items[tileConfig.item][itemIndex];

        if (!tileConfig.numberOfIcons) {
          cell.querySelector('.fa-stack').addEventListener('click', () => {
            if (!this.#foundItems.includes(item)) this.#foundItems.push(item);
            document.querySelector('.notifier').innerHTML = item;
            document
              .querySelector('.notifier-container')
              .classList.remove('hidden');
          });
        } else {
          var el = document.createElement('span');

          el.classList.add('fa-stack');
          el.classList.add('item');
          el.innerHTML =
            '<i class="fa-solid fa-circle fa-stack-2x"></i><span class="fa-solid fa-stack-1x fa-inverse">!</span>';
          el.addEventListener('click', (ev) => {
            ev.stopImmediatePropagation();
            ev.stopPropagation();
            if (!this.#foundItems.includes(item)) this.#foundItems.push(item);
            document.querySelector('.notifier').innerHTML = item;
            document
              .querySelector('.notifier-container')
              .classList.remove('hidden');
          });

          multiIcons.push(el);
        }
      }

      if (tileConfig.stairs) {
        cell.innerHTML +=
          '<span class="fa-stack"><i class="fa-solid fa-circle fa-stack-2x"></i><i class="fa-solid fa-stairs fa-stack-1x contrast"></i></span>';
        cell.addEventListener('click', () => {
          this.#buildRoom(
            floors,
            tileConfig.stairs.connectingFloor,
            tileConfig.stairs.connectingRoomIndex
          );
        });
      }

      if (tileConfig.itemBox) {
        cell.innerHTML +=
          '<span class="fa-stack"><i class="fa-solid fa-circle fa-stack-2x"></i><i class="fa-solid fa-box fa-stack-1x contrast"></i></span>';
        if (!tileConfig.numberOfIcons) {
          cell.querySelector('.fa-stack').addEventListener('click', () => {
            document.querySelector('.notifier').innerHTML =
              '<span class="emphasis">Item Box</span>: Trade Items From Inventory';
            document
              .querySelector('.notifier-container')
              .classList.remove('hidden');
          });
        } else {
          var el = document.createElement('span');

          el.classList.add(['fa-stack']);
          el.innerHTML =
            '<i class="fa-solid fa-circle fa-stack-2x"></i><i class="fa-solid fa-box fa-stack-1x contrast"></i>';
          el.addEventListener('click', (ev) => {
            ev.stopImmediatePropagation();
            ev.stopPropagation();
            document.querySelector('.notifier').innerHTML =
              '<span class="emphasis">Item Box</span>: Trade Items From Inventory';
            document
              .querySelector('.notifier-container')
              .classList.remove('hidden');
          });

          multiIcons.push(el);
        }
      }

      if (tileConfig.numberOfIcons) {
        cell.classList.add('icons-' + tileConfig.numberOfIcons);
        cell.addEventListener('click', (ev) => {
          ev.stopPropagation();
          ev.preventDefault();
          var notifier = document.querySelector('.notifier');
          notifier.innerHTML = '<span class="icons"></span>';
          console.log(multiIcons);
          multiIcons.forEach((icon) =>
            notifier.querySelector('.icons').appendChild(icon)
          );

          document
            .querySelector('.notifier-container')
            .classList.remove('hidden');
        });
      }
    });
  }

  #generateEnemy = (cell, enemyType) => {
    switch (enemyType) {
      case EnemyTypes.Zombie:
        cell.innerHTML +=
          '<span class="fa-stack enemy"><i class="fa-solid fa-circle fa-stack-2x"></i><span class="fa-solid fa-stack-1x fa-inverse">Z</span></span>';
        break;
      case EnemyTypes.Licker:
        cell.innerHTML +=
          '<span class="fa-stack enemy"><i class="fa-solid fa-circle fa-stack-2x"></i><span class="fa-solid fa-stack-1x fa-inverse">L</span></span>';
        break;
    }
  };

  #shuffle = (array) => {
    var copy = JSON.parse(JSON.stringify(array));
    let currentIndex = copy.length;

    // While there remain elements to this.#shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [copy[currentIndex], copy[randomIndex]] = [
        copy[randomIndex],
        copy[currentIndex],
      ];
    }

    return copy;
  };

  /**
   * Build the scenario details
   * @param {Scenario} scenario The scenario to build details for
   */
  #buildDetails = (scenario) => {
    document.querySelector('.name').innerHTML = scenario.name;
    document.querySelector('.introduction').textContent = scenario.intro;
    document.querySelector('.description').textContent = scenario.description;
    document.querySelector('.location').textContent = scenario.location;

    var tilesRequired = document.querySelector('.tiles-required');
    tilesRequired.innerHTML =
      '<div class="scenario-section-header">Tiles Required</div>';
    for (var requiredTileType in scenario.tilesRequired) {
      var requiredTile = scenario.tilesRequired[requiredTileType];
      var tile = document.createElement('div');
      tile.classList.add('required-tile');

      var tileDefName =
        requiredTileType.charAt(0).toUpperCase() + requiredTileType.slice(1);
      var img = document.createElement('img');
      img.src = TileImagePaths[tileDefName];
      img.classList.add('tile-image');
      tile.appendChild(img);

      var tileName = document.createElement('div');
      tileName.classList.add('tile-name');
      tileName.textContent = requiredTile;
      tile.appendChild(tileName);

      tilesRequired.appendChild(tile);
    }

    if (scenario.specialRules.length) {
      var specialRules = document.querySelector('.special-rules');
      specialRules.innerHTML =
        '<div class="scenario-section-header">Special Rules</div>';
      scenario.specialRules.forEach((rule) => {
        var name = document.createElement('div');
        name.classList.add('rule-name');
        name.textContent = `${rule.name}`;
        specialRules.appendChild(name);
        var description = document.createElement('div');
        description.classList.add('rule-description');
        description.textContent = rule.description;
        specialRules.appendChild(description);
      });
    }

    if (scenario.startingItems.length) {
      var startingItems = document.querySelector('.starting-items');
      startingItems.innerHTML =
        '<div class="scenario-section-header">Starting Items</div>';
      scenario.startingItems.forEach((startingItem) => {
        var name = document.createElement('div');
        name.classList.add('starting-item-name');
        name.textContent = startingItem;
        startingItems.appendChild(name);
      });
    }

    scenario.rollTables.yellow.forEach((yellowEntry, index) => {
      document.querySelector(`.yellow-${index + 1}`).textContent = yellowEntry;
    });

    scenario.rollTables.amber.forEach((amberEntry, index) => {
      document.querySelector(`.amber-${index + 1}`).textContent = amberEntry;
    });
  };

  #clearGrid = () => {
    document.querySelectorAll('.grid-cell').forEach((cell) => {
      cell.className = 'grid-cell';
      cell.textContent = '';
      var newCell = cell.cloneNode(true);
      cell.parentNode.replaceChild(newCell, cell);
    });
  };
}
