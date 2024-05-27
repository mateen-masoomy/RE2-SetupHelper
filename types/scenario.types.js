/**
 * @typedef Door
 * @type {Object}
 * @property {DIRECTIONS} direction         - The direction to draw the door in
 * @property {string} [keyRequired]          - The key required to open the door
 * @property {number} [connectingRoomIndex]  - The room index to link the door to
 *
 * @typedef TileConfig
 * @type {object}
 * @property {object} position                      - The tile's position
 * @property {number} position.x                    - The tile's x position
 * @property {number} position.y                    - The tile's y position
 * @property {DIRECTIONS[]} walls                   - The directions to draw walls in
 * @property {Door[]} [doors]                        - The tile's doors
 * @property {string[]} [enemies]                   - The collection of enemies
 * @property {boolean} [p1StartingPoint]                 - Whether the tile is the player 1 starting tile
 * @property {boolean} [p2StartingPoint]                - Whether the tile is the player 2 starting tile
 * @property {string} [item]                         - The item type on the tile
 * @property {object} [stairs]                       - The stairs configuration
 * @property {number} stairs.connectingFloor        - The floor number to connect to
 * @property {number} stairs.connectingRoomIndex    - The room index to connect to
 * @property {boolean} [hasItemBox] Whether the tile has an item box
 * @property {number} [numberOfIcons]                 - The number of icons on the tile
 * @property {string} [label]
 * @property {boolean} [hasCorpse] Whether the tile has a corpse
 * @property {boolean} [hasTypewriter] Whether the tile has a typewriter
 * @property {boolean} [isScenarioObjective] Wether the tile is the scenario objective
 * @property {object} [scenarioObjectiveConfig] The scenario objective configuration
 * @property {string[]} [scenarioObjectiveConfig.requirements] The required items to activate the objective
 * @property {string} [scenarioObjectiveConfig.before] The message to show before the required items have been found
 * @property {string} scenarioObjectiveConfig.after The message to show after the required items have been found
 * @property {string} [scenarioObjectiveConfig.result] The message to show when the result has been achieved
 * @property {string} [scenarioObjectiveConfig.item] The item to award the players
 * @property {boolean} [isGoal] Whether this tile is the scenario goal
 * @property {string} [goalMessage] The message to display for the scenario goal
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
 * @property {object} [label] The label for the floor
 * @property {object} label.position
 * @property {number} label.position.x
 * @property {number} label.position.y
 * @property {string} label.text
 * @property {Room[]} rooms             - The rooms this floor includes
 *
 * @typedef SpecialRule
 * @type {object}
 * @property {string} name              - The name of the rule
 * @property {string} description       - The description of the rule
 *
 * @typedef ItemIndexes
 * @type {object}
 * @property {number[]} a
 * @property {number[]} b
 *
 * @typedef Items
 * @type {object}
 * @property {string[]} a
 * @property {string[]} b
 *
 * @typedef TensionDeck
 * @type {object}
 * @property {string[]} green               - The green tension deck cards
 * @property {string[]} amber               - The amber tension deck cards
 * @property {string[]} red                 - The red tension deck cards
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
 * @property {string[]} [notes]
 * @property {SpecialRule[]} specialRules               - Special rules in play for this scenario
 * @property {string[]} startingItems                   - The starting items for this scenario
 * @property {Items} items                             - The scenario's items
 * @property {object} [rollTables]                        - The rolltables for yellow and amber rooms
 * @property {string[]} rollTables.yellow               - The yellow encounter roll table
 * @property {string[]} rollTables.amber                - The amber encounter roll table
 * @property {string[]} [rollTables.red]                - The red encounter roll table
 * @property {TensionDeck[]} tensionDecks                       - The tension deck configuration
 * @property {object} [behaviourDeck]
 * @property {string} behaviourDeck.name
 * @property {string[]} behaviourDeck.deck
 * @property {string[]} additionalCardsAndTokens        - Additional cards and tokens required for this scenario
 * @property {object} startingRooms
 * @property {object} startingRooms.p1
 * @property {number} startingRooms.p1.floor
 * @property {number} startingRooms.p1.roomIndex
 * @property {object} startingRooms.p2
 * @property {number} startingRooms.p2.floor
 * @property {number} startingRooms.p2.roomIndex
 * @property {Object.<string, Floor>} floors            - The scenario's floors
 *
 */
