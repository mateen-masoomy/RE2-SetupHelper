import { TENSION_DECK } from "./tension-deck";
import { ITEMS } from "./items";

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

  // Cards
  DiamondKeyCard: GetCardName(ITEMS.DiamondKey),
};
