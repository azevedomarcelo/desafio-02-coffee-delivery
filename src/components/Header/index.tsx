import { Link } from 'react-router-dom';
import { MapPin, ShoppingCart } from 'phosphor-react';

import logoImg from '../../assets/Logo.png';
import styles from './styles.module.css';
import { useCart } from '../../hooks/useCart';
export function Header() {
  const { cart } = useCart();
  
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logoImg} alt="logo" width={85} />
      </Link>
      
      <div>
        <span>
          <MapPin size={32} weight='fill' />
          São José dos Campos, SP
        </span>

        <Link to="/cart" className={styles.addToCartButton}>
          <ShoppingCart size={32} weight='fill' />
            {cart.length === 0 ? '' : (
              <span className={styles.badge}>
                {cart.length}
              </span>
              
            )}
        </Link>
      </div>
    </header>
  )
}