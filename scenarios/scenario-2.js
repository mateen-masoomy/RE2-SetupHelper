(function() {
    /**
     * @type Scenario
     */
    var scenario = {
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
            description: `A character on the S.T.A.R.S. Office tile does not have to drwa a card during the Tension Phase.`
        }
      ],
      tilesRequired: {
        small: `2 ${TileDescriptions.Small}s`,
        medium: `1 ${TileDescriptions.Medium}`,
        smallSquare: `1 ${TileDescriptions.SmallSquare}`,
        mediumSquare: `4 ${TileDescriptions.MediumSquare}s`,
        p: `3 ${TileDescriptions.P}s`,
        l: `4 ${TileDescriptions.L}s`
      },
      rollTables: {
        yellow: [
            'Roll on the amber encounter table instead.',
            '2x Zombie at the closest hazard symbol',
            '1x Zombie',
            'Snatching Talons - The active character must pass an evade roll or their Action Phase ends immediately',
            'Unsettling Feeling - The active character draws an extra card during the Tension Phase.',
            'Empty'
        ],
        amber: [
            '2x Zombie Dog',
            '2x Zombie at the closest hazard symbol',
            '2x Zombie',
            '1x Zombie, Unsettling Feeling - The active character draws an extra card during the Tension Phase.',
            '1x Zombie',
            'Empty'
        ]
      },
      startingItems: [
        '1-4 Knife',
        '1-4 Handgun',
        '2x First Aid Spray'
      ],
      items: {
        a: [
          "Handgun Bullets",
          "Handgun Bullets",
          "Handgun Bullets",
          "Green Herb",
          "Green Herb",
          "Spade Key",
        ],
        b: ["Blowgun", "Red Herb", "S.T.A.R.S. Key"],
      },
      startingRooms: {
        p1: {
          floor: 1,
          roomIndex: 0
        },
        p2: {
          floor: 2,
          roomIndex: 0
        }
      },
      floors: {
        [1]: {
          rooms: [
            RoomGenerator[RoomDefs.SmallTall](12, 8, RoomTypes.Green, [
              {
                index: 0,
                config: {
                  doors: [
                    {
                      direction: Directions.Left,
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
            RoomGenerator[RoomDefs.MediumWide](9, 8, RoomTypes.Yellow, [
              {
                index: 2,
                config: {
                  doors: [
                    {
                      direction: Directions.Right,
                      connectingRoomIndex: 0,
                    },
                  ],
                  walls: [Directions.Top],
                },
              },
              {
                index: 3,
                config: {
                  doors: [
                    {
                      direction: Directions.Left,
                      connectingRoomIndex: 2,
                    },
                  ],
                  walls: [Directions.Bottom, Directions.Right],
                },
              },
            ]),
            RoomGenerator[RoomDefs.L](5, 6, RoomTypes.Green, [
              {
                index: 0,
                config: {
                  doors: [
                    {
                      direction: Directions.Top,
                      connectingRoomIndex: 3,
                    },
                  ],
                },
              },
              {
                index: 1,
                config: {
                  doors: [
                    {
                      direction: Directions.Right,
                      keyRequired: "Spade Key",
                      connectingRoomIndex: 4,
                    },
                  ],
                },
              },
              {
                index: 2,
                config: {
                  enemies: [EnemyTypes.Licker],
                },
              },
              {
                index: 6,
                config: {
                  doors: [
                    {
                      direction: Directions.Right,
                      connectingRoomIndex: 1,
                    },
                  ],
                },
              },
            ]),
            RoomGenerator[RoomDefs.L_90](5, 2, RoomTypes.Yellow, [
              {
                index: 2,
                config: {
                  doors: [
                    {
                      direction: Directions.Bottom,
                      connectingRoomIndex: 5,
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
            RoomGenerator[RoomDefs.MediumSquare](6, 6, RoomTypes.Yellow, [
              {
                index: 2,
                config: {
                  item: "b",
                },
              },
              {
                index: 3,
                config: {
                  doors: [
                    {
                      direction: Directions.Left,
                      connectingRoomIndex: 2,
                    },
                  ],
                  walls: [Directions.Right],
                },
              },
              {
                index: 6,
                config: {
                  walls: [
                    Directions.Left,
                    Directions.Bottom,
                    Directions.Right,
                  ],
                },
              },
              {
                index: 7,
                config: {
                  item: "b",
                },
              },
            ]),
            RoomGenerator[RoomDefs.MediumSquare](6, 3, RoomTypes.Amber, [
              {
                index: 1,
                config: {
                  doors: [
                    {
                      direction: Directions.Top,
                      connectingRoomIndex: 3,
                    },
                  ],
                },
              },
              {
                index: 2,
                config: {
                  item: "a",
                },
              },
              {
                index: 6,
                config: {
                  item: "a",
                  walls: [Directions.Top, Directions.Bottom, Directions.Left],
                },
              },
              {
                index: 7,
                config: {
                  walls: [Directions.Top, Directions.Bottom],
                },
              },
            ]),
            RoomGenerator[RoomDefs.P](9, 2, RoomTypes.Green, [
              {
                index: 0,
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
                index: 1,
                config: {
                  stairs: {
                    connectingFloor: 2,
                    connectingRoomIndex: 4,
                  },
                },
              },
              {
                index: 3,
                config: {
                  enemies: [EnemyTypes.Zombie],
                  doors: [
                    {
                      direction: Directions.Bottom,
                      connectingRoomIndex: 7,
                    },
                  ],
                },
              },
              {
                index: 4,
                config: {
                  enemies: [EnemyTypes.Zombie],
                },
              },
              {
                index: 5,
                config: {
                  doors: [
                    {
                      direction: Directions.Bottom,
                      keyRequired: "Spade Key",
                      connectingRoomIndex: 8,
                    },
                  ],
                },
              },
            ]),
            RoomGenerator[RoomDefs.SmallTall](10, 4, RoomTypes.Green, [
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
                index: 1,
                config: {
                  itemBox: true,
                  item: "a",
                  numberOfIcons: 2,
                },
              },
            ]),
            RoomGenerator[RoomDefs.SmallSquare](9, 6, RoomTypes.Amber, [
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
                  walls: [
                    Directions.Top,
                    Directions.Right,
                    Directions.Bottom,
                  ],
                },
              },
              {
                index: 3,
                config: {
                  item: "b",
                },
              },
            ]),
          ],
        },
        [2]: {
          rooms: [
            RoomGenerator[RoomDefs.L_90](13, 13, RoomTypes.Green, [
              {
                index: 1,
                config: {
                  enemies: [EnemyTypes.Zombie],
                },
              },
              {
                index: 3,
                config: {
                  p2StartingPoint: true,
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
              {
                index: 6,
                config: {
                  enemies: [EnemyTypes.Zombie],
                },
              },
            ]),
            RoomGenerator[RoomDefs.MediumSquare](10, 13, RoomTypes.Yellow, [
              {
                index: 0,
                config: {
                  item: "a",
                },
              },
              {
                index: 5,
                config: {
                  doors: [
                    {
                      direction: Directions.Right,
                      connectingRoomIndex: 0,
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
            RoomGenerator[RoomDefs.P_180](9, 14, RoomTypes.Green, [
              {
                index: 0,
                config: {
                  item: "a",
                },
              },
              {
                index: 1,
                config: {
                  enemies: [EnemyTypes.Zombie, EnemyTypes.Zombie],
                  numberOfIcons: 2,
                },
              },
              {
                index: 3,
                config: {
                  doors: [
                    {
                      direction: Directions.Top,
                      connectingRoomIndex: 1,
                    },
                  ],
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
            ]),
            RoomGenerator[RoomDefs.L](5, 14, RoomTypes.Yellow, [
              {
                index: 0,
                config: {
                  doors: [
                    {
                      direction: Directions.Top,
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
                      direction: Directions.Right,
                      connectingRoomIndex: 5,
                      keyRequired: "S.T.A.R.S. Key",
                    },
                  ],
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
            RoomGenerator[RoomDefs.P_270](5, 12, RoomTypes.Amber, [
              {
                index: 0,
                config: {
                  item: "a",
                },
              },
              {
                index: 2,
                config: {
                  doors: [
                    {
                      direction: Directions.Bottom,
                      connectingRoomIndex: 3,
                    },
                  ],
                },
              },
              {
                index: 5,
                config: {
                  stairs: {
                    connectingFloor: 1,
                    connectingRoomIndex: 6,
                  },
                },
              },
            ]),
            RoomGenerator[RoomDefs.MediumSquare](6, 14, RoomTypes.Green, [
              {
                index: 3,
                config: {
                  doors: [
                    {
                      direction: Directions.Left,
                    },
                  ],
                },
              },
            ]),
          ],
        },
      },
    };

    scenarioDefs[2] = scenario;
})();
