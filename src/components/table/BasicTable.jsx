import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Theme from '@/utils/themeProvider';

export default function BasicTable({ columns, data, columnGroups }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Theme>
            <Paper sx={{ width: '100%' }} elevation={1}>
                <TableContainer sx={{ maxHeight: 650, minHeight: 340, height: '100%' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            {/* Renderiza las agrupaciones de columnas si están definidas */}
                            {columnGroups && (
                                <TableRow>
                                    {columnGroups.map((group, index) => (
                                        <TableCell
                                            key={index}
                                            align={group.align || 'center'}
                                            colSpan={group.colSpan}
                                        // sx={{
                                        //     backgroundColor: 'var(--background)',
                                        //     borderBottom: '1px solid var(--background-contrast)',
                                        //     fontWeight: 'bold',
                                        // }}
                                        >
                                            {group.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )}
                            {/* Renderiza los encabezados de las columnas */}
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align || 'left'}
                                        style={{ top: columnGroups ? 57 : 0, minWidth: column.minWidth }}
                                    // sx={{
                                    //     backgroundColor: 'var(--background)',
                                    //     fontWeight: 'bold',
                                    // }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, rowIndex) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        '& .MuiTablePagination-toolbar': {
                            xs: {
                                padding: '5px',
                            },
                            '& .MuiTablePagination-actions': {
                                xs: {
                                    margin: '0px',
                                }
                            }
                        }
                    }}
                />
            </Paper>
        </Theme>
    );
}
