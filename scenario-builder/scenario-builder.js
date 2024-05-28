import { DIRECTIONS } from '../constants/directions.js';
import { ENEMY_TYPES } from '../constants/enemies.js';
import { ITEMS, ITEM_TYPES } from '../constants/items.js';
import { TileImagePaths } from '../constants/tiles.js';
import { FaTokenizer } from '../helpers/fa-tokenizer.js';

export class ScenarioBuilder {
  /**
   * The collection of item indexes
   * @type {ItemIndexes}
   */
  #itemIndexes;

  /**
   * @typedef FoundItem
   * @type {object}
   * @property {number} index The item index
   * @property {string} type The item type (a or b)
   * @property {string} name The item name
   *
   * The collection of found item indexes
   * @type {FoundItem[]}
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
    this.#foundItems = [];
    this.#clearGrid();

    this.currentScenario = JSON.parse(JSON.stringify(scenario));
    this.#numberOfPlayers = numberOfPlayers;

    this.#itemIndexes = {
      [ITEM_TYPES.A]: this.#shuffleItems(scenario.items.a),
      [ITEM_TYPES.B]: this.#shuffleItems(scenario.items.b),
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
    const floor = floors[floorNumber];
    const config = JSON.parse(JSON.stringify(floor.rooms[index]));

    if (floor.label) {
      const floorLabelCell = document.querySelector(
        '#cell_' + floor.label.position.x + 'x' + floor.label.position.y
      );
      floorLabelCell.classList.add('label-cell');

      const floorLabelEl = document.createElement('div');
      floorLabelEl.classList.add('board-label');
      floorLabelEl.classList.add('floor-label');
      floorLabelEl.textContent = floor.label.text;

      floorLabelCell.appendChild(floorLabelEl);
    }

    const notifier = document.querySelector('.notifier');

    config.tiles.forEach((tileConfig) => {
      const cell = document.querySelector(
        '#cell_' + tileConfig.position.x + 'x' + tileConfig.position.y
      );
      cell.classList.add(config.type);

      cell.innerHTML = '';

      const multiIcons = [];

      if (tileConfig.label) {
        cell.classList.add('label-cell');

        const cellLabelEl = document.createElement('div');
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
            const openDoor = (ev) => {
              if (door.prompt && !door.prompt.opened) {
                ev?.stopPropagation();
                ev?.stopImmediatePropagation();

                notifier.innerHTML = `<div class="prompt-text">${door.prompt.text}</div>`;
                const iconContainer = document.createElement('span');
                iconContainer.classList.add('icons');

                const yes = FaTokenizer('check', 'yes');
                iconContainer.innerHTML += yes;
                const no = FaTokenizer('xmark');
                iconContainer.innerHTML += no;

                notifier.appendChild(iconContainer);

                notifier
                  .querySelector('.yes')
                  .addEventListener('click', (ev) => {
                    ev.stopImmediatePropagation();
                    ev.stopPropagation();
                    notifier.innerHTML = door.prompt.result;
                    door.prompt.opened = true;
                    this.#buildRoom(
                      floors,
                      floorNumber,
                      door.connectingRoomIndex
                    );
                  });
                this.#showNotifierContainer();
                return;
              }

              if (door.keyRequired) {
                ev?.stopPropagation();
                ev?.stopImmediatePropagation();

                if (
                  !this.#foundItems
                    .map((foundItem) => foundItem.name)
                    .includes(door.keyRequired)
                ) {
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
              const doorIcon = document.createElement('span');
              doorIcon.classList.add('fa-stack', 'door-icon');
              const doorIcon2x = document.createElement('i');
              doorIcon2x.classList.add('fa-solid', 'fa-circle', 'fa-stack-2x');
              doorIcon.appendChild(doorIcon2x);

              const doorIcon1x = document.createElement('i');
              doorIcon1x.classList.add('fa-solid', 'fa-stack-1x');

              const notifierDoorIcon = doorIcon.cloneNode(true);
              const nofifierDoorIcon1x = doorIcon1x.cloneNode(true);

              doorIcon1x.classList.add('fa-door-open', 'contrast');
              doorIcon.appendChild(doorIcon1x);
              cell.appendChild(doorIcon);

              if (tileConfig.doors.length === 1) {
                nofifierDoorIcon1x.classList.add('fa-door-open', 'contrast');
              } else {
                nofifierDoorIcon1x.classList.add(
                  `fa-arrow-${this.#getDoorDirectionArrow(door.direction)}`
                );
              }

              notifierDoorIcon.appendChild(nofifierDoorIcon1x);
              notifierDoorIcon.addEventListener('click', (ev) => {
                openDoor(ev);
              });

              multiIcons.push(notifierDoorIcon);
            }
          }
        });
      }

      if (tileConfig.p1StartingPoint) {
        const playerIcon = this.#generatePlayerIcon(1);
        cell.appendChild(playerIcon);
        cell.querySelector('.fa-stack').addEventListener('click', () => {
          notifier.innerHTML = `<span class="emphasis">${
            this.#numberOfPlayers > 2 ? 'Players 1 and 3' : 'Player 1'
          }</span> start position`;
          this.#showNotifierContainer();
        });
      }

      if (tileConfig.p2StartingPoint) {
        const playerIcon = this.#generatePlayerIcon(2);
        cell.appendChild(playerIcon);
        cell.querySelector('.fa-stack').addEventListener('click', () => {
          notifier.innerHTML = `<span class="emphasis">${
            this.#numberOfPlayers === 4 ? 'Players 2 and 4' : 'Player 2'
          }</span> starting position`;
          this.#showNotifierContainer();
        });
      }

      if (tileConfig.enemies) {
        tileConfig.enemies.forEach((enemy) => {
          const enemyIcon = this.#generateEnemy(enemy);
          cell.appendChild(enemyIcon);
          const enemyHTML = `Enemy: <span class="emphasis">${
            enemy.charAt(0).toUpperCase() + enemy.slice(1)
          }</span>`;

          if (tileConfig.numberOfIcons) {
            const notifierEnemyIcon = enemyIcon.cloneNode(true);
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
        const itemIndex = this.#itemIndexes[tileConfig.item].pop();
        const item = this.currentScenario.items[tileConfig.item][itemIndex];
        let isItemFound = false;

        if (!tileConfig.numberOfIcons) {
          cell.querySelector('.fa-stack').addEventListener('click', () => {
            if (
              !this.#foundItems.some(
                (foundItem) =>
                  foundItem.index === itemIndex &&
                  foundItem.type === tileConfig.item
              ) &&
              !isItemFound
            ) {
              this.#foundItems.push({
                index: itemIndex,
                type: tileConfig.item,
                name: item,
              });
              isItemFound = true;
              notifier.innerHTML = `You found <span class="emphasis item-text">${item}</span>`;
            } else {
              notifier.innerHTML = `Item already found (${item})`;
            }
            this.#showNotifierContainer();
          });
        } else {
          const el = document.createElement('span');

          el.classList.add('fa-stack');
          el.classList.add('item');
          el.innerHTML =
            '<i class="fa-solid fa-circle fa-stack-2x"></i><span class="fa-solid fa-stack-1x fa-inverse">!</span>';
          el.addEventListener('click', (ev) => {
            ev.stopImmediatePropagation();
            ev.stopPropagation();
            if (
              !this.#foundItems.some(
                (foundItem) =>
                  foundItem.index === itemIndex &&
                  foundItem.type === tileConfig.item
              ) &&
              !isItemFound
            ) {
              this.#foundItems.push({
                index: itemIndex,
                type: tileConfig.item,
                name: item,
              });
              isItemFound = true;
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
        const stairsIcon = document.createElement('span');
        stairsIcon.classList.add('fa-stack', 'stairs');

        const stairsIcon2x = document.createElement('i');
        stairsIcon2x.classList.add('fa-solid', 'fa-square', 'fa-stack-2x');
        stairsIcon.appendChild(stairsIcon2x);

        const stairsIcon1x = document.createElement('i');
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
          const el = document.createElement('span');

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
        const corpseIcon = document.createElement('span');
        corpseIcon.classList.add('fa-stack', 'corpse');

        const corpseIcon2x = document.createElement('i');
        corpseIcon2x.classList.add('fa-solid', 'fa-circle', 'fa-stack-2x');
        corpseIcon.appendChild(corpseIcon2x);

        const corpseIcon1x = document.createElement('i');
        corpseIcon1x.classList.add(
          'fa-solid',
          'fa-person',
          'fa-stack-1x',
          'contrast'
        );
        corpseIcon.appendChild(corpseIcon1x);

        cell.appendChild(corpseIcon);

        const corpseHTML = `<span class="emphasis">Corpse</span>: If turn ends here, roll encounter die and replace with ${ENEMY_TYPES.Zombie} on <img src="./assets/re-logo.png" class="umbrella-logo" />`;

        if (tileConfig.numberOfIcons) {
          const notifierCorpseIcon = corpseIcon.cloneNode(true);
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
        const typewriterIcon = document.createElement('span');
        typewriterIcon.classList.add('fa-stack', 'typewriter');

        const typewriterIcon2x = document.createElement('i');
        typewriterIcon2x.classList.add('fa-solid', 'fa-circle', 'fa-stack-2x');
        typewriterIcon.appendChild(typewriterIcon2x);

        const typewriterIcon1x = document.createElement('i');
        typewriterIcon1x.classList.add(
          'fa-regular',
          'fa-keyboard',
          'fa-stack-1x',
          'contrast'
        );
        typewriterIcon.appendChild(typewriterIcon1x);

        cell.appendChild(typewriterIcon);

        const typewriterHTML = `<span class='emphasis'>Typewriter</span>: Discard an ${ITEMS.InkRibbon} to refresh the tension deck (1 use only)`;

        if (tileConfig.numberOfIcons) {
          const notifierTypewriterIcon = typewriterIcon.cloneNode(true);
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

      if (tileConfig.isGoal) {
        const goalIcon = document.createElement('span');
        goalIcon.classList.add('fa-stack', 'typewriter');

        const goalIcon2x = document.createElement('i');
        goalIcon2x.classList.add('fa-solid', 'fa-circle', 'fa-stack-2x');
        goalIcon.appendChild(goalIcon2x);

        const goalIcon1x = document.createElement('i');
        goalIcon1x.classList.add(
          'fa-regular',
          'fa-star',
          'fa-stack-1x',
          'contrast'
        );
        goalIcon.appendChild(goalIcon1x);

        cell.appendChild(goalIcon);

        if (tileConfig.numberOfIcons) {
          const notifierGoalIcon = goalIcon.cloneNode(true);
          notifierGoalIcon.addEventListener('click', (ev) => {
            ev.stopPropagation();
            ev.stopImmediatePropagation();
            notifier.innerHTML = tileConfig.goalMessage;
          });
          multiIcons.push(notifierGoalIcon);
        } else
          goalIcon.addEventListener('click', () => {
            notifier.innerHTML = tileConfig.goalMessage;
            this.#showNotifierContainer();
          });
      }

      if (tileConfig.isScenarioObjective) {
        const objectiveIcon = document.createElement('span');
        objectiveIcon.classList.add('fa-stack', 'scenario-objective');

        const objectiveIcon2x = document.createElement('i');
        objectiveIcon2x.classList.add('fa-solid', 'fa-circle', 'fa-stack-2x');
        objectiveIcon.appendChild(objectiveIcon2x);

        const objectiveIcon1x = document.createElement('i');
        objectiveIcon1x.classList.add(
          'fa-solid',
          'fa-key',
          'fa-stack-1x',
          'contrast'
        );
        objectiveIcon.appendChild(objectiveIcon1x);

        cell.appendChild(objectiveIcon);

        const config = tileConfig.scenarioObjectiveConfig;
        let requirementsMet = false;

        const clickHandler = (ev) => {
          ev.stopImmediatePropagation();
          ev.stopPropagation();

          if (
            (config.item &&
              this.#foundItems
                .map((item) => item.name)
                .includes(config.item)) ||
            requirementsMet
          ) {
            notifier.innerHTML = `There's nothing else to do here...`;
            this.#showNotifierContainer();
            return;
          }

          if (config.requirements) {
            /**
             * @type {string[]}
             */
            const copy = JSON.parse(
              JSON.stringify(
                this.#foundItems
                  .map((item) => item.name)
                  .filter((item) => config.requirements.includes(item))
              )
            );

