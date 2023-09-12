
import MyResponsiveCalendar from '../components/graphs/calendar'
import calendarData from '../components/graphs/calendarData'
const Statistics = () => {
    return (
        <div>
            <h1>My </h1>
            <div style={{ height: 1000, width: 800 }}>
                <MyResponsiveCalendar data={calendarData} />
            </div>

        </div>
    );
};

export default Statistics ;