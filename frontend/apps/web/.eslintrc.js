module.exports = {
  root: true,
  extends: ["custom"],
  rules: {
    "import/no-extraneous-dependencies": [error, { devDependencies: true }],
  },
};
