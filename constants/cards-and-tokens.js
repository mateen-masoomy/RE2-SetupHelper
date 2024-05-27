import { TENSION_DECK } from './tension-deck.js';
import { ITEMS } from './items.js';

const GetTokenName = (tensionDeckCard) => {
  return `${tensionDeckCard} token`;
};

const GetCardName = (cardName) => {
  return `${cardName} card`;
};

export const CARDS_AND_TOKENS = {
  // Tokens
  EchoesInTheDarknessToken: GetTokenName(TENSION_DECK.EchoesInTheDarkness),
  PrehensileGraspToken: GetTokenName(TENSION_DECK.PrehensileGrasp),
  PersistingUneaseToken: GetTokenName(TENSION_DECK.PersistingUnease),
  SidePackToken: `Side Pack token`,
  GImagoToken: `G-Imago token`,

  // Cards
  DiamondKeyCard: GetCardName(ITEMS.DiamondKey),
  UndeadAmbush: GetCardName(TENSION_DECK.UndeadAmbush),
  CustomHandgun: GetCardName(ITEMS.CustomHandgun),
  SpawnGImago: `Spawn G-Imago`,
  LurchForward: `Lurch Forward`,
  AcidicBile: `Acidic Bile`,
  MonstrousSweep: `Monstrous Sweep`,
  LockpickCard: GetCardName(ITEMS.Lockpick),
  SubmachineGunCard: GetCardName(ITEMS.SubmachineGun),
};
