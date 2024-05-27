import { FaTokenizer } from '../helpers/fa-tokenizer.js';

export const ITEMS = {
  // Consumable Items
  HandgunBullets: 'Handgun Bullets',
  ShotgunShells: 'Shotgun Shells',
  BowgunBolts: 'Bowgun Bolts',
  GrenadeRounds: 'Grenade Rounds',
  GreenHerb: 'Green Herb',
  RedHerb: 'Red Herb',
  FirstAidSpray: 'First-Aid Spray',
  InkRibbon: 'Ink Ribbon',

  // Important Items
  RedJewel: `Red Jewel ${FaTokenizer('star', 'item-icon')}`,
  WireCord: 'Wire Cord',
  CustomHandgunParts: 'Custom Handgun Parts',
  Lockpick: 'Lockpick',

  // Keys
  SpadeKey: 'Spade Key',
  StarsKey: 'S.T.A.R.S. Key',
  DiamondKey: 'Diamond Key',
  ClubKey: 'Club Key',
  HeartKey: `Heart Key ${FaTokenizer('star', 'item-icon')}`,
  RedKeyCard: 'Red Key Card',
  BlueKeyCard: 'Blue Key Card',

  // Weapons
  Knife: 'Knife',
  Handgun: 'Handgun',
  Bowgun: 'Bowgun',
  Shotgun: 'Shotgun',
  GrenadeLauncher: 'Grenade Launcher',
  CustomHandgun: 'Custom Handgun',
  Magnum: 'Magnum',
  SubmachineGun: 'Submachine Gun',
};

export const ITEM_TYPES = {
  A: 'a',
  B: 'b',
  C: 'c',
};
