const { reloadApp } = require('detox-expo-helpers')

describe('Creating a message', () => {
  beforeEach(async () => {
    await reloadApp()
  })

  it('should add the message to the list', () => {
    // await element(by.id('messageText')).tap()
    // await element(by.id('messageText')).typeText('New message')
    // await element(by.id('sendButton')).tap()
    // await expect(element(by.id('messageText'))).toHaveText('')
    // await expect('fsff').toBeTruthy()
  })
})
