export interface WidgetSettings {
    showControls: boolean;
    shape: string;
    height: number;
    width: number;
    scaleView: number;
    placement: string;
    edgeMargins: number;
    isDragWidget: boolean;
    playSize: number;
    playColor: string;
    playIconColors: string;
    showBorder: boolean;
    borderColor: string;
    borderHoverColor: string;
    showTitle: boolean;
    borderRadius: number;
    titleColor: string;
    titleAlign: string;
    ctaShow: boolean;
    ctaFontSize: number;
    ctaText: string;
    ctaClickAction: string;
    ctaOpenLink: string;
    ctaOpenNewTab: boolean;
    ctaClickSelector: string;
    ctaButtonColor: string;
    ctaTextColor: string;
    ctaBorderRadius: number;
    ctaTimeToShow: number;
    ctaIsFontWeight: string;
    сtaShowWhatsApp: boolean;
    ctaWhatsAppNumber: string;
    ctaWhatsAppText: string;
    ctaShowTelegram: boolean;
    ctaTelegramChannel: string;

    showingPreview: boolean;
    showingCondition: string;
    showingAfterTime: number;
    showingSelector: string;
    showingAgainTime: number;
    showingAgainUnit: string;
    showingAllPages: boolean;
    showingOnlyPages: string[];
    showingIgnorePages: string[];
}

export const SETTINGS_DEFAULT: WidgetSettings = {
    showControls: false,
    shape: 'square',
    height: 150,
    width: 150,
    scaleView: 1.5,
    placement: 'right',
    edgeMargins: 10,
    isDragWidget: true,
    playSize: 10,
    playColor: '#fcaeee',
    playIconColors: '#fcaeee',
    showBorder: true,
    borderColor: '#fcaeee',
    borderHoverColor: '#12ae1e',
    borderRadius: 22,
    showTitle: true,
    titleColor: '#fcaeee',
    titleAlign: 'left',

    ctaShow: true,
    ctaText: 'Регистрация',
    ctaFontSize: 14,
    ctaClickAction: 'link',
    ctaOpenLink: 'https://test.com',
    ctaOpenNewTab: true,
    ctaClickSelector: '#selector',
    ctaButtonColor: '#aaa111',
    ctaTextColor: '#11a111',
    ctaBorderRadius: 12,
    ctaTimeToShow: 0,
    ctaIsFontWeight: 'bold',

    сtaShowWhatsApp: true,
    ctaWhatsAppNumber: '79228331011',
    ctaWhatsAppText: 'Привет!',

    ctaShowTelegram: true,
    ctaTelegramChannel: 'root',

    showingPreview: false,
    showingCondition: 'immediately',
    showingAfterTime: 1,
    showingSelector: '#show',

    showingAgainTime: 10,
    showingAgainUnit: 'seconds',

    showingAllPages: true,
    showingOnlyPages: [],
    showingIgnorePages: ['test.com'],
};
