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