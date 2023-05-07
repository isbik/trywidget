import { useEffect, useMemo, useRef, useState } from 'react';

export const useCountDown = () => {
    const timeRef = useRef(0);
    // we use ref because react use batching for useState
    const timer = useRef<number>();
    const [time, setTime] = useState(0);

    const countDown = () => {
        const currentTime = timeRef.current - 1;

        timeRef.current = currentTime;
        setTime(timeRef.current);

        if (currentTime < 1) {
            window.clearInterval(timer.current);
            timer.current = undefined;
        }
    };

    const launch = (value: number) => {
        // Launch timer once
        if (timer.current) return;

        timeRef.current = value;
        setTime(timeRef.current);

        timer.current = window.setInterval(countDown, 1000);
    };

    useEffect(() => {
        () => {
            window.clearInterval(timer.current);
            timer.current = undefined;
        };
    }, []);

    const reset = () => {
        window.clearInterval(timer.current);
        timer.current = undefined;
        timeRef.current = 0;
        setTime(0);
    };

    const seconds = time % 60;
    const minutes = Math.floor(time / 60);
    const isFinish = time < 1;

    return { launch, seconds, minutes, isFinish, reset };
};
