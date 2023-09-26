import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "../components/PageHeader";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const AboutPage = () => {
    return (
        <Container>
            <PageHeader
                title="About Page"
                subtitle="On this page you can find explanations about using the application"
            />

            <Grid container spacing={2}>
                <Grid item xs={12} md={8} alignSelf="center">
                    <Typography variant="body1" gutterBottom>
                        BCard is an open source CMS for business cards.<br />
                        You can sign up as a business account and promote your business on our website for everyone to see!
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        To begin using the website, please sign up or log in using the sign up or log in buttons in the navbar.<br />
                        If you use a business account, you will be granted permission to post new cards on the websites as well as editing the cards you've posted.<br />
                        If you use a non-business account you will still be able to browse and like cards.<br />
                        Using the footer menu, you can get to the about page <Typography variant="caption">(this page)</Typography> or browse cards you've liked, and if your account is a business account you can also browse the cards you've posted using the "My cards" button.<br />
                        Should you need to delete or edit a card you've posted, you can do so from the "My cards" page using the icons on the lefthand side of the card's footer.<br />
                        Administrators also have the ability to manage cards on the website, by either editing or deleting them.<br />
                        You can search for cards on our website you can simply start typing in the search bar in the Navbar, and matching results will automatically show up.<br />
                        Finally, to log out, simply click on your profile picture in the navbar, and click "Log out" in the dropdown menu.<br />
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        display: { md: "flex", xs: "none" },
                        justifyContent: "center",
                    }}
                >
                    <img
                        src="/assets/images/card.jpg"
                        alt="card"
                        width="100%"
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default AboutPage;
