import "./UserCard.css";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { ITimeframesOptions } from "../types";

interface UserCardProps {
  selectedTimeframe: ITimeframesOptions;
  setSelectedTimeframe: Dispatch<SetStateAction<ITimeframesOptions>>;
}

const UserCard = ({
  selectedTimeframe,
  setSelectedTimeframe,
}: UserCardProps) => {
  const timeframes: ITimeframesOptions[] = ["daily", "weekly", "monthly"];

  return (
    <section className="user-card">
      <div className="user">
        <img src="avatar.png" alt="" className="avatar" />
        <div className="user-name">
          <p>Report for</p>
          <h2>Jeremy Johnson</h2>
        </div>
      </div>

      <div className="options">
        {timeframes.map((timeframeOption) => {
          return (
            <motion.button
              className={`${selectedTimeframe === timeframeOption ? "active" : ""}`}
              key={timeframeOption}
              onClick={() => setSelectedTimeframe(timeframeOption)}
              whileHover={{ scale: 1.05 }}
            >
              {timeframeOption}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};

export default UserCard;
