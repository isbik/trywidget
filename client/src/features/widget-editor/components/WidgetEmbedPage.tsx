import Script from 'next/script';

export const WidgetPreview = () => {
    return (
        <main className="p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 12 }).map((_, index) => (
                    <div className="flex flex-col overflow-hidden rounded h-96" key={index}>
                        <div className="h-48 bg-gray-400"></div>
                        <div className="flex-1 px-4 py-8 space-y-4 bg-gray-100 sm:p-8">
                            <div className="w-full h-6 bg-gray-400 rounded"></div>
                            <div className="w-full h-6 bg-gray-400 rounded"></div>
                            <div className="w-3/4 h-6 bg-gray-400 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>

            <Script src={require('/public/widget.js')} id="widget" data-widget-id="123131"></Script>
        </main>
    );
};
