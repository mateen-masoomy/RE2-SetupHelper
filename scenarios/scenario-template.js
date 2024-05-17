(function () {
    /**
     * @type Scenario
     */
    var scenario = {
      name: '',
      intro: ``,
      description: ``,
      location: '',
      specialRules: [
        {
          name: '',
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
        yellow: [

        ],
        amber: [

        ],
      },
      startingItems: [],
      items: {
        a: [
        ],
        b: [],
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
          ],
        },
      },
    };
  
    scenarioDefs[] = scenario;
  })();
  