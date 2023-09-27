import { Chart } from "react-google-charts";
const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];
  
  const rows = [ 
  [   "Phase1",   "Phase1 ",   null,   new Date(2022, 2, 22),   new Date(2022, 5, 20),   null,   100,   null, ], 
  [   "Phase2",   "Phase2 ",   'Phase1',   new Date(2022,5,22),   new Date(2022, 8, 20),   null,   100,   null, ], 
  [   "Phase3",   "Phase3 ",   'Phase2',   new Date(2022,6,21),   new Date(2022, 11, 20),   null,   100,  'Phase1', ], 
  [   "Phase4",   "Phase4 ",   'Phase3',   new Date(2022,7,21),   new Date(2023, 2, 21),   null,   100,   'Phase1', ], 
  [   "Phase5",   "Phase5 ",   null,   new Date(2022,10,22),   new Date(2023, 6, 20),   null,   60,  'Phase2', ], 
  [   "Phase6",   "Phase6 ",   'Phase5',   new Date(2022, 11, 22),   new Date(2023, 8, 20),   null,   70,   'Phase3', ], 
  [   "Phase7",   "Phase7 ",   'Phase5',   new Date(2023, 8, 21),   new Date(2023, 11, 20),   null,   0,   'Phase3', ], 
  [   "Phase8",   "Phase8 ",   'Phase2',   new Date(2023, 11, 21),   new Date(2024, 1, 21),   null,   0,   null, ], 
  [   "Phase9",   "Phase9 ",   'Phase6',   new Date(2023, 12, 4),   new Date(2024, 2, 9),   null,   0,   'Phase7', ], 
  [   "Phase10",  "Phase10 ",  'Phase9',   new Date(2024, 2, 31),   new Date(2024, 9, 20),   null,   0,   'Phase7', ], 
  [   "Phase11",  "Phase11 ",  'Phase7',   new Date(2024, 9, 28),   new Date(2024, 10, 20),   null,   0,   'Phase8', ], 
  [   "Phase12",  "Phase12 ",  'Phase8',   new Date(2024, 9, 8),   new Date(2024, 12, 21),   null,   0,   'Phase4', ],
  ];


  export const data = [columns, ...rows];


  export const options = {
    height: 600,
    gantt: {
    
      innerGridHorizLine: {
        stroke: '#d0e5ed',
        strokeWidth: 1
      },
      innerGridDarkTrack: {fill: '#d0e5ed'},
      innerGridTrack: { fill: "#d0e5ed" },
      barHeight:18,
      shadowEnabled:true,
      arrow: {
        angle: 56,
        width: 3,
        color: "#ff549e",
        radius: 36,
      },
      
     
      trackHeight: 35,
    },
  };
const Gantt = ()=> {

  

  return (
   
   
   
    <Chart
      chartType="Gantt"
      width="100%"
      height="80%"
      options={options}
      data={data}
     
    />
  );
}

export default Gantt