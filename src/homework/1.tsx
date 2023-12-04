import { FC, ReactElement, useEffect, useRef } from 'react';

type ObserverTypes = {
    children: ReactElement,
    onContentEndVisible: () => void,
};

type OptionTypes = {
    rootMargin: string,
    threshold: number,
    root: Element | Document | null |  undefined,
}

// Опишіть Props
export const Observer: FC<ObserverTypes> = ({ children, onContentEndVisible }): ReactElement => {
    // Вкажіть правильний тип для useRef зверніть увагу, в який DOM елемент ми його передаємо
    const endContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Вкажіть правильний тип для options, підказка, клас також можна вказувати як тип
        const options: OptionTypes = {
            rootMargin: '0px',
            threshold: 1.0,
            root: null,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) {
                    onContentEndVisible();
                    observer.disconnect();
                }
            });
        }, options);

        if (endContentRef.current) {
            observer.observe(endContentRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [onContentEndVisible]);

    return (
        <div>
            {children}
            <div ref={endContentRef} />
        </div>
    );
};
