# Phones And Repairs UI - GoDaddy Deployment Guide

This repository contains the production-ready front-end for the Phones and Repairs website. All assets, links, and code structures have been optimized for easy deployment to a GoDaddy shared hosting environment.

## 🚀 1. How to Deploy to GoDaddy (via FTP or cPanel)

1. Log in to your GoDaddy account and access **cPanel Admin**.
2. Open the **File Manager**.
3. Navigate to your primary web folder, typically `public_html`.
4. Upload all the files inside this repository directly into `public_html`. (Do not upload the folder itself, but the *contents* inside the folder, so `index.html` sits right inside `public_html`).
5. All links are configured relatively (e.g., `./css/style.css`), so they will work immediately. The `.htaccess` file handles URL routing.

## 🛍️ 2. Expanding the Shop (Adding Products)

The store structure uses a repeated "Card" system. To add a new phone, follow these steps:

1. Open `shop-fully-connected.html` or `shop.html` in any text editor.
2. Search for the HTML comment `<!-- COPIA DESDE AQUÍ PARA NUEVO PRODUCTO (GRID) -->`.
3. Copy the entire `<a>` block down to `<!-- HASTA AQUÍ -->`.
4. Paste it directly below the last product.
5. Update the values inside the cloned block:
   - Change `data-category="apple"` to the correct brand if needed.
   - Change `data-price="1199"` to the correct price.
   - Change the `href="..."` to the new product page you create.
   - Change the `<img src="...">` to point to the new image.
   - Update the text elements (`<h3>` name, `<p>` price).

## ✉️ 3. Configuring the Contact Forms (Backend)

The visual design is complete, but GoDaddy requires a server-side script (like PHP) to actually send the emails.

1. Open `contact-unified-nav.html`.
2. Look for the comment: `<!-- COLOQUE AQUI LA LOGICA DE BACKEND: EJ. action="./backend/mailer.php" method="POST" -->`.
3. Change the `<form>` tag directly beneath it to point to your PHP handler script:
   `<form action="send_email.php" method="POST" class="space-y-8">`
4. Make sure your PHP file processes the `name`, `email`, `phone`, and `message` inputs.
