import React, {useState} from 'react';
import {Date} from 'prismic-reactjs';
import {MDBCard, MDBCardBody, MDBDataTableV5} from 'mdbreact';


function Leaderboard(props) {
    const [leaderboard] = useState(props.leaderboard.slice());


    const columns = [
        {
            label: 'Korisnicko ime',
            field: 'username',
            sort: 'asc',
        },
        {
            label: 'Osvojeni broj bodova',
            field: 'score',
            sort: 'asc',
        },
        {
            label: 'Trajanje igre',
            field: 'duration',
            sort: 'asc',
        }
    ]

    const rows = leaderboard.map((value, key) => {
        return ({
            username: value.username,
            score: value.score,
            duration: new Date(value.endTime.toDate() - value.startTime.toDate()).toLocaleTimeString()
        });
    })

    const data = {
        columns,
        rows
    }


    return (
        <React.Fragment>
            <MDBCard>
                <MDBCardBody>
                    <MDBDataTableV5
                        striped={true}
                        bordered={true}
                        hover
                        materialSearch={true}
                        proSelect
                        data={data}
                    >
                    </MDBDataTableV5>
                </MDBCardBody>
            </MDBCard>
        </React.Fragment>
    );
}

export default Leaderboard;
