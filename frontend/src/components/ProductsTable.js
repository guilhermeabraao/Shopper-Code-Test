import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useProductsContext } from '../context/productsContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function ProductsTable() {

    const { products } = useProductsContext();

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Código</StyledTableCell>
                        <StyledTableCell align="center">Nome</StyledTableCell>
                        <StyledTableCell align="center">Preço Atual</StyledTableCell>
                        <StyledTableCell align="center">Novo Preço</StyledTableCell>
                        <StyledTableCell align="center">Regra Quebrada</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products?.map((product) => (
                        <StyledTableRow key={product.code}>
                            <StyledTableCell component="th" scope="row">
                                {product.code}
                            </StyledTableCell>
                            <StyledTableCell align="center">{product.name}</StyledTableCell>
                            <StyledTableCell align="center">{product.actualPrice}</StyledTableCell>
                            <StyledTableCell align="center">{product.newPrice}</StyledTableCell>
                            <StyledTableCell align="center">{product.invalidArgument}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}