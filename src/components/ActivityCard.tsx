import "./ActivityCard.css";
import { motion } from "framer-motion";
import { IActivityData, ITimeframesOptions } from "./../types";

import DragIcon from "/src/assets/icon-ellipsis.svg?react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ActivityCardProps {
  activityData: IActivityData;
  selectedTimeframe: ITimeframesOptions;
}

const ActivityCard = ({
  activityData,
  selectedTimeframe,
}: ActivityCardProps) => {
  const { title, timeframes } = activityData;
  const activityClass = title.toLowerCase().replace(/ /g, "-"); // Lowercases the string and replaces " " with "-" to use it as a css className

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: title });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <article className="activity-card" ref={setNodeRef} style={style}>
      <div className={`decorative-illustration ${activityClass}`}></div>
      <div className="info">
        <div className="title-and-drag-button">
          <h5>{title}</h5>
          <motion.button
            {...attributes}
            {...listeners}
            whileHover={{ scale: 1.25 }}
          >
            <DragIcon />
          </motion.button>
        </div>
        <div className="activity-info">
          <h3>{timeframes[selectedTimeframe].current}hrs</h3>
          <p>
            Last {selectedTimeframe} - {timeframes[selectedTimeframe].previous}
            hrs
          </p>
        </div>
      </div>
    </article>
  );
};

export default ActivityCard;
