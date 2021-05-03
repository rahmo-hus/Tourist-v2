import React, { Component} from 'react';
import {CanvasJSChart, CanvasJS} from 'canvasjs-react-charts'


function ChartComponent(props){
    const dataPoints = [];
    let timesSolvedTotal = 0;
    const {statistics} = props;
    statistics.map((value, key) => {
            timesSolvedTotal +=value.timesSolved;
        });
    statistics.map((value, key) =>{
            dataPoints.push({
                y: timesSolvedTotal != 0 ? Math.round(value.timesSolved *100 / timesSolvedTotal) : 0,
                label: value.title
            });
    });
    const options = {
			animationEnabled: true,
			exportEnabled: true, // "light1", "dark1", "dark2"
			title:{
				text: "Broj  posjećenih lokacija"
			},
			data: [{
				type: "pie",
				indexLabel: "{label}: {y}%",
				startAngle: -90,
				dataPoints: dataPoints
			}]
		}

    return <CanvasJSChart options = {options} />
}

export default ChartComponent;
