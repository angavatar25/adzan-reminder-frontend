import axios from "axios";
import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { transports: ["websocket", "polling"] });

const useSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [title, setTitle] = useState("");
  const [datetime, setDatetime] = useState("");

  const handleDateTime = (event) => {
    const { value } = event.target;
    const serialised = value.split("T").join(' ');

    setDatetime(serialised);
  };

  const handleTitle = (event) => {
    const { value } = event.target;

    setTitle(value);
  }

  const handleNewSchedule = () => {
    socket.on("newSchedule", (schedule) => {
      setSchedules(prev => {
        const exists = prev.some(s => s._id === schedule._id);
        return exists ? prev : [...prev, schedule];
      });
    });
  };

  const handleSocketUpdatedSchedule = () => {
    socket.on("scheduleUpdated", (updateSchedule) => {
      setSchedules(prev => prev.map(sc => sc._id === updateSchedule._id ? updateSchedule : sc));
    })
  };

  const handleSocketDeleteSchedule = () => {
    socket.on("scheduleDeleted", (deletedId) => {
      setSchedules(prev => prev.filter(sc => sc._id !== deletedId));
    });
  }

  const handleUpcomingSchedule = (schedule) => {
    setNotifications(prev => {
      if (!prev.includes(`Reminder: ${schedule.title} starts in 3 minutes!`)) {
        return [...prev, `Reminder: ${schedule.title} starts in 3 minutes!`];
      }
      return prev;
    });
  }

  const handleStartingSchedule = (schedule) => {
    setNotifications(prev => [...prev, `Now: ${schedule.title} is starting!`]);
  };

  // CRUD Section

  const getScheduleData = () => {
    axios.get("http://localhost:3000/schedules")
      .then(res => setSchedules(res.data))
      .catch(err => console.log(err));
  };

  const addSchedule = () => {
    if (title && datetime) {
      socket.emit("addSchedule", { title, datetime });
    }
  };

  const updateSchedule = (id) => {
    const title = prompt("Enter new title:");
    const datetime = prompt("Enter new time (YYYY-MM-DD HH:MM):");

    const payload = {
      title,
      datetime,
    };

    if (title && datetime) {
      axios.put(`http://localhost:3000/schedules/${id}`, payload)
        .catch(err => console.log(err));
    }
  }

  const deleteSchedule = (id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      axios.delete(`http://localhost:3000/schedules/${id}`)
        .catch(err => console.log(err));
    }
  };

  return {
    schedules,
    notifications,
    handleNewSchedule,
    handleUpcomingSchedule,
    getScheduleData,
    addSchedule,
    handleStartingSchedule,
    updateSchedule,
    deleteSchedule,
    handleSocketUpdatedSchedule,
    handleSocketDeleteSchedule,
    handleDateTime,
    handleTitle,
  };
};

export default useSchedules;