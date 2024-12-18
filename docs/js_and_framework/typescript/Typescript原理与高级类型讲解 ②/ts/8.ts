interface Config {
  width?: number;
}
// interface Config {
//   width?: number;
//   [propName: string]: any;
// }

function CalculateAreas(config: Config) {
  let square = 100;
  if (config.width) {
    square = config.width * config.width;
  }
  return { area: square };
}

//let mySquare = CalculateAreas({ widdth: 5 });
//let mySquare = CalculateAreas({ widdth: 5 } as Config);

