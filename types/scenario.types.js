/**
     * @typedef Door
     * @type {Object}
     * @property {Directions} direction         - The direction to draw the door in
     * @property {string?} keyRequired          - The key required to open the door
     * @property {number?} connectingRoomIndex  - The room index to link the door to
     *
     * @typedef TileConfig
     * @type {object}
     * @property {object} position                      - The tile's position
     * @property {number} position.x                    - The tile's x position
     * @property {number} position.y                    - The tile's y position
     * @property {Directions[]} walls                   - The directions to draw walls in
     * @property {Door[]?} doors                        - The tile's doors
     * @property {string[]?} enemies                    - The collection of enemies
     * @property {boolean?} p1StartingPoint                 - Whether the tile is the player 1 starting tile
     * @property {boolean?} p2StartingPoint                - Whether the tile is the player 2 starting tile
     * @property {string?} item                         - The item type on the tile
     * @property {object} stairs                       - The stairs configuration
     * @property {number} stairs.connectingFloor        - The floor number to connect to
     * @property {number} stairs.connectingRoomIndex    - The room index to connect to
     * @property {boolean} itemBox                         - Whether the tile contains an item box
     * @property {number?} numberOfIcons                 - The number of icons on the tile
     *
     * @typedef TileDefinition
     * @type {object}
     * @property {number} index             - The tile's index
     * @property {TileConfig} config        - The tile's configuration
     *
     * @typedef Room
     * @type {object}
     * @property {TileConfig[]} tiles       - The collection of tile configurations
     * @property {RoomType} type            - The room type
     *
     * @typedef Floor
     * @type {object}
     * @property {Object} isStartingFloor   - Starting floor configuration
     * @property {boolean} isStartingFloor.p1  - Whether player 1 starts on this floor
     * @property {boolean} isStartingFloor.p2  - Whether player 2 starts on this floor
     * @property {Room[]} rooms             - The rooms this floor includes
     * 
     * @typedef specialRule
     * @type {object}
     * @property {string} name              - The name of the rule
     * @property {string} description       - The description of the rule
     * 
     *
     * @typedef Scenario
     * @type {object}
     * @property {string} name                              - The scenario name
     * @property {string} intro                             - The intro for the scenario
     * @property {string} description                       - The description for the scenario
     * @property {object} tilesRequired                     - The tiles required for this scenario
     * @property {string} tilesRequired.small
     * @property {string} tilesRequired.medium
     * @property {string} tilesRequired.smallSquare
     * @property {string} tilesRequired.mediumSquare
     * @property {string} tilesRequired.largeSquare
     * @property {string} tilesRequired.p
     * @property {string} tilesRequired.l
     * @property {string} location                          - The location of this scenario
     * @property {specialRule[]} specialRules               - Special rules in play for this scenario
     * @property {string[]} startingItems                   - The starting items for this scenario
     * @property {Object} items                             - The scenario's items
     * @property {string[]} items.a                         - The scenario's A items
     * @property {string[]} items.b                         - The scenario's B items
     * @property {object} rollTables                        - The rolltables for yellow and amber rooms
     * @property {string[]} rollTables.yellow               - The yellow encounter roll table
     * @property {string[]} rollTables.amber                - The amber encounter roll table
     * @property {object} tensionDeck                       - The tension deck configuration
     * @property {string[]} tensionDeck.green               - The green tension deck cards
     * @property {string[]} tensionDeck.amber               - The amber tension deck cards
     * @property {string[]} tensionDeck.red                 - The red tension deck cards
     * @property {string[]} additionalCardsAndTokens        - Additional cards and tokens required for this scenario
     * @property {Object.<string, Floor>} floors            - The scenario's floors
     *
     */