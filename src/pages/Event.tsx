import React, {FC, useEffect, useState} from 'react';
import {Button, Layout, Modal, Row} from "antd";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";

const Event: FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    // const {fetchGuests, createEvent, fetchEvents} = useActions();
    const {guests,events} = useTypedSelector(state => state.events);
    const {user} = useTypedSelector(state => state.users);

    useEffect(() => {
        // fetchGuests()
        // fetchEvents(user.username);
    }, [])

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false);
        // createEvent(event);
    }

    return (
        <Layout>
            <EventCalendar events={events}/>
            <Row justify="center">
                <Button
                    onClick={() => setModalVisible(true)}
                >
                    Добавить событие
                </Button>
            </Row>
            <Modal
                title="Добавить событие"
                open={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <EventForm
                    guests={guests}
                    submit={addNewEvent}
                />
            </Modal>
        </Layout>
    );
};

export default Event;
