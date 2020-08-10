const { Table } = require('dynamodb-toolbox')
const { Category } = require('./entities/Category')
const { Customer } = require('./entities/Customer')
const { Employee } = require('./entities/Employee')
const { Order } = require('./entities/Order')
const { OrderDetails } = require('./entities/OrderDetails')
const { Product } = require('./entities/Product')
const { Shipper } = require('./entities/Shipper')
const { Supplier } = require('./entities/Supplier')

module.exports.createNorthwindTable = (documentClient) =>
  new Table({
    name: 'northwind',
    partitionKey: 'pk',
    sortKey: 'sk',
    indexes: {
      gsi_1: { partitionKey: 'sk', sortKey: 'data' },
    },
    entities: [
      Category,
      Customer,
      Employee,
      Order,
      OrderDetails,
      Product,
      Shipper,
      Supplier,
    ],
    DocumentClient: documentClient,
  })