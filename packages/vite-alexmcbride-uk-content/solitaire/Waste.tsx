import { CSSProperties } from "react";
import { DraggableCard } from "./DraggableCard";
import { CardId } from "./solitaire";

export function Waste(props: { cards: CardId[] }) {
  if (props.cards.length === 0) {
    const style: CSSProperties = {
      backgroundColor: "blue",
      width: "60px",
      minHeight: "90px",
    };
    return <div style={style}></div>;
  }
  const card = props.cards.at(-1)!;
  return (
    <DraggableCard
      card={card}
      isFaceUp={true}
      key={card}
      depth={0}
      draggable={true}
    ></DraggableCard>
  );
}
