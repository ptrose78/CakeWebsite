import { useDispatch } from 'react-redux';
import { addItem } from '../../features/cart/cartSlice';

const Cart = ({  }) => {
  const dispatch = useDispatch();

  return (
    <div>
        <div className="cart-item-count"></div>
        <div className="cart-cost"></div>
        <div className="cart-icon">
            🛒
        </div>
    </div>
  );
};

export default Cart;
