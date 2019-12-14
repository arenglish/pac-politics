const fs = require("fs");

const photos = [];

const files = fs
  .readdirSync(__dirname + "/../projects/photo/src/assets")
  .filter(file => {
    if (file.substring(0, 1) !== ".") {
      photos.push(file);
    }
  });

fs.writeFileSync(
  __dirname + "/../projects/photo/src/environments/photos.ts",
  `
export const PHOTOS = ${JSON.stringify(photos)};
`,
  { encoding: "utf-8" }
);
