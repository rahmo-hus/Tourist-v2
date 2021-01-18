import { Card, CardContent, Grid, Typography } from "@material-ui/core"
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        display: 'flex'
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
});
const AssignmentSummary = (props) =>{
    const classes = useStyles()
    const { task } = props;
    return (
        <Grid item xs={12}>
            <CardActionArea component="a" href={`task/${task.id}`}>
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5">
                                {task.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {task.gameDescription}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {task.authorFirstName}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                Continue reading...
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </CardActionArea>
        </Grid>
    )
}
export default AssignmentSummary;