import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { useState } from "react";
import { FaceDownCard } from "./Card";
import { CardStack } from "./CardStack";
import { Foundations } from "./Foundations";
import {
  CardId,
  drawFromStock,
  GameState,
  MoveTarget,
  newGame,
  proposeMove,
  recycleWaste,
  Suit,
  Suits,
} from "./solitaire";
import { Waste } from "./Waste";

function App() {
  const [gameState, setGameState] = useState<GameState>(() => newGame());
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const kbSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, kbSensor);

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Grid container spacing={2} columns={7}>
        <Grid xs={1}>
          <button
            onClick={() =>
              setGameState((prev) =>
                prev.stock.length > 0 ? drawFromStock(prev) : recycleWaste(prev)
              )
            }
            style={{
              margin: "0px",
              padding: "0px",
            }}
          >
            <FaceDownCard />
          </button>
        </Grid>

        <Grid xs={1}>
          <Waste cards={gameState.waste} />
        </Grid>

        <Grid xs={1} />
        <Foundations foundations={gameState.foundations} />

        {gameState.piles.map((pile, i) => (
          <Grid xs={1} key={`pile${i}`}>
            <CardStack id={`pile${i}`} cards={pile} />
          </Grid>
        ))}
      </Grid>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // If the item is dropped over a container, figure out
    if (over !== null) {
      // We pinky promise that the id of the active element is a card
      // TODO validate this
      const movedCard: CardId = active.id as CardId;
      console.log(`Moving ${movedCard} over ${JSON.stringify(over)}`);
      let target: MoveTarget;
      if (typeof over.id === "string" && over.id.startsWith("pile")) {
        const pileIndex = Number.parseInt(over.id.charAt(4));
        target = {
          target: "pile",
          pileIndex,
        };
      } else if (
        typeof over.id === "string" &&
        Object.values(Suits).find((suit) => suit === over.id) !== undefined
      ) {
        target = {
          target: "foundation",
          suit: over.id as Suit,
        };
      } else {
        throw Error(
          `Don't know how to handle dropping over ${JSON.stringify(over)}`
        );
      }
      setGameState((prev) => {
        return proposeMove(prev, movedCard, target) ?? prev;
      });
    }
  }
}

export default App;
