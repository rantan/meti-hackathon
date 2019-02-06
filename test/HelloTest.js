const Hello = artifacts.require('./Hello.sol');

contract('Hello', () => {
  let instance;

  beforeEach(async() => {
    instance = await Hello.new('Hello');
  });

  it('message', async () => {
    const message = await instance.message().valueOf();
    assert.equal(message, 'Hello');
  });

  it('update', async() => {
    await instance.update('Good Bye');

    const message = await instance.message().valueOf();
    assert.equal(message, 'Good Bye');
  });
});
