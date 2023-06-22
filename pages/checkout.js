import { ProductsContext, ProductsContextProvider } from '../Components/ProductsContext';
import { useContext } from 'react';

import CheckoutNow from '../Components/checkoutNow';

export default function CheckoutPage() {
  const {selectedProducts} = useContext(ProductsContext);
  return (
    <div>
      <ProductsContextProvider>
        <CheckoutNow selectedProducts={selectedProducts} />
      </ProductsContextProvider>
    </div>
  );
}