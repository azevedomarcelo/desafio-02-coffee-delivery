import { Bank, CreditCard, CurrencyDollar, MapPinLine, Money } from 'phosphor-react';
import { useCart } from '../../hooks/useCart';
import { Numeric } from '../../components/Numeric';
import styles from './styles.module.css';

export function Cart() {
  const { cart, handleQuantityChange, handleRemoveItemFromCart, selectedPaymentMethod, setSelectedPaymentMethod } = useCart();

  const subtotal = cart.reduce((prev, elem) => prev + (elem.price * elem.quantity), 0);
  const total = subtotal + 3.5;
  return (
    <section className={styles.section}>
      <div className={styles.personalDataContainer}>
        <h1 className={styles.personalTitle}>Complete seu pedido</h1>

        <div className={styles.address}>
          <div className={styles.addressHeader}>
            <MapPinLine size={22} />
            <div>
              <p>Endereço de Entrega</p>
              <span>Informe o endereço onde deseja receber seu pedido</span>
            </div>
          </div>

          <div className={styles.formAddress}>
            <input type="text" placeholder="CEP" className={styles.input} style={{
              width: '12.5rem',
            }} />

            <input type="text" placeholder="Rua" className={styles.input} />

            <div className={styles.twoFields}>
              <input type="text" placeholder="Número" className={styles.input} />
              <input type="text" placeholder="Complemento" className={styles.input} style={{ flex: 1,}} />
            </div>

            <div className={styles.threeFields}>
              <input type="text" placeholder="Bairro" className={styles.input} />
              <input type="text" placeholder="Cidade" className={styles.input} style={{ flex: 1,}} />
              <input type="text" placeholder="UF" className={styles.input} style={{ width: '3.75rem' }} />
            </div>
          </div>
        </div>

        <div className={styles.payment}>
          <div className={styles.paymentHeader}>
            <CurrencyDollar size={22} />
            <div>
              <p>Pagamento</p>
              <span>O pagamento é feito na entrega. Escolha a forma que deseja pagar</span>
            </div>
          </div>

          <div className={styles.paymentMethods}>
            <div onClick={() => setSelectedPaymentMethod(1)} className={selectedPaymentMethod === 1 ? styles.selected : ''}>
              <CreditCard />
              Cartão de crédito
            </div>
            <div onClick={() => setSelectedPaymentMethod(2)} className={selectedPaymentMethod === 2 ? styles.selected : ''}>
              <Bank />
              cartão de débito
            </div>
            <div onClick={() => setSelectedPaymentMethod(3)} className={selectedPaymentMethod === 3 ? styles.selected : ''}>
              <Money />
              Dinheiro
            </div>
          </div>
        </div>
      </div>

      <div className={styles.summary}>
        <h1 className={styles.summaryTitle}>Cafés selecionados</h1>

        <div className={styles.cartItems}>
          {cart.map(item => (
            <div key={item.id} className={styles.item}>
              <img src={item.url} alt="" />

              <div className={styles.nameAndQuantity}>
                <span>{item.name}</span>

                <Numeric
                  quantity={item.quantity || 1}
                  onQuantityChange={(quantity: number) =>
                    handleQuantityChange(item.id, quantity)
                  }
                  showTrash={true}
                  removeItem={(id) => handleRemoveItemFromCart(id)}
                />
              </div>

              <span>{Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(item.price)}</span>

              <hr />
            </div>
          ))}


          <div className={styles.totalItems}>
            <span className={styles.text}>Total de itens</span>
            <span className={styles.value}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(subtotal)}
            </span>
          </div>
          <div className={styles.totalItems}>
            <span className={styles.text}>Entrega</span>
            <span className={styles.value}>R$ 3,50</span>
          </div>
          <div className={styles.totalItems}>
            <strong className={styles.textBold}>Total</strong>
            <strong className={styles.valueBold}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(total)}
            </strong>
          </div>


          <button className={styles.btnConfirm}>
            Confirmar pedido
          </button>
        </div>

      </div>
    </section>
  );
}