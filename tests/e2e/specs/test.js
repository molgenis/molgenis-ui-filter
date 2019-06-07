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
  },

  'String filter': browser => {
    browser.url(process.env.VUE_DEV_SERVER_URL)
    browser.waitForElementVisible('input[name="string"]', 5000)
    browser.setValue('input[name="string"]', 'test')
    browser.pause(100)
    browser.assert.value('input[name="string"]', 'test')
    browser.click('[type="string-filter"] button.btn')
    browser.pause(100)
    browser.assert.value('input[name="string"]', '')
    browser.end()
  },

  'Checkbox filter': browser => {
    browser.url(process.env.VUE_DEV_SERVER_URL)
    browser.waitForElementVisible('[type="checkbox-filter"]', 5000)
    browser.click('[type="checkbox-filter"] .card-header.collapsable')
    browser.pause(400)
    browser.expect.element('[type="checkbox-filter"] input[value="red"]').is.not.selected
    browser.click('[type="checkbox-filter"] a.toggle-select')
    browser.pause(200)
    browser.expect.element('[type="checkbox-filter"] input[value="red"]').is.selected
    browser.click('[type="checkbox-filter"] a.toggle-select')
    browser.pause(200)
    browser.expect.element('[type="checkbox-filter"] input[value="red"]').is.not.selected
    browser.end()
  }
}
