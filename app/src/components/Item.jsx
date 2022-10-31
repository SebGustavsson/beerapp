import Card from "./UI/Card";

const Item = (props) => {
  return (
    <Card>
      <ul>
        <li>Name: {props.name}</li>
        <li>Alcohol content: {props.abv}%</li>
        <details>
          <summary>Description</summary>
          {props.description}
        </details>
        <details>
          <summary>Food pairing</summary>
          {props.foodpairing.map((pairing) => {
            return `${pairing}, `;
          })}
        </details>
      </ul>
    </Card>
  );
};

export default Item;
