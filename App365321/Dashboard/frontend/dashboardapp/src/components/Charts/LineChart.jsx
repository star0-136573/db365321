import {Chart} from "react-google-charts";

export const data = [
  ["Year", "Sales", "Expenses"],
  ["2019", 1000, 400],
  ["2020", 1170, 460],
  ["2021", 660, 1120],
  ["2022", 1030, 540],
];

export const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
};

const Line = () =>{
  return (
    
    <Chart 
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
export default Line