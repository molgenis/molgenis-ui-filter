// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Expecting 8 filters': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.filter-container')
      .assert.containsText('pre', 'selections:{\n  "search": "test"\n}')
      .assert.elementCount('.filter-card', 8)
      .end()
  }
}
