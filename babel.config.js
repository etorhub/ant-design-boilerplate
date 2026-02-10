module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { browsers: ['last 2 versions'] } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: [
    ['import', { libraryName: 'antd', style: 'css' }],
  ],
  env: {
    development: {
      plugins: ['react-refresh/babel'],
    },
  },
};
