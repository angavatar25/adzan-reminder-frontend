import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import Home from "./views/Home";
import useSchedules from "./hooks/useSchedules";

const socket = io("http://localhost:3000", { transports: ["websocket", "polling"] });

const App = () => {
    const {
			schedules,
			notifications,
			handleStartingSchedule,
			handleNewSchedule,
			handleUpcomingSchedule,
			handleSocketDeleteSchedule,
			handleSocketUpdatedSchedule,
			getScheduleData,
			addSchedule,
			updateSchedule,
			deleteSchedule,
			handleDateTime,
			handleTitle,
		} = useSchedules();

    useEffect(() => {
				getScheduleData();
				handleNewSchedule();

				handleSocketDeleteSchedule();
				handleSocketUpdatedSchedule();

				socket.off("upcomingSchedule").on("upcomingSchedule", handleUpcomingSchedule);
        socket.off("scheduleStarted").on("scheduleStarted", handleStartingSchedule);
				

        return () => {
					socket.off("upcomingSchedule");
					socket.off("scheduleStarted");
					socket.off("newSchedule");
					socket.off("scheduleUpdated");
					socket.off("scheduleDeleted");
        };
    }, []);

    return (
        <div>
					<Home
						notifications={notifications}
						schedules={schedules}
						addSchedule={addSchedule}
						updateSchedule={updateSchedule}
						deleteSchedule={deleteSchedule}
						handleChangeTime={handleDateTime}
						handleChangeTitle={handleTitle}
					/>
        </div>
    );
};

export default App;