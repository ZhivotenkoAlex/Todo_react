module.exports={
  "parser": "babel-eslint",
  "plugins": ["react", "import", "jsx-a11y"],
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": "off",
    "react/destructuring-assignment": [2, "always", { "ignoreClassFields": true }],
    "quotes": [2, "single",{"allowTemplateLiterals": true}],
    "react/jsx-equals-spacing": [2, "always"],
    "react/prop-types": [0],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "jsx-a11y/aria-role": [0],
    "jsx-a11y/label-has-for": [ 2, {
      "components": [ "Label" ],
      "required": {
          "some": [ "nesting", "id" ]
      },
      "allowChildren": false
  }],
  "react/prefer-stateless-function": [0, { "ignorePureComponents": true }],
  "no-useless-constructor":[0],
  "jsx-a11y/no-static-element-interactions":[0],
  "import/extensions":[0]
  },
  "extends": ["airbnb"]
}
