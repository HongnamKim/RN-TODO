import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useInterval from "../hooks/useInterval";

const TodayContext = createContext();

export const useTodayContext = () => useContext(TodayContext);

export default function TodayProvider({ children }) {
  const [todayObject, setTodayObject] = useState(null);
  const [todayYear, setTodayYear] = useState(null);
  const [todayMonth, setTodayMonth] = useState(null);
  const [todayDate, setTodayDate] = useState(null);

  // useInterval 즉시 실행을 위함
  useEffect(() => {
    const today = new Date();
    setTodayObject(today);
    setTodayYear(today.getFullYear());
    setTodayMonth(("00" + (today.getMonth() + 1)).slice(-2));
    setTodayDate(("00" + today.getDate()).slice(-2));
  }, []);

  // 1초마다 시간 data 갱신
  useInterval(() => {
    const today = new Date();
    setTodayObject(today);
    setTodayYear(today.getFullYear());
    setTodayMonth(("00" + (today.getMonth() + 1)).slice(-2));
    setTodayDate(("00" + today.getDate()).slice(-2));
  }, 1000);

  return (
    <TodayContext.Provider
      value={{ todayObject, todayYear, todayMonth, todayDate }}
    >
      {children}
    </TodayContext.Provider>
  );
}

TodayProvider.propTypes = {
  children: PropTypes.node,
};
