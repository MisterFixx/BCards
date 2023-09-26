import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { string } from "prop-types";

const PostedBy = ({firstName, lastName, pfpUrl}) => {
    return <>
        {pfpUrl !== "" && <Avatar alt={firstName + " " + lastName + "'s profile picutre"} src={pfpUrl}/>}
        <Typography variant="body1">{firstName + " " + lastName}</Typography>
    </>;
}

PostedBy.propTypes = {
    firstName: string.isRequired,
    lastName:  string.isRequired,
    pfpUrl:    string.isRequired
};

export default PostedBy;