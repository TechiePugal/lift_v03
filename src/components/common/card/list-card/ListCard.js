import React from "react";

const ListItem = ({ title, value, onClick }) => {
  return (
    <div>
      <div className="lg:flex px-4">
        <div className="lg:flex gap-5">
          <div>
            <dl>
              <div class="px-4 py-2 grid grid-cols-2 items-center">
                <dt class="text-bodyLB text-darkgrey">{title}</dt>
                <dd
                  class={` 
                  ${onClick ? "text-primary cursor-pointer underline text-bodySRU" : "text-darkgrey text-bodySBB"}
                  `}
                  onClick={onClick && onClick}
                >
                  {value}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListCard = ({ children }) => {
  return (
    <div className="rounded-15 shadow-card bg-white p-5 mb-3">
      <div className="">
        {React.Children.map(children, (child, index) => {
          // Ensure child is a ListItem component
          if (React.isValidElement(child) && child.type === ListItem) {
            return React.cloneElement(child, { key: index });
          } else {
            console.error("Invalid child type. Use ListItem components.");
            return null;
          }
        })}
      </div>
    </div>
  );
};

export { ListCard, ListItem };
