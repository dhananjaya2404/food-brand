import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function MenuUI() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/menu/all");
        if (!response.ok) return;
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMenuItems();
  }, []);

  const handleAddToCart = (item, qty) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.item_id === item.item_id);
      if (existing) {
        return prev.map((c) =>
          c.item.item_id === item.item_id
            ? { ...c, quantity: c.quantity + qty }
            : c
        );
      }
      return [...prev, { item, quantity: qty }];
    });
    setSelectedItem(null);
    setQuantity(1);
  };

  const updateCartQuantity = (itemId, qty) => {
    setCart((prev) =>
      prev.map((c) =>
        c.item.item_id === itemId ? { ...c, quantity: qty } : c
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((c) => c.item.item_id !== itemId));
  };
  
  const handleSearch = () => {
  const item = data.find(
        (d) =>
        d.name.toLowerCase() === searchQuery.trim().toLowerCase()
    );
    if (item) {
        setSelectedItem(item);
        setQuantity(1);
        setSearchQuery(""); 
    } else {
        alert("Item not found");
    }
 };


  const cuisines = ["All", "Italian", "American", "Indian", "Chinese"];

  return (
    <main className="animate-fade px-[5%] py-10 relative">
      {/* ================= HERO SECTION ================= */}
      <div id="hero" className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-5">
          Craving Something <span className="text-red-500">Amazing?</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10">
          Premium delivery from the best restaurants in town.
        </p>
        <div className="max-w-xl mx-auto flex gap-2">
            <input
                type="text"
                id="searchInput"
                placeholder="Search for food or restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
            onClick={handleSearch}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-bold"
            >
            Search
            </button>

        </div>
      </div>
      {/* ================= FILTER SECTION ================= */}
      <section id="filterSection" className="mb-10">
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none">
          {cuisines.map((cuisine, index) => (
            <button
              key={index}
              onClick={() => setFilter(cuisine)}
              className={`px-6 py-2 rounded-full border whitespace-nowrap hover:bg-red-100 transition ${
                filter === cuisine
                  ? "border-red-500 text-red-500"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </section>

      {/* ================= MENU GRID ================= */}
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-10">
        Restaurant Menu
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data
          .filter((item) => filter === "All" || item.cuisine === filter)
          .map((item) => (
            <div
              key={item.item_id}
              className={`flex flex-col p-5 rounded-2xl backdrop-blur bg-white/10 border-2 transition ${
                item.food_type === "veg"
                  ? "border-green-500/40"
                  : "border-red-500/40"
              }`}
            >
              <div className="h-40 rounded-xl overflow-hidden mb-4">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-4xl">
                    🍽️
                  </div>
                )}
              </div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    item.food_type === "veg"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {item.food_type}
                </span>
              </div>
              <p className="text-xs text-blue-400 font-semibold mb-2">
                {item.restaurant_type || "Restaurant"}
              </p>
              <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                {item.description || "Deliciously prepared food."}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xl font-extrabold text-red-400">
                  ₹{item.price}
                </span>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* ================= MODAL ================= */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-zinc-900 rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => {
                setSelectedItem(null);
                setQuantity(1);
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <div className="h-52 rounded-xl overflow-hidden mb-4">
              <img
                src={selectedItem.image_url}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">{selectedItem.name}</h2>
            <span className="text-xs text-blue-400 font-semibold mb-2 inline-block">
              {selectedItem.restaurant_type || "Restaurant"}
            </span>
            <p className="text-sm text-gray-400 mb-4">
              {selectedItem.description}
            </p>
            <p className="text-gray-400 mb-4">
              Price: ₹{selectedItem.price} x {quantity} = ₹
              {selectedItem.price * quantity}
            </p>
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                }
                className="bg-gray-600 text-white px-3 py-1 rounded-lg font-bold"
              >
                -
              </button>
              <span className="text-lg font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="bg-gray-600 text-white px-3 py-1 rounded-lg font-bold"
              >
                +
              </button>
            </div>
            <button
              onClick={() => handleAddToCart(selectedItem, quantity)}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-bold w-full"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* ================= CART ICON ================= */}
      {cart.length > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-5 right-5 z-40 bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-xl flex items-center justify-center sm:p-5 sm:bottom-6 sm:right-6"
        >
          🛒
          <span className="absolute -top-2 -right-2 bg-black text-xs px-2 py-0.5 rounded-full">
            {cart.reduce((acc, c) => acc + c.quantity, 0)}
          </span>
        </button>
      )}

      {/* ================= CART POPUP ================= */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 py-8">
          <div className="bg-zinc-100 w-full max-w-3xl p-8 rounded-3xl relative flex flex-col max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setCartOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
            >
              ✕
            </button>
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h3>
            {cart.length === 0 ? (
              <p className="text-gray-500">Cart is empty</p>
            ) : (
              <>
                <div className="flex flex-col gap-6 mb-6">
                  {cart.map((c, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-4 shadow-md flex flex-col lg:flex-row gap-4 items-center relative"
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
                            <span className="font-semibold text-gray-800">
                              {c.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  c.item.item_id,
                                  c.quantity + 1
                                )
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
                            <span className="font-bold text-sm text-gray-800">
                              ₹50
                            </span>
                          </div>
                          <div className="flex justify-between text-2xl font-bold">
                            <span className="font-bold text-sm text-gray-800">
                              Grand Total:
                            </span>
                            <span className="font-bold text-sm text-gray-800">
                              ₹{c.item.price * c.quantity + 50}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => alert("Order Placed!")}
                          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold w-full"
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
