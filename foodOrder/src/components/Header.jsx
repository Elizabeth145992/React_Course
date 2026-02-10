import { useContext } from 'react';
import logoImg from '../../public/logo.jpg'
import Button from './UI/Button';
import CartContext from '../context/cartContext';
import UserProgressContext from '../context/UserProgressContext';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const totalItemsCart = cartCtx.items.reduce((totalItems, item) => {
        return totalItems + item.quantity;
    },0);

    function showCartHandler(){
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="Logo Food" />
                <h1>Uriel´s Restaurant</h1>
            </div>
            <nav>
                <Button textOnly onClick={showCartHandler}>Cart ({totalItemsCart})</Button>
            </nav>
        </header>
    );
}