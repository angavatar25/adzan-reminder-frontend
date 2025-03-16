import { useState } from "react";
import AddSchedule from "../components/AddSchedule";
import Notification from "../components/Notification";
import Schedule from "../components/Schedule";

const Home = (props) => {
  const {
    schedules,
    notifications,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    handleChangeTime,
    handleChangeTitle,
  } = props;

  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = (event) => {
    if (event === 'create') {
      addSchedule();
    }

    setShowPopup(!showPopup);
  };

  return (
    <>
      <AddSchedule
        show={showPopup}
        handlePopup={handleShowPopup}
        handleDateTime={handleChangeTime}
        handleTitle={handleChangeTitle}
      />
      <div className="min-h-screen grid grid-cols-2 gap-4">
        <div>
          <div className="mb-5">
            <h2 className="text-2xl">Upcoming Schedules</h2>
            <button
              onClick={handleShowPopup}
              className="bg-blue-500 text-white p-3 font-bold rounded-md"
            >
              Add Schedule
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {schedules.length > 0 ? schedules.map((schedule, index) => (
              <Schedule
                key={index}
                dateTime={schedule.datetime}
                title={schedule.title}
                updateSchedule={() => updateSchedule(schedule._id)}
                deleteSchedule={() => deleteSchedule(schedule._id)}
              />
            )) : <p>No schedule available</p>}
          </div>
        </div>
        <div>
          <h2 className="text-2xl">Notifications</h2>
          <div className="grid gap-3">
            {notifications.length > 0 ? notifications.map((notif, index) => (
              <Notification
                key={index}
                notification={notif}
              />
            )) : <p>No notifications available</p>}
          </div>
        </div>
      </div>
    </>
  )
};

export default Home;