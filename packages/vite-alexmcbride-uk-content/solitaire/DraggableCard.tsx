import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties, ReactNode } from "react";
import { ClickableCard } from "./Card";
import { CardId } from "./solitaire";

interface DraggableCardProps {
  card: CardId;
  isFaceUp: boolean;
  draggable: boolean; // Used to disable draggability (e.g. if this is not the top card)
  depth: number;
  children?: ReactNode;
}

export function DraggableCard(props: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging, node } =
    useDraggable({
      id: props.card,
      data: {
        card: props.card,
      },
      disabled: !props.draggable,
    });
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    touchAction: "manipulation",
    position: "relative",
    marginTop: props.depth === 0 ? `` : `-75px`,
    zIndex: isDragging ? 1000 : ``,
  };

  Object.entries(attributes).forEach(([k, v]) =>
    node.current?.setAttribute(k, v)
  );

  return (
    <div style={style} {...listeners}>
      <ClickableCard
        ref={setNodeRef}
        card={props.isFaceUp ? props.card : undefined}
      ></ClickableCard>
    </div>
  );
}
