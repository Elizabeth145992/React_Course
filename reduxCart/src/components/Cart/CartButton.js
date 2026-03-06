import { useDispatch } from 'react-redux';

import classes from './CartButton.module.css';
import { uiActions } from '../../store/uiSlice';

const CartButton = (props) => {
  const dispatch = useDispatch();

  const handleToggleButtom = () => {
    dispatch(uiActions.toggle());
  }

  return (
    <button className={classes.button} onClick={handleToggleButtom} >
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
