import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.css';

const Pagination = ({ currentPage, onChangePage, pageCount }) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			onPageChange={(index) => onChangePage(index.selected + 1)}
			forcePage={currentPage - 1}
			pageRangeDisplayed={8}
			pageCount={pageCount}
			previousLabel="<"
		/>
	);
};

export default Pagination;
