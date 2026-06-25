import React from "react";

function getWinner(metric, labels) {
  if (metric.first === metric.second) return "Tie";

  const firstWins = metric.higherBetter
    ? metric.first > metric.second
    : metric.first < metric.second;

  return firstWins ? labels.first : labels.second;
}

function ComparisonSummary({ labels, metrics }) {
  const scoreMetric = metrics.find((metric) => metric.key === "score");
  const attendanceMetric = metrics.find((metric) => metric.key === "attendance");
  const backlogMetric = metrics.find((metric) => metric.key === "backlogs");
  const leader = scoreMetric ? getWinner(scoreMetric, labels) : "Tie";
  const scoreGap = scoreMetric
    ? Math.abs(scoreMetric.first - scoreMetric.second).toFixed(2)
    : "0.00";

  const cards = [
    {
      label: "Current leader",
      value: leader,
      helper: scoreMetric ? `${scoreGap} CGPA gap` : "No score data",
      className: "border-blue-100 bg-blue-50 text-blue-700",
    },
    {
      label: "Attendance edge",
      value: attendanceMetric ? getWinner(attendanceMetric, labels) : "Tie",
      helper: attendanceMetric
        ? `${Math.abs(attendanceMetric.first - attendanceMetric.second)}% difference`
        : "No attendance data",
      className: "border-emerald-100 bg-emerald-50 text-emerald-700",
    },
    {
      label: "Backlog status",
      value:
        backlogMetric && backlogMetric.first === 0 && backlogMetric.second === 0
          ? "Both clear"
          : backlogMetric
            ? getWinner(backlogMetric, labels)
            : "Tie",
      helper: "Lower is better",
      className: "border-amber-100 bg-amber-50 text-amber-700",
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-lg border p-4 shadow-sm ${card.className}`}
        >
          <p className="text-sm font-semibold opacity-80">{card.label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {card.value}
          </p>
          <p className="mt-1 text-sm font-medium opacity-80">{card.helper}</p>
        </div>
      ))}
    </section>
  );
}

export default ComparisonSummary;
