const assert = require('assert')
const factory = require('../index.js')

class TestObject {
  constructor (attributes = {}) {
    Object.assign(this, attributes)
    this.created = false
  }

  create () {
    this.created = true
    return this
  }
}

describe('factory', function() {
  it('should register a new factory', function() {
    factory.register('foo', TestObject, faker => {
      return {
        foo: 'bar'
      }
    })
    let instance = factory.getRegisteredFaker('foo')
    assert(instance.quantity === 1)
    assert(instance.callback().foo === 'bar')
    assert(instance.model === TestObject)
  })
  it('should make a single new instance from the factory', function() {
    factory.register('foo', TestObject, faker => {
      return {
        foo: 'bar'
      }
    })
    let object = factory('foo').make()
    assert(object.constructor.name === 'TestObject')
    assert(object.foo === 'bar')
  })
  it('should make many new instances from the factory', function() {
    factory.register('foo', TestObject, faker => {
      return {
        foo: faker.name
      }
    })
    let collection = factory('foo', 4).make()
    assert(collection.length === 4)
    assert(collection[0].constructor.name === 'TestObject')
  })
  it('should create a single new instance from the factory', function() {
    factory.register('foo', TestObject, faker => {
      return {
        foo: 'bar'
      }
    })
    let object = factory('foo').create()
    assert(object.constructor.name === 'TestObject')
    assert(object.foo === 'bar')
    assert(object.created === true)
  })
  it('should create many new instances from the factory and override attributes', function() {
    factory.register('foo', TestObject, faker => {
      return {
        foo: 'bar'
      }
    })
    let collection = factory('foo', 4).create({ foo: 'baz' })
    assert(collection.length === 4)
    assert(collection[0].constructor.name === 'TestObject')
    assert(collection[0].foo === 'baz')
    assert(collection[0].created === true)
  })
})