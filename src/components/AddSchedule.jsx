const AddSchedule = (props) => {
  const { handleDateTime, dateTime, handleTitle, title, show, handlePopup } = props;
  return (
    <>    
      {show ? (
        <div className="bg-black bg-opacity-80 w-full fixed min-h-screen flex justify-center items-center flex-col">
          <div className="bg-white rounded-md p-4">
            <div>
              <p className="text-2xl font-bold mb-3">Title</p>
              <input
                onChange={handleTitle}
                value={title}
                type="text"
                className="px-3 py-1 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold mb-3">Date & Time</p>
              <input
                onChange={handleDateTime}
                value={dateTime}
                type="datetime-local"
                name=""
                id=""
                className="px-3 py-1 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={handlePopup}
                className="bg-red-500 text-white p-2 rounded-md text-sm font-bold"
              >
                Close
              </button>
              <button
                onClick={() => handlePopup("create")}
                className="bg-blue-500 text-white p-2 text-sm font-bold rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
};

export default AddSchedule;