import { useDroppable } from "@dnd-kit/core";
import { CSSProperties, ReactNode } from "react";
import { FullSizeCard } from "./Card";
import { CardId, DraggableCard } from "./DraggableCard";

export function CardStack({ cards, id }: { cards: CardId[]; id: string }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style: CSSProperties = {
    backgroundColor: "blue",
    color: isOver ? "green" : undefined,
    width: "60px",
    height: "90px",
    fontSize: 0,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {cards.map((card, idx) => (
        // Draggability should be decided by the game state which is TODO
        <DraggableCard card={card} key={card} depth={idx} draggable={true}>
          <FullSizeCard card={card} />
        </DraggableCard>
      ))}
    </div>
  );
}
