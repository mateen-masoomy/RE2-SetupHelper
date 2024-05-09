/**
 * @typedef {import("../types/scenario.types").Scenario} Scenario
 * @typedef {import("../types/scenario.types").ItemIndexes} ItemIndexes
 * @typedef {import("../types/scenario.types").Items} Items
 */

var ScenarioBuilder = (function () {
  /**
   * The collection of item indexes
   * @type {ItemIndexes}
   */
  var itemIndexes;

  /**
   * The collection of items
   * @type {Items}
   */
  var items;

/**
 * The collection of found items
 * @type {string[]}
 */  
  var foundItems = [];

  /**
   * The current scenario
   * @type {Scenario}
   */
  var currentScenario;

  /**
   * Build a scenario
   * @param {Scenario} scenario The scenario to build
   * @param {number} numberOfPlayers The number of players
   */
  var buildScenario = (scenario, numberOfPlayers) => {
    currentScenario = scenario;

    itemIndexes = {
      a: shuffle(scenario.items.a.map((val, index) => index)),
      b: shuffle(scenario.items.b.map((val, index) => index)),
    };

    buildRoom(scenario.floors, scenario.startingRooms.p1.floor, scenario.startingRooms.p1.roomIndex);

    if (numberOfPlayers > 1) {
      buildRoom(scenario.floors, scenario.startingRooms.p2.floor, scenario.startingRooms.p2.roomIndex);
    }
  }
  

  /**
   * Build Room
   * @description Render a room on the grid
   * @param {Object.<string, Floor>} floors - The collection of rooms for the floor
   * @param {number} floorNumber The floor number
   * @param {number} index                - The index of the room to build
   */
  function buildRoom(floors, floorNumber, index) {
    var config = floors[floorNumber].rooms[index];

    config.tiles.forEach((tileConfig) => {
      var cell = document.querySelector(
        "#cell_" + tileConfig.position.x + "x" + tileConfig.position.y
      );
      cell.classList.add(config.type);

      cell.innerHTML = "";

      var multiIcons = [];

      if (tileConfig.walls) {
        tileConfig.walls.forEach((wallDirection) => {
          cell.classList.add("wall-" + wallDirection);
        });
      }

      if (tileConfig.doors) {
        tileConfig.doors.forEach((door) => {
          cell.classList.add("door-" + door.direction);
          if (typeof door.connectingRoomIndex !== "undefined") {
            cell.addEventListener("click", () => {
              if (door.keyRequired) {
                if (!foundItems.includes(door.keyRequired)) {
                  cell.classList.remove("door-" + door.direction);
                  cell.classList.add("locked-door-" + door.direction);

                  document.querySelector(".notifier").innerHTML =
                    'Locked: <span class="emphasis">' +
                    door.keyRequired +
                    "</span> required.";
                  document
                    .querySelector(".notifier-container")
                    .classList.remove("hidden");
                } else {
                  if (!door.unlocked) {
                    document.querySelector(".notifier").innerHTML =
                      'Unlocked with <span class="emphasis">' +
                      door.keyRequired +
                      "</span>";
                    document
                      .querySelector(".notifier-container")
                      .classList.remove("hidden");
                    door.unlocked = true;
                  }
                  cell.classList.add("door-" + door.direction);
                  cell.classList.remove("locked-door-" + door.direction);
                  buildRoom(
                    floors,
                    floorNumber,
                    door.connectingRoomIndex
                  );
                }
              } else
                buildRoom(floors, floorNumber, door.connectingRoomIndex);
            });
          }
        });
      }

      if (tileConfig.p1StartingPoint) {
        cell.innerHTML +=
          '<span class="fa-stack"><i class="fa-solid fa-shield fa-stack-2x"></i><span class="fa-solid fa-stack-1x fa-inverse">1</span></span>';
        cell.querySelector(".fa-stack").addEventListener("click", () => {
          document.querySelector(".notifier").innerHTML =
            '<span class="emphasis">Player 1</span> start position';
          document
            .querySelector(".notifier-container")
            .classList.remove("hidden");
        });
      }

      if (tileConfig.p2StartingPoint) {
        cell.innerHTML +=
          '<span class="fa-stack"><i class="fa-solid fa-shield fa-stack-2x"></i><span class="fa-solid fa-stack-1x fa-inverse">2</span></span>';
        cell.querySelector(".fa-stack").addEventListener("click", () => {
          document.querySelector(".notifier").innerHTML =
            '<span class="emphasis">Player 2</span> starting position';
          document
            .querySelector(".notifier-container")
            .classList.removr("hidden");
        });
      }

      if (tileConfig.enemies) {
        tileConfig.enemies.forEach((enemy) => generateEnemy(cell, enemy));
      }

      if (tileConfig.item) {
        cell.innerHTML +=
          '<span class="fa-stack item"><i class="fa-solid fa-circle fa-stack-2x"></i><span class="fa-solid fa-stack-1x fa-inverse">!</span></span>';
        var itemIndex = itemIndexes[tileConfig.item].pop();
        var item = items[tileConfig.item][itemIndex];

        if (!tileConfig.numberOfIcons) {
          cell.querySelector(".fa-stack").addEventListener("click", () => {
            if (!foundItems.includes(item)) foundItems.push(item);
            document.querySelector(".notifier").innerHTML = item;
            document
              .querySelector(".notifier-container")
              .classList.remove("hidden");
          });
        } else {
          var el = document.createElement("span");

          el.classList.add("fa-stack");
          el.classList.add("item");
          el.innerHTML =
            '<i class="fa-solid fa-circle fa-stack-2x"></i><span class="fa-solid fa-stack-1x fa-inverse">!</span>';
          el.addEventListener("click", (ev) => {
            ev.stopImmediatePropagation();
            ev.stopPropagation();
            if (!foundItems.includes(item)) foundItems.push(item);
            document.querySelector(".notifier").innerHTML = item;
            document
              .querySelector(".notifier-container")
              .classList.remove("hidden");
          });

          multiIcons.push(el);
        }
      }

      if (tileConfig.stairs) {
        cell.innerHTML +=
          '<span class="fa-stack"><i class="fa-solid fa-circle fa-stack-2x"></i><i class="fa-solid fa-stairs fa-stack-1x contrast"></i></span>';
        cell.addEventListener("click", () => {
          buildRoom(
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
          cell.querySelector(".fa-stack").addEventListener("click", () => {
            document.querySelector(".notifier").innerHTML =
              '<span class="emphasis">Item Box</span>: Trade Items From Inventory';
            document
              .querySelector(".notifier-container")
              .classList.remove("hidden");
          });
        } else {
          var el = document.createElement("span");

          el.classList.add(["fa-stack"]);
          el.innerHTML =
            '<i class="fa-solid fa-circle fa-stack-2x"></i><i class="fa-solid fa-box fa-stack-1x contrast"></i>';
          el.addEventListener("click", (ev) => {
            ev.stopImmediatePropagation();
            ev.stopPropagation();
            document.querySelector(".notifier").innerHTML =
              '<span class="emphasis">Item Box</span>: Trade Items From Inventory';
            document
              .querySelector(".notifier-container")
              .classList.remove("hidden");
          });

          multiIcons.push(el);
        }
      }

      if (tileConfig.numberOfIcons) {
        cell.classList.add("icons-" + tileConfig.numberOfIcons);
        cell.addEventListener("click", (ev) => {
          ev.stopPropagation();
          ev.preventDefault();
          var notifier = document.querySelector(".notifier");
          notifier.innerHTML = '<span class="icons"></span>';
          console.log(multiIcons);
          multiIcons.forEach((icon) =>
            notifier.querySelector(".icons").appendChild(icon)
          );

          document
            .querySelector(".notifier-container")
            .classList.remove("hidden");
        });
      }
    });
  }

  function generateEnemy(cell, enemyType) {
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
  }

  // display scenario data
  // make the scenario picker work
  // configure for 1-4 players
  // add tile labels
  // add floor labels
  // add starting items

  function shuffle(array) {
    var copy = JSON.parse(JSON.stringify(array));
    let currentIndex = copy.length;

    // While there remain elements to shuffle...
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
  }

  return {
    BuildScenario: buildScenario,
  };
})();
