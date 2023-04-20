import { AppLayout } from '@vw/src/shared/ui/components/AppLayout';
import Link from 'next/link';
import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { WidgetLayout } from '@vw/src/shared/layouts/WidgetLayout';

type Props = {};

const WidgetAnalyticPage = (props: Props) => {
    const [video, setVideo] = useState('');

    return (
        <WidgetLayout>
            <div className="flex flex-wrap border stats w-fit border-base-300">
                <div className="stat">
                    <div className="stat-title">Уникальных показов</div>
                    <div className="stat-value text-primary">25.6K</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Просмотрено полностью</div>
                    <div className="stat-value text-primary">25.6K</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Открытие виджета</div>
                    <div className="stat-value text-secondary">2.6M</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Уникальных показов</div>
                    <div className="stat-value text-secondary">2.6M</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Кликов по cta</div>
                    <div className="stat-value text-secondary">2.6M</div>
                </div>
            </div>
        </WidgetLayout>
    );
};

export default WidgetAnalyticPage;
