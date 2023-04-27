import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LineGraph = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [mounted, setMounted] = useState(false);
  const [uniqueDecade,setDecade] = useState([])
  debugger


  useEffect(() => {
    setChartData(generateChartData(data, "business"));
    setMounted(true);
    setDecade(Decade(data))
  }, [data]);
  const Decade = (data)=>{
    return [...new Set(data.map((item) => item.Year)),]
  }
  const generateChartData = (data, option) => {
    let chartData = [];
    debugger;
    if (option === "location") {
      // TO DO : need to transform the data to reflect average  risk value of similar  location for each dacade 
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
      // TO DO : need to transform the data to reflect average  risk value of similar asset for each dacade 
      const uniqueAssets = [...new Set(data.map((item) => item.Asset_Name))];

      uniqueAssets.forEach((asset) => {
        const assetData = data.filter((item) => item.Asset_Name === asset);
        chartData.push({
          name: asset,
          data: assetData.map((item) => parseFloat(item.Risk_Rating)),
        });
      });
    } else if (option === "business") {
      // data has tansformed to reflect average  risk value of similar business category has considerde for each dacade 
      const uniqueBusinesses = [
        ...new Set(data.map((item) => item.Business_Category)),
      ];

      uniqueBusinesses.forEach((business) => {
        let groupbyDecade = {};
        let transformedData = []
        const businessData = data.filter(
          (item) => item.Business_Category === business
        );
        uniqueDecade.forEach((year) => {
          groupbyDecade[year] = [];
          const acumbusinessData = businessData.filter(
            (item) => {
              if(item.Year === year){
                groupbyDecade[year].push(item)
              }
            }
          );
        })  
        for (let key in groupbyDecade){
          let label = key;
          const accumulatedRiskRating = groupbyDecade[key].reduce(
          (accumulator, currentValue) => accumulator + parseFloat(currentValue.Risk_Rating),0);
            let tempObj = {}
            tempObj[key] = accumulatedRiskRating/groupbyDecade[key].length
            console.log(tempObj)
            transformedData.push(accumulatedRiskRating/groupbyDecade[key].length);
        }        
        chartData.push({
          name: business,
          data: transformedData,
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
    { value: "business", label: "Business" },
    { value: "location", label: "Location" },
    { value: "asset", label: "Asset" },
  ];

  const chartOptions = {
    title: {
      text: "Risk Rating Over Time",
    },
    xAxis: {
      title: {
        text: "Year",
      },
      categories: uniqueDecade,
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
