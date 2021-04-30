import React, { Component} from 'react';
import {CanvasJSChart, CanvasJS} from 'canvasjs-react-charts'
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Paper,
  Box,
  Tab,
  Tabs,
  AppBar
} from "@material-ui/core";


function ChartComponent(props){
    const dataPoints = [];
    let timesSolvedTotal = 0;
    props.statistics && props.statistics.map((value, key) => {
            timesSolvedTotal +=value.timesSolved;
        });
    props.statistics && props.statistics.map((value, key) =>{
            dataPoints.push({
                y: timesSolvedTotal != 0 ? Math.round(value.timesSolved *100 / timesSolvedTotal) : 0,
                label: value.title
            });
    });
    const options = {
			animationEnabled: true,
			exportEnabled: true, // "light1", "dark1", "dark2"
			title:{
				text: "Statistika po broju posjećenih lokacija"
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