import { RefObject, ReactNode, useRef, useEffect } from 'react';

type TOpenCloseFormProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	children?: ReactNode;
};

export function OpenCloseForm({
	isOpen,
	setIsOpen,
	children,
}: TOpenCloseFormProps) {
	const rootRef: RefObject<HTMLDivElement> = useRef(null);

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (
				rootRef.current &&
				!rootRef.current.contains(event.target as HTMLElement)
			) {
				setIsOpen(false);
			}
		}
		if (isOpen) {
			window.addEventListener('mousedown', handleClick);
		}
		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen]);

	return <div ref={rootRef}>{children}</div>;
}
