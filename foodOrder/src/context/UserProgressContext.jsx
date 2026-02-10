import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: '',
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
});

export function UserProgressContextProvider({children}){
    const [progress, setProgress] = useState('');
    const userProgressContextValue = {
        progress,
        showCart,
        showCheckout,
        hideCart,
        hideCheckout,
    }

    function showCart(){
        setProgress('cart');
    }

    function hideCart(){
        setProgress('');
    }

    function showCheckout(){
        setProgress('checkout');
    }

    function hideCheckout(){
        setProgress('');
    }

    return <UserProgressContext.Provider value={userProgressContextValue}>{children}</UserProgressContext.Provider>
}

export default UserProgressContext;