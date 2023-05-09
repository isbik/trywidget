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
    ctaShowVk: boolean;
    ctaVkLink: string;

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
    showControls: true,
    shape: 'rectangle',
    height: 240,
    width: 150,
    scaleView: 2,
    placement: 'left',
    edgeMargins: 16,
    isDragWidget: true,
    borderRadius: 8,
    // ADD
    playSize: 10,
    playColor: '#fcaeee',
    playIconColors: '#fcaeee',

    showBorder: true,
    borderColor: '#085dff',
    borderHoverColor: '#4100ff',
    showTitle: true,
    titleColor: '#ffffff',
    titleAlign: 'center',

    ctaShow: true,
    ctaText: 'Регистрация',
    ctaClickAction: 'link',
    ctaOpenLink: 'https://trywidget.ru',
    ctaOpenNewTab: true,
    ctaClickSelector: '#selector',
    ctaButtonColor: '#7342ff',
    ctaTextColor: '#ffffff',
    ctaBorderRadius: 50,
    ctaTimeToShow: 1,
    ctaIsFontWeight: 'bold',
    ctaFontSize: 14,

    сtaShowWhatsApp: false,
    ctaWhatsAppNumber: '',
    ctaWhatsAppText: 'Привет!',

    ctaShowTelegram: false,
    ctaTelegramChannel: '',

    ctaShowVk: false,
    ctaVkLink: '',

    showingPreview: false,
    showingCondition: 'immediately',
    showingAfterTime: 1,
    showingSelector: '#showing',

    showingAgainTime: 10,
    showingAgainUnit: 'seconds',

    showingAllPages: false,
    showingOnlyPages: [''],
    showingIgnorePages: [''],
};
