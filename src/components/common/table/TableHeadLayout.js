const TableHeadLayout = ({ children, columns, className }) => {
  return (
    <table className=" w-full border-separate border-spacing-y-1 min-w-max">
      <thead className="sticky top-0 z-20">
        <tr className={`shadow-card rounded-tl-15 rounded-tr-15 bg-secondary`}>
          {columns.map((heading, index) => (
            <th
              key={index}
              className={`sticky -left-10 bg-secondary  border-b-2 h-14 text-darkgrey text-bodySBB  capitalize min-w-max
            ${index === 0 ? "rounded-tl-15" : ""}
            ${index === columns.length - 1 ? "rounded-tr-15" : ""}
            `}
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={className}>{children}</tbody>
    </table>
  );
};

export default TableHeadLayout;
