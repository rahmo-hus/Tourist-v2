import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import Grid from "@material-ui/core/Grid";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

export default function TimelineChart(props) {
    const theme = useTheme();
    const {games} = props;
    const [selectedYear, handleChangeYear] = React.useState(new Date());
    const data = [
        createData('Jan', games.filter(item => item.startTime.toDate().getMonth() === 0 && item.startTime.toDate().getFullYear() === selectedYear.getFullYear()).length),
        createData('Feb', games.filter(item => item.startTime.toDate().getMonth() === 1 && item.startTime.toDate().getFullYear() === selectedYear.getFullYear()).length),
        createData('Mar', games.filter(item => item.startTime.toDate().getMonth() === 2 && item.startTime.toDate().getFullYear() === selectedYear.getFullYear()).length),
        createData('Apr', games.filter(item => item.startTime.toDate().getMonth() === 3 && item.startTime.toDate().getFullYear() === selectedYear.getFullYear()).length),
        createData('May', games.filter(item => item.startTime.toDate().getMonth() === 4 && item.startTime.toDate().getFullYear() === selectedYear.getFullYear()).length),
        createData('Jun', games.filter(item => item.startTime.toDate().getMonth() === 5 && item.startTime.toDate().getFullYear() === selectedYear.getFullYear()).length),
        createData('Jul', games.filter(item => item.startTime.toDate().getMonth() === 6 && item.startTime.toDate().getFullYear() === selectedYear.getFullYear()).length),
        createData('Aug', games.filter(item => item.startTime.toDate().getMonth() === 7 && item.startTime.toDate().getFullYear() === selectedYear.getFullYear()).length),
        createData('Sep', games.filter(item => item.startTime.toDate().getMonth() === 8 && item.startTime.toDate().getFullYear() === selectedYear.getFullYear()).length),
        createData('Oct', games.filter(item => item.startTime.toDate().getMonth() === 9 && item.startTime.toDate().getFullYear() === selectedYear.getFullYear()).length),
        createData('Nov', games.filter(item => item.startTime.toDate().getMonth() === 10 && item.startTime.toDate().getFullYear() === selectedYear.getFullYear()).length),
        createData('Dec', games.filter(item => item.startTime.toDate().getMonth() === 11 && item.startTime.toDate().getFullYear() === selectedYear.getFullYear()).length)
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
                    <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
