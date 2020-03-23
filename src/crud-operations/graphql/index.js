const recipe = require('./recipe');

let cruds = [recipe];

export const crudTypeDefs = cruds.map(crud => crud[`${crud.constructor.name}TypeDefs`]);
export const crudResolvers = cruds.map(crud => crud[`${crud.constructor.name}Resolvers`]);