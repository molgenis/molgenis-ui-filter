const config = require('rc')('lifelines', {
  development: {
    proxy: 'https://master.dev.molgenis.org'
  }
})

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      config.devtool = process.env.DEVTOOL ? process.env.DEVTOOL : 'source-map'
      console.log(`Sourcemap mode: ${config.devtool}`)
    }
  },
  devServer: {
    // In CI mode, Safari cannot contact "localhost", so as a workaround, run the dev server using the jenkins agent pod dns instead.
    host: process.env.JENKINS_AGENT_NAME || 'localhost',
    proxy: process.env.NODE_ENV === 'production' ? undefined : {
      '^/api': {
        'target': config.development.proxy,
        'keepOrigin': true
      },
      '^/login': {
        'target': config.development.proxy,
        'changeOrigin': true
      }
    }
  }
}
