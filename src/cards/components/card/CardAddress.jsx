import { object } from "prop-types"
import Typography from "@mui/material/Typography";

const CardAddress = ({address}) => {
    let output = `${address.houseNumber} ${address.street} st, ${address.city}, `;

    if(address.state){
        output += `${address.state}, `;
    }

    if(address.zip){
        output += `${address.country}, `;
        output += `${address.zip}`;
    }
    else{
        output += `${address.country}`;
    }

    return <Typography variant="body1">{output}</Typography>;
}

CardAddress.propTypes = {
    address: object.isRequired
};

export default CardAddress;