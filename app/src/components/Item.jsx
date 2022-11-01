const Item = (props) => {
  return (
    <div className="card" style={{ marginTop: 15 }}>
      <div className="card-header"></div>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">
          Alcohol content: <strong>{props.abv}%</strong>
        </p>
      </div>
      <details style={{ margin: 15 }}>
        <summary>Description</summary>
        {props.description}
      </details>
      <details style={{ margin: 15 }}>
        <summary>Food pairing</summary>
        {props.foodpairing.map((pairing) => {
          return `${pairing}, `;
        })}
      </details>
    </div>
  );
};

export default Item;
<div class="card">
  <div class="card-header">Featured</div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">
      With supporting text below as a natural lead-in to additional content.
    </p>
    <a href="#" class="btn btn-primary">
      Go somewhere
    </a>
  </div>
</div>;
