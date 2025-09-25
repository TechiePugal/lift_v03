import React from 'react'
import CategoryModalRowItems from './CategoryModalRowItems';

const columns = [
    "Sl No",
    "Category Code",
    "Category Name",
    ""
    
  ];

  const categoryTableData = [
    {
      slNo: 1,
      categoryCode: "123",
      categoryName: "medicine",
    },
    {
      slNo: 2,
      categoryCode: "456",
      categoryName: "electronics",
    },
    {
      slNo: 3,
      categoryCode: "789",
      categoryName: "clothing",
    },
    {
      slNo: 4,
      categoryCode: "101",
      categoryName: "books",
    },
    {
      slNo: 5,
      categoryCode: "202",
      categoryName: "toys",
    },
  ];
  
const CategoryModalTable = ({}) => {
  return (
    <div>
    {/* Hide on mobile view */}
    <div className="hidden md:block">
      <table className="w-full border-separate border-spacing-y-1">
        <thead className="border-b">
          <tr className="text-bodyBB text-darkgrey ">
            {columns.map((heading, index) => (
              <th
                key={index}
                className={`sticky -left-10 bg-secondary  border-b-2 h-14 text-darkgrey text-bodySBB  capitalize 
          ${index === 0 ? "rounded-tl-15" : ""}
          ${index === columns.length - 1 ? "rounded-tr-15 w-[200px]" : ""}
          `}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categoryTableData.map((category, index) => {
            return (
              <tr
                key={index}
                className="text-center  rounded-15 shadow-card  mb-2 
          hover:bg-bluishgrey "
              >
                {/* Rows */}
                <CategoryModalRowItems category={category} index={index} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {/* Show only on mobile view */}
    {/* <div className="block md:hidden">
      <Cards treatmentsData={treatmentsData} columns={columns} />
    </div> */}
  </div>
);
};


export default CategoryModalTable