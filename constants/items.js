import { FaTokenizer } from "../helpers/fa-tokenizer.js";

export const ITEMS = {
  // Consumable Items
  HandgunBullets: "Handgun Bullets",
  GreenHerb: "Green Herb",
  RedHerb: "Red Herb",
  FirstAidSpray: "First-Aid Spray",
  InkRibbon: "Ink Ribbon",

  // Important Items
  RedJewel: `Red Jewel ${FaTokenizer("star")}`,
  WireCord: "Wire Cord",

  // Keys
  SpadeKey: "Spade Key",
  StarsKey: "S.T.A.R.S. Key",
  DiamondKey: "Diamond Key",

  // Weapons
  Knife: "Knife",
  Handgun: "Handgun",
  Bowgun: "Bowgun",
  Shotgun: "Shotgun",
  GrenadeLauncher: "Grenade Launcher",
};

export const ITEM_TYPES = {
  A: "a",
  B: "b",
  C: "c"
};
