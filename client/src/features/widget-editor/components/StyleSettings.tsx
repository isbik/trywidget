import React, { useEffect, useState } from 'react';
import {
    CustomizeInputNumber,
    CustomizeInputSwitch,
    CustomizeInputColor,
    CustomizeBlock,
    CustomizeDivider,
    CustomizeInputShape,
    CustomizeInputAlign,
    CustomizeExpand,
} from '../atoms';
import { useFormContext } from 'react-hook-form';

type Props = {};

export const StyleSettings = (props: Props) => {
    const { watch, setValue } = useFormContext();
    const shape = watch('shape');

    const height = watch('height');

    const handleChangeShape = (shapeValue: string) => {
        if (['circle', 'square'].includes(shapeValue)) setValue('width', height);
    };

    return (
        <>
            <CustomizeInputSwitch name="showControls" title="Элементы управления" />

            <CustomizeExpand title="Размеры">
                <CustomizeInputShape onChange={handleChangeShape} name="shape" title="Форма" />

                <CustomizeInputNumber name="height" title="Высота" />

                {shape === 'rectangle' && <CustomizeInputNumber name="width" title="Ширина" />}

                <CustomizeInputNumber name="scaleView" title="Увеличение в режиме просмотра" />
            </CustomizeExpand>

            <CustomizeExpand title="Положение виджета">
                <CustomizeInputAlign center={false} name="placement" title="Угол" />
                <CustomizeInputNumber name="edgeMargins" title="Отступ от краев" />
            </CustomizeExpand>

            {/* <CustomizeInputSwitch name="isDragWidget" title="Перетаскивание виджета" /> */}
            {/* <CustomizeDivider title="Кнопка play" />

            <CustomizeInputNumber name="" title="Размер" />
            <CustomizeInputNumber title="Размер шрифта" />
            <CustomizeInputColor title="Цвет кнопки" />
            <CustomizeInputColor title="Цвет иконки" />
            <CustomizeDivider title="Рамка" /> */}

            <CustomizeExpand title="Рамка">
                <CustomizeInputSwitch name="showBorder" title="Показывать рамку" />
                <CustomizeInputNumber name="borderRadius" title="Скругление" />
                <CustomizeInputColor name="borderColor" title="Цвет рамки" />
                <CustomizeInputColor name="borderHoverColor" title="Цвет при наведении" />
            </CustomizeExpand>

            <CustomizeExpand title="Заголовок">
                <CustomizeInputSwitch name="showTitle" title="Показывать заголовок" />
                <CustomizeInputColor name="titleColor" title="Цвет заголовка" />

                <CustomizeInputAlign name="titleAlign" title="Выравнивание" />
            </CustomizeExpand>
        </>
    );
};
