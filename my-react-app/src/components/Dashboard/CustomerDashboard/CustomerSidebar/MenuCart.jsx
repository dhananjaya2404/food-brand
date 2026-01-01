import { useMenu } from "../../../Context/MenuContext.jsx";
function MenuCart() {
  const { cart, updateCartQuantity, removeFromCart } = useMenu();
  if (!cart || cart.length === 0) return null;
  const handlePlaceOrder = async () => {
  const token = localStorage.getItem("access_token"); // get logged-in token
  if (!token) {
    alert("Please login first!");
    return;
  }

  const orderData = {
    user_token: token, 
    items: cart.map(c => ({
      item_id: c.item.item_id,
      name: c.item.name,
      quantity: c.quantity,
      price: c.item.price,
      total: c.item.price * c.quantity,
    })),
    totalAmount: cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0) + 50, // including delivery
    deliveryCharge: 50,
  };

  console.log("Order Data:", orderData);

  try {
    const response = await fetch("http://127.0.0.1:8000/menu/add", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // send token for auth
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) throw new Error("Failed to place order");
    const result = await response.json();
    console.log("Server Response:", result);

    alert("Order Placed Successfully!");
    setCart([]);
    setCartOpen(false);
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Failed to place order. Try again.");
  }
};

  return (
    <section className="p-6 rounded-3xl  max-w-4xl mx-auto mb-10">
      <div className="flex flex-col gap-6">
        {cart.map((c, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 shadow-md flex flex-col lg:flex-row gap-4 items-center relative border-2 border-green-500"
          >
            <button
              onClick={() => removeFromCart(c.item.item_id)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 font-bold text-lg z-10"
            >
              ✕
            </button>
            <img
              src={c.item.image_url}
              alt={c.item.name}
              className="w-full lg:w-48 h-48 object-cover rounded-2xl"
            />
            <div className="flex-1 flex flex-col justify-between h-full w-full">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg text-gray-800">
                    {c.item.name}
                  </span>
                  <span className="text-xs text-green-600 font-semibold">
                    {c.item.food_type === "veg" ? "Veg" : "Non-Veg"}
                  </span>
                </div>
                <span className="text-sm text-blue-500 mb-2 block">
                  {c.item.restaurant_type || "Restaurant"}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-red-500">
                  ₹{c.item.price * c.quantity}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateCartQuantity(
                        c.item.item_id,
                        c.quantity > 1 ? c.quantity - 1 : 1
                      )
                    }
                    className="bg-gray-300 text-gray-800 px-3 py-1 rounded-lg font-bold"
                  >
                    -
                  </button>
                  <span className="font-semibold text-gray-800">{c.quantity}</span>
                  <button
                    onClick={() =>
                      updateCartQuantity(c.item.item_id, c.quantity + 1)
                    }
                    className="bg-gray-300 text-gray-800 px-3 py-1 rounded-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-4 text-gray-800 font-semibold text-lg">
                <div className="flex justify-between">
                  <span className="font-bold text-sm text-gray-800">
                    Delivery Charge:
                  </span>
                  <span className="font-bold text-sm text-gray-800">₹50</span>
                </div>
                <div className="flex justify-between text-2xl font-bold">
                  <span className="font-bold text-sm text-gray-800">Grand Total:</span>
                  <span className="font-bold text-sm text-gray-800">
                    ₹{c.item.price * c.quantity + 50}
                  </span>
                </div>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold w-full"
              >
                Place Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default  MenuCart;
