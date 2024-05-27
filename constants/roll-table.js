import { ENEMY_TYPES } from './enemies.js';

export const ROLL_TABLE = {
  Empty: 'Empty',
  RollOnAmberEncounterTable: 'Roll on the amber encounter table instead.',
  UnsettlingFeeling:
    'Unsettling Feeling - The active character draws an extra card during the Tension Phase',
  SnatchingTalons:
    'Snatching Talons - The active character must pass an evade roll or their Action Phase ends immediately',
  SafeForNow: `Safe For Now - Place a Persisting Unease token on this tile. (The next time a character is placed on this tile from another tile, remove the token and roll on the yellow encounter table.)`,
  ScentOfDeath: `Scent of Death - Draw two cards from the tension deck.`,
  LurchForward: `Lurch Forward - All enemies on this tile and linked tiles perform a move reaction.`,
  ReplaceWithZombie: `Replace each corpse on this tile with a ${ENEMY_TYPES.Zombie}`,
  ReplaceWithZombieAfterTensionPhase: `At the end of the active character's Tension Phase replace each corpse on this tile with a ${ENEMY_TYPES.Zombie}`,
  ReplaceWIthZombieNextActivation: `At the start of the active character's next activation replace each corpse on this tile with a ${ENEMY_TYPES.Zombie}`,
  DeepeningUnease: `Deepening Unease - The active character draws two extra cards during the Tension Phase`,
};
