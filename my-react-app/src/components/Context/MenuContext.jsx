import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const MenuContext = createContext();

// Provider component
export const MenuProvider = ({ children }) => {
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

  // Fetch menu data on mount
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

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
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

  // Update cart item quantity
  const updateCartQuantity = (itemId, qty) => {
    setCart((prev) =>
      prev.map((c) =>
        c.item.item_id === itemId ? { ...c, quantity: qty } : c
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((c) => c.item.item_id !== itemId));
  };

  // Total cart value
  const cartTotal = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);

  // Search handler
  const handleSearch = () => {
    const item = data.find(
      (d) => d.name.toLowerCase() === searchQuery.trim().toLowerCase()
    );
    if (item) {
      setSelectedItem(item);
      setQuantity(1);
      setSearchQuery("");
    } else {
      alert("Item not found");
    }
  };

  return (
    <MenuContext.Provider
      value={{
        data,
        setData,
        selectedItem,
        setSelectedItem,
        cartOpen,
        setCartOpen,
        quantity,
        setQuantity,
        cart,
        handleAddToCart,
        updateCartQuantity,
        removeFromCart,
        cartTotal,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
        handleSearch,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

// Custom hook to use context
export const useMenu = () => useContext(MenuContext);
// import { createContext, useContext, useState, useEffect } from "react";

// // Create the context
// const MenuContext = createContext();

// // Provider component
// export const MenuProvider = ({ children }) => {
//   const [data, setData] = useState([]); // Menu items
//   const [selectedItem, setSelectedItem] = useState(null); // Modal selected item
//   const [cartOpen, setCartOpen] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [cart, setCart] = useState(() => {
//     if (typeof window !== "undefined") {
//       const saved = localStorage.getItem("cart");
//       return saved ? JSON.parse(saved) : [];
//     }
//     return [];
//   });
//   const [filter, setFilter] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch menu items on mount
//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/menu/all");
//         if (!response.ok) return;
//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         console.error("Error fetching menu items:", err);
//       }
//     };
//     fetchMenuItems();
//   }, []);

//   // Sync cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // ------------------ Handle Add To Cart ------------------
//   const handleAddToCart = async (item, qty) => {
//     const userId = localStorage.getItem("user_id"); // Logged-in user
//     const restaurantId = item.restaurant_id; // Restaurant of the item

//     // Update frontend cart
//     setCart((prev) => {
//       const existing = prev.find((c) => c.item.item_id === item.item_id);
//       if (existing) {
//         return prev.map((c) =>
//           c.item.item_id === item.item_id
//             ? { ...c, quantity: c.quantity + qty }
//             : c
//         );
//       }
//       return [...prev, { item, quantity: qty }];
//     });

//     // Reset modal
//     setSelectedItem(null);
//     setQuantity(1);

//     // Send to backend
//     try {
//       const token = localStorage.getItem("access_token"); // JWT token
//       const response = await fetch("http://127.0.0.1:8000/cart/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           user_id: userId,
//           restaurant_id: restaurantId,
//           item_id: item.item_id,
//           quantity: qty,
//           price: item.price,
//         }),
//       });

//       if (!response.ok) {
//         console.error("Failed to save cart item to backend");
//       } else {
//         console.log("Cart item saved successfully");
//       }
//     } catch (err) {
//       console.error("Error adding item to backend cart:", err);
//     }
//   };

//   // Update quantity of a cart item
//   const updateCartQuantity = (itemId, qty) => {
//     setCart((prev) =>
//       prev.map((c) =>
//         c.item.item_id === itemId ? { ...c, quantity: qty } : c
//       )
//     );
//   };

//   // Remove item from cart
//   const removeFromCart = (itemId) => {
//     setCart((prev) => prev.filter((c) => c.item.item_id !== itemId));
//   };

//   // Calculate total
//   const cartTotal = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);

//   // Search handler
//   const handleSearch = () => {
//     const item = data.find(
//       (d) => d.name.toLowerCase() === searchQuery.trim().toLowerCase()
//     );
//     if (item) {
//       setSelectedItem(item);
//       setQuantity(1);
//       setSearchQuery("");
//     } else {
//       alert("Item not found");
//     }
//   };

//   return (
//     <MenuContext.Provider
//       value={{
//         data,
//         setData,
//         selectedItem,
//         setSelectedItem,
//         cartOpen,
//         setCartOpen,
//         quantity,
//         setQuantity,
//         cart,
//         handleAddToCart,
//         updateCartQuantity,
//         removeFromCart,
//         cartTotal,
//         filter,
//         setFilter,
//         searchQuery,
//         setSearchQuery,
//         handleSearch,
//       }}
//     >
//       {children}
//     </MenuContext.Provider>
//   );
// };

// // Custom hook
// export const useMenu = () => useContext(MenuContext);
