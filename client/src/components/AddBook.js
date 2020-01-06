import React, { useState } from "react";
import { compose } from "recompose";
import { graphql } from "react-apollo";
import {
	GET_AUTHORS_QUERY,
	ADD_BOOK_MUTATION,
	GET_BOOKS_QUERY
} from "../queries/queries";

const AddBook = ({ getAuthorsQuery, addBookMutation }) => {
	// const { loading, error, data } = useQuery(ADD_BOOK_MUTATION);

	const [name, setBookName] = useState("");
	const [genre, setBookGenre] = useState("");
	const [authorId, setAuthorId] = useState("");

	const setNameAndBookGenre = (e) => {
		if (e.target.name === "book-name") {
			setBookName(e.target.value);
		} else if (e.target.name === "genre") {
			setBookGenre(e.target.value);
		}
	};

	const addAuthorId = (e) => {
		setAuthorId(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		addBookMutation({
			variables: {
				name,
				genre,
				authorId
			},
			refetchQueries: [
				{
					query: GET_BOOKS_QUERY
				}
			]
		});
		setBookName("");
		setBookGenre("");
		setAuthorId("");
	};

	const displayAuthors = () => {
		let data = getAuthorsQuery;

		if (data.loading) {
			return <option disabled>Loading Authors...</option>;
		} else {
			return data.authors.map((author) => (
				<option key={author.id} value={author.id}>
					{author.name}
				</option>
			));
		}
	};

	return (
		<form id='add-book' onSubmit={handleSubmit}>
			<div className='field'>
				<label htmlFor='book-name'>Book name:</label>
				<input
					type='text'
					id='book-name'
					name='book-name'
					value={name}
					onChange={setNameAndBookGenre}
				/>
			</div>

			<div className='field'>
				<label htmlFor='genre'>Genre:</label>
				<input
					type='text'
					id='genre'
					name='genre'
					value={genre}
					onChange={setNameAndBookGenre}
				/>
			</div>

			<div className='field'>
				<label htmlFor='author'>Author:</label>
				<select id='author' value={authorId} onChange={addAuthorId}>
					<option disabled>Select Author</option>
					{displayAuthors()}
				</select>
			</div>

			<button>+</button>
		</form>
	);
};

export default compose(
	graphql(GET_AUTHORS_QUERY, { name: "getAuthorsQuery" }),
	graphql(ADD_BOOK_MUTATION, { name: "addBookMutation" })
)(AddBook);
