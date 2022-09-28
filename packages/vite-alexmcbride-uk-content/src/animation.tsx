import { css, Keyframes, keyframes } from "@emotion/react";
import styled from "@emotion/styled";


const down: Keyframes = keyframes`
from {
  transform: translateY(0);
}
to {
  transform: translateY(100px);
}
`

const animDurations: Record<Speed, number> = {
  slow: 15,
  medium: 6,
  fast: 4
}
function upDownAnimation(speed: Speed) {
  return css`
    ${down} ${animDurations[speed]}s ease-in-out infinite alternate;
  `
} 

const UpDownDiv = styled.div<{ speed: Speed }>`
    animation: ${props => upDownAnimation(props.speed)};
    position: absolute;
    inset: 0;
  `

type Speed = "slow" | "medium" | "fast"

export function Bobbing({ speed = "fast", children }: { speed?: Speed, children: React.ReactNode }) {
  return (
    <UpDownDiv speed={speed}>
      {children}
    </UpDownDiv>
  )
}

