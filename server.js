import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
	hello: () => {
		return "Hello world!";
	}
};

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true
	})
);

app.listen(PORT, () => {
	console.log("Running a GraphQL API server at http://localhost:4000/graphql");
	console.log(`Server is running at port ${PORT}`);
});
