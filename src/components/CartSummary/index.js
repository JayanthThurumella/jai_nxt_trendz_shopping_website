import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const pricesCalculator = () => {
        let price = 0
        cartList.forEach(each => {
          price += each.price * each.quantity
        })
        return price
      }

      return (
        <div className="cart-summary-container">
          <h1 className="price-heading">
            Order Total: <span>Rs {pricesCalculator()}/-</span>
          </h1>
          <p className="item-count">{cartList.length} Items in cart</p>
          <button className="checkout-button" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
