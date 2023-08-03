import { Minus, Plus, Trash } from 'phosphor-react';
import styles from './styles.module.css';

interface NumericProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  showTrash?: boolean;
  removeItem: () => void;
}

export const Numeric: React.FC<NumericProps> = ({ quantity, onQuantityChange, showTrash, removeItem }) => {

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.numeric}>
        <button onClick={handleDecrease}>
          <Minus />
        </button>
        <span>{quantity}</span>
        <button onClick={handleIncrease}>
          <Plus />
        </button>
      </div>
      {showTrash ? (
        <div className={styles.trash} onClick={removeItem}>
          <Trash width={16} />
        </div>
      ) : ''}
    </div>
  );
}