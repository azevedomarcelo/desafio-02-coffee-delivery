import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { Bank, CreditCard, CurrencyDollar, MapPinLine, Money } from 'phosphor-react';

import { useCart } from '../../hooks/useCart';
import { Numeric } from '../../components/Numeric';
import { formatCurrency } from '../../utils/formatCurrency';

import styles from './styles.module.css';
import { Link } from 'react-router-dom';

enum PaymentMethods {
  "Cartão de Crédito",
  "Cartão de Débito",
  "Dinheiro",
}

const yupFormSchemaValidation = yup.object({
  cep: yup.string().min(8).required('CEP é obrigatório'),
  rua: yup.string().required('Rua é obrigatório'),
  bairro: yup.string().required('Bairro é obrigatório'),
  cidade: yup.string().required('Cidade é obrigatório'),
  uf: yup.string().min(2, 'Apenas a sigla do estado com 2 caracteres').required('Rua é obrigatório'),
  numero: yup.number().min(1),
  complemento: yup.string().optional(),
  pagamento: yup.mixed().oneOf(Object.values(PaymentMethods)).required('Selecione um método de pagamento!')
})

export function Cart() {
  const { cart, handleQuantityChange, handleRemoveItemFromCart, selectedPaymentMethod, setSelectedPaymentMethod } = useCart();
  const { register, setValue, getValues, handleSubmit } = useForm({
    resolver: yupResolver(yupFormSchemaValidation)
  });

  const handleCEP = useCallback((cep: string) => {
    if (cep.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then(data => {
        if (data.erro) throw new Error('CEP invalido');

        setValue('rua', data.logradouro);
        setValue('bairro', data.bairro);
        setValue('cidade', data.localidade);
        setValue('uf', data.uf);
      }).catch(() => {
        alert('Erro: CEP inválido!');
        setValue('cep', '')
      });
  }, [setValue]);

  function selectPaymentMethod(type: number) {
    setSelectedPaymentMethod(type)
    setValue('pagamento', PaymentMethods[type])
  }

  function handleFinishPayment() {
    localStorage.setItem('@coffee-delivery:checkout', JSON.stringify(getValues()))
  }

  const subtotal = cart.reduce((prev, elem) => prev + (elem.price * elem.quantity), 0);
  const total = subtotal + 3.5;
  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit(handleFinishPayment)}>
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
              <input
                type="text"
                placeholder="CEP"
                className={styles.input}
                style={{ width: '12.5rem', }}
                maxLength={8}

                {...register('cep', {
                  onChange: (e) => handleCEP(e.target.value),
                  required: true,
                })}
              />

              <input
                type="text"
                placeholder="Rua"
                className={styles.input}
                {...register('rua')}
              />

              <div className={styles.twoFields}>
                <input
                  type="text"
                  placeholder="Número"
                  className={styles.input}
                  {...register('numero', {
                    onChange: (e) => setValue('numero', e.target.value),
                    required: true,
                    deps: ["cep"],
                  })}
                />
                <input
                  type="text"
                  placeholder="Complemento"
                  className={styles.input}
                  style={{ flex: 1, }}
                  {...register('complemento', {
                    onChange: (e) => setValue('complemento', e.target.value)
                  })}
                />
              </div>

              <div className={styles.threeFields}>
                <input
                  type="text"
                  placeholder="Bairro"
                  className={styles.input}
                  {...register('bairro')}
                />
                <input
                  type="text"
                  placeholder="Cidade"
                  className={styles.input}
                  style={{ flex: 1, }}
                  {...register('cidade')}
                />
                <input
                  type="text"
                  placeholder="UF"
                  className={styles.input}
                  style={{ width: '3.75rem' }}
                  {...register('uf')}
                />
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

              <div
                onClick={() => selectPaymentMethod(0)}
                className={selectedPaymentMethod === 0 ? styles.selected : ''}
              >
                <CreditCard />
                Cartão de crédito
              </div>

              <div
                onClick={() => selectPaymentMethod(1)}
                className={selectedPaymentMethod === 1 ? styles.selected : ''}
              >
                <Bank />
                cartão de débito
              </div>

              <div
                onClick={() => selectPaymentMethod(2)}
                className={selectedPaymentMethod === 2 ? styles.selected : ''}
              >
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
                    quantity={item.quantity}
                    onQuantityChange={(quantity: number) =>
                      handleQuantityChange(item.id, quantity)
                    }
                    showTrash={true}
                    removeItem={() => handleRemoveItemFromCart(item.id)}
                  />
                </div>

                <span>{formatCurrency(item.price)}</span>

                <hr />
              </div>
            ))}

            <div className={styles.totalItems}>
              <span className={styles.text}>Total de itens</span>
              <span className={styles.value}>
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className={styles.totalItems}>
              <span className={styles.text}>Entrega</span>
              <span className={styles.value}>R$ 3,50</span>
            </div>
            <div className={styles.totalItems}>
              <strong className={styles.textBold}>Total</strong>
              <strong className={styles.valueBold}>
                {formatCurrency(total)}
              </strong>
            </div>

            <Link to="/order" className={styles.btnConfirm} onClick={handleFinishPayment}>
              Confirmar pedido
            </Link>
          </div>

        </div>

      </form>
    </section>
  );
}