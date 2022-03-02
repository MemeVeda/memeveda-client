import Draggable, { DraggableEvent } from "react-draggable";
import "./Drag.scss";

function Drag(props: {
  text: string;
  customClassName?: string;
  onDragStop: Function;
}) {
  return (
    <Draggable
      defaultClassName={"draggable__component " + props.customClassName}
      onStop={(event) => props.onDragStop(event)}
    >
      <div className="text" style={{ color: "blue", zIndex: 100 }}>
        {" "}
        {props.text}{" "}
      </div>
    </Draggable>
  );
}

export default Drag;
