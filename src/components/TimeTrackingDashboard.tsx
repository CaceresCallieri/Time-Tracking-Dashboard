import "./TimeTrackingDashboard.css";
import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";

// Drag and Drop functionality imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

// import fetchTimeData from "../utils/fetchTimeData.ts";
import timeData from "../../data.json";
import { IActivityData, ITimeframesOptions } from "../types";
import UserCard from "./UserCard";
import ActivityCard from "./ActivityCard";

const TimeTrackingDashboard = () => {
  // Sensors for dragging accesibility
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const [selectedTimeframe, setSelectedTimeframe] =
    useState<ITimeframesOptions>("daily");
  // const timeData = useQuery({ queryKey: ["timeData"], queryFn: fetchTimeData });

  // Try to find the data and order in local storage
  const [activityItems, setActivityItems] = useState<IActivityData[]>(() => {
    if (localStorage.getItem("activityItemsOrder")) {
      return JSON.parse(localStorage.getItem("activityItemsOrder")!);
    } else {
      return timeData;
    }
  });

  const activityIdentifiers = activityItems.map((activity) => activity.title); // Data needed for the by the SortableContext component as a way of identifiying the relevant ActivityCard
  const [draggingActiveId, setDraggingActiveId] =
    useState<UniqueIdentifier | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setDraggingActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggingActiveId(null);
    const { active, over } = event; // From dragging event, object being dragged and object being hovered over

    // Given the architecture of the dragging library, there is always an over.id
    if (active.id !== over!.id) {
      setActivityItems((items) => {
        const oldIndex = items.findIndex((item) => item["title"] === active.id);
        const newIndex = items.findIndex((item) => item["title"] === over!.id);

        const newActivityItemsOrder = arrayMove(items, oldIndex, newIndex);

        localStorage.setItem(
          "activityItemsOrder",
          JSON.stringify(newActivityItemsOrder),
        );
        return newActivityItemsOrder;
      });
    }
  };

  return (
    <main>
      <UserCard
        selectedTimeframe={selectedTimeframe}
        setSelectedTimeframe={setSelectedTimeframe}
      />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {activityItems && (
          <section className="activity-cards-container">
            <SortableContext
              items={activityIdentifiers}
              strategy={rectSortingStrategy}
            >
              {activityItems.map((activityData: IActivityData) => {
                return (
                  <ActivityCard
                    activityData={activityData}
                    selectedTimeframe={selectedTimeframe}
                    key={activityData.title}
                  />
                );
              })}
              <DragOverlay>
                {/* TODO: Make the the cursor: grabbing on the element being dragged */}
                {draggingActiveId ? (
                  <ActivityCard
                    activityData={
                      activityItems.find(
                        (activityItem) =>
                          activityItem.title === draggingActiveId,
                      )! // Trust that the find method will return valid data since draggingActiveId only comes from activityItems array
                    }
                    selectedTimeframe={selectedTimeframe}
                  />
                ) : null}
              </DragOverlay>
            </SortableContext>
          </section>
        )}
      </DndContext>
    </main>
  );
};

export default TimeTrackingDashboard;
