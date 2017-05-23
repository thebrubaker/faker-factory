# Faker Factory
A small utility for creating fake models using a factory function. This factory is inspired by Laravel's factory function and assumes
a class model similar to Eloquent.

### Example Registration
Register a factory by providing `label`, `class` and `callback` arguments. The callback function provides an instance of
[Faker.js](https://github.com/marak/Faker.js/) and should return an object of attributes for your model.
``` js
const factory = require('factory')
const User = require('../models/user')

factory.register('user', User, faker => {
	return {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		email: faker.internet.email(),
	}
})
```

### Example Factory Instance
Once you've registered your factory bindings, you can make as many models as you like, each with unique data. You can
also replace the default attributes with your own.
``` js
let users = factory('user', 10)->make() // array of fake users
let adminUsers = factory('user', 10)->make({ isAdmin: true }) // array of fake admin users
```

### Instructions For Using Faker Factory
The factory assumes two things about your model class. The first assumption is that the constructor of your
model takes an object of attributes as it's only argument.
``` js
class User {
	constructor (attributes = {}) {
		this.attributes = attributes
	}
}
```

The second assumption is that your class has a method called create() which will persist your model to your storage engine.
``` js
class User {
	async create () {
		return await firebase.database().location('users').push(this.attributes)
	}
}
```

With these two assumptions, you should be able to create fake models in no time. This is a tiny package, so please feel free to comment or send me a Pull Request.