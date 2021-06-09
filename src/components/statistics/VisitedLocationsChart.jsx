import React from 'react';
import {CanvasJSChart} from 'canvasjs-react-charts'


function ChartComponent(props) {
    const dataPoints = [];
    let timesSolvedTotal = 0;
    const {statistics} = props;
    statistics.map((value, key) => {
        timesSolvedTotal += value.timesSolved;
    });
    statistics.map((value, key) => {
        dataPoints.push({
            y: timesSolvedTotal != 0 ? Math.round(value.timesSolved * 100 / timesSolvedTotal) : 0,
            label: value.title
        });
    });
    const options = {
        animationEnabled: true,
        exportEnabled: false, // "light1", "dark1", "dark2"
        title: {
            text: "Postotak posjećenosti određenih lokacija"
        },
        data: [{
            type: "pie",
            showInLegend: false,
            toolTipContent: "{label}: <strong>{y}%</strong>",
            indexLabel: " ",
            indexLabelPlacement: "inside",
            startAngle: -90,
            dataPoints: dataPoints
        }]
    }

    return <CanvasJSChart options={options}/>
}

export default ChartComponent;
