
import { Box, Card, styled, Typography } from "@mui/material";
import { Bobbing } from "./animation";
import { Background, Content } from "./parallax";


export function Hero({ offset, factor = 1 }: { offset: number, factor?: number }) {
    // TODO - compose the bobbing better, probably swap it out for svgs of something
    return (
        <div>
            <Background offset={offset} speed={0.2} factor={factor}>
                <Bobbing speed="fast">
                    <Box sx={{ position: "inherit", left: "10%", top: "50%" }}>
                        <Typography sx={{color: "grey.700"}}>Hello</Typography>
                    </Box>
                </Bobbing>
                <Bobbing speed="medium">
                    <Box sx={{ position: "inherit", left: "20%", top: "10%" }}>
                        <Typography sx={{color: "grey.700"}}>Hey</Typography>
                    </Box>
                    <Box sx={{ position: "inherit", left: "60%", top: "40%" }}>
                        <Typography sx={{color: "grey.700"}}>Hej</Typography>
                    </Box>
                </Bobbing>
                <Bobbing speed="slow">
                    <Box sx={{ position: "inherit", left: "50%", top: "60%" }}>
                        <Typography sx={{color: "grey.700"}}>Hi</Typography>
                    </Box>
                </Bobbing>
            </Background>
            <Content offset={offset} speed={0.4} factor={factor}>
                <Box sx={{ width: [1, 1, 1, 1, 2 / 3] }}>
                    <Typography variant="h2" component="h1">Hi, I'm Alex</Typography>
                    <Typography variant="subtitle1">I'm a full-stack software engineer based in Edinburgh, Scotland</Typography>
                </Box>
            </Content>
        </div>
    )
}