import React from 'react'
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { store } from './store'
import { AppRouter } from './router'

export const HipodromoApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter></AppRouter>
      </BrowserRouter>
    </Provider>
  )
}
