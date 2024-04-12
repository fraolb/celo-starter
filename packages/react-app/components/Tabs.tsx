import React, { useState } from "react";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="border-b border-gray-200">
      <nav className="flex" role="tablist">
        {React.Children.map(children, (child, index) => {
          const isActive = activeTab === index;
          return (
            <button
              onClick={() => setActiveTab(index)}
              className={`${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-500 hover:text-blue-500"
              } py-4 px-6 focus:outline-none`}
              role="tab"
              aria-selected={isActive}
            >
              {child.props.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-4">
        {React.Children.map(children, (child, index) => {
          if (index === activeTab) {
            return (
              <div role="tabpanel" aria-hidden={false}>
                {child.props.children}
              </div>
            );
          } else {
            return (
              <div className="hidden" role="tabpanel" aria-hidden={true}>
                {child.props.children}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Tabs;
