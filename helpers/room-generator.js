import { ROOM_SHAPES, ROOM_TYPES } from '../constants/rooms.js';
import { DIRECTIONS } from '../constants/directions.js';

const RoomConfigDefs = {
  Small: 'small',
  Medium: 'medium',
  SmallSquare: '2x2',
  MediumSquare: '3x3',
  LargeSquare: '4x4',
  P: 'p',
  L: 'l',
};

const createDefaultConfig = (count) => {
  const tileConfigs = Array.from({ length: count - 1 }, () => ({}));

  return {
    type: ROOM_TYPES.Green,
    tiles: tileConfigs,
  };
};

const createConfig = (type, defaultConfig, configMap) => {
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
};

const RoomConfigGenerator = {
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

/**
 * @callback RoomGenerator
 * @param {number} x The x coordinate
 * @param {number} y The y coordinate
 * @param {string} type The room type
 * @param {TileDefinition[]} configMap The tile config map
 * @returns {object} The room
 */
/**
 * Room Generators
 * @type {Object.<string, RoomGenerator}
 */
export const RoomGenerator = {
  [ROOM_SHAPES.SmallWide]: function (x, y, type, configMap) {
    const config = RoomConfigGenerator[RoomConfigDefs.Small](type, configMap);
    const tiles = [
      {
        position: {
          x: x,
          y: y,
        },
        walls: [DIRECTIONS.Top, DIRECTIONS.Bottom, DIRECTIONS.Left],
        ...config.tiles[0],
      },
      {
        position: {
          x: x + 1,
          y: y,
        },
        walls: [DIRECTIONS.Top, DIRECTIONS.Bottom, DIRECTIONS.Right],
        ...config.tiles[1],
      },
    ];

    return {
      type: config.type,
      tiles: tiles,
    };
  },
  [ROOM_SHAPES.SmallTall]: function (x, y, type, configMap) {
    const config = RoomConfigGenerator[RoomConfigDefs.Small](type, configMap);
    const tiles = [
      {
        position: {
          x: x,
          y: y,
        },
        walls: [DIRECTIONS.Top, DIRECTIONS.Right, DIRECTIONS.Left],
        ...config.tiles[0],
      },
      {
        position: {
          x: x,
          y: y + 1,
        },
        walls: [DIRECTIONS.Bottom, DIRECTIONS.Right, DIRECTIONS.Left],
        ...config.tiles[1],
      },
    ];

    return {
      type: config.type,
      tiles: tiles,
    };
  },

  [ROOM_SHAPES.MediumWide]: function (x, y, type, configMap) {
    const config = RoomConfigGenerator[RoomConfigDefs.Medium](type, configMap);
    const tiles = [
      {
        position: {
          x: x,
          y: y,
        },
        walls: [DIRECTIONS.Top, DIRECTIONS.Left],
        ...config.tiles[0],
      },
      {
        position: {
          x: x + 1,
          y: y,
        },
        walls: [DIRECTIONS.Top],
        ...config.tiles[1],
      },
      {
        position: {
          x: x + 2,
          y: y,
        },
        walls: [DIRECTIONS.Top, DIRECTIONS.Right],
        ...config.tiles[2],
      },
      {
        position: {
          x: x,
          y: y + 1,
        },
        walls: [DIRECTIONS.Bottom, DIRECTIONS.Left],
        ...config.tiles[3],
      },
      {
        position: {
          x: x + 1,
          y: y + 1,
        },
        walls: [DIRECTIONS.Bottom],
        ...config.tiles[4],
      },
      {
        position: {
          x: x + 2,
          y: y + 1,
        },
        walls: [DIRECTIONS.Bottom, DIRECTIONS.Right],
        ...config.tiles[5],
      },
    ];

    return {
      type: config.type,
      tiles: tiles,
    };
  },
  [ROOM_SHAPES.MediumTall]: function (x, y, type, configMap) {
    const config = RoomConfigGenerator[RoomConfigDefs.Medium](type, configMap);
    const tiles = [
      {
        position: {
          x: x,
          y: y,
        },
        walls: [DIRECTIONS.Top, DIRECTIONS.Left],
        ...config.tiles[0],
      },
      {
        position: {
          x: x + 1,
          y: y,
        },
        walls: [DIRECTIONS.Top, DIRECTIONS.Right],
        ...config.tiles[1],
      },
      {
        position: {
          x: x,
          y: y + 1,
        },
        walls: [DIRECTIONS.Left],
        ...config.tiles[2],
      },
      {
        position: {
          x: x + 1,
          y: y + 1,
        },
        walls: [DIRECTIONS.Right],
        ...config.tiles[3],
      },
      {
        position: {
          x: x,
          y: y + 2,
        },
        walls: [DIRECTIONS.Left, DIRECTIONS.Bottom],
        ...config.tiles[4],
      },
      {
        position: {
          x: x + 1,
          y: y + 2,
        },
        walls: [DIRECTIONS.Bottom, DIRECTIONS.Right],
        ...config.tiles[5],
      },
    ];

    return {
      type: config.type,
      tiles: tiles,
    };
  },

  [ROOM_SHAPES.SmallSquare]: function (x, y, type, configMap) {
    const config = RoomConfigGenerator[RoomConfigDefs.SmallSquare](
      type,
      configMap
    );
    const tiles = [
      {
        position: {
          x: x,
          y: y,
        },
        walls: [DIRECTIONS.Top, DIRECTIONS.Left],
        ...config.tiles[0],
      },
      {
        position: {
          x: x + 1,
          y: y,
        },
        walls: [DIRECTIONS.Top, DIRECTIONS.Right],
        ...config.tiles[1],
      },
      {
        position: {
          x: x,
          y: y + 1,
        },
        walls: [DIRECTIONS.Bottom, DIRECTIONS.Left],
        ...config.tiles[2],
      },
      {
        position: {
          x: x + 1,
          y: y + 1,
        },
        walls: [DIRECTIONS.Bottom, DIRECTIONS.Right],
        ...config.tiles[3],
      },
    ];

    return {
      type: config.type,
      tiles: tiles,
    };
  },
  [ROOM_SHAPES.MediumSquare]: function (x, y, type, configMap) {
    const config = RoomConfigGenerator[RoomConfigDefs.MediumSquare](
      type,
      configMap
    );
    const tiles = [
      {
        position: {
          x: x,
          y: y,
        },
        walls: [DIRECTIONS.Top, DIRECTIONS.Left],
        ...config.tiles[0],
      },
      {
        position: {
          x: x + 1,
          y: y,
        },
        walls: [DIRECTIONS.Top],
        ...config.tiles[1],
      },
      {
        position: {
          x: x + 2,
          y: y,
        },
        walls: [DIRECTIONS.Top, DIRECTIONS.Right],
        ...config.tiles[2],
      },
      {
        position: {
          x: x,
          y: y + 1,
        },
        walls: [DIRECTIONS.Left],
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
        walls: [DIRECTIONS.Right],
        ...config.tiles[5],
      },
      {
        position: {
          x: x,
          y: y + 2,
        },
        walls: [DIRECTIONS.Bottom, DIRECTIONS.Left],
        ...config.tiles[6],
      },
      {
        position: {
          x: x + 1,
          y: y + 2,
        },
        walls: [DIRECTIONS.Bottom],
        ...config.tiles[7],
      },
      {
        position: {
          x: x + 2,
          y: y + 2,
        },
        walls: [DIRECTIONS.Bottom, DIRECTIONS.Right],
        ...config.tiles[8],
      },
    ];

    return {
      type: config.type,
      tiles: tiles,
    };
  },
  [ROOM_SHAPES.LargeSquare]: function (x, y, type, configMap) {
    const config = RoomConfigGenerator[RoomConfigDefs.LargeSquare](
      type,
      configMap
    );
    const tiles = [
      {
        position: {
          x: x,
          y: y,
        },
        walls: [DIRECTIONS.Top, DIRECTIONS.Left],
        ...config.tiles[0],
      },
      {
        position: {
          x: x + 1,
          y: y,
        },
        walls: [DIRECTIONS.Top],
        ...config.tiles[1],
      },
      {
        position: {
          x: x + 2,
          y: y,
        },
        walls: [DIRECTIONS.Top],
        ...config.tiles[2],
      },
      {
        position: {
          x: x + 3,
          y: y,
        },
        walls: [DIRECTIONS.Top, DIRECTIONS.Right],
        ...config.tiles[3],
      },
      {
        position: {
          x: x,
          y: y + 1,
        },
        walls: [DIRECTIONS.Left],
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
        walls: [DIRECTIONS.Left],
        ...config.tiles[7],
      },
      {
        position: {
          x: x,
          y: y + 2,
        },
        walls: [DIRECTIONS.Left],
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
        walls: [DIRECTIONS.Bottom, DIRECTIONS.Left],
        ...config.tiles[12],
      },
      {
        position: {
          x: x + 1,
          y: y + 3,
        },
        walls: [DIRECTIONS.Bottom],
        ...config.tiles[13],
      },
      {
        position: {
          x: x + 2,
          y: y + 3,
        },
        walls: [DIRECTIONS.Bottom],
        ...config.tiles[14],
      },
      {
        position: {
          x: x + 3,
          y: y + 3,
        },
        walls: [DIRECTIONS.Bottom, DIRECTIONS.Right],
        ...config.tiles[15],
      },
    ];

    return {
      type: config.type,
      tiles: tiles,
    };
  },

  [ROOM_SHAPES.P]: function (x, y, type, configMap) {
    const config = RoomConfigGenerator[RoomConfigDefs.P](type, configMap);

    let tempMap = [
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
          walls: [DIRECTIONS.Left],
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

    const square = RoomGenerator[ROOM_SHAPES.SmallSquare](
      x,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [DIRECTIONS.Left, DIRECTIONS.Right],
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

    const small = RoomGenerator[ROOM_SHAPES.SmallTall](
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
  [ROOM_SHAPES.P_90]: function (x, y, type, configMap) {
    const config = RoomConfigGenerator[RoomConfigDefs.P](type, configMap);

    let tempMap = [
      {
        index: 0,
        config: {
          ...config.tiles[0],
        },
      },
      {
        index: 1,
        config: {
          walls: [DIRECTIONS.Top, DIRECTIONS.Bottom],
          ...config.tiles[1],
        },
      },
    ];

    const small = RoomGenerator[ROOM_SHAPES.SmallWide](
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
          walls: [DIRECTIONS.Top],
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

    const square = RoomGenerator[ROOM_SHAPES.SmallSquare](
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
  [ROOM_SHAPES.P_180]: function (x, y, type, configMap) {
    const config = RoomConfigGenerator[RoomConfigDefs.P](type, configMap);

    let tempMap = [
      {
        index: 0,
        config: {
          ...config.tiles[0],
        },
      },
      {
        index: 1,
        config: {
          walls: [DIRECTIONS.Left, DIRECTIONS.Right],
          ...config.tiles[1],
        },
      },
    ];

    config.tiles[1].walls = [DIRECTIONS.Left, DIRECTIONS.Right];
    const small = RoomGenerator[ROOM_SHAPES.SmallTall](
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
          walls: [DIRECTIONS.Right],
          ...config.tiles[5],
        },
      },
    ];

    const square = RoomGenerator[ROOM_SHAPES.SmallSquare](
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
  [ROOM_SHAPES.P_180_Flip]: function (x, y, type, configMap) {
    const config = RoomConfigGenerator[RoomConfigDefs.P](type, configMap);

    let tempMap = [
      {
        index: 0,
        config: {
          ...config.tiles[0],
        },
      },
      {
        index: 1,
        config: {
          walls: [DIRECTIONS.Left, DIRECTIONS.Right],
          ...config.tiles[1],
        },
      },
    ];

    const small = RoomGenerator[ROOM_SHAPES.SmallTall](
      x,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [DIRECTIONS.Left],
          ...config.tiles[2],
        },
      },
      {
        index: 1,
        config: {
          walls: [DIRECTIONS.Right, DIRECTIONS.Top],
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

    const square = RoomGenerator[ROOM_SHAPES.SmallSquare](
      x,
      y + 2,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );
    return {
      type: config.type,
      tiles: [...small.tiles, ...square.tiles],
    };
  },
  [ROOM_SHAPES.P_270]: function (x, y, type, configMap) {
    const config = RoomConfigGenerator[RoomConfigDefs.P](type, configMap);

    let tempMap = [
      {
        index: 0,
        config: {
          ...config.tiles[0],
        },
      },
      {
        index: 1,
        config: {
          walls: [DIRECTIONS.Top],
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

    const square = RoomGenerator[ROOM_SHAPES.SmallSquare](
      x,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [DIRECTIONS.Top, DIRECTIONS.Bottom],
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

    const small = RoomGenerator[ROOM_SHAPES.SmallWide](
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

  [ROOM_SHAPES.L]: function (x, y, type, configMap) {
    const config = RoomConfigGenerator[RoomConfigDefs.L](type, configMap);

    let tempMap = [
      {
        index: 0,
        config: {
          walls: [DIRECTIONS.Left, DIRECTIONS.Top, DIRECTIONS.Right],
          ...config.tiles[0],
        },
      },
      {
        index: 1,
        config: {
          walls: [DIRECTIONS.Left, DIRECTIONS.Right],
          ...config.tiles[1],
        },
      },
    ];

    const length1 = RoomGenerator[ROOM_SHAPES.SmallTall](
      x,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [DIRECTIONS.Left, DIRECTIONS.Right],
          ...config.tiles[2],
        },
      },
      {
        index: 1,
        config: {
          walls: [DIRECTIONS.Left, DIRECTIONS.Bottom],
          ...config.tiles[3],
        },
      },
    ];

    const length2 = RoomGenerator[ROOM_SHAPES.SmallTall](
      x,
      y + 2,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [DIRECTIONS.Top, DIRECTIONS.Bottom],
          ...config.tiles[4],
        },
      },
      {
        index: 1,
        config: {
          walls: [DIRECTIONS.Top, DIRECTIONS.Bottom],
          ...config.tiles[5],
        },
      },
    ];

    const width1 = RoomGenerator[ROOM_SHAPES.SmallWide](
      x + 1,
      y + 3,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    const width2 = {
      tiles: [
        {
          position: {
            x: x + 3,
            y: y + 3,
          },
          walls: [DIRECTIONS.Top, DIRECTIONS.Right, DIRECTIONS.Bottom],
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
  [ROOM_SHAPES.L_90]: function (x, y, type, configMap) {
    const config = RoomConfigGenerator[RoomConfigDefs.L](type, configMap);
    let tempMap = [
      {
        index: 0,
        config: {
          walls: [DIRECTIONS.Top, DIRECTIONS.Left],
          ...config.tiles[0],
        },
      },
      {
        index: 1,
        config: {
          walls: [DIRECTIONS.Top, DIRECTIONS.Bottom],
          ...config.tiles[1],
        },
      },
    ];

    const width1 = RoomGenerator[ROOM_SHAPES.SmallWide](
      x,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [DIRECTIONS.Top, DIRECTIONS.Bottom],
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

    const width2 = RoomGenerator[ROOM_SHAPES.SmallWide](
      x + 2,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [DIRECTIONS.Left, DIRECTIONS.Right],
          ...config.tiles[4],
        },
      },
      {
        index: 1,
        config: {
          walls: [DIRECTIONS.Left, DIRECTIONS.Right],
          ...config.tiles[5],
        },
      },
    ];

    const length1 = RoomGenerator[ROOM_SHAPES.SmallTall](
      x,
      y + 1,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    const length2 = {
      tiles: [
        {
          position: {
            x: x,
            y: y + 3,
          },
          walls: [DIRECTIONS.Right, DIRECTIONS.Bottom, DIRECTIONS.Left],
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
  [ROOM_SHAPES.L_180]: function (x, y, type, configMap) {
    const config = RoomConfigGenerator[RoomConfigDefs.L](type, configMap);

    let tempMap = [
      {
        index: 0,
        config: {
          ...config.tiles[0],
        },
      },
      {
        index: 1,
        config: {
          walls: [DIRECTIONS.Top, DIRECTIONS.Bottom],
          ...config.tiles[1],
        },
      },
    ];

    const width1 = RoomGenerator[ROOM_SHAPES.SmallWide](
      x,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [DIRECTIONS.Top, DIRECTIONS.Bottom],
          ...config.tiles[2],
        },
      },
      {
        index: 1,
        config: {
          walls: [DIRECTIONS.Top, DIRECTIONS.Right],
          ...config.tiles[3],
        },
      },
    ];

    const width2 = RoomGenerator[ROOM_SHAPES.SmallWide](
      x + 2,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [DIRECTIONS.Left, DIRECTIONS.Right],
          ...config.tiles[4],
        },
      },
      {
        index: 1,
        config: {
          walls: [DIRECTIONS.Left, DIRECTIONS.Right],
          ...config.tiles[5],
        },
      },
    ];

    const length1 = RoomGenerator[ROOM_SHAPES.SmallTall](
      x + 3,
      y + 1,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    const length2 = {
      tiles: [
        {
          position: {
            x: x + 3,
            y: y + 3,
          },
          walls: [DIRECTIONS.Right, DIRECTIONS.Bottom, DIRECTIONS.Left],
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
  [ROOM_SHAPES.L_270]: function (x, y, type, configMap) {
    const config = RoomConfigGenerator[RoomConfigDefs.L](type, configMap);

    let tempMap = [
      {
        index: 0,
        config: {
          ...config.tiles[0],
        },
      },
      {
        index: 1,
        config: {
          walls: [DIRECTIONS.Top, DIRECTIONS.Bottom],
          ...config.tiles[1],
        },
      },
    ];

    const width1 = RoomGenerator[ROOM_SHAPES.SmallWide](
      x,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [DIRECTIONS.Top, DIRECTIONS.Bottom],
          ...config.tiles[2],
        },
      },
      {
        index: 1,
        config: {
          walls: [DIRECTIONS.Right, DIRECTIONS.Bottom],
          ...config.tiles[3],
        },
      },
    ];

    const width2 = RoomGenerator[ROOM_SHAPES.SmallWide](
      x + 2,
      y,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    tempMap = [
      {
        index: 0,
        config: {
          walls: [DIRECTIONS.Left, DIRECTIONS.Right],
          ...config.tiles[5],
        },
      },
      {
        index: 1,
        config: {
          walls: [DIRECTIONS.Left, DIRECTIONS.Right],
          ...config.tiles[4],
        },
      },
    ];

    const length1 = RoomGenerator[ROOM_SHAPES.SmallTall](
      x + 3,
      y - 2,
      type,
      JSON.parse(JSON.stringify(tempMap))
    );

    const length2 = {
      tiles: [
        {
          position: {
            x: x + 3,
            y: y - 3,
          },
          walls: [DIRECTIONS.Top, DIRECTIONS.Right, DIRECTIONS.Left],
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
