var RoomDefs = {
  SmallWide: '2x1',
  SmallTall: '1x2',

  MediumWide: '3x2',
  MediumTall: '2x3',

  SmallSquare: '2x2',
  MediumSquare: '3x3',
  LargeSquare: '4x4',

  P: 'p',
  P_90: 'p90',
  P_180: 'p180',
  P_180_Flip: 'p180Flip',
  P_270: 'p270',

  L: 'l',
  L_90: 'l90',
  L_180: 'l180',
  L_270: 'l270',
};

var Directions = {
  Top: 'top',
  Right: 'right',
  Bottom: 'bottom',
  Left: 'left',
};

var RoomTypes = {
  Green: 'green',
  Yellow: 'yellow',
  Amber: 'amber',
};

var RoomConfigDefs = {
  Small: 'small',
  Medium: 'medium',
  SmallSquare: '2x2',
  MediumSquare: '3x3',
  LargeSquare: '4x4',
  P: 'p',
  L: 'l',
};

var TileDescriptions = {
  Small: '1x2 Tile',
  Medium: '2x3 Tile',
  SmallSquare: '2x2 Tile',
  MediumSquare: '3x3 Tile',
  LargeSquare: '4x4 Tile',
  P: '6 Space P Tile',
  L: '7 Space L Tile'
}

function createDefaultConfig(count) {
  var tileConfigs = Array.from({ length: count - 1 }, () => ({}));

  return {
    type: RoomTypes.Green,
    tiles: tileConfigs,
  };
}

function createConfig(type, defaultConfig, configMap) {
  if (configMap) {
    configMap.forEach((mapping) => {
      defaultConfig.tiles[mapping.index] = {
        ...defaultConfig.tiles[mapping.index],
        ...mapping.config,
      };
    });
  }

  if (type) defaultConfig.type = type;
  return defaultConfig;
}

var RoomConfigGenerator = {
  [RoomConfigDefs.Small]: (type, configMap) =>
    createConfig(type, createDefaultConfig(2), configMap),
  [RoomConfigDefs.Medium]: (type, configMap) =>
    createConfig(type, createDefaultConfig(6), configMap),
  [RoomConfigDefs.SmallSquare]: (type, configMap) =>
    createConfig(type, createDefaultConfig(4), configMap),
  [RoomConfigDefs.MediumSquare]: (type, configMap) =>
    createConfig(type, createDefaultConfig(9), configMap),
  [RoomConfigDefs.LargeSquare]: (type, configMap) =>
    createConfig(type, createDefaultConfig(16), configMap),
  [RoomConfigDefs.P]: (type, configMap) =>
    createConfig(type, createDefaultConfig(6), configMap),
  [RoomConfigDefs.L]: (type, configMap) =>
    createConfig(type, createDefaultConfig(7), configMap),
};

