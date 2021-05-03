import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip} from 'recharts';
import Title from './Title';
import Grid from "@material-ui/core/Grid";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

// Generate Sales Data
function createData(time, započeto, završeno) {
    return { time, započeto , završeno};
}

export default function TimelineChart(props) {
    const theme = useTheme();
    const {games} = props;
    const [selectedYear, handleChangeYear] = React.useState(new Date());
    function filterStartedGamesByMonth(month){
        return games.filter(item => item.startTime.toDate().getMonth() === month && item.startTime.toDate().getFullYear() === selectedYear.getFullYear()).length;
    }
    function filterFinishedGamesByMonth(month){
        return games.filter(item => item.startTime.toDate().getMonth() === month
            && item.tasks.filter(task => task.isCompleted).length === item.tasks.length
        && item.startTime.toDate().getFullYear() === selectedYear.getFullYear()).length
    }
    const data = [
        createData('Jan', filterStartedGamesByMonth(0), filterFinishedGamesByMonth(0)),
        createData('Feb', filterStartedGamesByMonth(1) , filterFinishedGamesByMonth(1)),
        createData('Mar', filterStartedGamesByMonth(2), filterFinishedGamesByMonth(2)),
        createData('Apr', filterStartedGamesByMonth(3), filterFinishedGamesByMonth(3)),
        createData('May', filterStartedGamesByMonth(4), filterFinishedGamesByMonth(4)),
        createData('Jun', filterStartedGamesByMonth(5), filterFinishedGamesByMonth(5)),
        createData('Jul', filterStartedGamesByMonth(6), filterFinishedGamesByMonth(6)),
        createData('Aug', filterStartedGamesByMonth(7), filterFinishedGamesByMonth(7)),
        createData('Sep', filterStartedGamesByMonth(8), filterFinishedGamesByMonth(8)),
        createData('Oct', filterStartedGamesByMonth(9), filterFinishedGamesByMonth(9)),
        createData('Nov', filterStartedGamesByMonth(10), filterFinishedGamesByMonth(10)),
        createData('Dec', filterStartedGamesByMonth(11), filterFinishedGamesByMonth(11))
    ]

    return (
        <React.Fragment>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Title>Broj odigranih igara po mjesecima godine {selectedYear.getFullYear()}</Title>
                        <DatePicker
                           views={["year"]}
                           value={selectedYear}
                           minDate = {new Date("2018-01-01")}
                           maxDate = {new Date()}
                           label="Izaberi godinu"
                           onChange={handleChangeYear}
                         />
                    </Grid>
                </MuiPickersUtilsProvider>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            Broj odigranih igara
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="završeno" stroke={theme.palette.secondary.main} dot={false} />
                    <Line type="monotone" dataKey="započeto" stroke={theme.palette.primary.main} dot={false} />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
