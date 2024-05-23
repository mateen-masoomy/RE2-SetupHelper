export const TileDescriptions = {
    Small: '[1x2] Rectangle Tile',
    Medium: '[2x3] Rectangle Tile',
    SmallSquare: '[2x2] Square Tile',
    MediumSquare: '[3x3] Square Tile',
    LargeSquare: '[4x4] Square Tile',
    P: '[6 Space] P Tile',
    L: '[7 Space] L Tile',
  };
  
  export const TileImagePaths = {
    Small: makeTileImageString('1x2-rectangle'),
    Medium: makeTileImageString('2x3-rectangle'),
    SmallSquare: makeTileImageString('2x2-square'),
    MediumSquare: makeTileImageString('3x3-square'),
    LargeSquare: makeTileImageString('4x4-square'),
    P: makeTileImageString('p'),
    L: makeTileImageString('l'),
  };
  
  const makeTileImageString = (tileType) => {
    return `./assets/${tileType}.png`;
  }