            if (copy.length < config.requirements.length) {
              notifier.innerHTML = config.before;
              this.#showNotifierContainer();
              return;
            }

            config.requirements.forEach((requiredItem) => {
              const index = copy.indexOf(requiredItem);
              if (index >= 0) copy.splice(index, 1);
            });

            if (copy.length > 0) {
              notifier.innerHTML = config.before;
              this.#showNotifierContainer();
              return;
            }
          }

          if (config.result) {
            notifier.innerHTML = `<div class="prompt-text">${config.after}</div>`;
            const iconContainer = document.createElement('span');
            iconContainer.classList.add('icons');

            const yes = FaTokenizer('check', 'yes');
            iconContainer.innerHTML += yes;
            const no = FaTokenizer('xmark');
            iconContainer.innerHTML += no;

            notifier.appendChild(iconContainer);

            notifier.querySelector('.yes').addEventListener('click', (ev) => {
              ev.stopImmediatePropagation();
              ev.stopPropagation();
              notifier.innerHTML = config.result;
              requirementsMet = true;
              if (config.item) {
                this.#foundItems.push({
                  index: 0,
                  type: ITEM_TYPES.C,
                  name: config.item,
                });
              }

              if (config.consumeRequirements) {
                this.#foundItems = this.#foundItems.filter(
                  (foundItem) => !config.requirements.includes(foundItem.name)
                );
              }
            });
          } else {
            notifier.innerHTML = config.after;
          }

          this.#showNotifierContainer();
        };

        if (tileConfig.numberOfIcons) {
          const notifierObjectiveIcon = objectiveIcon.cloneNode(true);
          notifierObjectiveIcon.addEventListener('click', (ev) =>
            clickHandler(ev)
          );
          multiIcons.push(notifierObjectiveIcon);
        } else
          objectiveIcon.addEventListener('click', (ev) => clickHandler(ev));
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
   * Generates a player Icon
   * @param {number} playerNumber The player number
   * @returns {HTMLSpanElement} The icon stack as a span element
   */
  #generatePlayerIcon = (playerNumber) => {
    const playerStack = document.createElement('span');
    playerStack.classList.add('fa-stack');
    const playerIcon2x = document.createElement('i');
    playerIcon2x.classList.add('fa-solid', 'fa-shield', 'fa-stack-2x');
    playerStack.appendChild(playerIcon2x);

    const playerIcon1x = document.createElement('span');
    playerIcon1x.classList.add('fa-solid', 'fa-stack-1x', 'fa-inverse');
    playerIcon1x.textContent = playerNumber;
    playerStack.appendChild(playerIcon1x);

    return playerStack;
  };

  /**
   * Generates an enemy icon object
   * @param {string} enemyType
   * @returns {HTMLSpanElement} The enemy icon
   */
  #generateEnemy = (enemyType) => {
    const enemyContainer = document.createElement('span');
    enemyContainer.classList.add('fa-stack');
    enemyContainer.classList.add('enemy');

    const icon2x = document.createElement('i');
    icon2x.classList.add('fa-solid', 'fa-circle', 'fa-stack-2x');
    enemyContainer.appendChild(icon2x);

    const icon1x = document.createElement('i');
    icon1x.classList.add('fa-solid', 'fa-stack-1x', 'fa-inverse');

    switch (enemyType) {
      case ENEMY_TYPES.Zombie:
        icon1x.textContent = 'Z';
        break;
      case ENEMY_TYPES.Licker:
        icon1x.textContent = 'L';
        break;
      case ENEMY_TYPES.ZombieDog:
        icon1x.textContent = 'D';
        break;
      case ENEMY_TYPES.GMutant:
        icon1x.textContent = 'G';
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
   * Gets the font awesome arrow direction from a door direction
   * @param {string} direction The DIRECTIONS value of the door
   * @returns The font awesome arrow direction
   */
  #getDoorDirectionArrow = (direction) => {
    switch (direction) {
      case DIRECTIONS.Left:
        return 'left';
      case DIRECTIONS.Top:
        return 'up';
      case DIRECTIONS.Bottom:
        return 'down';
      case DIRECTIONS.Right:
        return 'right';
    }
  };

  /**
   * Shuffles an item array
   * @param {Array<string>} items The array of items
   * @returns {Array<number>} The shuffled item array indexes
   */
  #shuffleItems = (items) => {
    const copy = JSON.parse(JSON.stringify(items.map((val, index) => index)));
    const numItems = copy.length;
    const halfItemLength = Math.ceil(numItems / 2);
    let currentIndex = numItems;

    // While there remain elements to this.#shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      /**
       * @type {number}
       */
      let randomIndex;
      const item = items[currentIndex - 1];
      const isPriority = item.includes('fa-star');
      let isSwapPriority;

      do {
        randomIndex = Math.floor(Math.random() * currentIndex);
        // make sure priority items are the beginning of the array since they will be popped in reverse order
        const swapIndex = copy[randomIndex];
        isSwapPriority = items[swapIndex].includes('fa-star');
      } while (
        (isPriority && randomIndex > halfItemLength) ||
        (isSwapPriority && currentIndex > halfItemLength)
      );

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
    document.querySelector('.description').innerHTML = scenario.description;
    document.querySelector('.location').textContent = scenario.location;

    const tilesRequired = document.querySelector('.tiles-required');
    this.#makeSectionHeader('Tiles Required', tilesRequired);
    for (const requiredTileType in scenario.tilesRequired) {
      const requiredTile = scenario.tilesRequired[requiredTileType];
      const tile = document.createElement('div');
      tile.classList.add('required-tile');

      const tileDefName =
        requiredTileType.charAt(0).toUpperCase() + requiredTileType.slice(1);
      const img = document.createElement('img');
      img.src = TileImagePaths[tileDefName];
      img.classList.add('tile-image');
      tile.appendChild(img);

      const tileName = document.createElement('div');
      tileName.classList.add('tile-name');
      tileName.textContent = requiredTile;
      tile.appendChild(tileName);

      tilesRequired.appendChild(tile);
    }

    const tensionDeck = document.querySelector('.tension-deck');
    tensionDeck.innerHTML = '';
    if (scenario.tensionDecks) {
      scenario.tensionDecks.forEach((deck, index) => {
        if (scenario.tensionDecks.length > 1) {
          const playerIcon = this.#generatePlayerIcon(index + 1);
          this.#makeSectionHeader(
            `Tension Deck ${playerIcon.outerHTML}`,
            tensionDeck
          );
        } else {
          this.#makeSectionHeader(`Tension Deck`, tensionDeck);
        }

        const greenTensionDeck = this.#createTensionDeck('green', deck.green);
        tensionDeck.appendChild(greenTensionDeck);

        const amberHeader = document.createElement('div');
        amberHeader.classList.add('tension-deck-header');
        amberHeader.textContent = 'Amber:';
        tensionDeck.appendChild(amberHeader);
        const amberTensionDeck = this.#createTensionDeck('amber', deck.amber);
        tensionDeck.appendChild(amberTensionDeck);

        const redHeader = document.createElement('div');
        redHeader.classList.add('tension-deck-header');
        redHeader.textContent = 'Red:';
        tensionDeck.appendChild(redHeader);
        const redTensionDeck = this.#createTensionDeck('red', deck.red);
        tensionDeck.appendChild(redTensionDeck);
      });
    }

    const behaviourDeck = document.querySelector('.behaviour-deck');
    behaviourDeck.innerHTML = '';

    if (scenario.behaviourDeck) {
      this.#makeSectionHeader(scenario.behaviourDeck.name, behaviourDeck);
      scenario.behaviourDeck.deck.forEach((card) => {
        const cardEl = document.createElement('div');
        cardEl.classList.add('behaviour-deck-card');
        cardEl.innerHTML = `${card}`;
        behaviourDeck.appendChild(cardEl);
      });
    }

    if (scenario.additionalCardsAndTokens.length) {
      const additionalCardsAndTokens =
        document.querySelector('.cards-and-tokens');
      this.#makeSectionHeader(
        'Additional Cards and Tokens',
        additionalCardsAndTokens
      );
      scenario.additionalCardsAndTokens.forEach((cardAndToken) => {
        const cardAndTokenEl = document.createElement('div');
        cardAndTokenEl.classList.add('card-and-token');
        cardAndTokenEl.innerHTML = `${cardAndToken}`;
        additionalCardsAndTokens.appendChild(cardAndTokenEl);
      });
    }

    if (scenario.specialRules.length) {
      const specialRules = document.querySelector('.special-rules');
      this.#makeSectionHeader('Special Rules', specialRules);
      scenario.specialRules.forEach((rule) => {
        const name = document.createElement('div');
        name.classList.add('rule-name');
        name.textContent = `${rule.name}`;
        specialRules.appendChild(name);
        const description = document.createElement('div');
        description.classList.add('rule-description');
        description.innerHTML = rule.description;
        specialRules.appendChild(description);
      });
    }

    if (scenario.notes?.length) {
      const notes = document.querySelector('.notes');
      this.#makeSectionHeader('Notes', notes);
      scenario.notes.forEach((note) => {
        const noteEl = document.createElement('p');
        noteEl.classList.add('note');
        noteEl.innerHTML = `${note}`;
        notes.appendChild(noteEl);
      });
    }

    if (scenario.startingItems.length) {
      const startingItems = document.querySelector('.starting-items');
      this.#makeSectionHeader('Starting Items', startingItems);
      scenario.startingItems.forEach((startingItem) => {
        const name = document.createElement('div');
        name.classList.add('starting-item-name');
        name.textContent = startingItem;
        startingItems.appendChild(name);
      });
    }

    if (scenario.rollTables) {
      document.querySelector('.roll-tables').classList.remove('hidden');

      scenario.rollTables.yellow.forEach((yellowEntry, index) => {
        document.querySelector(`.yellow-${index + 1}`).innerHTML = yellowEntry;
      });

      scenario.rollTables.amber.forEach((amberEntry, index) => {
        document.querySelector(`.amber-${index + 1}`).innerHTML = amberEntry;
      });

      if (scenario.rollTables.red) {
        document.querySelector('.red-roll-table').classList.remove('hidden');
        scenario.rollTables.red.forEach((redEntry, index) => {
          document.querySelector(`.red-${index + 1}`).innerHTML = redEntry;
        });
      } else {
        document.querySelector('.red-roll-table').classList.add('hidden');
      }
    } else {
      document.querySelector('.roll-tables').classList.add('hidden');
    }
  };

  /**
   * Create a tension deck
   * @param {string} cardType The card type (green, amber, red)
   * @param {string[]} cards The cards for this tension deck
   * @returns
   */
  #createTensionDeck = (cardType, cards) => {
    const tensionDeckContainer = document.createElement('div');
    tensionDeckContainer.classList.add(
      'tension-deck-container',
      `${cardType}-deck`
    );

    const colourBar = document.createElement('div');
    colourBar.classList.add('colour-bar');
    tensionDeckContainer.appendChild(colourBar);

    const tensionDeckCards = document.createElement('div');
    tensionDeckCards.classList.add('tension-deck-cards');

    cards.forEach((card) => {
      const cardEl = document.createElement('div');
      cardEl.classList.add(`${cardType}-card`);
      cardEl.textContent = card;
      tensionDeckCards.appendChild(cardEl);
    });

    tensionDeckContainer.appendChild(tensionDeckCards);

    return tensionDeckContainer;
  };

  /**
   * Appends a section header to the given element
   * @param {string} headerText The text for the section header
   * @param {HTMLElement} parentEl The parent to attach the header to
   */
  #makeSectionHeader = (headerText, parentEl) => {
    parentEl.textContent = '';
    const sectionHeader = document.createElement('div');
    sectionHeader.classList.add('scenario-section-header');
    sectionHeader.innerHTML = headerText;
    parentEl.appendChild(sectionHeader);
  };

  #clearGrid = () => {
    document.querySelectorAll('.grid-cell').forEach((cell) => {
      cell.className = 'grid-cell';
      cell.textContent = '';
      const newCell = cell.cloneNode(true);
      cell.parentNode.replaceChild(newCell, cell);
    });
  };
}
