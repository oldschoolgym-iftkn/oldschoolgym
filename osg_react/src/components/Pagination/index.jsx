import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.css';

const Pagination = ({ currentPage, onChangePage }) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			onPageChange={(index) => onChangePage(index.selected + 1)}
			forcePage={currentPage - 1}
			pageRangeDisplayed={8}
			pageCount={3}
			previousLabel="<"
		/>
	);
};

export default Pagination;
