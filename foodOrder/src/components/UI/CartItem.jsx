export default function CartItem({name, qty, price, onDecrease, onIncrease}){
    return (
        <li className="cart-item">
           <p>{name} - {qty} x ${price}</p>
           <p className="cart-item-actions">
            <button onClick={onDecrease}>-</button>
            <button>{qty}</button>
            <button onClick={onIncrease}>+</button>
           </p>
        </li>
    )
}