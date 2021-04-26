
import React, { Component} from 'react';
import {CanvasJSChart, CanvasJS} from 'canvasjs-react-charts'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose } from 'redux'
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Paper,
  Box
} from "@material-ui/core";
import Leaderboard from './Leaderboard';
import { spacing } from '@material-ui/system';
import {
  withStyles,
  MuiThemeProvider
} from "@material-ui/core/styles";


class Statistics extends Component {



    constructor(props) {
        super(props);
    }
	render() {
        console.log(this.props)
        var timesSolvedTotal = 0;
        this.props.statistics && this.props.statistics.map((value, key) => {
            timesSolvedTotal +=value.timesSolved;
        });
        const dataPoints = [];
        this.props.statistics && this.props.statistics.map((value, key) =>{
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
       
		
		return (
		<div>
        <Card>
            <CardContent>
			    <CanvasJSChart options = {options} />
            </CardContent>
        </Card>
        <Box paddingTop={2} color="primary">
            <Paper>
                  <Leaderboard />
             </Paper>
        </Box>
		</div>
		);
	}
}
 

const mapStateToProps = (state, ownProps) =>{
    return{
        statistics: state.firestore.ordered.statistics
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'statistics'
        }
    ])
)(Statistics)