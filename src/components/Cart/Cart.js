import { useSelector, useDispatch } from 'react-redux';
import { selectCart } from '../../features/cart/cartSlice';
import './Cart.css'

const Cart = ({  }) => {
  const dispatch = useDispatch();

  const orders = useSelector(selectCart);

  return (
    <div>
        <div className="cart-icon">
            🛒
        </div>
    </div>
  );
};

export default Cart;
