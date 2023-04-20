import { createEvent, createStore } from 'effector';
export const setWidgetSettings = createEvent();
export const $widgetSettings = createStore({
    showControls: false,
    shape: 'rectangle',
    height: 100,
    width: 100,
    scaleView: 1.2,
    placement: 'left',
    edgeMargins: 10,
    isDragWidget: true,
    playSize: 10,
    playColor: '#fcaeee',
    playIconColors: '#fcaeee',
    showBorder: true,
    borderColor: '#fcaeee',
    borderHoverColor: '#fcaeee',
    showTitle: true,
    titleColor: '#fcaeee',
    titleAlign: 'left',

    ctaShow: true,
    ctaText: 'Регистрация',
    ctaClickAction: 'link',
    ctaOpenLink: 'test.com',
    ctaOpenNewTab: true,
    ctaClickSelector: '#selector',
    ctaButtonColor: '#aaa111',
    ctaTextColor: '#aaa111',
    ctaBorderRadius: 12,
    ctaTimeToShow: 1,
    ctaIsFontWeight: 'bold',

    showingPreview: false,
    showingCondition: 'immediately',
    showingAfterTime: 1,
    showingSelector: '#showing',

    showingAgainTime: 10,
    showingAgainUnit: 'seconds',

    showingAllPages: false,
    showingOnlyPages: ['test.com'],
    showingIgnorePages: ['test.com'],
}).on(setWidgetSettings, (store, payload) => ({
    ...store,
    ...payload,
}));
