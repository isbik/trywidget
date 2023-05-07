import React from 'react';
import {
    CustomizeDivider,
    CustomizeInputColor,
    CustomizeInputNumber,
    CustomizeInputSelect,
    CustomizeInputSwitch,
    CustomizeInputText,
} from '../atoms';
import { useFormContext } from 'react-hook-form';

export const CTASettings = () => {
    const { watch } = useFormContext();

    const ctaShow = watch('ctaShow');
    const сtaShowWhatsApp = watch('сtaShowWhatsApp');
    const ctaShowTelegram = watch('ctaShowTelegram');
    const ctaShowVk = watch('ctaShowVk');

    const ctaActionClick = watch('ctaActionClick');

    return (
        <>
            <CustomizeInputSwitch className="font-bold" name="ctaShow" title="CTA" />

            {ctaShow && (
                <>
                    <CustomizeInputText name="ctaText" title="Текст" />

                    <CustomizeDivider title="Действие при нажатии" />
                    <CustomizeInputSelect
                        name="ctaActionClick"
                        title="Действие"
                        items={[
                            {
                                id: 'link',
                                name: 'Переход по ссылке',
                            },
                            {
                                id: 'scroll',
                                name: 'Скролл до блока',
                            },
                            {
                                id: 'code',
                                name: 'Запуск вашего кода',
                            },
                        ]}
                    />

                    {ctaActionClick === 'link' && (
                        <>
                            <CustomizeInputSwitch
                                name="ctaOpenNewTab"
                                title="Открыть в новой вкладке"
                            />
                            <CustomizeInputText name="ctaOpenLink" title="Ссылка" />
                        </>
                    )}

                    {ctaActionClick === 'scroll' && (
                        <CustomizeInputText name="ctaClickSelector" title="Селектор" />
                    )}

                    <div className="flex items-center justify-between gap-2 p-2 px-4">
                        {ctaActionClick === 'code' && (
                            <code className="p-2 bg-[#EEF1F7] rounded select-all">{`window.twCtaClick = function(){ // ВАШ КОД }`}</code>
                        )}
                    </div>

                    <CustomizeDivider title="Стили" />
                    <CustomizeInputColor name="ctaButtonColor" title="Цвет кнопки" />
                    <CustomizeInputColor name="ctaTextColor" title="Цвет текста" />
                    <CustomizeInputNumber name="ctaBorderRadius" title="Закругление" />
                    <CustomizeInputNumber name="ctaTimeToShow" title="Время появления(сек)" />

                    <CustomizeInputSwitch name="ctaIsFontWeight" title="Жирный текст" />
                </>
            )}

            <CustomizeInputSwitch
                className="font-bold border-t border-base-300"
                name="сtaShowWhatsApp"
                title="WhatsApp"
            />

            {сtaShowWhatsApp && (
                <>
                    <CustomizeInputText name="ctaWhatsAppNumber" title="Телефон" />
                    <CustomizeInputText name="ctaWhatsAppText" title="Текст приветствия" />
                </>
            )}

            <CustomizeInputSwitch
                className="font-bold border-t border-base-300"
                name="ctaShowTelegram"
                title="Telegram"
            />

            {ctaShowTelegram && (
                <>
                    <CustomizeInputText name="ctaTelegramChannel" title="Канал" />
                </>
            )}

            <CustomizeInputSwitch
                className="font-bold border-t border-base-300"
                name="ctaShowVk"
                title="VK"
            />

            {ctaShowVk && (
                <>
                    <CustomizeInputText name="ctaVkLink" title="Ссылка" />
                </>
            )}
        </>
    );
};
