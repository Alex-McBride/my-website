import { styled } from "@mui/material"
import { experimental_sx as sx } from "@mui/system";
import { ParallaxLayer } from "@react-spring/parallax"

export type BackgroundProps = {
    speed: number
    offset: number
    children?: React.ReactNode
    factor?: number
}

const BackgroundParallaxLayer = styled(ParallaxLayer)(sx({
    position: "absolute",
    width: "100%",
    height: "100%",
}));

export const Background = ({
    speed,
    offset,
    factor = 1,
    children = null,
}: BackgroundProps) => (
    <BackgroundParallaxLayer
        speed={speed}
        offset={offset}
        factor={factor}
    >
        {children}
    </BackgroundParallaxLayer>
)

export type ContentProps = {
    speed: number
    offset: number
    children: React.ReactNode
    factor?: number
}

const ContentParallaxLayer = styled(ParallaxLayer)(sx({
    padding: [3, 4, 4, 5],
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 16,
}));

export const Content = ({ speed, offset, children, factor = 1 }: ContentProps) => (
    <ContentParallaxLayer
        speed={speed}
        offset={offset}
        factor={factor}
    >
        {children}
    </ContentParallaxLayer>
)