import axios from "axios";
import { URL_MAP, WINDOW_SIZE } from "../utils/constant.js";]

let window = [];

export const getNumbers = async (req, res) => {
  const numberid = req.params.numberid;

 
  const endpoint = URL_MAP[numberid];

  if (!endpoint) {
    return res.status(400).json({ error: "Invalid number ID" });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 500); 

  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      headers: { Authorization: process.env.AUTH_TOKEN }, 
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const newNumbers = response.data.numbers || [];
    const prevState = [...window];

    
    newNumbers.forEach((num) => {
      if (!window.includes(num)) {
        window.push(num);
        if (window.length > WINDOW_SIZE) window.shift(); // Maintain window size
      }
    });

    const avg =
      window.length > 0
        ? parseFloat(
            (window.reduce((a, b) => a + b, 0) / window.length).toFixed(2)
          )
        : 0.0;

    return res.json({
      windowPrevState: prevState,
      windowCurrState: window,
      numbers: newNumbers,
      avg,
    });
  } catch (err) {
    console.error("External API failed or timed out:", err.message);
    return res.status(500).json({ error: "External API failed or timed out" });
  }
};
