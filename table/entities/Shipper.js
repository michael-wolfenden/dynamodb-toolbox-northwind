const { Entity } = require('dynamodb-toolbox')

module.exports.Shipper = new Entity({
  name: 'Shipper',
  attributes: {
    shipperID: { partitionKey: true, prefix: 'shipperID#' },
    companyName: { sortKey: true },
    data: { alias: 'phone', required: true },
  },
})
