import React, { useState } from 'react'

const CountDown = ({ time }: { time: string; }) => {
    var countDownDate = new Date(Number(time)).getTime();

    const [counter, setcounter] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const tick = () => {

        var now = new Date().getTime();
        var timeleft = countDownDate - now;

        // Calculating the days, hours, minutes and seconds left
        var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        // Result is output to the specific element
        if (days < 0 && hours < 0 && minutes < 0 && seconds < 0) {
            setcounter({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        } else {
            setcounter({ days: days, hours: hours, minutes: minutes, seconds: seconds });
        }
    };

    React.useEffect(() => {
        if (countDownDate) {
            const timerId = setInterval(() => tick(), 1000);

            return () => clearInterval(timerId);
        }

    }, [countDownDate, tick]);


    return (
        <div className="pt-10 md:pt-4">
            <p className="text-secondary text-center md:text-2xl font-bold">Poll closes in : {`${counter.days}d ${counter.hours}h ${counter.minutes}m ${counter.seconds}s`}</p>
        </div>
    );
}

export default CountDown;