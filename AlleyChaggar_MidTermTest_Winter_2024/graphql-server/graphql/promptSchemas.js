const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
  } = require('graphql');
  
  const { addPrompt, getPrompts, deletePrompt } = require('../resolvers/prompt.server.resolvers');

  const promptType = new GraphQLObjectType({
    name: 'Prompt',
    fields: () => ({
      chatId: { type: GraphQLString },
      prompt: { type: GraphQLString },
      response: { type: GraphQLString },
      createdAt: { type: GraphQLString },
      chatTitle: { type: GraphQLString },
      upVotes: { type: GraphQLInt  },
      downVotes: { type: GraphQLInt  },
    }),
  });
  
  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      prompts: {
        type: new GraphQLList(promptType),
        resolve: getPrompts,
      },
      },
    })
  
  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: ({
      addPrompt: {
        type: promptType,
        args: {
          chatId: { type: new GraphQLNonNull(GraphQLString) },
          prompt: { type: new GraphQLNonNull(GraphQLString) },
          response: { type: new GraphQLNonNull(GraphQLString) },
          createdAt: { type: new GraphQLNonNull(GraphQLString) },
          chatTitle: { type: new GraphQLNonNull(GraphQLString) },
          upVotes: { type: new GraphQLNonNull(GraphQLInt) },
          downVotes: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve: addPrompt,
      },
      deletePrompt: {
        type: promptType,
        args: {
          chatId: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: deletePrompt,
      },
    }),
  });
  
  module.exports = new GraphQLSchema({ query: queryType, mutation }); 


