const { Entity } = require('dynamodb-toolbox')

module.exports.Category = new Entity({
  name: 'Category',
  attributes: {
    categoryID: { partitionKey: true, prefix: "categoryID#" },
    categoryName: { sortKey: true },
    data: { alias: 'description', required: true },
    picture: { required: true },
  },
})
