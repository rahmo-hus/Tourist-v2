import React from "react";
import {MDBCard, MDBCardBody, MDBDataTableV5} from "mdbreact";


export default function IndividualTaskSummary(props) {

    const {quests, games, statistics} = props;
    let timesSolvedTotal = 0;

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

    const columns = [
        {
            label: 'Naziv zadatka',
            field: 'title',
            sort: 'desc'
        },
        {
            label: 'Ukupan broj pojavljivanja',
            field: 'appearancesCount'
        },
        {
            label: 'Ukupan broj izvšavanja',
            field: 'accomplishmentsCount'
        },
        {
            label: 'Postotak uspješnosti',
            field: 'successPercentage'
        },
        {
            label: 'Prosječna ocjena',
            field: 'averageRating'
        },
        {
            label: 'Postotak po posjećenosti',
            field: 'visitPercentage'
        }
    ];

    const rows = quests.map((quest, key) => {

        timesSolvedTotal === 0 && statistics.map((value, key) => {
            timesSolvedTotal += value.timesSolved
        });
        const title = quest.title.sr_bih + ' / ' + quest.title.en_us;
        const appearancesCount = getAppearancesCount(quest.id);
        const accomplishmentsCount = getQuestAccomplishmentsCount(quest.id);
        const successPercentage = (appearancesCount !== 0 ? Math.round(100 * accomplishmentsCount / appearancesCount) : 0) + '%';
        const averageRating = (quest.rating.reduce((a, b) => a + b, 0) / quest.rating.length) || 0;
        const visitPercentage = (timesSolvedTotal !== 0 ? Math.round(statistics.filter(item => item.id === quest.id)[0].timesSolved * 100 / timesSolvedTotal) : 0) + '%';

        return ({
                title,
                appearancesCount,
                accomplishmentsCount,
                successPercentage,
                averageRating,
                visitPercentage
            }
        )
    });

    return (
        <React.Fragment>
            <MDBCard>
                <MDBCardBody>
                    <MDBDataTableV5
                        striped
                        bordered
                        hover
                        materialSearch={true}
                        proSelect
                        data={{
                            columns,
                            rows
                        }}
                    >
                    </MDBDataTableV5>
                </MDBCardBody>
            </MDBCard>
        </React.Fragment>
    )
}
