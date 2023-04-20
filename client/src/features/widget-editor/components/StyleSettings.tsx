import React, { useEffect, useState } from 'react';
import {
    CustomizeInputNumber,
    CustomizeInputSwitch,
    CustomizeInputColor,
    CustomizeBlock,
    CustomizeDivider,
    CustomizeInputShape,
    CustomizeInputAlign,
} from '../atoms';
import { useFormContext } from 'react-hook-form';

type Props = {};

export const StyleSettings = (props: Props) => {
    const { watch, setValue } = useFormContext();
    const shape = watch('shape');

    const height = watch('height');

    useEffect(() => {
        if (shape === 'square' || shape === 'circle') setValue('width', height);
    }, [height]);

    return (
        <>
            <CustomizeInputSwitch name="showControls" title="Показывать элементы управления" />

            <CustomizeDivider title="Размеры" />

            <CustomizeInputShape name="shape" title="Форма" />

            <CustomizeInputNumber name="height" title="Высота" />

            {shape === 'rectangle' && <CustomizeInputNumber name="width" title="Ширина" />}

            <CustomizeInputNumber name="scaleView" title="Увеличение в режиме просмотра" />

            <CustomizeDivider title="Положение виджета" />

            <CustomizeInputAlign center={false} name="placement" title="Угол" />

            <CustomizeInputNumber name="edgeMargins" title="Отступ от краев" />
            {/* <CustomizeInputSwitch name="isDragWidget" title="Перетаскивание виджета" /> */}
            {/* <CustomizeDivider title="Кнопка play" />

            <CustomizeInputNumber name="" title="Размер" />
            <CustomizeInputNumber title="Размер шрифта" />
            <CustomizeInputColor title="Цвет кнопки" />
            <CustomizeInputColor title="Цвет иконки" />
            <CustomizeDivider title="Рамка" /> */}

            <CustomizeDivider title="Рамка" />

            <CustomizeInputSwitch name="showBorder" title="Показывать рамку" />
            <CustomizeInputNumber name="borderRadius" title="Скругление" />
            <CustomizeInputColor name="borderColor" title="Цвет рамки" />
            <CustomizeInputColor name="borderHoverColor" title="Цвет при наведении" />

            <CustomizeDivider title="Заголовок" />

            <CustomizeInputSwitch name="showTitle" title="Показывать заголовок" />
            <CustomizeInputColor name="titleColor" title="Цвет заголовка" />

            <CustomizeInputAlign name="titleAlign" title="Выравнивание" />
        </>
    );
};
