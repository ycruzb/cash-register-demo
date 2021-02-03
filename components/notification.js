const Notification = ({ text, bgColor, show }) => {
  return (
    <div
      className={
        show
          ? `fixed bottom-10 right-4 transition-all duration-500 ease-out ${bgColor} text-white py-4 px-6 rounded-sm`
          : `fixed bottom-10 -right-full transition-all duration-500 ease-out ${bgColor} text-white py-4 px-6 rounded-sm`
      }
    >
      {text}
    </div>
  );
};

export default Notification;
