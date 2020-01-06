import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_AUTHORS } from "../queries/queries";

const AddBook = () => {
	const { loading, error, data } = useQuery(GET_AUTHORS);

	if (error) return <p>Error :(</p>;

	const displayAuthors = () => {
		if (loading) {
			return <option disabled>Loading Authors...</option>;
		} else {
			return data.authors.map((author) => (
				<option key={author.id}>{author.name}</option>
			));
		}
	};

	return (
		<form>
			<div className='field'>
				<label htmlFor='book-name'>Book name:</label>
				<input type='text' id='book-name' name='book-name' />
			</div>

			<div className='field'>
				<label htmlFor='genre'>Genre:</label>
				<input type='text' id='genre' name='genre' />
			</div>

			<div className='field'>
				<label htmlFor='author'>Author:</label>
				<select id='author'>
					<option disabled>Select Author</option>
					{displayAuthors()}
				</select>
			</div>

			<button>+</button>
		</form>
	);
};

export default AddBook;
