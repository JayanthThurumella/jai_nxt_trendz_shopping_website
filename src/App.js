import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: ''})
  }

  removeCartItem = removeId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachData => eachData.id !== removeId),
    }))
  }

  addCartItem = product => {
    this.setState(prevState => {
      const existingProduct = prevState.cartList.find(
        item => item.id === product.id,
      )

      if (existingProduct) {
        return {
          cartList: prevState.cartList.map(item => {
            if (item.id === product.id) {
              return {
                ...item,
                quantity: item.quantity + product.quantity,
              }
            }
            return item
          }),
        }
      }
      return {
        cartList: [...prevState.cartList, product],
      }
    })
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachData => {
        if (eachData.id === id) {
          if (eachData.quantity === 1) {
            this.removeCartItem(eachData.id)
          }
          return {...eachData, quantity: eachData.quantity - 1}
        }
        return eachData
      }),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachData => {
        if (eachData.id === id) {
          return {...eachData, quantity: eachData.quantity + 1}
        }
        return eachData
      }),
    }))
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
