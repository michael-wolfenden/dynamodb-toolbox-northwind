const { Entity } = require('dynamodb-toolbox')

module.exports.Customer = new Entity({
  name: 'Customer',
  attributes: {
    customerID: { partitionKey: true, prefix: "customerID#" },
    contactName: { sortKey: true },
    data: { required: true },
    companyName: { required: true },
    contactTitle: { required: true },
    postalCode: { required: true },
    phone: { required: true },
    fax: { required: true },
    country: ['data', 0, { required: true }],
    region: ['data', 1, { required: true }],
    city: ['data', 2, { required: true }],
    address: ['data', 3, { required: true }],
  },
})
