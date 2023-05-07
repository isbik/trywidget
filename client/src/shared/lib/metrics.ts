import { IS_DEV } from '../constants';

export const YM = (...args: any[]) => {
    if (IS_DEV) return;

    // @ts-ignore
    window.ym(...args);

    const eventName = args?.[2];

    if (eventName) {
        // @ts-ignore
        window.VK.Retargeting.Event(eventName);
    }
};

export const VKGOAL = (name: string) => {
    if (IS_DEV) return;

    // @ts-ignore
    window.VK.Goal(name);
};
