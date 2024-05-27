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

/**
 * @type Scenario
 */
export const scenario = {
  name: 'THE S.T.A.R.S. OFFICE',
  intro: `With eerily quiet halls, it seems the Raccoon City Police Department won't be the sanctuary you once hoped for.
              The streets outside are overrun, though, so your only choice is to explore deeper within the RPD building and
              try to meet up with any other survivors. With hesitant steps, the search begins...`,
  description: `In this scenario the characters must find the S.T.A.R.S. Key, and make their way to the S.T.A.R.S. Office
                    on the 2nd Floor. The players successfully complete this scenario if all characters are on the tile marked
                    as the S.T.A.R.S. Office and there are no enemies on that tile.`,
  location: 'This scenario takes place in the Raccoon City Police Department',
  specialRules: [
    {
      name: 'SAFE HAVEN',
      description: `A character on the S.T.A.R.S. Office tile does not have to draw a card during the Tension Phase.`,
    },
  ],
  tensionDeck: [
    {
      green: [makeMultiple(30, TENSION_DECK.GreenCard)],
      amber: [
        makeMultiple(2, TENSION_DECK.EchoesInTheDarkness),
        makeMultiple(2, TENSION_DECK.NoEscape),
        makeMultiple(2, TENSION_DECK.PrehensileGrasp),
      ],
      red: [
        makeMultiple(1, TENSION_DECK.UndeadAmbush),
        makeMultiple(1, TENSION_DECK.BloodcurdlingHowl),
      ],
    },
  ],
  additionalCardsAndTokens: [
    makeMultiple(2, CARDS_AND_TOKENS.EchoesInTheDarknessToken),
    makeMultiple(2, CARDS_AND_TOKENS.PrehensileGraspToken),
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
    yellow: [
      ROLL_TABLE.RollOnAmberEncounterTable,
      `${makeMultiple(2, ENEMY_TYPES.Zombie)} ${
        STRINGS.AtClosestBiohazardSymbol
      }`,
      makeMultiple(1, ENEMY_TYPES.Zombie),
      ROLL_TABLE.SnatchingTalons,
      ROLL_TABLE.UnsettlingFeeling,
      ROLL_TABLE.Empty,
    ],
    amber: [
      makeMultiple(2, ENEMY_TYPES.ZombieDog),
      `${makeMultiple(2, ENEMY_TYPES.Zombie)} ${
        STRINGS.AtClosestBiohazardSymbol
      }`,
      makeMultiple(2, ENEMY_TYPES.Zombie),
      `${makeMultiple(1, ENEMY_TYPES.Zombie)}, ${ROLL_TABLE.UnsettlingFeeling}`,
      makeMultiple(1, ENEMY_TYPES.Zombie),
      ROLL_TABLE.Empty,
    ],
  },
  startingItems: [
    `1-4 ${ITEMS.Knife}`,
    `1-4 ${ITEMS.Handgun}`,
    makeMultiple(2, ITEMS.FirstAidSpray),
  ],
  items: {
    [ITEM_TYPES.A]: [
      ITEMS.HandgunBullets,
      ITEMS.HandgunBullets,
      ITEMS.HandgunBullets,
      ITEMS.GreenHerb,
      ITEMS.GreenHerb,
      ITEMS.SpadeKey,
    ],
    [ITEM_TYPES.B]: [ITEMS.Bowgun, ITEMS.RedHerb, ITEMS.StarsKey],
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
        text: 'First Floor',
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
