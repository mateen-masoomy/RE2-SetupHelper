var RoomDefs = {
    SmallWide: '2x1',
    SmallTall: '1x2',

    SmallSquare: '2x2',
    MediumSquare: '3x3',
    LargeSquare: '4x4',

    P: 'p',
    P_90: 'p90',
    P_180: 'p180',
    P_270: 'p270',

    L: 'l',
    L_90: 'l90',
    L_180: 'l180',
    L_270: 'l270'
};

var Directions = {
    Top: 'top',
    Right: 'right',
    Bottom: 'bottom',
    Left: 'left'
};

var RoomTypes = {
    Normal: 'normal',
    Caution: 'caution',
    Danger: 'danger'
}

var RoomConfigDefs = {
    Small: 'small',
    SmallSquare: '2x2',
    MediumSquare: '3x3',
    LargeSquare: '4x4',
    P: 'p',
    L: 'l'
}

function createDefaultConfig(count) {
    var tileConfigs = [].fill({
        doors: []
    }, 0, count - 1);

    return {
        type: RoomTypes.Normal,
        tiles: tileConfigs
    }
}

function createConfig(type, defaultConfig, configMap) {
    if (configMap) {
        configMap.forEach(mapping => {
            defaultConfig.tiles[mapping.index] = {
                ...defaultConfig.tiles[mapping.index],
                ...mapping.config
            }
        });
    }

    if (type) defaultConfig.type = type;
    return defaultConfig;
}

var RoomConfigGenerator = {
    [RoomConfigDefs.Small]: (type, configMap) => createConfig(type, createDefaultConfig(2), configMap),
    [RoomConfigDefs.SmallSquare]: (type, configMap) => createConfig(type, createDefaultConfig(4), configMap),
    [RoomConfigDefs.MediumSquare]: (type, configMap) => createConfig(type, createDefaultConfig(9), configMap),
    [RoomConfigDefs.LargeSquare]: (type, configMap) => createConfig(type, createDefaultConfig(16), configMap),
    [RoomConfigDefs.P]: (type, configMap) => createConfig(type, createDefaultConfig(6), configMap),
    [RoomConfigDefs.L]: (type, configMap) => createConfig(type, createDefaultConfig(7), configMap),
}

