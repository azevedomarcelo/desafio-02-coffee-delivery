import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react';
import coffeeImg from '../../assets/coffee.png';
import styles from './styles.module.css';

export function Intro() {
  return (
    <div className={styles['intro-section']}>
      <div className={styles['content-left']}>
        <h1 className={styles.title}>Encontre o café perfeito para qualquer hora do dia</h1>

        <span className={styles.subtitle}>Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora</span>
        <div className={styles.items}>
          <p className={styles.item1}>
            <span className={styles.icon1}>
              <ShoppingCart size={16} weight='fill'  color='white'/>
            </span>
            Compra simples e segura
          </p>

          <p className={styles.item2}>
            <span className={styles.icon2}>
              <Timer size={16} weight="fill" color='white' />
            </span>
            Entrega rápida e rastreada
          </p>

          <p className={styles.item3}>
            <span className={styles.icon3}>
              <Package size={16} weight="fill" color='white' />
            </span>
            Embalagem mantém o café intacto
          </p>

          <p className={styles.item4}>
            <span className={styles.icon4}>
              <Coffee size={16} weight="fill" color='white' />
            </span>
            O café chega fresquinho até você
          </p>

        </div>
      </div>
      <div>
        <img src={coffeeImg} alt="coffee" className={styles['coffee-image']} />

      </div>
    </div>
  );
}