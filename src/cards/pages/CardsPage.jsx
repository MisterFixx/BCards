import { Container, Fab } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import { useEffect } from "react";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";
import ROUTES from "../../routes/routesModel";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const CardsPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { value, handleGetCards, handleDeleteCard } = useCards();
  const { error, isPending, filteredCards } = value;

  useEffect(() => {
    handleGetCards();
  }, []);

  const onDeleteCard = async (cardId) => {
    await handleDeleteCard(cardId);
    await handleGetCards();
  };

  return (
    <Container>
      <PageHeader
        title="Cards"
        subtitle="Here you can find business cards from all categories"
      />

      <CardsFeedback
        isPending={isPending}
        error={error}
        cards={filteredCards}
        onDelete={onDeleteCard}
      />

    {user?.isBusiness && (
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
    </Container>
  );
};

export default CardsPage;
