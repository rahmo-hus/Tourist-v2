import React,{Component}  from "react";
import {CanvasJSChart, CanvasJS} from 'canvasjs-react-charts'

class BarCharts extends Component {
	render() {

		const dataPoints = [];
		let timesSolvedTotal = 0;
		const {statistics} = this.props;
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
			theme: "light2",
			title:{
				text: "Most Popular Social Networking Sites"
			},
			axisX: {
				title: "Social Network",
				reversed: true,
				gridThickness: 0,
				tickLength: 0,
				lineThickness: 0,
				labelFormatter: function(){
					return " ";
				}
			},
			axisY: {
				title: "Monthly Active Users",
				includeZero: true,
				labelFormatter: this.addSymbols
			},
			data: [{
				type: "column",
				dataPoints: dataPoints
			}]
		}
		return (
			<div>
				<CanvasJSChart options = {options}
					/* onRef={ref => this.chart = ref} */
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
	addSymbols(e){
		const suffixes = ["", "K", "M", "B"];
		let order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		const suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
}

export default BarCharts;
