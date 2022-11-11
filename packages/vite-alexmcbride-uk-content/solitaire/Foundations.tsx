import { useDroppable } from "@dnd-kit/core";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { CSSProperties } from "react";
import { ClickableCard } from "./Card";
import { CardId, Suit, Suits } from "./solitaire";

function Foundation(props: { suit: Suit; cards: CardId[] }) {
  const { setNodeRef } = useDroppable({
    id: props.suit,
  });

  const style: CSSProperties = {
    backgroundColor: "blue",
    color: "white",
    width: "60px",
    minHeight: "90px",
  };

  return (
    <div ref={setNodeRef} style={style} key={props.suit}>
      {props.cards.length === 0 ? (
        props.suit
      ) : (
        <ClickableCard card={props.cards.at(-1)} />
      )}
    </div>
  );
}

export function Foundations(props: { foundations: Record<Suit, CardId[]> }) {
  return (
    <>
      {Object.values(Suits).map((suit: Suit) => {
        return (
          <Grid xs={1} key={`foundation${suit}`}>
            <Foundation suit={suit} cards={props.foundations[suit]} />
          </Grid>
        );
      })}
    </>
  );
}
