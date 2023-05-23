import Index from '../../Components/Index'
import { ProductsContextProvider } from '../../Components/ProductsContext'
import CheckoutNow from '../../pages/checkout'




export default function Home() {
  return (
    <ProductsContextProvider>
      <CheckoutNow/>
      <Index/>
     </ProductsContextProvider>
  )
}
