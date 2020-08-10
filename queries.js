process.env.AWS_NODEJS_CONNECTION_REUSE_ENABLED = 1

const AWS = require('aws-sdk')
const { createNorthwindTable } = require('./table/Northwind')

AWS.config.update({
  region: 'local',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'local',
  secretAccessKey: 'local',
})

const start = async () => {
  const documentClient = new AWS.DynamoDB.DocumentClient()
  const table = createNorthwindTable(documentClient)

  await getEmployeeById(table)
  await getDirectReportsForAnEmployee(table)
  await getDiscontinuedProducts(table)
  await listAllOrdersOfAGivenProduct(table)
  await getTheMostRecent25Orders(table)
  await getShippersByName(table)
  await getCustomersByContactName(table)
  await listAllProductsIncludedInAnOrder(table)
  await getSuppliersByCountryAndRegion(table)
}

const logResults = (description, results) => {
  const border = '='.repeat(50)
  const propertiesSorted = Object.keys(results.Items[0]).sort((a, z) =>
    a.localeCompare(z),
  )

  console.log('\n')
  console.log(border)
  console.log(description)
  console.log(border)
  console.table(results.Items, propertiesSorted)
}

const getEmployeeById = async (table) => {
  const results = await table.Employee.query('employeeID#2')

  logResults('# a. Get employee by employee ID [employeeID=2]', results)
}

const getDirectReportsForAnEmployee = async (table) => {
  const results = await table.Employee.query('employeeID#5', {
    index: 'gsi_1',
  })

  logResults('# b. Get direct reports for an employee [employeeID=5]', results)
}

const getDiscontinuedProducts = async (table) => {
  const results = await table.Product.query('PRODUCT', {
    eq: '1',
    index: 'gsi_1',
  })

  logResults('# c. Get discontinued products', results)
}

const listAllOrdersOfAGivenProduct = async (table) => {
  const results = await table.OrderDetails.query('productID#1', {
    index: 'gsi_1',
  })

  logResults('# d. List all orders of a given product [productID=1]', results)
}

const getTheMostRecent25Orders = async (table) => {
  const results = await table.Order.query('ORDER', {
    index: 'gsi_1',
    limit: 25,
    reverse: true,
  })

  logResults('# e. Get the most recent 25 orders', results)
}

const getShippersByName = async (table) => {
  const results = await table.Shipper.query('United Package', {
    index: 'gsi_1',
  })

  logResults('# f. Get shippers by name [name=United Package]', results)
}

const getCustomersByContactName = async (table) => {
  const results = await table.Customer.query('Maria Anders', {
    index: 'gsi_1',
  })

  logResults('# g. Get customers by contact name [name=Maria Anders]', results)
}

const listAllProductsIncludedInAnOrder = async (table) => {
  const results = await table.OrderDetails.query('orderID#10260', {
    beginsWith: 'productID#',
  })

  logResults('# h. List all products included in an order [orderID=10260]', results)
}

const getSuppliersByCountryAndRegion = async (table) => {
  const results = await table.Supplier.query('SUPPLIER', {
    index: 'gsi_1',
    beginsWith: 'Germany#NULL',
  })

  logResults('# i. Get suppliers by country and region [Country=Germany]', results)
}

;(async () => {
  try {
    await start()
  } catch (error) {
    console.error(error)
  }
})()
