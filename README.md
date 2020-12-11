# firebase-graphQL
```Mempermudah pengambilan query```

## Buat folder 
* ## ```grapql``` yang isinya :

* ### mutations
isinya seperti sql command select 
buat file di dalam mutations :
* #### add.js
```js
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/user');
var services = require('../../services');

exports.add = {
    type: UserType.userType,
    args: {
        userName: {
            type: new GraphQLNonNull(GraphQLString),
        },
        Name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        Age: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    resolve(root, params) {
        return services.createUser(params);
    }
}
```
* #### edit.js
```js
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/user');
var services = require('../../services');

exports.update = {
  type: UserType.userType,
  args: {
    userName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    Name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    Age: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    return services.updateUser(params)
  }
}
```
* #### delete.js
```js
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/user');
var services = require('../../services');

exports.remove = {
    type: UserType.userType,
    args: {
        userName: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, params) {
        return services.deleteUser(params);
    }
}
```
* #### index.js
  compile add, edit, delete
```js
var addUser = require('./add').add;
var removeUser = require('./remove').remove;
var updateUser = require('./update').update;

module.exports = {
  addUser,
  removeUser,
  updateUser
}
```

* ### type
isinya seperti model data di mongoose
```js
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInteger = require('graphql').GraphQLInteger;

// User Type
exports.userType = new GraphQLObjectType({
  name: 'user',
  fields: function () {
    return {
      userName: {
        type: new GraphQLNonNull(GraphQLID)
      },
      Name: {
        type: GraphQLString
      },
      Age: {
        type: GraphQLString
      }
    }
  }
});
```

* ### queries
isinya get data
```js
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var services = require('../../services');
var userType = require('../types/user').userType;

// Query
exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      users: {
        type: new GraphQLList(userType),
        resolve: services.getUsers
      }
    }
  }
});
```
* ### index.js
isinya realese
```js
var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var queryType = require('./queries/user').queryType;
var mutation = require('./mutations/index');

exports.userSchema = new GraphQLSchema({
  query: queryType,
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutation
  })
})
```


