import { Chart } from "react-google-charts";

export const data = [
  ["Product", "amount"],
  ["electric", 45],
  ["food", 33],
  ["books", 27],
  ["kitchen", 46],
  ["toys", 77], // CSS-style declaration
];
export const data2 = [
  ["Product", "amount"],
  ["electric", 11],
  ["food", 2],
  ["books", 2],
  ["kitchen", 2],
  ["toys", 7], // CSS-style declaration
];

export const options = {
  title: "product sales",
  pieHole: 0.4,
  is3D: false,
};
export const options2 = {
  title: "product returns",
  pieHole: 0.4,
  is3D: false,
};

const Donut =()=> {
  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="180px"
      data={data}
      options={options}
    />
  );
}
const Donut2 =()=> {
  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="180px"
      data={data2}
      options={options2}
    />
  );
}
export default Donut
export {Donut,Donut2}