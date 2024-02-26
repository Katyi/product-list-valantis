import './product.css';

const Product = ({product, idx}) => {
  return (
    <tr className='product'>
      <td className='product_number'>
        <div className='product_title_tablet'>№</div>
        {idx}
      </td>
      <td className='product_id'>
        <div className='product_title_tablet'>ID</div>
        {product.id}
      </td>
      <td className='product_title'> 
        <div className='product_title_tablet'>Название</div>
        {product.product}
      </td>
      <td className='product_price'>
        <div className='product_title_tablet'>Цена</div>
        {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(product.price)}
      </td>
      <td className='product_brand'>
        <div className='product_title_tablet'>Бренд</div>
        {product.brand}
      </td>
    </tr>
  )
}

export default Product