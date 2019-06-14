// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.filter-container')
      .assert.containsText('pre', '{\n  "string": "test"\n}')
      .assert.elementCount('.filter-card', 2)
      .end()
  }
}
