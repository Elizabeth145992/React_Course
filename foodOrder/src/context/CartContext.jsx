import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: () => {},
    removeItem: () => {},
});

function cartReducer(state, action){
    if(action.type === 'ADD_ITEM'){
        const isExistingItem = state.items.findIndex((item) => item.id === action.item.id );
        const updatedItems = [...state.items];
        if(isExistingItem > -1){
            const existingItem = state.items[isExistingItem];
            const updatedItem = {...existingItem, quantity: existingItem.quantity + 1};
            updatedItems[isExistingItem] = updatedItem;
        }else{
           updatedItems.push({...action.item, quantity: 1});
        }
        return {...state, items: updatedItems}
    }

    if(action.type === 'REMOVE_ITEM'){
        const isExistingItem = state.items.findIndex((item) => item.id === action.id);
        const existingItem = state.items[isExistingItem];
        const updatedItems = [...state.items];

        if(existingItem.quantity === 1){
            updatedItems.splice(isExistingItem, 1);
        }else{
            const updatedItem = {...existingItem, quantity: existingItem.quantity -1};
            updatedItems[isExistingItem] = updatedItem;
        }
         return {...state, items: updatedItems};
    }

    return state;
}

export function CartContextProvider({children}){
   const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []});
   const cartContextValue = {
    items: cart.items,
    addItem,
    removeItem,
   }

   function addItem(item){
    dispatchCartAction({type: 'ADD_ITEM', item})
   }

   function removeItem(id){
    dispatchCartAction({type: 'REMOVE_ITEM', id });
   }

    return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>
}

export default CartContext;