import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_BOOKS_QUERY } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = (props) => {
	const { loading, error, data } = useQuery(GET_BOOKS_QUERY);
	const [selected, setSelected] = useState(null);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div>
			<ul id='book-list'>
				{data.books.map((book) => (
					<li
						key={book.id}
						onClick={(e) => {
							setSelected(book.id);
						}}>
						{book.name}
					</li>
				))}
			</ul>
			<BookDetails bookId={selected} />
		</div>
	);
};

export default BookList;
