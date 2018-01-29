module.exports = {
  extends: [
    'eslint-config-qunar'
  ].map(require.resolve),
  rules: {
    complexity: 0,
    'react/jsx-no-bind': 0,
    'react/forbid-prop-types': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-static-element-interactions': 0
  }
};
