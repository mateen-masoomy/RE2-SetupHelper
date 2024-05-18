(function () {
  /**
   * @type Scenario
   */
  var scenario = {
    name: 'Heading Back To Marvin',
    intro: `It looks like any survivors of the initial outbreak have long since fled or been killed, and the only police officers still present are roaming the halls as undead fiends. Only Marvin Branagh remains, locked inside the west office and passed out from blood loss. Time to head back and treat his wounds before it's too late.`,
    description: `In this scenario the characters must make their way to Marvin in the West Office. The players successfully complete this scenario if all characters are on the tile marked West Office and there are no enemies on that tile.`,
    location:
      'This scenario takes place in the Raccoon City Police Department.',
    notes: [
      `From this scenario onwards , if the tension deck runs out, the game ends immediately and the players lose. To prevent this happening, you must keep an eye on how many cards are remaining and use Ink Ribbons and Typewriters to refresh the deck (see 'The Tension Deck and Running Out of Time' on p. 21 of the Resident Evil 2: The Board Game rulebook).`,
      `Astute players will no doubt have noticed the Wire Cord won't be much use during this scenario. It might be worth holding on to if you're playing in campaign mode though!`,
      `If you're playing in campaign mode, make sure you pick up every weapon you can! You won't get a chance to come back and find anything you missed in earlier scenarios and will struggle to finish the campaign without them!`,
    ],
    specialRules: [
      {
        name: `THE CHIEF'S PUZZLES`,
        description: `Not sure how to unlock the West Office? Try searching through the items for clues...`,
      },
    ],
    tensionDeck: {
      green: [makeMultiple(30, TENSION_DECK.GreenCard)],
      amber: [
        makeMultiple(2, TENSION_DECK.EchoesInTheDarkness),
        makeMultiple(2, TENSION_DECK.PrehensileGrasp),
        makeMultiple(2, TENSION_DECK.NoEscape),
        makeMultiple(1, TENSION_DECK.PersistingUnease),
      ],
      red: [
        makeMultiple(1, TENSION_DECK.BloodcurdlingHowl),
        makeMultiple(1, TENSION_DECK.UndeadAmbush),
        makeMultiple(1, TENSION_DECK.MurderOfCrows),
      ],
    },
    additionalCardsAndTokens: [
      makeMultiple(2, CARDS_AND_TOKENS.EchoesInTheDarknessToken),
      makeMultiple(2, CARDS_AND_TOKENS.PrehensileGraspToken),
      makeMultiple(1, CARDS_AND_TOKENS.PersistingUneaseToken),
      makeMultiple(1, CARDS_AND_TOKENS.DiamondKeyCard),
    ],
    tilesRequired: {
      small: `3 ${TileDescriptions.Small}s`,
      medium: `3 ${TileDescriptions.Medium}s`,
      smallSquare: `1 ${TileDescriptions.SmallSquare}`,
      mediumSquare: `2 ${TileDescriptions.MediumSquare}s`,
      p: `4 ${TileDescriptions.P}s`,
      l: `5 ${TileDescriptions.L}s`,
    },
    rollTables: {
      yellow: [
        ROLL_TABLE.RollOnAmberEncounterTable,
        `${makeMultiple(1, EnemyTypes.Zombie)}, ${ROLL_TABLE.SnatchingTalons}`,
        `${makeMultiple(1, EnemyTypes.Zombie)}, ${makeMultiple(
          1,
          STRINGS.Corpse
        )}`,
        makeMultiple(1, EnemyTypes.Zombie),
        makeMultiple(1, STRINGS.Corpse),
        ROLL_TABLE.Empty,
      ],
      amber: [
        makeMultiple(1, EnemyTypes.Licker),
        makeMultiple(2, EnemyTypes.ZombieDog),
        `${makeMultiple(2, EnemyTypes.Zombie)} ${
          STRINGS.AtClosestBiohazardSymbol
        }`,
        makeMultiple(2, EnemyTypes.Zombie),
        makeMultiple(1, EnemyTypes.Zombie),
        ROLL_TABLE.UnsettlingFeeling,
      ],
    },
    startingItems: [
      `1-4 ${ITEMS.Knife}`,
      `1-4 ${ITEMS.Handgun}`,
      makeMultiple(2, ITEMS.FirstAidSpray),
      makeMultiple(1, ITEMS.Shotgun),
      makeMultiple(1, ITEMS.Bowgun),
    ],
    items: {
      [ITEM_TYPES.A]: [
        ITEMS.HandgunBullets,
        ITEMS.HandgunBullets,
        ITEMS.HandgunBullets,
        ITEMS.GreenHerb,
        ITEMS.GreenHerb,
        ITEMS.RedHerb,
        ITEMS.RedJewel,
        ITEMS.RedJewel,
        ITEMS.WireCord,
      ],
      [ITEM_TYPES.B]: [ITEMS.GrenadeLauncher],
    },
    startingRooms: {
      p1: {
        floor: 2,
        roomIndex: 1,
      },
      p2: {
        floor: 2,
        roomIndex: 10,
      },
    },
    floors: {
      [1]: {
        label: {
          position: {
            x: 2,
            y: 9,
          },
          text: 'First Floor',
        },
        rooms: [
          RoomGenerator[RoomDefs.P](2, 10, RoomTypes.Yellow, [
            {
              index: 1,
              config: {
                stairs: {
                  connectingFloor: 1,
                  connectingRoomIndex: 0,
                },
              },
            },
            {
              index: 3,
              config: {
                doors: [
                  {
                    direction: Directions.Bottom,
                    connectingRoomIndex: 1,
                  },
                ],
              },
            },
            {
              index: 5,
              config: {
                doors: [
                  {
                    direction: Directions.Bottom,
                    connectingRoomIndex: 2,
                  },
                ],
              },
            },
          ]),
          RoomGenerator[RoomDefs.SmallTall](3, 12, RoomTypes.Green, [
            {
              index: 0,
              config: {
                doors: [
                  {
                    direction: Directions.Top,
                  },
                ],
              },
            },
            {
              index: 1,
              config: {
                hasTypewriter: true,
              },
            },
          ]),
          RoomGenerator[RoomDefs.SmallSquare](2, 14, RoomTypes.Amber, [
            {
              index: 0,
              config: {
                doors: [
                  {
                    direction: Directions.Top,
                    connectingRoomIndex: 0,
                  },
                ],
              },
            },
            {
              index: 1,
              config: {
                walls: [Directions.Top, Directions.Right, Directions.Bottom],
              },
            },
            {
              index: 3,
              config: {
                doors: [
                  {
                    direction: Directions.Right,
                    keyRequired: ITEMS.DiamondKey,
                    connectingRoomIndex: 3,
                  },
                ],
              },
            },
          ]),
          RoomGenerator[RoomDefs.MediumSquare](2, 13, RoomTypes.Amber, [
            {
              index: 4,
              config: {
                label: 'West Office',
              },
            },
            {
              index: 6,
              config: {
                doors: [
                  {
                    direction: Directions.Left,
                  },
                ],
              },
            },
            {
              index: 8,
              config: {
                walls: [Directions.Left, Directions.Right, Directions.Bottom],
                enemies: [EnemyTypes.Zombie],
              },
            },
          ]),
        ],
      },
      [2]: {
        label: {
          position: {
            x: 1,
            y: 1,
          },
          text: 'Second Floor',
        },
        rooms: [
          RoomGenerator[RoomDefs.P_270](1, 2, RoomTypes.Yellow, [
            {
              index: 0,
              config: {
                item: ITEM_TYPES.A,
              },
            },
            {
              index: 2,
              config: {
                doors: [
                  {
                    direction: Directions.Bottom,
                    connectionRoomIndex: 1,
                  },
                ],
              },
            },
            {
              index: 5,
              config: {
                stairs: {
                  connectingFloor: 1,
                  connectingRoomIndex: 0,
                },
              },
            },
          ]),
          RoomGenerator[RoomDefs.L](1, 4, RoomTypes.Green, [
            {
              index: 0,
              config: {
                doors: [
                  {
                    direction: Directions.Top,
                    connectingRoomIndex: 0,
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
            {
              index: 6,
              config: {
                doors: [
                  {
                    direction: Directions.Right,
                    connectingRoomIndex: 2,
                  },
                ],
              },
            },
          ]),
          RoomGenerator[RoomDefs.P_180_Flip](5, 4, RoomTypes.Amber, [
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
                    direction: Directions.Top,
                    connectingRoomIndex: 3,
                  },
                ],
                hasCorpse: true,
                numberOfIcons: 2,
              },
            },
            {
              index: 4,
              config: {
                doors: [
                  {
                    direction: Directions.Left,
                    connectingRoomIndex: 1,
                  },
                ],
              },
            },
          ]),
          RoomGenerator[RoomDefs.MediumSquare](6, 3, RoomTypes.Yellow, [
            {
              index: 0,
              config: {
                item: ITEM_TYPES.A,
              },
            },
            {
              index: 2,
              config: {
                stairs: {
                  connectingFloor: 3,
                  connectingRoomIndex: 2,
                },
              },
            },
            {
              index: 5,
              config: {
                doors: [
                  {
                    direction: Directions.Right,
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
                    direction: Directions.Bottom,
                    connectingRoomIndex: 2,
                  },
                ],
              },
            },
          ]),
          RoomGenerator[RoomDefs.L_90](9, 3, RoomTypes.Green, [
            {
              index: 1,
              config: {
                enemies: [EnemyTypes.Zombie],
              },
            },
            {
              index: 3,
              config: {
                doors: [
                  {
                    direction: Directions.Right,
                    connectingRoomIndex: 5,
                  },
                ],
                enemies: [EnemyTypes.Zombie],
                numberOfIcons: 2,
              },
            },
            {
              index: 4,
              config: {
                doors: [
                  {
                    direction: Directions.Left,
                    connectingRoomIndex: 3,
                  },
                ],
              },
            },
            {
              index: 5,
              config: {
                enemies: [EnemyTypes.Zombie],
              },
            },
          ]),
          RoomGenerator[RoomDefs.P_180_Flip](13, 3, RoomTypes.Green, [
            {
              index: 0,
              config: {
                doors: [
                  {
                    direction: Directions.Left,
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
                    direction: Directions.Right,
                    connectingRoomIndex: 6,
                  },
                ],
              },
            },
            {
              index: 4,
              config: {
                hasTypewriter: true,
                item: ITEM_TYPES.A,
                numberOfIcons: 2,
              },
            },
            {
              index: 5,
              config: {
                hasItemBox: true,
              },
            },
          ]),
          RoomGenerator[RoomDefs.L_90](15, 3, RoomTypes.Amber, [
            {
              index: 2,
              config: {
                doors: [
                  {
                    direction: Directions.Bottom,
                    connectingRoomIndex: 7,
                  },
                ],
              },
            },
            {
              index: 3,
              config: {
                item: ITEM_TYPES.A,
              },
            },
            {
              index: 5,
              config: {
                doors: [
                  {
                    direction: Directions.Left,
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
                    direction: Directions.Bottom,
                    connectingRoomIndex: 8,
                  },
                ],
              },
            },
          ]),
          RoomGenerator[RoomDefs.MediumTall](16, 4, RoomTypes.Green, [
            {
              index: 1,
              config: {
                doors: [
                  {
                    direction: Directions.Top,
                    connectingRoomIndex: 6,
                  },
                ],
              },
            },
            {
              index: 3,
              config: {
                enemies: [EnemyTypes.Licker],
              },
            },
            {
              index: 4,
              config: {
                item: ITEM_TYPES.A,
              },
            },
            {
              index: 5,
              config: {
                isScenarioObjective: true,
              },
            },
          ]),
          RoomGenerator[RoomDefs.L_270](15, 7, RoomTypes.Yellow, [
            {
              index: 0,
              config: {
                doors: [
                  {
                    direction: Directions.Top,
                    connectingRoomIndex: 6,
                  },
                ],
              },
            },
            {
              index: 3,
              config: {
                doors: [
                  {
                    direction: Directions.Right,
                    connectingRoomIndex: 10,
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
                    direction: Directions.Right,
                    connectingRoomIndex: 9,
                  },
                ],
              },
            },
          ]),
          RoomGenerator[RoomDefs.MediumTall](19, 3, RoomTypes.Yellow, [
            {
              index: 1,
              config: {
                item: ITEM_TYPES.A,
                walls: [Directions.Top, Directions.Right, Directions.Bottom],
              },
            },
            {
              index: 2,
              config: {
                doors: [
                  {
                    direction: Directions.Left,
                  },
                ],
              },
            },
            {
              index: 3,
              config: {
                item: ITEM_TYPES.A,
                hasCorpse: true,
                numberOfIcons: 2,
              },
            },
          ]),
          RoomGenerator[RoomDefs.SmallTall](19, 6, RoomTypes.Green, [
            {
              index: 0,
              config: {
                p2StartingPoint: true,
              },
            },
            {
              index: 1,
              config: {
                doors: [
                  {
                    direction: Directions.Left,
                    connectingRoomIndex: 8,
                  },
                ],
              },
            },
          ]),
        ],
      },
      [3]: {
        label: {
          position: {
            x: 9,
            y: 11,
          },
          text: 'Third Floor',
        },
        rooms: [
          RoomGenerator[RoomDefs.SmallSquare](9, 13, RoomTypes.Green, [
            {
              index: 0,
              config: {
                item: ITEM_TYPES.B,
              },
            },
            {
              index: 2,
              config: {
                doors: [
                  {
                    direction: Directions.Bottom,
                  },
                ],
              },
            },
          ]),
          RoomGenerator[RoomDefs.L_270](9, 15, RoomTypes.Yellow, [
            {
              index: 0,
              config: {
                doors: [
                  {
                    direction: Directions.Top,
                    keyRequired: ITEMS.DiamondKey,
                    connectingRoomIndex: 0,
                  },
                ],
              },
            },
            {
              index: 5,
              config: {
                doors: [
                  {
                    direction: Directions.Left,
                  },
                ],
              },
            },
            {
              index: 6,
              config: {
                item: ITEM_TYPES.A,
              },
            },
          ]),
          RoomGenerator[RoomDefs.SmallTall](11, 13, RoomTypes.Green, [
            {
              index: 0,
              config: {
                doors: [
                  {
                    direction: Directions.Right,
                    connectingRoomIndex: 1,
                  },
                ],
              },
            },
            {
              index: 1,
              config: {
                stairs: {
                  connectingFloor: 2,
                  connectingRoomIndex: 3,
                },
              },
            },
          ]),
        ],
      },
    },
  };

  scenarioDefs[3] = scenario;
})();
