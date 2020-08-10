const { Entity } = require('dynamodb-toolbox')

module.exports.Employee = new Entity({
  name: 'Employee',
  attributes: {
    employeeID: { partitionKey: true, prefix: "employeeID#" },
    reportsTo: { sortKey: true, prefix: "employeeID#" },
    data: { alias: 'hireDate', required: true },
    lastName: { required: true },
    firstName: { required: true },
    title: { required: true },
    titleOfCourtesy: { required: true },
    birthDate: { required: true },
    address: { required: true },
    city: { required: true },
    region: { required: true },
    postalCode: { required: true },
    country: { required: true },
    homePhone: { required: true },
    extension: { required: true },
    photo: { required: true },
    notes: { required: true },
    photoPath: { required: true },
  },
})
