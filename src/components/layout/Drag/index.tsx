import Draggable, { DraggableEvent } from "react-draggable";
import "./Drag.scss";

function Drag(props: {
  text: string;
  customClassName?: string;
  onDragStop: Function;
  textProps :{
    color : string,
    size : string
  }
}) {
  return (
    <Draggable
      defaultClassName={"draggable__component " + props.customClassName}
      onStop={(event) => props.onDragStop(event)}
    >
      <div className="text" style={{ color: props.textProps.color,fontSize: parseInt(props.textProps.size), zIndex: 100 }}>
        {" "}
        {props.text}{" "}
      </div>
    </Draggable>
  );
}

export default Drag;
