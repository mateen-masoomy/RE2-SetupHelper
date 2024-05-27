import { RoomGenerator } from '../helpers/room-generator.js';
import { ITEMS, ITEM_TYPES } from '../constants/items.js';
import { TENSION_DECK } from '../constants/tension-deck.js';
import { ENEMY_TYPES } from '../constants/enemies.js';
import { DIRECTIONS } from '../constants/directions.js';
import { ROOM_SHAPES, ROOM_TYPES } from '../constants/rooms.js';
import { TileDescriptions } from '../constants/tiles.js';
import { makeMultiple } from '../helpers/multiples.js';

/**
 * @type Scenario
 */
export const scenario1 = {
  name: 'GETING TO THE POLICE DEPARTMENT',
  intro: `You've arrived in Raccoon City, only to find it overrun by the undead. With the streets no longer safe, there must be somewhere more secure you can seek shelter...`,
  description: `In this scenario the characters must escape the streets of Raccoon City and make their way to the Raccoon City Police Department.`,
  location: 'This scenario takes place in the Streets.',
  specialRules: [],
  tensionDecks: [
    {
      green: [makeMultiple(16, TENSION_DECK.GreenCard)],
      amber: [makeMultiple(1, TENSION_DECK.EchoesInTheDarkness)],
      red: [makeMultiple(1, TENSION_DECK.UndeadAmbush)],
    },
  ],
  additionalCardsAndTokens: [],
  tilesRequired: {
    small: `1 ${TileDescriptions.Small}`,
    medium: `2 ${TileDescriptions.Medium}s`,
    smallSquare: `1 ${TileDescriptions.SmallSquare}`,
    mediumSquare: `2 ${TileDescriptions.MediumSquare}2`,
    l: `3 ${TileDescriptions.L}s`,
  },
  startingItems: [`1-4 ${ITEMS.Knife}`, `1-4 ${ITEMS.Handgun}`],
  items: {
    [ITEM_TYPES.A]: [ITEMS.HandgunBullets, ITEMS.GreenHerb],
    [ITEM_TYPES.B]: [ITEMS.Shotgun],
  },
  startingRooms: {
    p1: {
      floor: 1,
      roomIndex: 1,
    },
    p2: {
      floor: 1,
      roomIndex: 2,
    },
  },
  floors: {
    [1]: {
      rooms: [
        RoomGenerator[ROOM_SHAPES.MediumSquare](7, 4, ROOM_TYPES.Green, [
          {
            index: 0,
            config: {
              walls: [DIRECTIONS.Left, DIRECTIONS.Top, DIRECTIONS.Right],
              item: ITEM_TYPES.A,
            },
          },
          {
            index: 2,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                  connectingRoomIndex: 1,
                },
              ],
            },
          },
          {
            index: 3,
            config: {
              walls: [DIRECTIONS.Left, DIRECTIONS.Right],
            },
          },
          {
            index: 5,
            config: {
              walls: [DIRECTIONS.Bottom, DIRECTIONS.Right],
            },
          },
          {
            index: 6,
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
        RoomGenerator[ROOM_SHAPES.L_90](10, 3, ROOM_TYPES.Green, [
          {
            index: 1,
            config: {
              enemies: [ENEMY_TYPES.Zombie],
            },
          },
          {
            index: 3,
            config: {
              p1StartingPoint: true,
            },
          },
          {
            index: 4,
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
        RoomGenerator[ROOM_SHAPES.L](6, 7, ROOM_TYPES.Green, [
          {
            index: 0,
            config: {
              p2StartingPoint: true,
            },
          },
          {
            index: 5,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Bottom,
                  connectingRoomIndex: 5,
                },
              ],
              enemies: [ENEMY_TYPES.Zombie],
              numberOfIcons: 2,
            },
          },
          {
            index: 6,
            config: {
              item: ITEM_TYPES.A,
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.L_180](7, 7, ROOM_TYPES.Green, [
          {
            index: 0,
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
              enemies: [ENEMY_TYPES.Zombie],
            },
          },
          {
            index: 4,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Left,
                  connectingRoomIndex: 4,
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
                  connectingRoomIndex: 6,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.SmallSquare](8, 8, ROOM_TYPES.Green, [
          {
            index: 1,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                },
              ],
              enemies: [ENEMY_TYPES.Zombie, ENEMY_TYPES.Zombie],
              numberOfIcons: 2,
            },
          },
          {
            index: 2,
            config: {
              item: ITEM_TYPES.B,
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.MediumWide](7, 11, ROOM_TYPES.Green, [
          {
            index: 1,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Top,
                  connectingRoomIndex: 2,
                },
              ],
            },
          },
          {
            index: 5,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Bottom,
                  connectingRoomIndex: 7,
                },
              ],
              enemies: [ENEMY_TYPES.Zombie],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.MediumWide](10, 11, ROOM_TYPES.Green, [
          {
            index: 0,
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
            index: 1,
            config: {
              enemies: [ENEMY_TYPES.Zombie],
            },
          },
          {
            index: 2,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Top,
                  connectingRoomIndex: 8,
                },
              ],
            },
          },
          {
            index: 3,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Bottom,
                  connectingRoomIndex: 7,
                },
              ],
            },
          },
          {
            index: 5,
            config: {
              item: ITEM_TYPES.A,
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.SmallWide](9, 13, ROOM_TYPES.Green, [
          {
            index: 0,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Top,
                  connectingRoomIndex: 5,
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
                  connectingRoomIndex: 6,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.MediumSquare](12, 8, ROOM_TYPES.Green, [
          {
            index: 1,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Top,
                },
              ],
              label: 'RPD Entrance',
            },
          },
          {
            index: 4,
            config: {
              walls: [DIRECTIONS.Left],
              enemies: [ENEMY_TYPES.Zombie],
            },
          },
          {
            index: 6,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Bottom,
                },
              ],
            },
          },
        ]),
      ],
    },
  },
};
