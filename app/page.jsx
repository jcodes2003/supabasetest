"use client";
import React, { useEffect, useState } from "react";
import supabase from "./supabase-client";

const ProductForm = () => {
  const [products, setProducts] = useState("");
  const [productsList, setProductsList] = useState([]);

  const submit = async (e) => {
    e.preventDefault();

    if (!products.trim()) {
      alert("Please enter a product name.");
      return;
    }

    const { data, error } = await supabase
      .from("tlbprods")
      .insert([{ products }])
      .select();

    if (error) {
      console.error("Error inserting product:", error.message);
      alert("Failed to add product.");
      return;
    }

    console.log("Product added successfully:", data);
    alert("Product added successfully!");

    setProducts(""); // Reset input
    fetchData(); // Refresh list
  };

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("tlbprods").select("products");

      if (error) {
        throw new Error(error.message);
      }

      console.log("Fetched Data:", data);
      setProductsList(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <form onSubmit={submit} className="p-4 bg-gray-100 rounded-lg shadow-md">
        <label className="block text-lg font-semibold mb-2">
          Product Name:
        </label>
        <input
          type="text"
          value={products}
          onChange={(e) => setProducts(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter product name"
        />
        <button
          type="submit"
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>

      <div className="relative overflow-x-auto mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Product Name</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map((product, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.products}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductForm;
