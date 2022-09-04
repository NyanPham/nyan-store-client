import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './context/authContext'
import SideContextProvider from './context/sideCartContext'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import allReducers from './redux/reducers/allReducers'

const store = createStore(allReducers, applyMiddleware(thunk))

const stripePromise = loadStripe(
    'pk_test_51LTguVLOgzrFtjz5bzBl5Qhh7jRQKuf5EWrmETmUX3acHGVdUKHqJqtO6rxgSW0wBliySFQGWLXhxazacdDVodZF00GdJ29Mwc'
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AuthContextProvider>
                    <SideContextProvider>
                        <Elements stripe={stripePromise}>
                            <App />
                        </Elements>
                    </SideContextProvider>
                </AuthContextProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
)
