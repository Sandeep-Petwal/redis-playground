import { client2 as client } from './client2.js';
import axios from 'axios';
import express from 'express';

const app = express();

const fetchProductsFromAPI = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data;
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    throw new Error("Unable to fetch products from external API.");
  }
};

const getProductsFromRedis = async () => {
  try {
    const cachedData = await client.get("products");
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error("Error fetching data from Redis:", error);
    throw new Error("Unable to fetch products from Redis.");
  }
};

const saveProductsToRedis = async (data) => {
  try {
    await client.set("products", JSON.stringify(data));
    await client.expire("products", 60); // Expire in 60 seconds
  } catch (error) {
    console.error("Error saving data to Redis:", error);
    throw new Error("Unable to save products to Redis.");
  }
};

const getProducts = async (_, res) => {
  try {
    // if products are available in Redis
    const existingData = await getProductsFromRedis();
    
    if (existingData) {
      console.log("Products available in Redis");
      return res.status(200).json({
        status: "success",
        data: existingData,
      });
    }

    console.log("Products not available in Redis, fetching from API");
    const productsData = await fetchProductsFromAPI();

    await saveProductsToRedis(productsData);

    console.log("Data fetched from dummy API and stored in Redis");
    return res.status(200).json({
      status: "success",
      data: productsData,
    });

  } catch (error) {
    console.error("Error handling /products request:", error.message);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

app.get("/products", getProducts);

app.listen(8000, () => {
  console.log(`Server running on port: 8000`);
});
