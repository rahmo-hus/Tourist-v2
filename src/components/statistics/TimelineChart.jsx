import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import Grid from "@material-ui/core/Grid";

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const data = [
    createData('Jan', 0),
    createData('Feb', 300),
    createData('Mar', 600),
    createData('Apr', 800),
    createData('May', 1500),
    createData('Jun', 2000),
    createData('Jul', 2100),
    createData('Aug', 1000),
    createData('Sep', 500),
    createData('Oct', 4000),
    createData('Nov', 3000),
    createData('Dec', 2000),
];

export default function TimelineChart(props) {
    const theme = useTheme();
    const {games} = props;
    const tempData = [
        createData('Jan', games.filter(item => item.startTime.toDate().getMonth() === 1).length),
        createData('Feb', games.filter(item => item.startTime.toDate().getMonth() === 2).length),
        createData('Mar', games.filter(item => item.startTime.toDate().getMonth() === 3).length),
        createData('Apr', games.filter(item => item.startTime.toDate().getMonth() === 4).length),
        createData('May', games.filter(item => item.startTime.toDate().getMonth() === 5).length),
        createData('Jun', games.filter(item => item.startTime.toDate().getMonth() === 6).length),
        createData('Jul', games.filter(item => item.startTime.toDate().getMonth() === 7).length),
        createData('Aug', games.filter(item => item.startTime.toDate().getMonth() === 8).length),
        createData('Sep', games.filter(item => item.startTime.toDate().getMonth() === 9).length),
        createData('Oct', games.filter(item => item.startTime.toDate().getMonth() === 10).length),
        createData('Nov', games.filter(item => item.startTime.toDate().getMonth() === 11).length),
        createData('Dec', games.filter(item => item.startTime.toDate().getMonth() === 12).length)
    ]

    return (
        <React.Fragment>
            <Grid  container
                   direction="row"
                   justify="center"
                   alignItems="center"
            >
                <Title>Posljednjih godinu dana</Title>
            </Grid>
            <ResponsiveContainer>
                <LineChart
                    data={tempData}
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
