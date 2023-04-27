import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LineGraph = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setChartData(generateChartData(data, "location"));
    setMounted(true);
  }, [data]);

  const generateChartData = (data, option) => {
    let chartData = [];

    if (option === "location") {
      const uniqueLocations = [
        ...new Set(data.map((item) => item.Lat + item.Long)),
      ];

      uniqueLocations.forEach((location) => {
        const locationData = data.filter(
          (item) => item.Lat + item.Long === location
        );
        chartData.push({
          name: location,
          data: locationData.map((item) => parseFloat(item.Risk_Rating)),
        });
      });
    } else if (option === "asset") {
      const uniqueAssets = [...new Set(data.map((item) => item.Asset_Name))];

      uniqueAssets.forEach((asset) => {
        const assetData = data.filter((item) => item.Asset_Name === asset);
        chartData.push({
          name: asset,
          data: assetData.map((item) => parseFloat(item.Risk_Rating)),
        });
      });
    } else if (option === "business") {
      const uniqueBusinesses = [
        ...new Set(data.map((item) => item.Business_Category)),
      ];

      uniqueBusinesses.forEach((business) => {
        const businessData = data.filter(
          (item) => item.Business_Category === business
        );
        chartData.push({
          name: business,
          data: businessData.map((item) => parseFloat(item.Risk_Rating)),
        });
      });
    }

    return chartData;
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setChartData(generateChartData(data, event.target.value));
  };

  const options = [
    { value: "", label: "Select Graph Type" },
    { value: "location", label: "Location" },
    { value: "asset", label: "Asset" },
    { value: "business", label: "Business" },
  ];

  const chartOptions = {
    title: {
      text: "Risk Rating Over Time",
    },
    xAxis: {
      title: {
        text: "Year",
      },
      categories: data.map((item) => item.Year),
    },
    yAxis: {
      title: {
        text: "Risk Rating",
      },
    },
    series: chartData,
  };

  return (
    <>
    {mounted && (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="w-full justify-center items-center">
        <select value={selectedOption} onChange={handleOptionChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full justify-center items-center">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </div>
    )}
    </>
  );
};

export default LineGraph;
