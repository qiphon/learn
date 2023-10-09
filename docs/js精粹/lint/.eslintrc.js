module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser', // 解析器
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    // ecmaVersion: 2018
    sourceType: 'module',
    project: './tsconfig.json',
    useJSXTextNode: true,
    // typescript-eslint specific options
    warnOnUnsupportedTypeScriptVersion: true,
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
    // 关闭与 prettier 格式化规则冲突的 eslint 规则
    '@typescript-eslint/no-extra-semi': ['off'],
    // off or warning
    '@typescript-eslint/ban-ts-comment': 'off',
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'off',
    // 函数必须定义返回类型
    ' @typescript-eslint/explicit-module-boundary-types': 'off',
    // 强制click和 onKeyUp, onKeyDown, onKeyPress 其中一个一同使用
    'jsx-a11y/click-events-have-key-events': 'off',
    // HTML 语义
    'jsx-a11y/no-static-element-interactions': 'off',
    // jsx 不允许使用扩展运算符
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    // 不允许 any
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    // 可选参数需要配置默认参数
    'react/require-default-props': 'off',
    // promise then 2个参数 catch 1个参数
    '@typescript-eslint/no-floating-promises': 'warn',
    'import/no-cycle': 'warn',
    // error
    '@typescript-eslint/no-unused-vars': 'error',
    // 循环引用
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
