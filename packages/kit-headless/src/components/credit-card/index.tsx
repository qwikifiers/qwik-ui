import { $, component$ } from '@builder.io/qwik';
import { useStylesScoped$ } from '@builder.io/qwik';
import creditCardStyle from './credit-card.css?inline';
import { PropFunction } from '@builder.io/qwik';
import { Component } from '@builder.io/qwik';
import { useStore } from '@builder.io/qwik';

export interface ICreditCard {
  cardHolderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface CreditCardProps {
  handleSubmit: PropFunction<(data: ICreditCard) => void>;
}
export const CreditCard: Component<CreditCardProps> = component$(
  (props: CreditCardProps) => {
    useStylesScoped$(creditCardStyle);
    const store = useStore({
      cardHolderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    });
    const handleSubmit = $(() => {
      props?.handleSubmit(store);
    });
    return (
      <span class="wrapper">
        <input
          maxLength={25}
          type="text"
          onInput$={(event) => {
            store.cardHolderName = (event.target as HTMLInputElement).value;
          }}
          value={store.cardHolderName}
          placeholder="Card Holder Name"
        />
        <input
          maxLength={19}
          type="text"
          onInput$={(event) => {
            store.cardNumber = (event.target as HTMLInputElement).value;
          }}
          placeholder="Card Number"
        />
        <div class="date-info">
          <input
            maxLength={5}
            type="text"
            onInput$={(event) => {
              store.expiryDate = (event.target as HTMLInputElement).value;
            }}
            placeholder="MM/YY"
          />
          <input
            type="text"
            maxLength={4}
            onInput$={(event) => {
              store.cvv = (event.target as HTMLInputElement).value;
            }}
            placeholder="CVV"
          />
        </div>
        <button onClick$={handleSubmit}>Submit</button>
      </span>
    );
  }
);
