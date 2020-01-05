const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const uri = require("../config");

const app = express();

const PORT = process.env.PORT || 4000;

mongoose.connect(uri);

mongoose.connection.once("open", () => {
	console.log("Connected to gql database");
});

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

app.listen(PORT, () => {
	console.log(`Server is running at port ${PORT}`);
});
