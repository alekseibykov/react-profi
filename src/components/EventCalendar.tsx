import React, {FC} from 'react';
import {Calendar} from "antd";
import type { CalendarProps } from 'antd';
import {IEvent} from "../models/IEvent";
import { Dayjs } from "dayjs";
import {formatDate} from "../utils/date";

interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {

    const dateCellRender: CalendarProps<Dayjs>['cellRender'] = (date: Dayjs)=> {
        const formatedDate = formatDate(date.toDate());
        const currentDayEvents = props.events.filter(ev => ev.date === formatedDate);
        return (
            <div>
                {currentDayEvents.map((ev, index) =>
                    <div key={index}>{ev.description}</div>
                )}
            </div>
        );
    }

    return (
        <Calendar
            cellRender={dateCellRender}
        />
    );
};

export default EventCalendar;
