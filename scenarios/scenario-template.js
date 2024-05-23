import { RoomGenerator } from "../helpers/room-generator.js";
import { ITEMS, ITEM_TYPES } from "../constants/items.js";
import { TENSION_DECK } from "../constants/tension-deck.js";
import { CARDS_AND_TOKENS } from "../constants/cards-and-tokens.js";
import { ROLL_TABLE } from "../constants/roll-table.js";
import { STRINGS } from "../constants/strings.js";
import { ENEMY_TYPES } from "../constants/enemies.js";
import { DIRECTIONS } from "../constants/directions.js";
import { ROOM_SHAPES, ROOM_TYPES } from "../constants/rooms.js";
import { TileDescriptions } from "../constants/tiles.js";
import { makeMultiple } from "../helpers/multiples.js";

(function () {
  /**
   * @type Scenario
   */
  const scenario = {
    name: "",
    intro: ``,
    description: ``,
    location: "",
    specialRules: [
      {
        name: "",
        description: ``,
      },
    ],
    tilesRequired: {
      small: `2 ${TileDescriptions.Small}s`,
      medium: `1 ${TileDescriptions.Medium}`,
      smallSquare: `1 ${TileDescriptions.SmallSquare}`,
      mediumSquare: `4 ${TileDescriptions.MediumSquare}s`,
      p: `3 ${TileDescriptions.P}s`,
      l: `4 ${TileDescriptions.L}s`,
    },
    rollTables: {
      yellow: [],
      amber: [],
    },
    startingItems: [],
    items: {
      [ITEM_TYPES.A]: [],
      [ITEM_TYPES.B]: [],
    },
    startingRooms: {
      p1: {
        floor: 1,
        roomIndex: 0,
      },
      p2: {
        floor: 2,
        roomIndex: 0,
      },
    },
    floors: {
      [1]: {
        label: {
          position: {
            x: 5,
            y: 1,
          },
          text: "First Floor",
        },
        rooms: [
          RoomGenerator[ROOM_SHAPES.SmallTall](12, 8, ROOM_TYPES.Green, [
            {
              index: 0,
              config: {
                doors: [
                  {
                    direction: DIRECTIONS.Left,
                    connectingRoomIndex: 1,
                  },
                ],
              },
            },
            {
              index: 1,
              config: {
                p1StartingPoint: true,
              },
            },
          ]),
        ],
      },
    },
  };

  ScenarioDefs[0] = scenario;
})();
