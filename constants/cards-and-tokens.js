var GetTokenName = (tensionDeckCard) => {
  return `${tensionDeckCard} token`;
};

var GetCardName = (cardName) => {
  return `${cardName} card`;
};

var CARDS_AND_TOKENS = {
  // Tokens
  EchoesInTheDarknessToken: GetTokenName(TENSION_DECK.EchoesInTheDarkness),
  PrehensileGraspToken: GetTokenName(TENSION_DECK.PrehensileGrasp),
  PersistingUneaseToken: GetTokenName(TENSION_DECK.PersistingUnease),

  // Cards
  DiamondKeyCard: GetCardName(ITEMS.DiamondKey),
};
