const { Entity } = require('dynamodb-toolbox')

module.exports.Product = new Entity({
  name: 'Product',
  attributes: {
    productID: { partitionKey: true },
    sk: { sortKey: true, default: 'PRODUCT', hidden: true },
    data: { alias: 'discontinued', required: true },
    productName: { required: true },
    supplierID: { required: true, prefix: 'supplierID#' },
    categoryID: { required: true, prefix: 'categoryID#' },
    quantityPerUnit: { required: true },
    unitPrice: { required: true },
    unitsInStock: { required: true },
    unitsOnOrder: { required: true },
    reorderLevel: { required: true },
  },
})
