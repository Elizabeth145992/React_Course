import ProductItem from './ProductItem';
import classes from './Products.module.css';

const PRODUCTSLIST = [
  {
    id: 'p1',
    price: 52,
    name: 'Cookies',
    description: 'Chocolate cookies'
  },
  {
    id: 'p2',
    price: 35,
    name: 'Juice',
    description: 'Orange juice'
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {PRODUCTSLIST.map(product =>
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.name}
            price={product.price}
            description={product.description}
          />
        )}
      </ul>
    </section>
  );
};

export default Products;
