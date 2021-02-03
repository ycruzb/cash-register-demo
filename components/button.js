const Button = ({ type, text, disabled, onClick, widthClass }) => {
  return (
    <button
      className={`block ${widthClass} bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition duration-200 ease-linear mb-4`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
