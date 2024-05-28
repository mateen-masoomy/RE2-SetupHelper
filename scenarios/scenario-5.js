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
export const scenario5 = {
  name: 'ESCAPE FROM RPD',
  intro: `With the Police Department above hopelessly overrun, there is no way back. As foreboding as the prospect is, the only hope is to follow the escape route and head towards the sewers. But first, a new horror must be overcome - a monstrous creature the like of which has never been seen before...`,
  description: `In this scenario the characters must defeat the G-Mutant boss blocking their escape from the Police Department. The players successfully complete this scenario once the G-Mutant has been killed.`,
  location: 'This scenario takes place in the RPD Basement and the Cesspool',
  specialRules: [
    {
      name: 'INSIDE THE MORGUE',
      description: `While in the same square as the ${FaTokenizer(
        'key'
      )}, a character may spend an action to discard the ${
        ITEMS.BlueKeyCard
      } and exchange it for the ${ITEMS.Lockpick}`,
    },
    {
      name: `THE ARMOURY`,
      description: `The Armoury is a special room accessible only during campaign mode if the players collected the ${ITEMS.RedKeyCard} during Scenario 4A. <p>The First character to enter the Armoury may either place the ${ITEMS.SubmachineGun} in their inventory <strong>or</strong> place the ${CARDS_AND_TOKENS.SidePackToken} on their profile card. A character with the ${CARDS_AND_TOKENS.SidePackToken} increases their inventory limit by two.`,
    },
  ],
  notes: [
    `Think carefully before taking either the ${ITEMS.SubmachineGun} or the Side Pack, as the choice will have repercussions later on...`,
  ],
  tensionDecks: [
    {
      green: [makeMultiple(30, TENSION_DECK.GreenCard)],
      amber: [
        makeMultiple(1, TENSION_DECK.EchoesInTheDarkness),
        makeMultiple(1, TENSION_DECK.PersistingUnease),
        makeMultiple(1, TENSION_DECK.CrimsonThirst),
        makeMultiple(2, TENSION_DECK.NoEscape),
        makeMultiple(2, TENSION_DECK.ToughHide),
      ],
      red: [
        makeMultiple(1, TENSION_DECK.UndeadAmbush),
        makeMultiple(1, TENSION_DECK.HideousScreech),
        makeMultiple(1, TENSION_DECK.RisingFear),
        makeMultiple(2, TENSION_DECK.VigourMortis),
      ],
    },
  ],
  behaviourDeck: {
    name: 'G-Mutant Behaviour Deck',
    deck: [
      makeMultiple(2, CARDS_AND_TOKENS.SpawnGImago),
      makeMultiple(2, CARDS_AND_TOKENS.LurchForward),
      makeMultiple(2, CARDS_AND_TOKENS.AcidicBile),
      makeMultiple(2, CARDS_AND_TOKENS.MonstrousSweep),
    ],
  },
  additionalCardsAndTokens: [
    makeMultiple(1, CARDS_AND_TOKENS.EchoesInTheDarknessToken),
    makeMultiple(2, CARDS_AND_TOKENS.PersistingUneaseToken),
    makeMultiple(1, CARDS_AND_TOKENS.SidePackToken),
    makeMultiple(8, CARDS_AND_TOKENS.GImagoToken),
    makeMultiple(1, CARDS_AND_TOKENS.LockpickCard),
    makeMultiple(1, CARDS_AND_TOKENS.SubmachineGunCard),
  ],
  tilesRequired: {
    small: `2 ${TileDescriptions.Small}s`,
    medium: `3 ${TileDescriptions.Medium}s`,
    smallSquare: `4 ${TileDescriptions.SmallSquare}s`,
    mediumSquare: `3 ${TileDescriptions.MediumSquare}s`,
    largeSquare: `1 ${TileDescriptions.LargeSquare}`,
    p: `4 ${TileDescriptions.P}s`,
    l: `5 ${TileDescriptions.L}s`,
  },
  rollTables: {
    yellow: [
      makeMultiple(2, ENEMY_TYPES.Zombie),
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
      makeMultiple(1, ENEMY_TYPES.Licker),
      `${makeMultiple(1, ENEMY_TYPES.Zombie)}, ${ROLL_TABLE.LurchForward}`,
      `${makeMultiple(2, ENEMY_TYPES.Zombie)} ${
        STRINGS.AtClosestBiohazardSymbol
      }`,
      `${makeMultiple(1, ENEMY_TYPES.Zombie)}, ${ROLL_TABLE.SnatchingTalons}`,
      makeMultiple(1, ENEMY_TYPES.Zombie),
      `${makeMultiple(2, STRINGS.Corpse)}, ${ROLL_TABLE.UnsettlingFeeling}`,
    ],
    red: [
      makeMultiple(1, ENEMY_TYPES.Licker),
      ROLL_TABLE.ReplaceWithZombie,
      makeMultiple(2, ENEMY_TYPES.Zombie),
      ROLL_TABLE.ReplaceWithZombieAfterTensionPhase,
      ROLL_TABLE.ReplaceWIthZombieNextActivation,
      ROLL_TABLE.DeepeningUnease,
    ],
  },
  startingItems: [
    `2-4 ${ITEMS.Knife}`,
    `2-4 ${ITEMS.Handgun}`,
    makeMultiple(3, ITEMS.FirstAidSpray),
    makeMultiple(1, ITEMS.Shotgun),
    makeMultiple(1, ITEMS.Bowgun),
    makeMultiple(1, ITEMS.GrenadeLauncher),
  ],
  items: {
    [ITEM_TYPES.A]: [
      ITEMS.HandgunBullets,
      ITEMS.HandgunBullets,
      ITEMS.HandgunBullets,
      ITEMS.GreenHerb,
      ITEMS.ShotgunShells,
      ITEMS.BowgunBolts,
      ITEMS.GrenadeRounds,
      ITEMS.Magnum,
    ],
    [ITEM_TYPES.B]: [
      ITEMS.InkRibbon,
      ITEMS.RedHerb,
      ITEMS.FirstAidSpray,
      ITEMS.BlueKeyCard,
    ],
  },
  startingRooms: {
    p1: {
      floor: 0,
      roomIndex: 2,
    },
    p2: {
      floor: 1,
      roomIndex: 10,
    },
  },
  floors: {
    [0]: {
      label: {
        position: {
          x: 2,
          y: 1,
        },
        text: 'CESSPOOL',
      },
      rooms: [
        RoomGenerator[ROOM_SHAPES.SmallTall](2, 6, ROOM_TYPES.Green, [
          {
            index: 0,
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
            index: 1,
            config: {
              item: ITEM_TYPES.B,
              hasItemBox: true,
              numberOfIcons: 2,
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.LargeSquare](3, 2, ROOM_TYPES.Green, [
          {
            index: 1,
            config: {
              enemies: [ENEMY_TYPES.GMutant],
            },
          },
          {
            index: 4,
            config: {
              walls: [DIRECTIONS.Left, DIRECTIONS.Top, DIRECTIONS.Right],
            },
          },
          {
            index: 7,
            config: {
              walls: [DIRECTIONS.Top, DIRECTIONS.Left, DIRECTIONS.Right],
            },
          },
          {
            index: 8,
            config: {
              walls: [DIRECTIONS.Bottom, DIRECTIONS.Left, DIRECTIONS.Right],
            },
          },
          {
            index: 11,
            config: {
              walls: [DIRECTIONS.Bottom, DIRECTIONS.Left, DIRECTIONS.Right],
            },
          },
          {
            index: 12,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Bottom,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.L_90](3, 6, ROOM_TYPES.Green, [
          {
            index: 0,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Left,
                  connectingRoomIndex: 0,
                },
                {
                  direction: DIRECTIONS.Top,
                  connectingRoomIndex: 1,
                  keyRequired: ITEMS.Lockpick,
                },
              ],
              numberOfIcons: 2,
            },
          },
          {
            index: 2,
            config: {
              enemies: [ENEMY_TYPES.Zombie],
            },
          },
          {
            index: 3,
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
            index: 5,
            config: {
              p1StartingPoint: true,
            },
          },
          {
            index: 6,
            config: {
              stairs: {
                connectingFloor: 1,
                connectingRoomIndex: 0,
              },
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.MediumWide](7, 1, ROOM_TYPES.Amber, [
          {
            index: 4,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Bottom,
                  connectingRoomIndex: 4,
                },
              ],
              walls: [DIRECTIONS.Top, DIRECTIONS.Right],
            },
          },
          {
            index: 5,
            config: {
              item: ITEM_TYPES.B,
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.L_90](7, 3, ROOM_TYPES.Yellow, [
          {
            index: 1,
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
            index: 3,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Bottom,
                  connectingRoomIndex: 5,
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
                  connectingRoomIndex: 2,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.SmallWide](10, 4, ROOM_TYPES.Green, [
          {
            index: 0,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Top,
                  connectingRoomIndex: 4,
                },
              ],
            },
          },
          {
            index: 1,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                  connectingRoomIndex: 7,
                  keyRequired: ITEMS.BlueKeyCard,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.SmallSquare](10, 5, ROOM_TYPES.Amber, [
          {
            index: 0,
            config: {
              hasItemBox: true,
            },
          },
          {
            index: 1,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                  connectingRoomIndex: 7,
                },
              ],
            },
          },
          {
            index: 2,
            config: {
              item: ITEM_TYPES.A,
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.P_180_Flip](12, 4, ROOM_TYPES.Yellow, [
          {
            index: 0,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Left,
                  connectingRoomIndex: 5,
                  keyRequired: ITEMS.Lockpick,
                },
              ],
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
          {
            index: 5,
            config: {
              stairs: {
                connectingFloor: 1,
                connectingRoomIndex: 13,
              },
            },
          },
        ]),
      ],
    },
    [1]: {
      label: {
        position: {
          x: 4,
          y: 8,
        },
        text: 'BASEMENT',
      },
      rooms: [
        RoomGenerator[ROOM_SHAPES.P](5, 9, ROOM_TYPES.Yellow, [
          {
            index: 1,
            config: {
              stairs: {
                connectingFloor: 0,
                connectingRoomIndex: 2,
              },
            },
          },
          {
            index: 3,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Bottom,
                  connectingRoomIndex: 5,
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
                  connectingRoomIndex: 1,
                  keyRequired: ITEMS.Lockpick,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.L_180](2, 13, ROOM_TYPES.Yellow, [
          {
            index: 0,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Bottom,
                  connectingRoomIndex: 4,
                },
              ],
            },
          },
          {
            index: 3,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Top,
                  connectingRoomIndex: 0,
                  keyRequired: ITEMS.Lockpick,
                },
              ],
            },
          },
          {
            index: 6,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                  connectingRoomIndex: 6,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.SmallSquare](3, 14, ROOM_TYPES.Green, [
          {
            index: 0,
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
            index: 1,
            config: {
              item: ITEM_TYPES.A,
              hasCorpse: true,
              numberOfIcons: 2,
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.SmallSquare](3, 16, ROOM_TYPES.Green, [
          {
            index: 0,
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
            index: 3,
            config: {
              hasTypewriter: true,
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.P_180](2, 14, ROOM_TYPES.Yellow, [
          {
            index: 0,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                  connectingRoomIndex: 2,
                },
                {
                  direction: DIRECTIONS.Top,
                  connectingRoomIndex: 1,
                },
              ],
              numberOfIcons: 2,
            },
          },
          {
            index: 2,
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
                  connectingRoomIndex: 3,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.MediumTall](6, 11, ROOM_TYPES.Green, [
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
            index: 1,
            config: {
              item: ITEM_TYPES.B,
            },
          },
          {
            index: 3,
            config: {
              walls: [DIRECTIONS.Right, DIRECTIONS.Bottom],
            },
          },
          {
            index: 5,
            config: {
              item: ITEM_TYPES.B,
              enemies: [ENEMY_TYPES.ZombieDog],
              numberOfIcons: 2,
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.MediumSquare](6, 14, ROOM_TYPES.Green, [
          {
            index: 0,
            config: {
              item: ITEM_TYPES.A,
            },
          },
          {
            index: 2,
            config: {
              enemies: [ENEMY_TYPES.ZombieDog],
            },
          },
          {
            index: 5,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                  connectingRoomIndex: 7,
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
                  connectingRoomIndex: 1,
                },
              ],
            },
          },
          {
            index: 7,
            config: {
              enemies: [ENEMY_TYPES.ZombieDog],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.MediumWide](9, 15, ROOM_TYPES.Amber, [
          {
            index: 0,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Left,
                  connectingRoomIndex: 6,
                },
              ],
            },
          },
          {
            index: 5,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                  connectingRoomIndex: 10,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.SmallSquare](11, 11, ROOM_TYPES.Green, [
          {
            index: 3,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Bottom,
                },
              ],
              label: 'Armoury',
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.MediumSquare](13, 10, ROOM_TYPES.Amber, [
          {
            index: 0,
            config: {
              item: ITEM_TYPES.A,
            },
          },
          {
            index: 2,
            config: {
              item: ITEM_TYPES.A,
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
          {
            index: 7,
            config: {
              walls: [DIRECTIONS.Top, DIRECTIONS.Bottom],
            },
          },
          {
            index: 8,
            config: {
              walls: [DIRECTIONS.Top, DIRECTIONS.Right, DIRECTIONS.Bottom],
              hasTypewriter: true,
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.L_90](12, 13, ROOM_TYPES.Green, [
          {
            index: 0,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Top,
                  connectingRoomIndex: 8,
                  prompt: {
                    text: `Do you have the <span class="emphasis">${ITEMS.RedKeyCard}</span>?`,
                    result: `Unlocked with <span class="emphasis">${ITEMS.RedKeyCard}</span>`,
                  },
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
                  connectingRoomIndex: 9,
                },
              ],
            },
          },
          {
            index: 2,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Bottom,
                  connectingRoomIndex: 11,
                  keyRequired: ITEMS.BlueKeyCard,
                },
              ],
            },
          },
          {
            index: 3,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Right,
                  connectingRoomIndex: 12,
                },
              ],
              p2StartingPoint: true,
              numberOfIcons: 2,
            },
          },
          {
            index: 5,
            config: {
              enemies: [ENEMY_TYPES.ZombieDog],
            },
          },
          {
            index: 6,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Left,
                  connectingRoomIndex: 7,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.MediumSquare](13, 14, ROOM_TYPES.Red, [
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
              hasCorpse: true,
            },
          },
          {
            index: 7,
            config: {
              hasCorpse: true,
              walls: [DIRECTIONS.Top, DIRECTIONS.Bottom],
            },
          },
          {
            index: 8,
            config: {
              walls: [DIRECTIONS.Top, DIRECTIONS.Right, DIRECTIONS.Bottom],
              isScenarioObjective: true,
              scenarioObjectiveConfig: {
                requirements: [ITEMS.BlueKeyCard],
                after: `Discard the <span class="emphasis">${ITEMS.BlueKeyCard}</span>?`,
                item: ITEMS.Lockpick,
                result: `Received the <span class="emphasis">${ITEMS.Lockpick}</span>. Discarded ${ITEMS.BlueKeyCard}`,
                consumeRequirements: true,
              },
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.P_90_Flip](16, 13, ROOM_TYPES.Amber, [
          {
            index: 0,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Left,
                  connectingRoomIndex: 10,
                },
              ],
            },
          },
          {
            index: 2,
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
                  connectingRoomIndex: 13,
                },
              ],
            },
          },
        ]),
        RoomGenerator[ROOM_SHAPES.L_180](17, 10, ROOM_TYPES.Yellow, [
          {
            index: 0,
            config: {
              stairs: {
                connectingFloor: 0,
                connectingRoomIndex: 7,
              },
            },
          },
          {
            index: 5,
            config: {
              doors: [
                {
                  direction: DIRECTIONS.Left,
                  connectingRoomIndex: 12,
                },
              ],
            },
          },
        ]),
      ],
    },
  },
};
