import {createPortal} from 'react-dom';
import { useEffect, useRef } from 'react';

export default function Modal({children, open, className = ''}){
    const modalRef =useRef();
    useEffect(() => {
        if(open){
            modalRef.current.showModal();
        }
    }, [open])
    return (
        createPortal(<dialog ref={modalRef} className={`modal ${className}`}>{children}</dialog>, document.getElementById('modal'))
    )
}