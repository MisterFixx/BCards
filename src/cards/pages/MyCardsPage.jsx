import { useNavigate } from "react-router-dom";
import { useUser } from "../../users/providers/UserProvider";
import useCards from "../hooks/useCards";
import ROUTES from "../../routes/routesModel";
import { Container, Fab } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import AddIcon from "@mui/icons-material/Add";
import CardsFeedback from "../components/CardsFeedback";
import { useEffect } from "react";

const MyCardsPage = () => {
  const { value, handleGetMyCards, handleDeleteCard } = useCards();
  const { cards, error, isPending } = value;

  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(ROUTES.CARDS);
    else handleGetMyCards();
  }, [user, handleGetMyCards, navigate]);

  const onDeleteCard = async (cardId) => {
    await handleDeleteCard(cardId); // this will delete the card from the DB
    await handleGetMyCards();
  };

  return (
    <Container sx={{position: "relative"}}>
      <PageHeader
        title="My Cards"
        subtitle="Here you can find cards you've created"
      />
      {cards && (
        <Fab
          onClick={() => navigate(ROUTES.CREATE_CARD)}
          color="primary"
          aria-label="add"
          sx={{
            position: "absolute",
            bottom: 75,
            right: 16,
          }}
        >
          <AddIcon />
        </Fab>
      )}
      <CardsFeedback
        isPending={isPending}
        error={error}
        cards={cards}
        onDelete={onDeleteCard}
      />
    </Container>
  );
};

export default MyCardsPage;
