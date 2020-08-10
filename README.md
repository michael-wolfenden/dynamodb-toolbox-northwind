# dynamodb-toolbox-northwind

Forrest Brazeal wrote a [blog post](https://www.trek10.com/blog/dynamodb-single-table-relational-modeling) where he implemented a subset of northwind using a DynamoDB single table design.

This is an implementation using Jeremy Daly's [dynamodb-toolbox library](https://github.com/jeremydaly/dynamodb-toolbox)

## Installation

```
yarn install
```

## Usage

### Running dynamodb-local

I have incuded a [docker-compose file](./docker-compose.yml) that includes both `dynamodb-local` and `dynamodb-admin`. 
`dynamodb-admin` provides a dashboard at [http://localhost:8001](http://localhost:8001) that allows you to view the generated `northwind` table and contents.

To start the containers run:

```
docker-compose up
```

### Loading the northwind data

To create the `northwind` table and load the data form the csv files run:

```
node ./load.js
```

You can view the table and data via the dashboard at [http://localhost:8001](http://localhost:8001)

### Running the queries

To execute the queries run:

```
node ./queries.js
```

This will output the query results in table format. I have captured the results in [results.txt](./results.txt) for easier viewing.
