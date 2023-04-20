import React from 'react';
import {
    CustomizeDivider,
    CustomizeInputCreateList,
    CustomizeInputNumber,
    CustomizeInputSelect,
    CustomizeInputSwitch,
    CustomizeInputText,
} from '../atoms';
import { useFormContext } from 'react-hook-form';

type Props = {};

export const ShowingSettings = (props: Props) => {
    const { watch } = useFormContext();

    const showingCondition = watch('showingCondition');
    const showingAllPages = watch('showingAllPages');

    return (
        <>
            <CustomizeDivider title="Проигрывание видео" />
            <CustomizeInputSwitch name="showingPreview" title="Отображение превью" />

            <CustomizeDivider title="Появление виджета" />
            <CustomizeInputSelect
                name="showingCondition"
                title="Условие"
                items={[
                    { id: 'immediately', name: 'Сразу' },
                    { id: 'time', name: 'Через время' },
                    { id: 'intersection', name: 'При видимости элемента' },
                ]}
            />

            {showingCondition === 'time' && (
                <CustomizeInputNumber name="showingAfterTime" title="Время секунд" />
            )}

            {showingCondition === 'intersection' && (
                <CustomizeInputText name="showingSelector" title="Селектор" />
            )}

            <CustomizeDivider title="Повторный показ" />

            <CustomizeInputNumber name="showingAgainTime" title="Время" />

            <CustomizeInputSelect
                name="showingAgainUnit"
                title="Единица измерения"
                items={[
                    { id: 'second', name: 'Секунда' },
                    { id: 'minute', name: 'Минуты' },
                    { id: 'hour', name: 'Час' },
                ]}
            />

            <CustomizeDivider title="Страницы" />

            <CustomizeInputSwitch name="showingAllPages" title="На всех страницах" />

            {!showingAllPages && (
                <>
                    <CustomizeInputCreateList name="showingOnlyPages" title="Страницы" />
                    <CustomizeInputCreateList
                        name="showingIgnorePages"
                        title="Исключить Страницы"
                    />
                </>
            )}
        </>
    );
};
