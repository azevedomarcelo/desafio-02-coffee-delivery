import { ShoppingCart } from "phosphor-react";
import { useCart } from "../../hooks/useCart";
import { Numeric } from "../Numeric";

import { formatCurrency } from "../../utils/formatCurrency";

import styles from './styles.module.css';

export function Catalog() {
  const { handleAddToCart, handleQuantityChange, productState } = useCart();
  return (
    <section>
      <h1 className={styles.coffeeTitle}>Nossos cafés</h1>

      <div className={styles.cardProduct}>
        {productState.map((product, index) => (
          <div className={styles.product} key={index}>
            <img src={product.url} alt="imagem cafe" />
            <p className={styles.productTags}>
              {product.tags.map(tag => (<span key={tag}>{tag}</span>))}
            </p>
            <p className={styles.productName}>{product.name}</p>
            <p className={styles.productDescription}>{product.description}</p>
            <div className={styles.productfooter}>
              <span className={styles.productPrice}>
                {formatCurrency(product.price)}
              </span>

              <Numeric
                quantity={product.quantity}
                onQuantityChange={(quantity) =>
                  handleQuantityChange(product.id, quantity)
                }
                removeItem={() => { }}
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