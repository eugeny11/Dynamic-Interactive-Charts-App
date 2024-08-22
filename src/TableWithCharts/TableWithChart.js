import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./TableWithChart.css";

const TableWithChart = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const data = [
    {
      indicator: "Выручка, руб",
      currentDay: "500 521",
      yesterday: "480 521",
      percentage: "4%",
      weekly: "4 805 121",
      graph: true,
    },
    {
      indicator: "Наличные",
      currentDay: "300 000",
      yesterday: "300 000",
      percentage: "0%",
      weekly: "300 000",
    },
    {
      indicator: "Безналичный расчет",
      currentDay: "100 000",
      yesterday: "100 000",
      percentage: "0%",
      weekly: "100 000",
    },
    {
      indicator: "Кредитные карты",
      currentDay: "100 521",
      yesterday: "100 521",
      percentage: "0%",
      weekly: "100 521",
    },
    {
      indicator: "Средний чек, руб",
      currentDay: "1 300",
      yesterday: "900",
      percentage: "44%",
      weekly: "900",
    },
    {
      indicator: "Средний гость, руб",
      currentDay: "1 200",
      yesterday: "800",
      percentage: "50%",
      weekly: "800",
    },
    {
      indicator: "Удаления из чека (после оплаты), руб",
      currentDay: "1 000",
      yesterday: "1 100",
      percentage: "-9%",
      weekly: "900",
    },
    {
      indicator: "Удаления из чека (до оплаты), руб",
      currentDay: "1 300",
      yesterday: "1 300",
      percentage: "0%",
      weekly: "900",
    },
    {
      indicator: "Количество чеков",
      currentDay: "34",
      yesterday: "36",
      percentage: "-6%",
      weekly: "34",
    },
    {
      indicator: "Количество гостей",
      currentDay: "34",
      yesterday: "36",
      percentage: "-6%",
      weekly: "32",
    },
  ];

  const handleClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const getCellClass = (row, column) => {
    if (column === "indicator-cell") {
      return "cell-gray";
    }
    if (column === "currentDay") {
      return "cell-green";
    }

    if (column === "percentage") {
      if (row.percentage.includes("-")) {
        return "cell-red";
      } else if (row.percentage === "0%") {
        return "cell-gray";
      } else {
        return "cell-green";
      }
    }

    if (column === "yesterday" && row.percentage.includes("-")) {
      return "cell-red";
    }

    if (column === "yesterday" && row.percentage === "0%") {
      return "cell-gray";
    }

    if (
      column === "yesterday" &&
      !row.percentage.includes("-") &&
      row.percentage !== "0%"
    ) {
      return "cell-green";
    }

    if (column === "weekly") {
      const weeklyValue = parseInt(row.weekly.replace(/\s/g, ""), 10);

      if (weeklyValue > 4000000) {
        return "cell-red";
      }

      if (weeklyValue < 1000 && weeklyValue !== 34) {
        return "cell-green";
      }

      if (
        weeklyValue === 34 ||
        (weeklyValue >= 100000 && weeklyValue <= 300000)
      ) {
        return "cell-gray";
      }
    }

    return "";
  };

  return (
    <div className="flex-table">
      <div className="flex-row flex-header">
        <div className="flex-cell indicator-cell">Показатель</div>
        <div className="flex-cell currentday">Текущий день</div>
        <div className="flex-cell yesterday">Вчера</div>
        <div className="flex-cell percentage-cell">Изменение в процентах</div>
        <div className="flex-cell">Этот день недели</div>
      </div>
      {data.map((row, index) => (
        <React.Fragment key={index}>
          <div
            className={`flex-row ${activeIndex === index ? "active" : ""}`}
            onClick={() => handleClick(index)}
          >
            <div
              className={`flex-cell indicator-cell ${getCellClass(
                row,
                "indicator-cell"
              )}`}
            >
              {row.indicator}
            </div>
            <div className={`flex-cell ${getCellClass(row, "currentDay")}`}>
              {row.currentDay}
            </div>
            <div
              className={`flex-cell half-width yesterday ${getCellClass(
                row,
                "yesterday"
              )}`}
            >
              {row.yesterday || "N/A"}
            </div>
            <div
              className={`flex-cell half-width percentage-cell ${getCellClass(
                row,
                "percentage"
              )}`}
              style={{
                color: row.percentage.includes("-") ? "red" : "green",
              }}
            >
              {row.percentage}
            </div>
            <div className={`flex-cell ${getCellClass(row, "weekly")}`}>
              {row.weekly}
            </div>
          </div>
          {activeIndex === index && (
            <div className="chart-container">
              <Line
                data={{
                  labels: ["Текущий день", "Вчера", "Этот день недели"],
                  datasets: [
                    {
                      label: row.indicator,
                      data: [
                        parseInt(row.currentDay.replace(/\s/g, ""), 10),
                        parseInt(
                          row.yesterday
                            ? row.yesterday.replace(/\s/g, "")
                            : "0",
                          10
                        ),
                        parseInt(row.weekly.replace(/\s/g, ""), 10),
                      ],
                      backgroundColor: "rgba(75, 192, 192, 0.2)",
                      borderColor: "rgb(75, 192, 192)",
                      fill: true,
                    },
                  ],
                }}
                options={chartOptions}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TableWithChart;
