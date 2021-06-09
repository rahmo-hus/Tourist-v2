import React from 'react';
import {useTheme} from '@material-ui/core/styles';
import {Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import Title from './Title';
import Grid from "@material-ui/core/Grid";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

// Generate Sales Data
function createData(time, započeto, završeno) {
    return {time, započeto, završeno};
}

export default function TimelineChart(props) {
    const theme = useTheme();
    const {games} = props;
    const [selectedYear, handleChangeYear] = React.useState(new Date());

    function filterStartedGamesByMonth(month) {
        return games.filter(item => item.startTime.toDate().getMonth() === month && item.startTime.toDate().getFullYear() === selectedYear.getFullYear()).length;
    }

    function filterFinishedGamesByMonth(month) {
        return games.filter(item => item.startTime.toDate().getMonth() === month
            && item.tasks.filter(task => task.isCompleted).length === item.tasks.length
            && item.startTime.toDate().getFullYear() === selectedYear.getFullYear()).length
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const data = [];
    for (let i = 0; i < 12; i++) {
        data.push(createData(months[i], filterStartedGamesByMonth(i), filterFinishedGamesByMonth(i)));
    }

    return (
        <React.Fragment>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Title>Broj započetih/završenih igara po mjesecima godine {selectedYear.getFullYear()}</Title>
                    <DatePicker
                        views={["year"]}
                        value={selectedYear}
                        minDate={new Date("2018-01-01")}
                        maxDate={new Date()}
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
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary}/>
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{textAnchor: 'middle', fill: theme.palette.text.primary}}
                        >
                            Broj odigranih igara
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="završeno" stroke={theme.palette.secondary.main} dot={false}/>
                    <Line type="monotone" dataKey="započeto" stroke={theme.palette.primary.main} dot={false}/>
                    <Tooltip/>
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
