const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles/utils")],
  },
  env: {
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/dqzhjmrwo/image/upload",
  },
};
