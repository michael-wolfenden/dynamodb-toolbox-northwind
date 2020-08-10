const { Entity } = require('dynamodb-toolbox')

module.exports.Supplier = new Entity({
  name: 'Supplier',
  attributes: {
    supplierID: { partitionKey: true, prefix: 'supplierID#' },
    sk: { sortKey: true, default: 'SUPPLIER', hidden: true },
    data: { required: true },
    companyName: { required: true },
    contactName: { required: true },
    contactTitle: { required: true },
    postalCode: { required: true },
    phone: { required: true },
    fax: { required: true },
    homePage: { required: true },
    country: ['data', 0, { required: true }],
    region: ['data', 1, { required: true }],
    city: ['data', 2, { required: true }],
    address: ['data', 3, { required: true }],
  },
})
