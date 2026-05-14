"use strict";

class App extends React.PureComponent {
  render() {
    //const sortedProducts = this.props.products.sort((a, b) => a.price - b.price)

    return (
      <div>
        <header>
          Гаражная Распродажа
        </header>
        <h3 className="subtitle">
          Принимаем наличные, Idram, СБП, Venmo, Zelle, USDT, PayPal, переводы.
           Самовывоз на ул. Аргишти. Тгк @natashakarpukhinaa
          <h4>О доступности уточняйте. Для закрепления товара за вами бронируйте. Доп.фото и информация по запросу</h4>
          <p>
            
          </p>
        </h3>
        <ProductList products={this.props.products} />
      </div>
    );
  }
}

const ProductList = (props) => {
  return (
    <div className="container">
      {props.products.map((p, i) => (
        <ProductCard key={i} product={p} />
      ))}
    </div>
  );
};

const ProductCard = (props) => {
  const p = props.product;
  const formatPrice = (p) =>
    p.toLocaleString("hy-AM", {
      style: "currency",
      currency: "AMD",
      maximumFractionDigits: "0",
    });
  const discount = Math.round(100 - (p.price / p.originalPrice) * 100);

  const goWhatsapp = () =>
    window.open(
      `https://t.me/natashakarpukhinaa?text=Привет%2C%20меня интересует%20${p.name}`,
      "_blank"
    );

  return (
    <div className="product">
      <a href={p.url} target="_blank">
        {p.state == "sold" ? (
          <span className="product-span">
            <div className="sold">Продано</div>
            <img
              className="product-img-filter-sold"
              src={p.imageUrl}
              loading="lazy"
            />
          </span>
        ) : (
          ""
        )}
        {p.state == "reserved" ? (
          <span className="product-span">
            <div className="reserved">Забронировано</div>
            <img
              className="product-img-filter-reserved"
              src={p.imageUrl}
              loading="lazy"
            />
          </span>
        ) : (
          ""
        )}
        {p.state == "notavailable" ? (
          <span className="product-span">
            <div className="notavailable">Не доступно</div>
            <img
              className="product-img-filter-notavailable"
              src={p.imageUrl}
              loading="lazy"
            />
          </span>
        ) : (
          ""
        )}
        {p.state == "available" ? (
          <span className="product-span">
            <div className="available">В наличии</div>
            <img className="product-img" src={p.imageUrl} loading="lazy" />
          </span>
        ) : (
          ""
        )}
      </a>
      <div className="product-details">
        <h3>{p.name}</h3>
        {discount > 0 && <span className="discount">-{discount}%</span>}
        <ul>
          {p.details.map((detail) => (
            <li>{detail}</li>
          ))}
        </ul>
      </div>
      <div onClick={goWhatsapp} className="box-price">
        <span className="price">{formatPrice(p.price)}</span>
        <div className="box">
          <img className="icon" src="./telega-icon.png" />
          <button className="payment">Купить</button>
        </div>
      </div>
    </div>
  );
};

// Load the data.json file and parse it
fetch("./data.json")
  .then((response) => response.json())
  .then((productsData) => {
    // Assuming the JSON contains an array of products
    const products = productsData;
    ReactDOM.render(
      <App products={products} />,
      document.getElementById("root")
    );
  });
