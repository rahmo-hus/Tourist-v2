import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    tr: {
        background: '#f1f1f1',
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));

export default function IndividualTaskSummary(props) {

    const classes = useStyles();
    const {quests, games} = props;
    const [reverse, setReverse] = useState(1);
    let [statistics, setStatistics] = useState([]);

    useEffect(() =>{
        setQuestStatisticsData();
    }, []);

    function getAppearancesCount(id) {
        let count = 0;
        games.map((game, key) => {
            count += game.quests.filter(quest => quest.id === id).length;
        })
        return count;
    }

    function getQuestAccomplishmentsCount(id) {
        let count = 0;
        games.map((game, key) => {
            count += game.quests.filter(quest => quest.id === id && quest.isCompleted).length;
        })
        return count;
    }

    const setQuestStatisticsData = () => quests.map((quest, key) =>{
        const questTitle = quest.title.sr_bih;
        const appearancesCount = getAppearancesCount(quest.id);
        const questAccomplishmentsCount = getQuestAccomplishmentsCount(quest.id);
        const successPercentage = appearancesCount !==0 ? Math.round(100*questAccomplishmentsCount/appearancesCount) : 0;

        const newElement ={
            questTitle,
            appearancesCount,
            questAccomplishmentsCount,
            successPercentage
        }

        setStatistics(prevState => [...prevState, newElement]);

    })

    const sortByTitle = () =>{
        setReverse(reverse*(-1));
        setStatistics( (stats) => [...stats.sort((a,b) => a.questTitle.toLowerCase() > b.questTitle.toLowerCase() ? reverse : reverse*(-1))] )
    }

    const sortByAppearancesCount = () => {
        setReverse(reverse*(-1));
        setStatistics((stats) => [...stats.sort((a,b) => (a.appearancesCount - b.appearancesCount)*reverse)]);
    }

    const sortByAccomplishmentCount = () =>{
        setReverse(reverse*(-1));
        setStatistics((stats) => [...stats.sort((a,b) => (a.questAccomplishmentsCount - b.questAccomplishmentsCount)*reverse)]);
    }

    const sortBySuccessPercentage = () =>{
        setReverse(reverse*(-1));
        setStatistics( (stats) => [...stats.sort((a,b) => (a.successPercentage - b.successPercentage) * reverse)]);
    }

    const tableContent = statistics.map((quest, key) => {
        return(
            <TableRow>
                <TableCell component="th" scope="row">{quest.questTitle}</TableCell>
                <TableCell align="right">{quest.appearancesCount}</TableCell>
                <TableCell align="right">{quest.questAccomplishmentsCount}</TableCell>
                <TableCell align="right">{quest.successPercentage}%</TableCell>
            </TableRow>
        )
    })

    return (
        <React.Fragment>
            <TableContainer>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tr} onClick={sortByTitle}>Naziv zadatka</TableCell>
                            <TableCell className={classes.tr} align="right" onClick={sortByAppearancesCount}>Ukupan broj pojavljivanja</TableCell>
                            <TableCell className={classes.tr} align="right" onClick={sortByAccomplishmentCount}>Ukupan broj izvrsavanja</TableCell>
                            <TableCell className={classes.tr} align="right" onClick={sortBySuccessPercentage}>Postotak uspjesnosti</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableContent}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}
