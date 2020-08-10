const { Entity } = require('dynamodb-toolbox')

module.exports.OrderDetails = new Entity({
  name: 'OrderDetails',
  attributes: {
    orderID: { partitionKey: true, prefix: 'orderID#' },
    productID: { sortKey: true, prefix: 'productID#' },
    data: { alias: 'unitPrice', required: true },
    quantity: { required: true },
    discount: { required: true },
  },
})