var RoomGenerator = {
    [RoomDefs.SmallWide]: function(x, y, type, configMap) {
        var config = RoomConfigGenerator[RoomConfigDefs.Small](type, configMap);
        var tiles = [
            {
                position: {
                    x: x,
                    y: y
                },
                walls: [Directions.Top, Directions.Bottom, Directions.Left],
                ...config.tiles[0],
            },
            {
                position: {
                    x: x+1,
                    y: y
                },
                walls: [Directions.Top, Directions.Bottom, Directions.Right],
                ...config.tiles[1],
            }
        ];

        return {
            type: config.type,
            tiles: tiles,
        }
    },
    [RoomDefs.SmallTall]: function(x, y, type, configMap) {
        var config = RoomConfigGenerator[RoomConfigDefs.Small](type, configMap);
        var tiles = [
            {
                position: {
                    x: x,
                    y: y
                },
                walls: [Directions.Top, Directions.Right, Directions.Left],
                ...config.tiles[0],
            },
            {
                position: {
                    x: x,
                    y: y+1
                },
                walls: [Directions.Bottom, Directions.Right, Directions.Left],
                ...config.tiles[1],
            }
        ];

        return {
            type: config.type,
            tiles: tiles,
        }
    },
    
    [RoomDefs.SmallSquare]: function(x, y, type, configMap) {
        var config = RoomConfigGenerator[RoomConfigDefs.SmallSquare](type, configMap);
        var tiles = [
            {
                position: {
                    x: x,
                    y: y
                },
                walls: [Directions.Top, Directions.Left],
                ...config.tiles[0],
            },
            {
                position: {
                    x: x+1,
                    y: y
                },
                walls: [Directions.Top, Directions.Right],
                ...config.tiles[1],
            },
            {
                position: {
                    x: x,
                    y: y+1
                },
                walls: [Directions.Bottom, Directions.Left],
                ...config.tiles[2],
            },
            {
                position: {
                    x: x+1,
                    y: y+1
                },
                walls: [Directions.Bottom, Directions.Right],
                ...config.tiles[3],
            }
        ];

        return {
            type: config.type,
            tiles: tiles,
        }
    },
    [RoomDefs.MediumSquare]: function(x, y, type, configMap) {
        var config = RoomConfigGenerator[RoomConfigDefs.MediumSquare](type, configMap);
        var tiles = [
            {
                position: {
                    x: x,
                    y: y
                },
                walls: [Directions.Top, Directions.Left],
                ...config.tiles[0],
            },
            {
                position: {
                    x: x+1,
                    y: y
                },
                walls: [Directions.Top],
                ...config.tiles[1],
            },
            {
                position: {
                    x: x+2,
                    y: y
                },
                walls: [Directions.Top, Directions.Right],
                ...config.tiles[2],
            },
            {
                position: {
                    x: x,
                    y: y+1
                },
                walls: [Directions.Left],
                ...config.tiles[3],
            },
            {
                position: {
                    x: x+1,
                    y: y+1
                },
                walls: [],
                ...config.tiles[4],
            },
            {
                position: {
                    x: x+2,
                    y: y+1
                },
                walls: [Directions.Right],
                ...config.tiles[5],
            },
            {
                position: {
                    x: x,
                    y: y+2
                },
                walls: [Directions.Bottom, Directions.Left],
                ...config.tiles[6],
            },
            {
                position: {
                    x: x+1,
                    y: y+2
                },
                walls: [Directions.Bottom],
                ...config.tiles[7],
            },
            {
                position: {
                    x: x+2,
                    y: y+2
                },
                walls: [Directions.Bottom, Directions.Right],
                ...config.tiles[8],
            }
        ];

        return {
            type: config.type,
            tiles: tiles,
        }
    },
    [RoomDefs.LargeSquare]: function(x, y, type, configMap) {
        var config = RoomConfigGenerator[RoomConfigDefs.LargeSquare](type, configMap);
        var tiles = [
            {
                position: {
                    x: x,
                    y: y
                },
                walls: [Directions.Top, Directions.Left],
                ...config.tiles[0],
            },
            {
                position: {
                    x: x+1,
                    y: y
                },
                walls: [Directions.Top],
                ...config.tiles[1],
            },
            {
                position: {
                    x: x+2,
                    y: y
                },
                walls: [Directions.Top],
                ...config.tiles[2],
            },
            {
                position: {
                    x: x+3,
                    y: y
                },
                walls: [Directions.Top, Directions.Right],
                ...config.tiles[3],
            },
            {
                position: {
                    x: x,
                    y: y+1
                },
                walls: [Directions.Left],
                ...config.tiles[4],
            },
            {
                position: {
                    x: x+1,
                    y: y+1
                },
                walls: [],
                ...config.tiles[5],
            },
            {
                position: {
                    x: x+2,
                    y: y+1
                },
                walls: [],
                ...config.tiles[6],
            },
            {
                position: {
                    x: x+3,
                    y: y+1
                },
                walls: [Directions.Left],
                ...config.tiles[7],
            },
            {
                position: {
                    x: x,
                    y: y+2
                },
                walls: [Directions.Left],
                ...config.tiles[8],
            },
            {
                position: {
                    x: x+1,
                    y: y+2
                },
                walls: [],
                ...config.tiles[9],
            },
            {
                position: {
                    x: x+2,
                    y: y+2
                },
                walls: [],
                ...config.tiles[10],
            },
            {
                position: {
                    x: x+3,
                    y: y+2
                },
                walls: [Direction.Right],
                ...config.tiles[11],
            },
            {
                position: {
                    x: x,
                    y: y+3
                },
                walls: [Directions.Bottom, Directions.Left],
                ...config.tiles[12],
            },
            {
                position: {
                    x: x+1,
                    y: y+3
                },
                walls: [Directions.Bottom],
                ...config.tiles[13],
            },
            {
                position: {
                    x: x+2,
                    y: y+3
                },
                walls: [Directions.Bottom],
                ...config.tiles[14],
            },
            {
                position: {
                    x: x+3,
                    y: y+3
                },
                walls: [Directions.Bottom, Directions.Right],
                ...config.tiles[15],
            }
        ];

        return {
            type: config.type,
            tiles: tiles,
        }
    },

    [RoomDefs.P]: function(x, y, type, configMap) {
        var config = RoomConfigGenerator[RoomConfigDefs.P](type, configMap);
        config.tiles[2].walls = [Directions.Left];
        var square = GenerateRooms[RoomDefs.SmallSquare](x, y, config.tiles.slice(0, 4));
        config.tiles[4].walls = [Directions.Left, Directions.Right];
        var small = GenerateRooms[RoomDefs.SmallTall](x, y+2, config.tiles.slice(4));
        return {
            type: config.type,
            tiles: [...square.tiles, ...small.tiles]
        }
    },
    [RoomDefs.P_90]: function(x, y, type, configMap) {
        var config = RoomConfigGenerator[RoomConfigDefs.P](type, configMap);
        config.tiles[1].walls = [Directions.Top, Directions.Bottom];
        var small = GenerateRooms[RoomDefs.SmallWide](x, y, config.tiles.slice(0,2));
        config.tiles[2].walls = [Directions.Top];
        var square = GenerateRooms[RoomDefs.SmallSquare](x+2, y, config.tiles.slice(2));
        return {
            type: config.type,
            tiles: [...small.tiles, ...square.tiles]
        }
    },
    [RoomDefs.P_180]: function(x, y, type, configMap) {
        var config = RoomConfigGenerator[RoomConfigDefs.P](type, configMap);
        config.tiles[1].walls = [Directions.Left, Directions.Right];
        var small = GenerateRooms[RoomDefs.SmallTall](x, y, config.tiles.slice(0,2));
        config.tiles[3].walls = [Directions.Right];
        var square = GenerateRooms[RoomDefs.SmallSquare](x-1, y+2, config.tiles.slice(2));
        return {
            type: config.type,
            tiles: [...small.tiles, ...square.tiles]
        }
    },
    [RoomDefs.P_270]: function(x, y, type, configMap) {
        var config = RoomConfigGenerator[RoomConfigDefs.P](type, configMap);
        config.tiles[3].walls = [Directions.Bottom];
        var square = GenerateRooms[RoomDefs.SmallSquare](x, y, config.tiles.slice(0, 4));
        config.tiles[4].walls = [Directions.Top, Directions.Bottom];
        var small = GenerateRooms[RoomDefs.SmallWide](x+2, y, config.tiles.slice(4));
        return {
            type: config.type,
            tiles: [...square.tiles, ...small.tiles]
        }
    },

    [RoomDefs.L]: function(x, y, type, configMap) {
        var config = RoomConfigGenerator[RoomConfigDefs.L](type, configMap);
        config.tiles[1].walls = [Directions.Left, Directions.Right];
        var length1 = GenerateRooms[RoomDefs.SmallTall](x, y, config.tiles.slice(0,2));
        config.tiles[2].walls = [Directions.Left, Directions.Right];
        config.tiles[3].walls = [Directions.Left, Directions.Bottom];
        var length2 = GenerateRooms[RoomDefs.SmallTall](x, y+2, config.tiles.slice(2,4));
        config.tiles[4].walls = [Directions.Top, Directions.Bottom];
        config.tiles[5].walls = [Directions.Top, Directions.Bottom];
        var width1 = GenerateRooms[RoomDefs.SmallWide](x+1, y+3, config.tiles.slice(4,6));
        var width2 = {
            tiles: [
                {
                    position: {
                        x: x+3,
                        y: y+3
                    },
                    walls: [Directions.Top, Directions.Right, Directions.Bottom],
                    ...config.tiles[6],
                }
            ]
        }

        return {
            type: config.type,
            tiles: [...length1.tiles, ...length2.tiles, ...width1.tiles, ...width2.tiles]
        }
    },
    [RoomDefs.L_90]: function(x, y, type, configMap) {
        var config = RoomConfigGenerator[RoomConfigDefs.L](type, configMap);
        config.tiles[0].walls = [Directions.Top, Directions.Left];
        config.tiles[1].walls = [Directions.Top, Directions.Bottom];
        var width1 = GenerateRooms[RoomDefs.SmallWide](x, y, config.tiles.slice(0,2));
        config.tiles[2].walls = [Directions.Top, Directions.Bottom];
        var Width2 = GenerateRooms[RoomDefs.SmallWide](x+2, y, config.tiles.slice(2,4));
        config.tiles[4].walls = [Directions.Left, Directions.Right];
        config.tiles[5].walls = [Directions.Left, Directions.Right];
        var length1 = GenerateRooms[RoomDefs.SmallTall](x, y+1, config.tiles.slice(4,6));
        var length2 = {
            tiles: [
                {
                    position: {
                        x: x,
                        y: y+3
                    },
                    walls: [Directions.Right, Directions.Bottom, Directions.Left],
                    ...config.tiles[6],
                }
            ]
        }

        return {
            type: config.type,
            tiles: [...width1.tiles, ...width2.tiles, ...length1.tiles, ...length2.tiles]
        }
    },
    [RoomDefs.L_180]: function(x, y, type, configMap) {
        var config = RoomConfigGenerator[RoomConfigDefs.L](type, configMap);
        config.tiles[1].walls = [Directions.Top, Directions.Bottom];
        var width1 = GenerateRooms[RoomDefs.SmallWide](x, y, config.tiles.slice(0,2));
        config.tiles[2].walls = [Directions.Top, Directions.Bottom];
        config.tiles[3].walls = [Directions.Top, Directions.Right];
        var Width2 = GenerateRooms[RoomDefs.SmallWide](x+2, y, config.tiles.slice(2,4));
        config.tiles[4].walls = [Directions.Left, Directions.Right];
        config.tiles[5].walls = [Directions.Left, Directions.Right];
        var length1 = GenerateRooms[RoomDefs.SmallTall](x+3, y+1, config.tiles.slice(4,6));
        var length2 = {
            tiles: [
                {
                    position: {
                        x: x+3,
                        y: y+3
                    },
                    walls: [Directions.Right, Directions.Bottom, Directions.Left],
                    ...config.tiles[6],
                }
            ]
        }

        return {
            type: config.type,
            tiles: [...width1.tiles, ...width2.tiles, ...length1.tiles, ...length2.tiles]
        }
    },
    [RoomDefs.L_270]: function(x, y, type, configMap) {
        var config = RoomConfigGenerator[RoomConfigDefs.L](type, configMap);
        config.tiles[1].walls = [Directions.Top, Directions.Bottom];
        var width1 = GenerateRooms[RoomDefs.SmallWide](x, y, config.tiles.slice(0,2));
        config.tiles[2].walls = [Directions.Top, Directions.Bottom];
        config.tiles[3].walls = [Directions.Right, Directions.Bottom];
        var Width2 = GenerateRooms[RoomDefs.SmallWide](x+2, y, config.tiles.slice(2,4));
        config.tiles[4].walls = [Direction.Left, Directions.Right];
        config.tiles[5].walls = [Directions.Left, Directions.Right];
        var length1 = GenerateRooms[RoomDefs.SmallTall](x+3, y-2, config.tiles.slice(4,6));
        var length2 = {
            tiles: [
                {
                    position: {
                        x: x+3,
                        y: y-3
                    },
                    walls: [Directions.Top, Directions.Right, Directions.Left],
                    ...config.tiles[6],
                }
            ]
        }

        return {
            type: config.type,
            tiles: [...width1.tiles, ...width2.tiles, ...length1.tiles, ...length2.tiles]
        }
    }
}