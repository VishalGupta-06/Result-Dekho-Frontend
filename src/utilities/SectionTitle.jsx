import React from "react";

function SectionTitle({ children }) {
  return (
    <h2 className="text-lg font-bold text-slate-900 mb-4">
      {children}
    </h2>
  );
}

export default SectionTitle;
