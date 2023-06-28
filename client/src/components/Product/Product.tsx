import { FunctionComponent, useEffect, useState } from "react";

export interface IProduct {
  id: number,
  attributes: {
    name: string,
    price: number,
    slug: string
  }
}

interface IProps {
  product: IProduct;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
}

const Product: FunctionComponent<IProps> = ({
  product,
  onSelect,
  onDelete
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const onClick = () => {
    if (isSelected) {
      onDelete(product.id);
    } else {
      onSelect(product.id);
    }
    setIsSelected(prevState => !prevState);
  };

  return <div className="bg-grey-100 mx-8 mt-4 p-4 rounded-md border-2 border-blue-700">
    <div>{product.attributes.name}: {product.attributes.price}$</div>
    <button
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 
        ${isSelected && 'bg-red-500 hover:bg-red-700'}`}>
        {isSelected ? 'Delete' : 'Choose'}
    </button>
  </div>
};

export default Product;