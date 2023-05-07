import React from 'react';

type Props = React.SVGProps<SVGSVGElement>;

export const InfinityIcon = (props: Props) => {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M10 8C9.36619 7.52464 8.6285 7.20671 7.84771 7.07239C7.06692 6.93806 6.26539 6.99121 5.50916 7.22743C4.75294 7.46366 4.06368 7.87621 3.49817 8.43108C2.93267 8.98595 2.50712 9.66726 2.25658 10.4189C2.00605 11.1705 1.93771 11.9708 2.05719 12.754C2.17667 13.5372 2.48055 14.2808 2.94379 14.9236C3.40703 15.5663 4.01637 16.0897 4.7216 16.4507C5.42682 16.8117 6.20774 17 7 17C9.761 17 10.5 15 12 12C13.5 9 14.239 7 17 7C17.7923 7 18.5732 7.18827 19.2784 7.54928C19.9836 7.9103 20.593 8.43373 21.0562 9.07645C21.5195 9.71916 21.8233 10.4628 21.9428 11.246C22.0623 12.0292 21.994 12.8295 21.7434 13.5811C21.4929 14.3327 21.0673 15.0141 20.5018 15.5689C19.9363 16.1238 19.2471 16.5363 18.4908 16.7726C17.7346 17.0088 16.9331 17.0619 16.1523 16.9276C15.3715 16.7933 14.6338 16.4754 14 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
};
