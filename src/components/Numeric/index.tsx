import { Minus, Plus, Trash } from 'phosphor-react';
import styles from './styles.module.css';

interface NumericProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  showTrash?: boolean;
  removeItem: (index: number) => void;
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

  const removeItemCart = (index: number) => {
    console.log(`Removing ${index}`);
    removeItem(index);
  }

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
        <div className={styles.trash}>
          <Trash onClick={() => removeItemCart} width={16} />
        </div>
      ) : ''}
    </div>
  );
}