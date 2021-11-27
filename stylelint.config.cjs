module.exports = {
  plugins: ['stylelint-scss'],
  extends: ['stylelint-config-sass-guidelines'],
  customSyntax: 'postcss-scss',
  rules: {
    'selector-max-id': 1,
    'selector-class-pattern': null
  }
};
