import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();

app.use(express.json());

// API v1 Mock Routes matching Postman Collection
app.post('/api/v1/customer/login', (req, res) => {
  const { username } = req.body;
  res.json({
    success: true,
    error: null,
    error_no: 0,
    data: {
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.demo_token_backend",
      expires: 1793639004
    }
  });
});

app.get('/api/v1/customer/me', (req, res) => {
  res.json({
    success: true,
    error: null,
    error_no: 0,
    data: {
      user: {
        id: 1,
        username: "ixarapitiy04@gmail.com",
        first_name: "Jahid",
        last_name: "Limon",
        email: "ixarapitiy04@gmail.com",
        address: "Sector 3, Uttara",
        city: "Dhaka",
        state: "Dhaka",
        country: "Bangladesh",
        postal_code: "1230",
        phone: "01894084242",
        created_at: "2025-12-21 17:57:50",
        updated_at: "2026-10-18 01:02:05"
      }
    }
  });
});

app.post('/api/v1/customer/register', (req, res) => {
  res.json({
    success: true,
    error: null,
    error_no: 0,
    data: {
      last_row: 7
    }
  });
});

app.post('/api/v1/order/create', (req, res) => {
  const invoice = Math.floor(100000000 + Math.random() * 900000000);
  res.json({
    success: true,
    error: null,
    error_no: 0,
    data: {
      order_id: 33,
      invoice_number: invoice,
      callback_url: null
    }
  });
});

app.get('/api/v1/order/invoice', (req, res) => {
  const invoiceNo = req.query.invoice || '684058321';
  res.json({
    success: true,
    error: null,
    error_no: 0,
    data: {
      id: 33,
      tenant_id: 1,
      invoice: String(invoiceNo),
      shipping_id: 1,
      location_id: 1,
      shipping_name: "Jahid Limon",
      shipping_phone: "01894084242",
      shipping_address: "Sector 3, Uttara, Dhaka",
      shipment_type: "normal",
      total_cart_item: 1,
      total_cart_item_price: "3960.00",
      total_discount: "540.00",
      total_shipping_cost: "60.00",
      subtotal: "3480.00",
      status: 0,
      created_at: "2026-10-18 22:35:33",
      updated_at: "2026-10-18 22:35:33",
      items: [
        {
          id: 18,
          order_id: 33,
          product_id: 108565,
          variant_id: 1,
          product_name: "Victoria's Secret Very Sexy Eau De Parfum Spray 100ml",
          variant_info: '{"size":"100ml"}',
          quantity: 1,
          unit_price: 3960,
          price_total: 3960,
          shipping_total: 0,
          discount_total: 540,
          item_total: 3420
        }
      ],
      payments: [
        {
          id: 13,
          order_id: 33,
          method_id: 2,
          amount: 3480,
          status: 0,
          created_at: "2026-10-18 22:35:33"
        }
      ]
    }
  });
});

app.get('/api/v1/order/track', (req, res) => {
  const invoiceNo = req.query.invoice || '684058321';
  res.json({
    success: true,
    error: null,
    error_no: 0,
    data: {
      id: 33,
      invoice: String(invoiceNo),
      shipping_name: "Jahid Limon",
      shipping_phone: "01894084242",
      shipping_address: "Sector 3, Uttara, Dhaka",
      status: 1,
      created_at: "2026-10-18 22:35:33",
      deliveries: "In Transit with RedX Courier"
    }
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WellSell BD Server running with SSR & API routes on http://localhost:${PORT}`);
  });
}

startServer();
