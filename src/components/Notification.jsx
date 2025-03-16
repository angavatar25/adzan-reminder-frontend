const Notification = (props) => {
  const { notification, key } = props;
  return (
    <div className=" bg-blue-500 text-white p-4 w-fit border border-b-2 border-white shadow-md">
      {notification}
    </div>
  )
};

export default Notification;