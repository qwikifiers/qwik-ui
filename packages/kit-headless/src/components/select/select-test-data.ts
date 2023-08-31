export default function SelectTestData() {
  const groups = ['fruit', 'vegetable', 'meat'];
  const options = [
    { name: 'apple', type: 'fruit' },
    { name: 'banana', type: 'fruit' },
    { name: 'orange', type: 'fruit' },
    { name: 'strawberry', type: 'fruit' },
    { name: 'mango', type: 'fruit' },
    { name: 'grape', type: 'fruit' },
    { name: 'watermelon', type: 'fruit' },
    { name: 'pineapple', type: 'fruit' },
    { name: 'kiwi', type: 'fruit' },
    { name: 'pear', type: 'fruit' },
    { name: 'carrot', type: 'vegetable' },
    { name: 'broccoli', type: 'vegetable' },
    { name: 'tomato', type: 'vegetable' },
    { name: 'spinach', type: 'vegetable' },
    { name: 'cucumber', type: 'vegetable' },
    { name: 'lettuce', type: 'vegetable' },
    { name: 'bell pepper', type: 'vegetable' },
    { name: 'onion', type: 'vegetable' },
    { name: 'zucchini', type: 'vegetable' },
    { name: 'sweet potato', type: 'vegetable' },
    { name: 'beef', type: 'meat' },
    { name: 'chicken', type: 'meat' },
    { name: 'pork', type: 'meat' },
    { name: 'lamb', type: 'meat' },
    { name: 'duck', type: 'meat' },
    { name: 'turkey', type: 'meat' },
    { name: 'bacon', type: 'meat' },
    { name: 'sausage', type: 'meat' },
    { name: 'ham', type: 'meat' },
    { name: 'venison', type: 'meat' },
  ];

  return { groups, options };
}
