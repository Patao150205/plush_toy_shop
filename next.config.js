const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
  env: {
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/dqzhjmrwo/image/upload",
    STRIPE_API_KEY:
      "pk_test_51JEPBlA9FPUMUIH7P1nWrhUuhgQbjdKeVtDcdLg5pCQ2pv0oB8sA3JnkEzqMiR8Ht7HhJ2RphkIluasrjla0M8k800NQFul2ro",
  },
};
