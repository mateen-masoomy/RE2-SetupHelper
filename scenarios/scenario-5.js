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
