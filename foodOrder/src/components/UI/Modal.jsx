import {createPortal} from 'react-dom';
import { useEffect, useRef } from 'react';

export default function Modal({children, open, className = ''}){
    const modalRef = useRef();
    useEffect(() => {
        const modal = modalRef.current;
        if (open && modal) {
            modal.showModal();
        }
        return () => {
            if (modal && typeof modal.close === 'function') modal.close();
        };
    }, [open]);
    return (
        createPortal(<dialog ref={modalRef} className={`modal ${className}`}>{children}</dialog>, document.getElementById('modal'))
    )
}