import React from 'react'
import ReactDOM from 'react-dom'
import FadeIn from 'react-fade-in'
import Main from './Main'
import Form from 'react-bootstrap/Form'

function play() {
    const tracks = document.getElementById('numTracks').value
    const name = document.getElementById('name').value
    var trains = []

    for (let i = 1; i < 6; i++) {
        let track = Math.floor(Math.random() * (tracks - 1))
        let delay = i * 10000
        trains.push({
            track: track,
            time: new Date(new Date().getTime() + delay)
        })
    }

    const { _track, time } = trains[0]

    ReactDOM.render(
        <Main
            tracks={tracks}
            name={name}
            trainsToCome={trains}
            nextTrain={time}
        />,
        document.getElementById('root'))
}

export default function UserForm() {
    return (
        <FadeIn>
            <Form className='text-left bg-light p-3 rounded-lg' onSubmit={() => play()}>
                <Form.Group controlId="numTracks">
                    <Form.Label><h5>Number of Tracks on Railway</h5></Form.Label>
                    <Form.Control type="number" defaultValue="5" />
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label><h5>Name</h5></Form.Label>
                    <Form.Control type="text" defaultValue="User" />
                </Form.Group>
                <button
                    className='btn btn-lg rounded-lg btn-warning btn-block'
                    type='submit' >
                    Begin!
                 </button>
            </Form>
        </FadeIn>
    )
}