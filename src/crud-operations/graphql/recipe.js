import gql from 'graphql-tag';

import { Recipe } from '../mongoose';

const recipeTypeDefs = gql`
  type Recipe {
    _id: ID!
    name: String!
    temp: Float!
    time: Int!
  }

  type Query {
    recipe(_id: String, name: String): [Recipe]
  }

  type Mutation {
    addRecipe(text: String!): Recipe
    updateRecipe(_id: ID!, text: String!): Recipe
    deleteRecipe(_id: ID!): Recipe
  }
`;

const recipeResolvers = {
    /**
     * @example
     * query {
     *   recipe { _id text }
     * }
     *
     * query {
     *   recipe(_id: "${_id}") { _id text }
     * }
     *
     * query {
     *   recipe(text: "${text}") { _id text }
     * }
     */
    Query: {
        async recipe(root, { _id, name }) {
            const find = {};

            if (_id) find._id = _id;
            if (name) find.name = { $regex: name, $options: 'i' };

            const data = await Recipe.find(find).exec();

            return data;
        },
    },

    /**
     * @example
     * mutation {
     *   addRecipe(text: "${text}") { _id text }
     * }
     *
     * mutation {
     *   updateRecipe(_id: "${_id}", text: "${text}") { _id text }
     * }
     *
     * mutation {
     *   deleteRecipe(_id: "${_id}") { _id text }
     * }
     */
    Mutation: {
        async addRecipe(root, { name, temp, time }) {
            const recipe = await new Recipe({ name, temp, time });
            const data = await recipe.save();

            return data;
        },
        async updateRecipe(root, { _id, name, temp, time }) {
            const conditions = { _id };
            const update = { $set: { name, temp, time } };
            const options = { new: true, upsert: true };

            const data = await Recipe.findOneAndUpdate(conditions, update, options).exec();

            return data;
        },
        async deleteRecipe(root, { _id }) {
            const data = await Recipe.findByIdAndRemove(_id);
            return data;
        },
    },
};


module.exports = () => {
    return { recipeTypeDefs, recipeResolvers }
}