import { Box, Card, CardActionArea, CardContent, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Bobbing } from "./animation";
import { Background, Content } from "./parallax";

export function Skills({ offset, factor = 1 }: { offset: number, factor?: number}) {
    // TODO responsive
    // TODO These cards are going to flip when you click on them
    // TODO compose these better
    return (
        <>
        <Background offset={offset} speed={0.2} factor={factor}>
            <Bobbing>
                <Box sx={{ position: "inherit", left: "70%", top: "50%"}}>
                    👀 
                </Box>
            </Bobbing>
        </Background>
        <Content offset={offset} speed={0.4} factor={factor}>
            <Box sx={{width: [1, 1, 1, 1, 2/3]}}>

                <Typography variant="h2">Skills</Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid xs={6}>
                        <Card>
                            <CardActionArea>
                                <CardContent>
                                    <Typography>Languages</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid xs={6}>
                        <Card>
                            <CardActionArea>
                                <CardContent>
                                    <Typography>Platforms and Frameworks</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid xs={6}>
                        <Card>
                            <CardActionArea>
                                <CardContent>
                                    <Typography>Methodologies</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid xs={6}>
                        <Card>
                            <CardActionArea>
                                <CardContent>
                                    <Typography>Other skills</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Content>
    </>
    )
}