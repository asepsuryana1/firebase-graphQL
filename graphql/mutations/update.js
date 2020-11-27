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