var RoomGenerator = {
  [RoomDefs.SmallWide]: function (x, y, type, configMap) {
    var config = RoomConfigGenerator[RoomConfigDefs.Small](type, configMap);
    var tiles = [
      {
        position: {
          x: x,
          y: y,
        },
        walls: [Directions.Top, Directions.Bottom, Directions.Left],
        ...config.tiles[0],
      },
      {
        position: {
          x: x + 1,
          y: y,
        },
        walls: [Directions.Top, Directions.Bottom, Directions.Right],
        ...config.tiles[1],
      },
    ];

    return {
      type: config.type,
      tiles: tiles,
    };
  },
  [RoomDefs.SmallTall]: function (x, y, type, configMap) {
    var config = RoomConfigGenerator[RoomConfigDefs.Small](type, configMap);
    var tiles = [
      {
        position: {
          x: x,
          y: y,
        },
        walls: [Directions.Top, Directions.Right, Directions.Left],
        ...config.tiles[0],
      },
      {
        position: {
          x: x,
          y: y + 1,
        },
        walls: [Directions.Bottom, Directions.Right, Directions.Left],
        ...config.tiles[1],
      },
    ];

    return {
      type: config.type,
      tiles: tiles,
    };
  },

  [RoomDefs.MediumWide]: function (x, y, type, configMap) {
    var config = RoomConfigGenerator[RoomConfigDefs.Medium](type, configMap);
    var tiles = [
      {
        position: {
          x: x,
          y: y,
        },
        walls: [Directions.Top, Directions.Left],
        ...config.tiles[0],
      },
      {
        position: {
          x: x + 1,
          y: y,
        },
        walls: [Directions.Top],
        ...config.tiles[1],
      },
      {
        position: {
          x: x + 2,
          y: y,
        },
        walls: [Directions.Top, Directions.Right],
        ...config.tiles[2],
      },
      {
        position: {
          x: x,
          y: y + 1,
        },
        walls: [Directions.Bottom, Directions.Left],
        ...config.tiles[3],
      },
      {
        position: {
          x: x + 1,
          y: y + 1,
        },
        walls: [Directions.Bottom],
        ...config.tiles[4],
      },
      {
        position: {
          x: x + 2,
          y: y + 1,
        },
        walls: [Directions.Bottom, Directions.Right],
        ...config.tiles[5],
      },
    ];

    return {
      type: config.type,
      tiles: tiles,
    };
  },
  [RoomDefs.MediumTall]: function (x, y, type, configMap) {
    var config = RoomConfigGenerator[RoomConfigDefs.Medium](type, configMap);
    var tiles = [
      {
        position: {
          x: x,
          y: y,
        },
        walls: [Directions.Top, Directions.Left],
        ...config.tiles[0],
      },
      {
        position: {
          x: x + 1,
          y: y,
        },
        walls: [Directions.Top],
        ...config.tiles[1],
      },
      {
        position: {
          x: x,
          y: y + 1,
        },
        walls: [Directions.Top, Directions.Right],
        ...config.tiles[2],
      },
      {
        position: {
          x: x + 1,
          y: y + 1,
        },
        walls: [Directions.Bottom, Directions.Left],
        ...config.tiles[3],
      },
      {
        position: {
          x: x,
          y: y + 2,
        },
        walls: [Directions.Bottom],
        ...config.tiles[4],
      },
      {
        position: {
          x: x + 1,
          y: y + 2,
        },
        walls: [Directions.Bottom, Directions.Right],
        ...config.tiles[5],
      },
    ];

    return {
      type: config.type,
      tiles: tiles,
    };
  },

  [RoomDefs.SmallSquare]: function (x, y, type, configMap) {
    var config = RoomConfigGenerator[RoomConfigDefs.SmallSquare](
      type,
      configMap
    );
    var tiles = [
      {
        position: {
          x: x,
          y: y,
        },
        walls: [Directions.Top, Directions.Left],
        ...config.tiles[0],
      },
      {
        position: {
          x: x + 1,
          y: y,
        },
        walls: [Directions.Top, Directions.Right],
        ...config.tiles[1],
      },
      {
        position: {
          x: x,
          y: y + 1,
        },
        walls: [Directions.Bottom, Directions.Left],
        ...config.tiles[2],
      },
      {
        position: {
          x: x + 1,
          y: y + 1,
        },
        walls: [Directions.Bottom, Directions.Right],
        ...config.tiles[3],
      },
    ];

    return {
      type: config.type,
      tiles: tiles,
    };
  },
  [RoomDefs.MediumSquare]: function (x, y, type, configMap) {
    var config = RoomConfigGenerator[RoomConfigDefs.MediumSquare](
      type,
      configMap
    );
    var tiles = [
      {
        position: {
          x: x,
          y: y,
        },
        walls: [Directions.Top, Directions.Left],
        ...config.tiles[0],
      },
      {
        position: {
          x: x + 1,
          y: y,
        },
        walls: [Directions.Top],
        ...config.tiles[1],
      },
      {
        position: {
          x: x + 2,
          y: y,
        },
        walls: [Directions.Top, Directions.Right],
        ...config.tiles[2],
      },
      {
        position: {
          x: x,
          y: y + 1,
        },
        walls: [Directions.Left],
        ...config.tiles[3],
      },
      {
        position: {
          x: x + 1,
          y: y + 1,
        },
        walls: [],
        ...config.tiles[4],
      },
      {
        position: {
          x: x + 2,
          y: y + 1,
        },
        walls: [Directions.Right],
        ...config.tiles[5],
      },
      {
        position: {
          x: x,
          y: y + 2,
        },
        walls: [Directions.Bottom, Directions.Left],
        ...config.tiles[6],
      },
      {
        position: {
          x: x + 1,
          y: y + 2,
        },
        walls: [Directions.Bottom],
        ...config.tiles[7],
      },
      {
        position: {
          x: x + 2,
          y: y + 2,
        },
        walls: [Directions.Bottom, Directions.Right],
        ...config.tiles[8],
      },
    ];

    return {
      type: config.type,
      tiles: tiles,
    };
  },
  [RoomDefs.LargeSquare]: function (x, y, type, configMap) {
    var config = RoomConfigGenerator[RoomConfigDefs.LargeSquare](
      type,
      configMap
    );
    var tiles = [
      {
        position: {
          x: x,
          y: y,
        },
        walls: [Directions.Top, Directions.Left],
        ...config.tiles[0],
      },
      {
        position: {
          x: x + 1,
          y: y,
        },
        walls: [Directions.Top],
        ...config.tiles[1],
      },
      {
        position: {
          x: x + 2,
          y: y,
        },
        walls: [Directions.Top],
        ...config.tiles[2],
      },
      {
        position: {
          x: x + 3,
          y: y,
        },
        walls: [Directions.Top, Directions.Right],
        ...config.tiles[3],
      },
      {
        position: {
          x: x,
          y: y + 1,
        },
        walls: [Directions.Left],
        ...config.tiles[4],
      },
      {
        position: {
          x: x + 1,
          y: y + 1,
        },
        walls: [],
        ...config.tiles[5],
      },
      {
        position: {
          x: x + 2,
          y: y + 1,
        },
        walls: [],
        ...config.tiles[6],
      },
      {
        position: {
          x: x + 3,
          y: y + 1,
        },
        walls: [Directions.Left],
        ...config.tiles[7],
      },
      {
        position: {
          x: x,
          y: y + 2,
        },
        walls: [Directions.Left],
        ...config.tiles[8],
      },
      {
        position: {
          x: x + 1,
          y: y + 2,
        },
        walls: [],
        ...config.tiles[9],
      },
      {
        position: {
          x: x + 2,
          y: y + 2,
        },
        walls: [],
        ...config.tiles[10],
      },
      {
        position: {
          x: x + 3,
          y: y + 2,
        },
        walls: [Direction.Right],
        ...config.tiles[11],
      },
      {
        position: {
          x: x,
          y: y + 3,
        },
        walls: [Directions.Bottom, Directions.Left],
        ...config.tiles[12],
      },
      {
        position: {
          x: x + 1,
          y: y + 3,
        },
        walls: [Directions.Bottom],
        ...config.tiles[13],
      },
      {
        position: {
          x: x + 2,
          y: y + 3,
        },
        walls: [Directions.Bottom],
        ...config.tiles[14],
      },
      {
        position: {
          x: x + 3,
          y: y + 3,
        },
        walls: [Directions.Bottom, Directions.Right],
        ...config.tiles[15],
      },
    ];

    return {
      type: config.type,
      tiles: tiles,
    };
  },

  [RoomDefs.P]: function (x, y, type, configMap) {
    var config = RoomConfigGenerator[RoomConfigDefs.P](type, configMap);

    var tempMap = [
      {
        index: 0,
        config: {
          ...config.tiles[0],
        },
      },
      {
        index: 1,
        config: {
          ...config.tiles[1],
        },
      },
      {
        index: 2,
        config: {
          walls: [Directions.Left],
          ...config.tiles[2],
        },
      },
      {
        index: 3,
        config: {
          ...config.tiles[3],
        },
      },
    ];

    var square = RoomGenerator[RoomDefs.SmallSquare](
      x,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [Directions.Left, Directions.Right],
          ...config.tiles[4],
        },
      },
      {
        index: 1,
        config: {
          ...config.tiles[5],
        },
      },
    ];

    var small = RoomGenerator[RoomDefs.SmallTall](
      x,
      y + 2,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    return {
      type: config.type,
      tiles: [...square.tiles, ...small.tiles],
    };
  },
  [RoomDefs.P_90]: function (x, y, type, configMap) {
    var config = RoomConfigGenerator[RoomConfigDefs.P](type, configMap);

    var tempMap = [
      {
        index: 0,
        config: {
          ...config.tiles[0],
        },
      },
      {
        index: 1,
        config: {
          walls: [Directions.Top, Directions.Bottom],
          ...config.tiles[1],
        },
      },
    ];

    var small = RoomGenerator[RoomDefs.SmallWide](
      x,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          ...config.tiles[2],
        },
      },
      {
        index: 1,
        config: {
          ...config.tiles[3],
        },
      },
      {
        index: 2,
        config: {
          walls: [Directions.Top],
          ...config.tiles[4],
        },
      },
      {
        index: 3,
        config: {
          ...config.tiles[5],
        },
      },
    ];

    var square = RoomGenerator[RoomDefs.SmallSquare](
      x + 2,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    return {
      type: config.type,
      tiles: [...small.tiles, ...square.tiles],
    };
  },
  [RoomDefs.P_180]: function (x, y, type, configMap) {
    var config = RoomConfigGenerator[RoomConfigDefs.P](type, configMap);

    var tempMap = [
      {
        index: 0,
        config: {
          ...config.tiles[0],
        },
      },
      {
        index: 1,
        config: {
          walls: [Directions.Left, Directions.Right],
          ...config.tiles[1],
        },
      },
    ];

    config.tiles[1].walls = [Directions.Left, Directions.Right];
    var small = RoomGenerator[RoomDefs.SmallTall](
      x,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          ...config.tiles[2],
        },
      },
      {
        index: 1,
        config: {
          ...config.tiles[3],
        },
      },
      {
        index: 2,
        config: {
          ...config.tiles[4],
        },
      },
      {
        index: 3,
        config: {
          walls: [Directions.Right],
          ...config.tiles[5],
        },
      },
    ];

    var square = RoomGenerator[RoomDefs.SmallSquare](
      x - 1,
      y + 2,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );
    return {
      type: config.type,
      tiles: [...small.tiles, ...square.tiles],
    };
  },
  [RoomDefs.P_180_Flip]: function (x, y, type, configMap) {
    var config = RoomConfigGenerator[RoomConfigDefs.P](type, configMap);

    var tempMap = [
      {
        index: 0,
        config: {
          ...config.tiles[0],
        },
      },
      {
        index: 1,
        config: {
          walls: [Directions.Left, Directions.Right],
          ...config.tiles[1],
        },
      },
    ];

    var small = RoomGenerator[RoomDefs.SmallTall](
      x,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          ...config.tiles[2],
        },
      },
      {
        index: 1,
        config: {
          walls: [Directions.Right],
          ...config.tiles[3],
        },
      },
      {
        index: 2,
        config: {
          ...config.tiles[4],
        },
      },
      {
        index: 3,
        config: {
          ...config.tiles[5],
        },
      },
    ];

    var square = RoomGenerator[RoomDefs.SmallSquare](
      x ,
      y + 2,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );
    return {
      type: config.type,
      tiles: [...small.tiles, ...square.tiles],
    };
  },
  [RoomDefs.P_270]: function (x, y, type, configMap) {
    var config = RoomConfigGenerator[RoomConfigDefs.P](type, configMap);

    var tempMap = [
      {
        index: 0,
        config: {
          ...config.tiles[0],
        },
      },
      {
        index: 1,
        config: {
          walls: [Directions.Top],
          ...config.tiles[1],
        },
      },
      {
        index: 2,
        config: {
          ...config.tiles[2],
        },
      },
      {
        index: 3,
        config: {
          ...config.tiles[3],
        },
      },
    ];

    var square = RoomGenerator[RoomDefs.SmallSquare](
      x,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [Directions.Top, Directions.Bottom],
          ...config.tiles[4],
        },
      },
      {
        index: 1,
        config: {
          ...config.tiles[5],
        },
      },
    ];

    var small = RoomGenerator[RoomDefs.SmallWide](
      x + 2,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    return {
      type: config.type,
      tiles: [...square.tiles, ...small.tiles],
    };
  },

  [RoomDefs.L]: function (x, y, type, configMap) {
    var config = RoomConfigGenerator[RoomConfigDefs.L](type, configMap);

    var tempMap = [
      {
        index: 0,
        config: {
          walls: [Directions.Left, Directions.Right],
          ...config.tiles[0],
        },
      },
      {
        index: 1,
        config: {
          walls: [Directions.Left, Directions.Right],
          ...config.tiles[1],
        },
      },
    ];

    var length1 = RoomGenerator[RoomDefs.SmallTall](
      x,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [Directions.Left, Directions.Right],
          ...config.tiles[2],
        },
      },
      {
        index: 1,
        config: {
          walls: [Directions.Left, Directions.Bottom],
          ...config.tiles[3],
        },
      },
    ];

    var length2 = RoomGenerator[RoomDefs.SmallTall](
      x,
      y + 2,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [Directions.Top, Directions.Bottom],
          ...config.tiles[4],
        },
      },
      {
        index: 1,
        config: {
          walls: [Directions.Top, Directions.Bottom],
          ...config.tiles[5],
        },
      },
    ];

    var width1 = RoomGenerator[RoomDefs.SmallWide](
      x + 1,
      y + 3,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    var width2 = {
      tiles: [
        {
          position: {
            x: x + 3,
            y: y + 3,
          },
          walls: [Directions.Top, Directions.Right, Directions.Bottom],
          ...config.tiles[6],
        },
      ],
    };

    return {
      type: config.type,
      tiles: [
        ...length1.tiles,
        ...length2.tiles,
        ...width1.tiles,
        ...width2.tiles,
      ],
    };
  },
  [RoomDefs.L_90]: function (x, y, type, configMap) {
    var config = RoomConfigGenerator[RoomConfigDefs.L](type, configMap);
    var tempMap = [
      {
        index: 0,
        config: {
          walls: [Directions.Top, Directions.Left],
          ...config.tiles[0],
        },
      },
      {
        index: 1,
        config: {
          walls: [Directions.Top, Directions.Bottom],
          ...config.tiles[1],
        },
      },
    ];

    var width1 = RoomGenerator[RoomDefs.SmallWide](
      x,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [Directions.Top, Directions.Bottom],
          ...config.tiles[2],
        },
      },
      {
        index: 1,
        config: {
          ...config.tiles[3],
        },
      },
    ];

    var width2 = RoomGenerator[RoomDefs.SmallWide](
      x + 2,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [Directions.Left, Directions.Right],
          ...config.tiles[4],
        },
      },
      {
        index: 1,
        config: {
          walls: [Directions.Left, Directions.Right],
          ...config.tiles[5],
        },
      },
    ];

    var length1 = RoomGenerator[RoomDefs.SmallTall](
      x,
      y + 1,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    var length2 = {
      tiles: [
        {
          position: {
            x: x,
            y: y + 3,
          },
          walls: [Directions.Right, Directions.Bottom, Directions.Left],
          ...config.tiles[6],
        },
      ],
    };

    return {
      type: config.type,
      tiles: [
        ...width1.tiles,
        ...width2.tiles,
        ...length1.tiles,
        ...length2.tiles,
      ],
    };
  },
  [RoomDefs.L_180]: function (x, y, type, configMap) {
    var config = RoomConfigGenerator[RoomConfigDefs.L](type, configMap);

    var tempMap = [
      {
        index: 0,
        config: {
          ...config.tiles[0],
        },
      },
      {
        index: 1,
        config: {
          walls: [Directions.Top, Directions.Bottom],
          ...config.tiles[1],
        },
      },
    ];

    var width1 = RoomGenerator[RoomDefs.SmallWide](
      x,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [Directions.Top, Directions.Bottom],
          ...config.tiles[2],
        },
      },
      {
        index: 1,
        config: {
          walls: [Directions.Top, Directions.Right],
          ...config.tiles[3],
        },
      },
    ];

    var width2 = RoomGenerator[RoomDefs.SmallWide](
      x + 2,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [Directions.Left, Directions.Right],
          ...config.tiles[4],
        },
      },
      {
        index: 1,
        config: {
          walls: [Directions.Left, Directions.Right],
          ...config.tiles[5],
        },
      },
    ];

    var length1 = RoomGenerator[RoomDefs.SmallTall](
      x + 3,
      y + 1,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    var length2 = {
      tiles: [
        {
          position: {
            x: x + 3,
            y: y + 3,
          },
          walls: [Directions.Right, Directions.Bottom, Directions.Left],
          ...config.tiles[6],
        },
      ],
    };

    return {
      type: config.type,
      tiles: [
        ...width1.tiles,
        ...width2.tiles,
        ...length1.tiles,
        ...length2.tiles,
      ],
    };
  },
  [RoomDefs.L_270]: function (x, y, type, configMap) {
    var config = RoomConfigGenerator[RoomConfigDefs.L](type, configMap);

    var tempMap = [
      {
        index: 0,
        config: {
          ...config.tiles[0],
        },
      },
      {
        index: 1,
        config: {
          walls: [Directions.Top, Directions.Bottom],
          ...config.tiles[1],
        },
      },
    ];

    var width1 = RoomGenerator[RoomDefs.SmallWide](
      x,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [Directions.Top, Directions.Bottom],
          ...config.tiles[2],
        },
      },
      {
        index: 1,
        config: {
          walls: [Directions.Right, Directions.Bottom],
          ...config.tiles[3],
        },
      },
    ];

    var width2 = RoomGenerator[RoomDefs.SmallWide](
      x + 2,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [Directions.Left, Directions.Right],
          ...config.tiles[4],
        },
      },
      {
        index: 1,
        config: {
          walls: [Directions.Left, Directions.Right],
          ...config.tiles[5],
        },
      },
    ];

    var length1 = RoomGenerator[RoomDefs.SmallTall](
      x + 3,
      y - 2,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    var length2 = {
      tiles: [
        {
          position: {
            x: x + 3,
            y: y - 3,
          },
          walls: [Directions.Top, Directions.Right, Directions.Left],
          ...config.tiles[6],
        },
      ],
    };

    return {
      type: config.type,
      tiles: [
        ...width1.tiles,
        ...width2.tiles,
        ...length1.tiles,
        ...length2.tiles,
      ],
    };
  },
};
