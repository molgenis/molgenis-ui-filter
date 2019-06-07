// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Expecting 2 filters': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.filter-container')
      .assert.containsText('pre', '"string": ""')
      .assert.elementCount('.filter-card', 2)
      .end()
  }
}
