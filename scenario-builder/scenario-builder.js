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
      [ITEM_TYPES.A]: this.#shuffle(
        scenario.items.a.map((val, index) => index)
      ),
      [ITEM_TYPES.B]: this.#shuffle(
        scenario.items.b.map((val, index) => index)
      ),
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

    var floorLabelCell = document.querySelector(
      '#cell_' + floor.label.position.x + 'x' + floor.label.position.y
    );
    floorLabelCell.classList.add('label-cell');

    var floorLabelEl = document.createElement('div');
    floorLabelEl.classList.add('board-label');
    floorLabelEl.classList.add('floor-label');
    floorLabelEl.textContent = floor.label.text;

    floorLabelCell.appendChild(floorLabelEl);

    var notifier = document.querySelector('.notifier');

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
            var openDoor = () => {
              if (door.keyRequired) {
                if (!this.#foundItems.includes(door.keyRequired)) {
                  cell.classList.remove('door-' + door.direction);
                  cell.classList.add('locked-door-' + door.direction);

                  notifier.innerHTML =
                    'Locked: <span class="emphasis">' +
                    door.keyRequired +
                    '</span> required.';
                  this.#showNotifierContainer();
                } else {
                  if (!door.unlocked) {
                    notifier.innerHTML =
                      'Unlocked with <span class="emphasis">' +
                      door.keyRequired +
                      '</span>';
                    this.#showNotifierContainer();
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
            };

            if (!tileConfig.numberOfIcons) {
              cell.addEventListener('click', () => openDoor());
            } else {
              var doorIcon = document.createElement('span');
              doorIcon.classList.add('fa-stack', 'door-icon');
              var doorIcon2x = document.createElement('i');
              doorIcon2x.classList.add('fa-solid', 'fa-circle', 'fa-stack-2x');
              doorIcon.appendChild(doorIcon2x);

              var doorIcon1x = document.createElement('i');
              doorIcon1x.classList.add(
                'fa-solid',
                'fa-door-open',
                'fa-stack-1x',
                'contrast'
              );
              doorIcon.appendChild(doorIcon1x);
              cell.appendChild(doorIcon);

              var notifierDoorIcon = doorIcon.cloneNode(true);
              notifierDoorIcon.addEventListener('click', () => openDoor());

              multiIcons.push(notifierDoorIcon);
            }
          }
        });
      }

      if (tileConfig.p1StartingPoint) {
        cell.innerHTML +=
          '<span class="fa-stack"><i class="fa-solid fa-shield fa-stack-2x"></i><span class="fa-solid fa-stack-1x fa-inverse">1</span></span>';
        cell.querySelector('.fa-stack').addEventListener('click', () => {
          notifier.innerHTML = `<span class="emphasis">${
            this.#numberOfPlayers > 2 ? 'Players 1 and 3' : 'Player 1'
          }</span> start position`;
          this.#showNotifierContainer();
        });
      }

      if (tileConfig.p2StartingPoint) {
        cell.innerHTML +=
          '<span class="fa-stack"><i class="fa-solid fa-shield fa-stack-2x"></i><span class="fa-solid fa-stack-1x fa-inverse">2</span></span>';
        cell.querySelector('.fa-stack').addEventListener('click', () => {
          notifier.innerHTML = `<span class="emphasis">${
            this.#numberOfPlayers === 4 ? 'Players 2 and 4' : 'Player 2'
          }</span> starting position`;
          this.#showNotifierContainer();
        });
      }

      if (tileConfig.enemies) {
        tileConfig.enemies.forEach((enemy) => {
          var enemyIcon = this.#generateEnemy(enemy);
          cell.appendChild(enemyIcon);
          var enemyHTML = `Enemy: <span class="emphasis">${
            enemy.charAt(0).toUpperCase() + enemy.slice(1)
          }</span>`;

          if (tileConfig.numberOfIcons) {
            var notifierEnemyIcon = enemyIcon.cloneNode(true);
            notifierEnemyIcon.addEventListener('click', (ev) => {
              ev.stopPropagation();
              ev.stopImmediatePropagation();
              notifier.innerHTML = enemyHTML;
            });
            multiIcons.push(notifierEnemyIcon);
          } else
            enemyIcon.addEventListener('click', () => {
              notifier.innerHTML = enemyHTML;
              this.#showNotifierContainer();
            });
        });
      }

      if (tileConfig.item) {
        cell.innerHTML +=
          '<span class="fa-stack item"><i class="fa-solid fa-circle fa-stack-2x"></i><span class="fa-solid fa-stack-1x fa-inverse">!</span></span>';
        var itemIndex = this.#itemIndexes[tileConfig.item].pop();
        var item = this.currentScenario.items[tileConfig.item][itemIndex];

        if (!tileConfig.numberOfIcons) {
          cell.querySelector('.fa-stack').addEventListener('click', () => {
            if (!this.#foundItems.includes(item)) {
              this.#foundItems.push(item);
              notifier.innerHTML = `You found <span class="emphasis item-text">${item}</span>`;
            } else {
              notifier.innerHTML = `Item already found (${item})`;
            }
            this.#showNotifierContainer();
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
            if (!this.#foundItems.includes(item)) {
              this.#foundItems.push(item);
              notifier.innerHTML = `You found <span class="emphasis item-text">${item}</span>`;
            } else {
              notifier.innerHTML = `Item already found (${item})`;
            }
            this.#showNotifierContainer();
          });

          multiIcons.push(el);
        }
      }

      if (tileConfig.stairs) {
        var stairsIcon = document.createElement('span');
        stairsIcon.classList.add('fa-stack', 'stairs');

        var stairsIcon2x = document.createElement('i');
        stairsIcon2x.classList.add('fa-solid', 'fa-square', 'fa-stack-2x');
        stairsIcon.appendChild(stairsIcon2x);

        var stairsIcon1x = document.createElement('i');
        stairsIcon1x.classList.add(
          'fa-solid',
          'fa-stairs',
          'fa-stack-1x',
          'contrast'
        );
        stairsIcon.appendChild(stairsIcon1x);

        cell.appendChild(stairsIcon);

        cell.addEventListener('click', () => {
          this.#buildRoom(
            floors,
            tileConfig.stairs.connectingFloor,
            tileConfig.stairs.connectingRoomIndex
          );

          notifier.innerHTML = `${
            tileConfig.stairs.connectingFloor > floorNumber
              ? 'Ascend'
              : 'Descend'
          } to <span class="emphasis">${
            floors[tileConfig.stairs.connectingFloor].label.text
          }`;
          this.#showNotifierContainer();
        });
      }

      if (tileConfig.hasItemBox) {
        cell.innerHTML +=
          '<span class="fa-stack"><i class="fa-solid fa-circle fa-stack-2x"></i><i class="fa-solid fa-box fa-stack-1x contrast"></i></span>';
        if (!tileConfig.numberOfIcons) {
          cell.querySelector('.fa-stack').addEventListener('click', () => {
            notifier.innerHTML =
              '<span class="emphasis">Item Box</span>: Trade Items From Inventory';
            this.#showNotifierContainer();
          });
        } else {
          var el = document.createElement('span');

          el.classList.add(['fa-stack']);
          el.innerHTML =
            '<i class="fa-solid fa-circle fa-stack-2x"></i><i class="fa-solid fa-box fa-stack-1x contrast"></i>';
          el.addEventListener('click', (ev) => {
            ev.stopImmediatePropagation();
            ev.stopPropagation();
            notifier.innerHTML =
              '<span class="emphasis">Item Box</span>: Trade Items From Inventory';
            this.#showNotifierContainer();
          });

          multiIcons.push(el);
        }
      }

      if (tileConfig.hasCorpse) {
        var corpseIcon = document.createElement('span');
        corpseIcon.classList.add('fa-stack', 'corpse');

        var corpseIcon2x = document.createElement('i');
        corpseIcon2x.classList.add('fa-solid', 'fa-circle', 'fa-stack-2x');
        corpseIcon.appendChild(corpseIcon2x);

        var corpseIcon1x = document.createElement('i');
        corpseIcon1x.classList.add(
          'fa-solid',
          'fa-person',
          'fa-stack-1x',
          'contrast'
        );
        corpseIcon.appendChild(corpseIcon1x);

        cell.appendChild(corpseIcon);

        var corpseHTML = `<span class="emphasis">Corpse</span>: If turn ends here, roll encounter die and replace with ${EnemyTypes.Zombie} on <img src="./assets/re-logo.png" class="umbrella-logo" />`;

        if (tileConfig.numberOfIcons) {
          var notifierCorpseIcon = corpseIcon.cloneNode(true);
          notifierCorpseIcon.addEventListener('click', (ev) => {
            ev.stopPropagation();
            ev.stopImmediatePropagation();
            notifier.innerHTML = corpseHTML;
          });
          multiIcons.push(notifierCorpseIcon);
        } else
          corpseIcon.addEventListener('click', () => {
            notifier.innerHTML = corpseHTML;
            this.#showNotifierContainer();
          });
      }

      if (tileConfig.hasTypewriter) {
        var typewriterIcon = document.createElement('span');
        typewriterIcon.classList.add('fa-stack', 'typewriter');

        var typewriterIcon2x = document.createElement('i');
        typewriterIcon2x.classList.add('fa-solid', 'fa-circle', 'fa-stack-2x');
        typewriterIcon.appendChild(typewriterIcon2x);

        var typewriterIcon1x = document.createElement('i');
        typewriterIcon1x.classList.add(
          'fa-regular',
          'fa-keyboard',
          'fa-stack-1x',
          'contrast'
        );
        typewriterIcon.appendChild(typewriterIcon1x);

        cell.appendChild(typewriterIcon);

        var typewriterHTML = `<span class='emphasis'>Typewriter</span>: Discard an ${ITEMS.InkRibbon} to refresh the tension deck (1 use only)`;

        if (tileConfig.numberOfIcons) {
          var notifierTypewriterIcon = typewriterIcon.cloneNode(true);
          notifierTypewriterIcon.addEventListener('click', (ev) => {
            ev.stopPropagation();
            ev.stopImmediatePropagation();
            notifier.innerHTML = typewriterHTML;
          });
          multiIcons.push(notifierTypewriterIcon);
        } else
          typewriterIcon.addEventListener('click', () => {
            notifier.innerHTML = typewriterHTML;
            this.#showNotifierContainer();
          });
      }

      if (tileConfig.isScenarioObjective) {
        var objectiveIcon = document.createElement('span');
        objectiveIcon.classList.add('fa-stack', 'scenario-objective');

        var objectiveIcon2x = document.createElement('i');
        objectiveIcon2x.classList.add('fa-solid', 'fa-circle', 'fa-stack-2x');
        objectiveIcon.appendChild(objectiveIcon2x);

        var objectiveIcon1x = document.createElement('i');
        objectiveIcon1x.classList.add(
          'fa-solid',
          'fa-flag',
          'fa-stack-1x',
          'contrast'
        );
        objectiveIcon.appendChild(objectiveIcon1x);

        cell.appendChild(objectiveIcon);

        var objectiveHTML = `Scenario Objective`;

        if (tileConfig.numberOfIcons) {
          var notifierObjectiveIcon = objectiveIcon.cloneNode(true);
          notifierObjectiveIcon.addEventListener('click', (ev) => {
            ev.stopPropagation();
            ev.stopImmediatePropagation();
            notifier.innerHTML = objectiveHTML;
          });
          multiIcons.push(notifierObjectiveIcon);
        } else
          objectiveIcon.addEventListener('click', () => {
            notifier.innerHTML = objectiveHTML;
            this.#showNotifierContainer();
          });
      }

      if (tileConfig.numberOfIcons) {
        cell.classList.add('icons-' + tileConfig.numberOfIcons);
        cell.addEventListener('click', (ev) => {
          ev.stopPropagation();
          ev.preventDefault();

          notifier.innerHTML = '<span class="icons"></span>';

          multiIcons.forEach((icon) =>
            notifier.querySelector('.icons').appendChild(icon)
          );

          this.#showNotifierContainer();
        });
      }
    });
  }

  /**
   * Generates an enemy icon object
   * @param {string} enemyType
   * @returns {HTMLSpanElement} The enemy icon
   */
  #generateEnemy = (enemyType) => {
    var enemyContainer = document.createElement('span');
    enemyContainer.classList.add('fa-stack');
    enemyContainer.classList.add('enemy');

    var icon2x = document.createElement('i');
    icon2x.classList.add('fa-solid', 'fa-circle', 'fa-stack-2x');
    enemyContainer.appendChild(icon2x);

    var icon1x = document.createElement('i');
    icon1x.classList.add('fa-solid', 'fa-stack-1x', 'fa-inverse');

    switch (enemyType) {
      case EnemyTypes.Zombie:
        icon1x.textContent = 'Z';
        break;
      case EnemyTypes.Licker:
        icon1x.textContent = 'L';
        break;
    }

    enemyContainer.appendChild(icon1x);
    return enemyContainer;
  };

  /**
   * Shows the notifier container
   */
  #showNotifierContainer = () => {
    document.querySelector('.notifier-container').classList.remove('hidden');
  };

  /**
   * Shuffles the array
   * @param {Array<T>} array
   * @returns {Array<T>} The shuffled array
   */
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
      document.querySelector(`.yellow-${index + 1}`).innerHTML = yellowEntry;
    });

    scenario.rollTables.amber.forEach((amberEntry, index) => {
      document.querySelector(`.amber-${index + 1}`).innerHTML = amberEntry;
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
