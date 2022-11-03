import { CSSProperties } from "react";
import { CardId, extract, isRed, Rank, Suit, Suits } from "./DraggableCard";

export interface CardProps {
  card: CardId;
}

export function FullSizeCard(props: CardProps) {
  const { suit } = extract(props.card);
  const style: CSSProperties = {
    width: "60px",
    height: "90px",
    color: isRed(suit) ? "red" : "black",
  };
  return <div style={style}>{props.card}</div>;
}
