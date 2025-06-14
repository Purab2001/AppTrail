import { useEffect } from 'react';

const useTitle = (title) => {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = `${title} - AppTrail`;

        return () => {
            document.title = prevTitle;
        };
    }, [title]);
};

export default useTitle; 