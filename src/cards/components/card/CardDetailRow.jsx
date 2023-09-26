import { string, node, oneOfType, number } from "prop-types";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    }
}));

const CardDetailRow = ({name, value = null, children}) => {
    return (
        <StyledTableRow>
            <StyledTableCell>
                <b>{name}</b>
            </StyledTableCell>
            <StyledTableCell>
                {value == null ? children : value}
            </StyledTableCell>
        </StyledTableRow>
    );
};

CardDetailRow.propTypes = {
    name: string.isRequired,
    value: oneOfType([
        string,
        number
    ]),
    children: node
};

export default CardDetailRow;