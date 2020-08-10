const { Entity } = require('dynamodb-toolbox')

module.exports.Order = new Entity({
  name: 'Order',
  attributes: {
    orderID: { partitionKey: true, prefix: 'orderID#' },
    sk: { sortKey: true, default: 'ORDER', hidden: true },
    data: { alias: 'orderDate', required: true },
    customerID: { required: true, prefix: 'customerID#' },
    employeeID: { required: true, prefix: 'employeeID#' },
    requiredDate: { required: true },
    shippedDate: { required: true },
    shipVia: { required: true, prefix: 'shipperID#' },
    freight: { required: true },
    shipName: { required: true },
    shipAddress: { required: true },
    shipCity: { required: true },
    shipRegion: { required: true },
    shipPostalCode: { required: true },
    shipCountry: { required: true },
  },
})
