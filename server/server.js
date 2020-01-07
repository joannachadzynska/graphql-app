const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const cors = require("cors");

const uri = require("../config");

const app = express();

const PORT = process.env.PORT || 4000;
app.use(cors());

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

app.use(express.static("public"));

// app.get("*", (req, res) => {
// 	res.sendFile(path.resolve(__dirname, "public", "index.html"));
// });

app.listen(PORT, () => {
	console.log(`Server is running at port ${PORT}`);
});
