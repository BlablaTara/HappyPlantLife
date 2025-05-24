import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { fetchUserPlants } from "../../components/plants/FetchUserPlants.js";
import { calculateWateringDates } from "../../components/dashboard/WateringDates.js";
import { getOverallHealthScore } from "../../utils/calculateHealthScore.js";
import DashboardScreenUI from "./DashboardScreenUI.js";

const DashboardScreenController = () => {
  const [userPlants, setUserPlants] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [plantsForSelectedDate, setPlantsForSelectedDate] = useState([]);
  const [userName, setUserName] = useState(""); // Du kan senere hente dette fra auth/profil
  const [overallHealthScore, setOverallHealthScore] = useState(1);

  const loadDashboard = useCallback(async () => {
    const { data } = await fetchUserPlants();
    if (data) {
      setUserPlants(data);
      const dates = calculateWateringDates(data);
      setMarkedDates(dates);

      const overall = getOverallHealthScore(data);
      setOverallHealthScore(overall);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  useFocusEffect(
    useCallback(() => {
      loadDashboard();
    }, [loadDashboard])
  );

  const handleDayPress = (day) => {
    const date = day.dateString;
    if (markedDates[date]) {
      setSelectedDate(date);
      setPlantsForSelectedDate(markedDates[date].plants);
    } else {
      setSelectedDate(null);
      setPlantsForSelectedDate([]);
    }
  };

  return (
    <DashboardScreenUI
      userName={userName}
      overallHealthScore={overallHealthScore}
      markedDates={markedDates}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      plantsForSelectedDate={plantsForSelectedDate}
      onDayPress={handleDayPress}
    />
  );
};

export default DashboardScreenController;
