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
        `Roll on the amber encounter table instead.`,
        `1x Zombie, Snatching Talons - The active character must pass an evade roll or their Action Phase ends immediately.`,
        `1x Zombie, 1x corpse`,
        `1x Zombie`,
        `1x corpse`,
        `Empty`,
      ],
      amber: [
        `1x Licker`,
        `2x Zombie Dog`,
        `2x Zombie at the closest biohazard sign`,
        `2x Zombie`,
        `1x Zombie`,
        `Unsettling Feeling - The active character draws an extra card during the Tension Phase`,
      ],
    },
    startingItems: [
      `1-4 Knife`,
      `1-4 Handgun`,
      `2x First Aid Spray`,
      `1x Shotgun`,
      `1x Bowgun`,
    ],
    items: {
      a: [
        `Handgun Bullets`,
        `Handgun Bullets`,
        `Handgun Bullets`,
        `Green Herb`,
        `Green Herb`,
        `Red Herb`,
        `Red Jewel (Star)`,
        `Red Jewel (Star)`,
        `Wire Cord`,
      ],
      b: [`Grenade Launcher`],
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

  scenarioDefs[3] = scenario;
})();
