import { Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import useCards from "../hooks/useCards";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MuiCard from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardDetailRow from "../components/card/CardDetailRow";
import CardAddress from "../components/card/CardAddress";

const CardDetailPage = () => {
    const { id }            = useParams();
    const { handleGetCard } = useCards();
    const [card, setCard]   = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        handleGetCard(id).then(temp => {
            setCard(temp);
        }).catch(error => {
            setError(error);
        });
    }, [handleGetCard, id]);

    if (card) {
        return (
            <Container maxWidth="lg">
                <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
                    <Grid item xs={6}>
                        <MuiCard>
                            <CardMedia component="div" height="194" image={card.image.url} alt={card.image.alt}>
                                <Typography variant="h2" component="h1">{card.title}</Typography>
                                <Typography variant="h5" component="h2">{card.subtitle}</Typography>
                            </CardMedia>
                            <CardContent sx={{padding: "0 !important"}}>
                                <Box>
                                    <TableContainer component={Paper} sx={{borderRadius: "0 !important"}}>
                                        <Table aria-label="Business details">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell colSpan={2} align="center" sx={{padding: "5px", backgroundColor: "#000", color: "#fff"}}>
                                                        Business details
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <CardDetailRow name="Description" value={card.description}></CardDetailRow>
                                                <CardDetailRow name="Contact Number" value={card.phone}></CardDetailRow>
                                                <CardDetailRow name="Contact E-Mail" value={card.email}></CardDetailRow>
                                                <CardDetailRow name="Website"><Link href={card.web}>{card.web}</Link></CardDetailRow>
                                                <CardDetailRow name="Address"><CardAddress address={card.address} /></CardDetailRow>
                                                <CardDetailRow name="Created at" value={card.createdAt}></CardDetailRow>
                                                <CardDetailRow name="Card number" value={card.bizNumber}></CardDetailRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </CardContent>
                        </MuiCard>
                    </Grid>
                </Grid>
            </Container>
        );
    }
    else if(error){
        return (
            <Container maxWidth="lg">
                <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
                    <Grid item xs={6}>
                        <Typography variant="h2" component="h1">Woops</Typography>
                        <Typography variant="h5" component="h2">The card you requested was not found.</Typography>
                    </Grid>
                </Grid>
            </Container>
        );
    }
};

export default CardDetailPage;