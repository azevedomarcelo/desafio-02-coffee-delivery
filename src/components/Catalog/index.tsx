import { ShoppingCart } from "phosphor-react";
import { useCart } from "../../hooks/useCart";

import { Numeric } from "../Numeric";

import styles from './styles.module.css';

export function Catalog() {
  const { handleAddToCart, handleQuantityChange, products } = useCart();
  return (
    <section>
      <h1 className={styles.coffeeTitle}>Nossos cafés</h1>

      <div className={styles.cardProduct}>
        {products.map((product, index) => (
          <div className={styles.product} key={index}>
            <img src={product.url} alt="imagem cafe" />
            <p className={styles.productTags}>
              {product.tags.map(tag => (<span key={tag}>{tag}</span>))}
            </p>
            <p className={styles.productName}>{product.name}</p>
            <p className={styles.productDescription}>{product.description}</p>
            <div className={styles.productfooter}>
              <span className={styles.productPrice}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(product.price)}
              </span>

              <Numeric
                quantity={product.quantity || 1}
                onQuantityChange={(quantity) =>
                  handleQuantityChange(product.id, quantity)
                }
              />

              <button className={styles.btnAddToCart} onClick={() => handleAddToCart(product)}>
                <ShoppingCart weight="fill" color="white" width={22} height={22} />
              </button>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}