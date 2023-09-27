import { Chart } from "react-google-charts";

export const data = [
  ["ID", "sales", "frequency", "profit"],
  ["clothes", 144, 147, 150],
  ["electric", 79, 130, 130],
  ["funiture", 78, 190, 50],
  ["kitchen", 72, 278, 120],
  ["food", 87, 150, 110],
  ["books", 65, 160, 100],
  ["toys", 68, 470, 80],
];

export const options = {
  
  hAxis: { title: "consumption frequency" },
  vAxis: { title: "sales" },
  colorAxis: { colors: ["blue", "red"] },
  bubble:{
    opacity:0.4,
    stroke:'black',
    textStyle: { fontSize: 10, auraColor: "none",color:'black' }
  },
  chartArea:{left:45,right:30,top:50,width:'90%',height:'75%'}
};


const Bubble = ()=>{



  return (

    <Chart
    chartType="BubbleChart"
    width="100%"
    height="400px"
    data={data}
    options={options}
  />


  )

}

export default Bubble