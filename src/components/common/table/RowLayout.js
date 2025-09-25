const RowLayout = ({ children, onClick }) => {
  return (
    <tr
    onClick={onClick}
      className="text-center cursor-pointer !rounded-15 shadow-card min-h-[50px] mb-2 
    hover:bg-bluishgrey"
    >
      {children}
    </tr>
  );
};

export default RowLayout;
