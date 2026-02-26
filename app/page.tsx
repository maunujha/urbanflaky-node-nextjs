async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div style={{ padding: "40px" }}>
      <h1>UrbanFlaky Store</h1>

      <div style={{ display: "grid", gap: "20px" }}>
        {products.map((product: any) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h3>₹ {product.price}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
