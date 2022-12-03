import { Paper, TablePagination } from '@mui/material';
import React from 'react';

const Pagination = ({ handleChangePage, rowsPerPage, handleChangeRowsPerPage, page, count }) => {
    return (
        <Paper>
            <TablePagination
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
                labelRowsPerPage="Số hàng trên mỗi trang: "
                rowsPerPageOptions={[1, 3, 5, 10, 20, 30, 50, 100]}
                component="div"
                count={count}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default Pagination;
