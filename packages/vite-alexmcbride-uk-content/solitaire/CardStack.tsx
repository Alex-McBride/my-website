import { useDroppable } from "@dnd-kit/core";
import { CSSProperties } from "react";
import { DraggableCard } from "./DraggableCard";
import { PileCard } from "./solitaire";

export function CardStack({ cards, id }: { cards: PileCard[]; id: string }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style: CSSProperties = {
    backgroundColor: "blue",
    color: isOver ? "green" : undefined,
    width: "60px",
    minHeight: "90px",
    fontSize: 0,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {cards.map((card, idx) => (
        // Draggability should be decided by the game state which is TODO
        <DraggableCard
          card={card.id}
          isFaceUp={card.isFaceUp}
          key={card.id}
          depth={idx}
          draggable={card.isMoveable}
        ></DraggableCard>
      ))}
    </div>
  );
}
