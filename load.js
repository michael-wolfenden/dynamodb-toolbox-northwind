process.env.AWS_NODEJS_CONNECTION_REUSE_ENABLED = 1

const AWS = require('aws-sdk')
const parse = require('csv-parse/lib/sync')
const fs = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)

const { createNorthwindTable } = require('./table/Northwind')

AWS.config.update({
  region: 'local',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'local',
  secretAccessKey: 'local',
})

const start = async () => {
  const dynamoDB = new AWS.DynamoDB()
  const documentClient = new AWS.DynamoDB.DocumentClient()

  await dropTableIfExists(dynamoDB)
  await createTable(dynamoDB)

  const northwind = createNorthwindTable(documentClient)
  await loadCSV('./csv/categories.csv', northwind.Category)
  await loadCSV('./csv/customers.csv', northwind.Customer)
  await loadCSV('./csv/employees.csv', northwind.Employee)
  await loadCSV('./csv/order_details.csv', northwind.OrderDetails)
  await loadCSV('./csv/orders.csv', northwind.Order)
  await loadCSV('./csv/products.csv', northwind.Product)
  await loadCSV('./csv/shippers.csv', northwind.Shipper)
  await loadCSV('./csv/suppliers.csv', northwind.Supplier)
}

const dropTableIfExists = async (dynamoDB) => {
  const { TableNames } = await dynamoDB.listTables().promise()
  if (!TableNames.includes('northwind')) return

  console.log(`Deleting table northwind`)

  await dynamoDB
    .deleteTable({
      TableName: 'northwind',
    })
    .promise()
}

const createTable = (dynamoDB) => {
  const tableDefinition = {
    TableName: 'northwind',
    KeySchema: [
      { AttributeName: 'pk', KeyType: 'HASH' },
      { AttributeName: 'sk', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'pk', AttributeType: 'S' },
      { AttributeName: 'sk', AttributeType: 'S' },
      { AttributeName: 'data', AttributeType: 'S' },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'gsi_1',
        KeySchema: [
          { AttributeName: 'sk', KeyType: 'HASH' },
          { AttributeName: 'data', KeyType: 'RANGE' },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
      },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  }

  console.log(`Creating table northwind`)
  return dynamoDB.createTable(tableDefinition).promise()
}

const loadCSV = (pathToCSVFile, entityType) =>
  readCSVFile(pathToCSVFile)
    .then(parseCSV)
    .then(log((x) => `Inserting ${x.length} entities from ${pathToCSVFile}`))
    .then(writeEntitiesInBatches(entityType))

const readCSVFile = (filePath) => readFileAsync(filePath)

const parseCSV = (contents) =>
  parse(contents, {
    columns: true,
    skip_empty_lines: true,
  })

const log = (fn) => (x) => {
  console.log(fn(x))
  return x
}

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  )

const writeEntitiesInBatches = (entityType) => (entities) => {
  const table = entityType.table
  const batchWriteItems = entities.map((entity) => entityType.putBatch(entity))
  const batchesOf25 = chunk(batchWriteItems, 25)
  
  // should really handle UnprocessedItems here :)
  return Promise.all(batchesOf25.map((batch) => table.batchWrite(batch)))
}

;(async () => {
  try {
    await start()
  } catch (error) {
    console.error(error)
  }
})()
