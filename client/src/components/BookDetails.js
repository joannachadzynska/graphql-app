import React from "react";
import { graphql } from "react-apollo";
import { GET_BOOK_QUERY } from "../queries/queries";

const BookDetails = (props) => {
	const displayBookDetails = () => {
		const { book } = props.data;
		if (book) {
			return (
				<div>
					<h2>Book name: {book.name}</h2>
					<p>Genre: {book.genre}</p>
					<p>Author: {book.author.name}</p>
					<p>All books by this author:</p>
					<ul className='other-books'>
						{book.author.books.map((item) => {
							return <li key={item.id}>{item.name}</li>;
						})}
					</ul>
				</div>
			);
		} else {
			return <div>No book selected...</div>;
		}
	};
	return (
		<div id='book-details'>
			<p>Output book details here</p>
			{displayBookDetails()}
		</div>
	);
};

export default graphql(GET_BOOK_QUERY, {
	options: (props) => {
		return {
			variables: {
				id: props.bookId
			}
		};
	}
})(BookDetails);
