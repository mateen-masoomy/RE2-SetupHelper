import { RoomGenerator } from '../helpers/room-generator.js';
import { ITEMS, ITEM_TYPES } from '../constants/items.js';
import { TENSION_DECK } from '../constants/tension-deck.js';
import { CARDS_AND_TOKENS } from '../constants/cards-and-tokens.js';
import { ROLL_TABLE } from '../constants/roll-table.js';
import { STRINGS } from '../constants/strings.js';
import { ENEMY_TYPES } from '../constants/enemies.js';
import { DIRECTIONS } from '../constants/directions.js';
import { ROOM_SHAPES, ROOM_TYPES } from '../constants/rooms.js';
import { TileDescriptions } from '../constants/tiles.js';
import { makeMultiple } from '../helpers/multiples.js';
import { FaTokenizer } from '../helpers/fa-tokenizer.js';

/**
 * @type Scenario
 */
export const scenario4 = {
  name: "LET'S GET THE HELL OUT OF HERE",
  intro: `With every passing moment, the RPD building becomes increasingly dangerous and the odds of survival become ever more bleak. Only one chance remains - an escape route mentioned in an operations report from Marvin's office. Now begins the desperate hunt for a key to unlock the path ahead.`,
  description: `In this scenario the characters must make their way into the Basement and leave the RPD building behind them. A character placed on the swquare marked with the ${FaTokenizer(
    'star'
  )} has escaped and is removed from the playing area. The players successfully complete this scenario if all characters have escaped the playing area.`,
  location:
    'This scenario takes place in the Streets and the Raccoon City Police Department',
  notes: [
    `Although players will porbably want to escape this scenario as quickly as possible, it's definitely worth staying to look for the Club Key, especially if you're playing in campaign mode. Invaluable items are hidden away in those extra rooms!`,
  ],
  specialRules: [
    {
      name: 'SECURING THE EAST CORRIDOR',
      description: `A character with the Wire Cord from Scenario 3 may use the item while in the square marked with the ${FaTokenizer(
        'key'
      )} to <strong>secure</strong> the tile with heavy shutters. Characters do not have to draw a card during their Tension Phase while on a secure tile. Sustained effect tokens already on or placed on a secure tile are immediately discarded without effect.`,
    },
    {
      name: `THEY'RE BREAKING IN!`,
      description: `When the Heart Key is placed in a character's inventory, shuffle an Undead Ambush card into the tension deck draw pile.`,
    },
  ],
  tensionDecks: [
    {
      green: [makeMultiple(30, TENSION_DECK.GreenCard)],
      amber: [
        makeMultiple(2, TENSION_DECK.EchoesInTheDarkness),
        makeMultiple(2, TENSION_DECK.NoEscape),
        makeMultiple(1, TENSION_DECK.PrehensileGrasp),
        makeMultiple(1, TENSION_DECK.PersistingUnease),
        makeMultiple(2, TENSION_DECK.ToughHide),
      ],
      red: [
        makeMultiple(1, TENSION_DECK.HideousScreech),
        makeMultiple(1, TENSION_DECK.BloodcurdlingHowl),
        makeMultiple(1, TENSION_DECK.VigourMortis),
        makeMultiple(1, TENSION_DECK.MurderOfCrows),
      ],
    },
  ],
  additionalCardsAndTokens: [
    makeMultiple(2, CARDS_AND_TOKENS.EchoesInTheDarknessToken),
    makeMultiple(2, CARDS_AND_TOKENS.PrehensileGraspToken),
    makeMultiple(1, CARDS_AND_TOKENS.PersistingUneaseToken),
    makeMultiple(1, CARDS_AND_TOKENS.UndeadAmbush),
  ],
  tilesRequired: {
    small: `4 ${TileDescriptions.Small}s`,
    medium: `1 ${TileDescriptions.Medium}`,
    smallSquare: `3 ${TileDescriptions.SmallSquare}s`,
    mediumSquare: `4 ${TileDescriptions.MediumSquare}s`,
    p: `1 ${TileDescriptions.P}`,
    l: `5 ${TileDescriptions.L}s`,
  },
  rollTables: {
    yellow: [
      ROLL_TABLE.ScentOfDeath,
      `${makeMultiple(1, ENEMY_TYPES.Zombie)}, ${makeMultiple(
        1,
        STRINGS.Corpse
      )}`,
      makeMultiple(1, ENEMY_TYPES.Zombie),
      `${makeMultiple(1, STRINGS.Corpse)}, ${ROLL_TABLE.UnsettlingFeeling}`,
      ROLL_TABLE.SafeForNow,
      ROLL_TABLE.Empty,
    ],
    amber: [
      makeMultiple(2, ENEMY_TYPES.ZombieDog),
      `${makeMultiple(2, ENEMY_TYPES.Zombie)}, ${ROLL_TABLE.SnatchingTalons}`,
      `${makeMultiple(2, ENEMY_TYPES.Zombie)} ${
        STRINGS.AtClosestBiohazardSymbol
      }`,
      `${makeMultiple(1, ENEMY_TYPES.Zombie)}, ${makeMultiple(
        1,
        STRINGS.Corpse
      )}`,
      makeMultiple(1, ENEMY_TYPES.Zombie),
      `${makeMultiple(2, STRINGS.Corpse)}, ${ROLL_TABLE.UnsettlingFeeling}`,
    ],
  },
  startingItems: [
    `1-4 ${ITEMS.Knife}`,
    `1-4 ${ITEMS.Handgun}`,
    makeMultiple(2, ITEMS.FirstAidSpray),
    `1 Shotgun`,
    `1 Bowgun`,
  ],
  items: {
    [ITEM_TYPES.A]: [
      ITEMS.HandgunBullets,
      ITEMS.HandgunBullets,
      ITEMS.HandgunBullets,
      ITEMS.ShotgunShells,
      ITEMS.BowgunBolts,
      ITEMS.GreenHerb,
      ITEMS.ClubKey,
      ITEMS.HeartKey,
    ],
    [ITEM_TYPES.B]: [
      ITEMS.FirstAidSpray,
      ITEMS.CustomHandgunParts,
      ITEMS.RedKeyCard,
    ],
  },
  startingRooms: {
    p1: {
      floor: 1,
      roomIndex: 0,
    },
    p2: {
      floor: 0,
      roomIndex: 0,
    },
  },
  floors: {
    [0]: {
      label: {
        position: {
          x: 11,
          y: 12,
        },
        text: 'Streets',
      },
      rooms: [
        RoomGenerator[ROOM_SHAPES.P_270](11, 13, ROOM_TYPES.Green, [
          {
            index: 0,
            config: {
              enemies: [ENEMY_TYPES.Zombie],
              item: ITEM_TYPES.A,
              numberOfIcons: 2,
            },
          },
          {
            index: 2,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Bottom,
                  connectingRoomIndex: 2,
                },
              ],
            },
          },
          {
            index: 5,
            config: {
              p2StartingPoint: true,
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.SmallTall](9, 15, ROOM_TYPES.Green, [
          {
            index: 0,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                },
              ],
            },
          },
          {
            index: 1,
            config: {
              hasCorpse: true,
              item: ITEM_TYPES.A,
              numberOfIcons: 2,
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.MediumSquare](10, 15, ROOM_TYPES.Yellow, [
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
              doors: [
                {
                  direction: DIRECTIONS.Top,
                  connectingRoomIndex: 0,
                },
              ],
            },
          },
          {
            index: 2,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                  connectingRoomIndex: 3,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.SmallSquare](13, 15, ROOM_TYPES.Yellow, [
          {
            index: 0,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Left,
                  connectingRoomIndex: 2,
                },
              ],
              walls: [DIRECTIONS.Top, DIRECTIONS.Right],
            },
          },
          {
            index: 1,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                  connectingRoomIndex: 4,
                },
              ],
            },
          },
          {
            index: 2,
            config: {
              hasTypewriter: true,
            },
          },
          {
            index: 3,
            config: {
              item: ITEM_TYPES.A,
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.L_180](15, 15, ROOM_TYPES.Amber, [
          {
            index: 0,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Left,
                  connectingRoomIndex: 3,
                },
              ],
            },
          },
          {
            index: 6,
            config: {
              stairs: {
                connectingFloor: 2,
                connectingRoomIndex: 1,
              },
            },
          },
        ]),
      ],
    },
    [1]: {
      label: {
        position: {
          x: 2,
          y: 1,
        },
        text: 'FIRST FLOOR',
      },
      rooms: [
        RoomGenerator[ROOM_SHAPES.SmallTall](2, 10, ROOM_TYPES.Green, [
          {
            index: 0,
            config: {
              p1StartingPoint: true,
            },
          },
          {
            index: 1,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                  connectingRoomIndex: 5,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.SmallSquare](3, 2, ROOM_TYPES.Green, [
          {
            index: 0,
            config: {
              enemies: [ENEMY_TYPES.Zombie],
              item: ITEM_TYPES.A,
              numberOfIcons: 2,
            },
          },
          {
            index: 2,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Bottom,
                  connectingRoomIndex: 3,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.SmallSquare](5, 2, ROOM_TYPES.Yellow, [
          {
            index: 0,
            config: {
              item: ITEM_TYPES.B,
            },
          },
          {
            index: 3,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Bottom,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.L_180](3, 4, ROOM_TYPES.Yellow, [
          {
            index: 0,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Top,
                  connectingRoomIndex: 1,
                },
                {
                  direction: DIRECTIONS.Bottom,
                  connectingRoomIndex: 4,
                },
              ],
              numberOfIcons: 2,
            },
          },
          {
            index: 1,
            config: {
              hasCorpse: true,
            },
          },
          {
            index: 3,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Top,
                  connectingRoomIndex: 2,
                  keyRequired: ITEMS.ClubKey,
                },
              ],
            },
          },
          {
            index: 6,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Bottom,
                  connectingRoomIndex: 5,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.MediumSquare](3, 5, ROOM_TYPES.Amber, [
          {
            index: 0,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Top,
                },
              ],
            },
          },
          {
            index: 4,
            config: {
              walls: [DIRECTIONS.Right],
            },
          },
          {
            index: 6,
            config: {
              item: ITEM_TYPES.A,
            },
          },
          {
            index: 8,
            config: {
              hasTypewriter: true,
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.L_90](3, 8, ROOM_TYPES.Green, [
          {
            index: 0,
            config: {
              enemies: [ENEMY_TYPES.Zombie],
            },
          },
          {
            index: 3,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Top,
                  connectingRoomIndex: 3,
                },
              ],
            },
          },
          {
            index: 4,
            config: {
              enemies: [ENEMY_TYPES.Zombie, ENEMY_TYPES.Zombie],
              numberOfIcons: 2,
            },
          },
          {
            index: 5,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                  connectingRoomIndex: 6,
                },
              ],
            },
          },
          {
            index: 6,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Left,
                  connectingRoomIndex: 0,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.MediumSquare](4, 9, ROOM_TYPES.Amber, [
          {
            index: 0,
            config: {
              hasCorpse: true,
              item: ITEM_TYPES.A,
              numberOfIcons: 2,
            },
          },
          {
            index: 1,
            config: {
              walls: [DIRECTIONS.Top, DIRECTIONS.Right],
            },
          },
          {
            index: 2,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                  connectingRoomIndex: 8,
                  keyRequired: ITEMS.HeartKey,
                },
              ],
            },
          },
          {
            index: 3,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Left,
                  connectingRoomIndex: 5,
                },
              ],
            },
          },
          {
            index: 4,
            config: {
              walls: [DIRECTIONS.Right],
            },
          },
          {
            index: 5,
            config: {
              hasCorpse: true,
            },
          },
          {
            index: 8,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                  connectingRoomIndex: 9,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.MediumSquare](7, 6, ROOM_TYPES.Amber, [
          {
            index: 0,
            config: {
              item: ITEM_TYPES.B,
              walls: [DIRECTIONS.Left, DIRECTIONS.Top, DIRECTIONS.Right],
            },
          },
          {
            index: 1,
            config: {
              hasTypewriter: true,
            },
          },
          {
            index: 3,
            config: {
              hasCorpse: true,
              walls: [DIRECTIONS.Left, DIRECTIONS.Right],
            },
          },
          {
            index: 5,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                },
              ],
            },
          },
          {
            index: 8,
            config: {
              item: ITEM_TYPES.B,
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.L_270](7, 9, ROOM_TYPES.Amber, [
          {
            index: 0,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Left,
                },
              ],
            },
          },
          {
            index: 1,
            config: {
              isScenarioObjective: true,
              scenarioObjectiveConfig: {
                after: `Do you have the <span class='emphasis'>${ITEMS.WireCord}</span>?`,
                result: `<span class='emphasis'>Tile Secured</span>: Do not draw cards during the Tension Phase and discard tokens on this tile.`,
              },
            },
          },
          {
            index: 5,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Left,
                  connectingRoomIndex: 7,
                  keyRequired: ITEMS.ClubKey,
                },
              ],
            },
          },
          {
            index: 6,
            config: {
              isGoal: true,
              goalMessage: `A character that reaches this tile has escaped...`,
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.SmallTall](7, 10, ROOM_TYPES.Green, [
          {
            index: 0,
            config: {
              stairs: {
                connectingFloor: 2,
                connectingRoomIndex: 2,
              },
            },
          },
          {
            index: 1,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Left,
                  connectingRoomIndex: 6,
                },
              ],
            },
          },
        ]),
      ],
    },
    [2]: {
      label: {
        position: {
          x: 12,
          y: 1,
        },
        text: 'SECOND FLOOR',
      },
      rooms: [
        RoomGenerator[ROOM_SHAPES.L_270](12, 6, ROOM_TYPES.Yellow, [
          {
            index: 0,
            config: {
              item: ITEM_TYPES.A,
            },
          },
          {
            index: 3,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                  connectingRoomIndex: 2,
                },
              ],
            },
          },
          {
            index: 4,
            config: {
              hasCorpse: true,
            },
          },
          {
            index: 6,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                  connectingRoomIndex: 1,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.MediumTall](16, 2, ROOM_TYPES.Amber, [
          {
            index: 1,
            config: {
              item: ITEM_TYPES.A,
              walls: [DIRECTIONS.Top, DIRECTIONS.Right, DIRECTIONS.Bottom],
            },
          },
          {
            index: 2,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Left,
                  connectingRoomIndex: 0,
                },
              ],
            },
          },
          {
            index: 5,
            config: {
              stairs: {
                connectingFloor: 0,
                connectingRoomIndex: 4,
              },
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.SmallTall](16, 5, ROOM_TYPES.Green, [
          {
            index: 0,
            config: {
              stairs: {
                connectingFloor: 1,
                connectingRoomIndex: 9,
              },
            },
          },
          {
            index: 1,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Left,
                  connectingRoomIndex: 0,
                },
              ],
            },
          },
        ]),
      ],
    },
  },
};
