import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { func, string } from "prop-types";
import { useUser } from "../../../users/providers/UserProvider";
import { useState } from "react";
import CardDeleteDialog from "./CardDeleteDialog";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import useCards from "../../hooks/useCards";

const CardActionBar = ({ cardId, onDelete, onLike, cardUserId, cardLikes }) => {
  
  const [isDialogOpen, setDialog] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const { handleLikeCard } = useCards();
  const [isLike, setLike] = useState(() => {
    if(!user) return false;
    // return !!cardLikes.find(id => id === user._id)
    return cardLikes.includes(user._id)
  });

  const handleDialog = term => {
    if (term === 'open') return setDialog(true)
    setDialog(false)
  }

  const handleDeleteCard = () => {
    handleDialog();
    onDelete(cardId);
  }

  const handleLike = async () => {
    setLike(!isLike);
    await handleLikeCard(cardId);
    onLike();
  };


  return (
    <>
      <CardActions
        disableSpacing
        sx={{ paddingTop: 0, justifyContent: "space-between" }}
      >
        <Box>

          {(user && user._id === cardUserId || user?.isAdmin) && (
            <IconButton
              aria-label="delete card"
              onClick={() => handleDialog("open")}
            >
              <DeleteIcon />
            </IconButton>
          )}


          {(user && user._id === cardUserId || user?.isAdmin) && (
            <IconButton
              aria-label="edit card"
              onClick={() =>
                navigate(`${ROUTES.EDIT_CARD}/${cardId}`)
              }
            >
              <ModeEditIcon />
            </IconButton>
          )}


        </Box>

        <Box>
          {user && (
            <IconButton
              aria-label="add to favorites"
              onClick={handleLike}
            >
              <FavoriteIcon color={isLike ? "error" : "inherit"} />
            </IconButton>
          )}

        </Box>
      </CardActions>

      <CardDeleteDialog
        isDialogOpen={isDialogOpen}
        onDelete={handleDeleteCard}
        onChangeDialog={handleDialog}
      />
    </>
  );
};

CardActionBar.propTypes = {
  cardId: string.isRequired,
  onDelete: func.isRequired,
  onLike: func.isRequired,
  cardUserId: string.isRequired,
};

export default CardActionBar;
