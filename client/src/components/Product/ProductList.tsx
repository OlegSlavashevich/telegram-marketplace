import { FunctionComponent, useEffect, useState } from "react";
import Product, { IProduct } from "./Product";

const ProductList: FunctionComponent = () => {
  const [products, setProducts] = useState<IProduct[]>();

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const selectProduct = (id: number) => {
    setSelectedProducts(prevState => [...prevState, id]);
  };

  const onDeleteProduct = (id: number) => {
    const tmpProducts = [...selectedProducts];
    const index = tmpProducts.findIndex(productId => productId === id);
    tmpProducts.splice(index, 1);
    setSelectedProducts(tmpProducts);
  };

  useEffect(() => {
    fetch('http://localhost:1337/api/products?populate=image')
      .then(res => res.json()).then(res => setProducts(res.data as IProduct[]));
  }, []);

  useEffect(() => {
    console.log(selectedProducts);
  }, [selectedProducts]);

  return products?.map(product =>
    <Product
      key={product.id}
      product={product}
      onSelect={selectProduct}
      onDelete={onDeleteProduct}
    />
  )
};

export default ProductList;