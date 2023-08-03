import { useEffect, useState } from 'react';
import { CurrencyDollar, MapPin, Timer } from 'phosphor-react';
import illustration from '../../assets/Illustration.svg';

import styles from './styles.module.css';

interface Address {
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  pagamento: 'Cartão de Crédito' | 'Cartão de Débito' | 'Dinheiro';
}

export function Order() {
  const [userAddress, setUserAddress] = useState<Address | null>();
  useEffect(() => {
    const address = localStorage.getItem('@coffee-delivery:checkout')
    setUserAddress(address ? JSON.parse(address) : null);
  }, [])

  return (
    <main>
      <div>
        <h1 className={styles.title}>Uhu! Pedido confirmado</h1>
        <p className={styles.subtitle}>Agora é só aguardar que logo o café chegará até você</p>
      </div>

      <div className={styles.orderConfirmation}>
        <section>
          <div className={styles.confirmationInfo}>
            <span className={styles.confirmationMap}>
              <MapPin size={16} weight='fill' />
            </span>
            <div>
              <span>Entrega em <b>{userAddress?.rua}, {userAddress?.numero}</b></span>
              <span>{userAddress?.bairro} - {userAddress?.cidade}, {userAddress?.uf}</span>
            </div>
          </div>

          <div className={styles.confirmationInfo}>
            <span className={styles.confirmationTime}>
              <Timer size={16} weight='fill' />
            </span>
            <div>
              <span>Previsão de entrega</span>
              <strong>20 min - 30 min</strong>
            </div>
          </div>

          <div className={styles.confirmationInfo}>
            <span className={styles.confirmationCurrency}>
              <CurrencyDollar size={16} weight='fill' />
            </span>
            <div>
              <span>Pagamento na entrega</span>
              <strong>{userAddress?.pagamento}</strong>
            </div>
          </div>
        </section>

        <img src={illustration} alt="" />
      </div>
    </main>
  )
}