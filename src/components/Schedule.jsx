const Schedule = ({ dateTime, title, updateSchedule, deleteSchedule }) => {
  const serialisedDate = (date) => {
    return new Date(date).toLocaleString()
  };
  
  return (
    <div className="bg-green-500 p-4 rounded-md text-white max-w-[300px] w-full">
      <div>
        <p className="text-2xl font-bold">{title}</p>
        <p>{serialisedDate(dateTime)}</p>
      </div>
      <div className="mt-5">
        <button onClick={updateSchedule} className="bg-blue-700 p-3 rounded-md mr-3">Update</button>
        <button onClick={deleteSchedule} className="bg-red-500 p-3 rounded-md">Delete</button>
      </div>
    </div>
  )
};

export default Schedule;