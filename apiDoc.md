

````markdown
# 🛍️ E-commerce API Documentation

Base URL: `http://localhost:6000/api`

---

## 📌 Authentication & Users

### 🔹 Create User
**POST** `/user`

**Body**
```json
{
  "firstName": "Courage",
  "lastName": "Nduka",
  "email": "courage@example3.com",
  "password": "StrongPass123!"
}
````

---

### 🔹 Login

**POST** `/user/login`

**Body**

```json
{
  "email": "courage@example.com",
  "password": "StrongPass123!"
}
```

---

### 🔹 Get All Users

**GET** `/user/user`

---

### 🔹 Update User

**PUT** `/user/user/:id`

**Body**

```json
{
  "firstName": "UpdatedName",
  "lastName": "UpdatedLast",
  "email": "updated@example.com"
}
```

---

### 🔹 Delete User

**DELETE** `/user/user/:id`

---

## 📌 File Upload

### 🔹 Upload Image

**POST** `/upload`

**Headers**

```
Authorization: Bearer <token>
```

**Body (form-data)**

* `image`: multiple image files

---

## 📌 Products

### 🔹 Create Product

**POST** `/product`

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "name": "iPhone 15 Pro Max",
  "description": "The iPhone 15 Pro Max features a titanium design...",
  "price": 1399.00,
  "stock": 40,
  "imageUrl": [
    "https://res.cloudinary.com/.../bwh873f5bzsdjsqpea44.jpg",
    "https://res.cloudinary.com/.../o9djbgr9lanc8porija4.jpg",
    "https://res.cloudinary.com/.../mlzai8qdmrebs2ea5rzp.jpg",
    "https://res.cloudinary.com/.../ex9bk9e5tbfhctypyhhr.jpg"
  ]
}
```

---

### 🔹 Get All Products

**GET** `/product`

---

### 🔹 Get Product by ID

**GET** `/product/:id`

---

### 🔹 Update Product

**PUT** `/product/:id`

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "name": "iPhone 15 Pro Max",
  "description": "The iPhone 15 Pro Max features a titanium design...",
  "price": 1399.00,
  "stock": 20
}
```

---

## 📌 Cart

### 🔹 Add to Cart

**POST** `/cart/add`

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "productId": "cmfharmrb00020wjehbzdda5x",
  "quantity": 2
}
```

---

### 🔹 Get Cart

**GET** `/cart`

**Headers**

```
Authorization: Bearer <token>
```

---

### 🔹 Update Cart

**PUT** `/cart/update`

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "cartItemId": "cmfhchbri00010wnr2foy9w07",
  "quantity": 5
}
```

---

## 📌 Orders

### 🔹 Create Order

**POST** `/order`

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "items": [
    { "productId": "cmfharmrb00020wjehbzdda5x", "quantity": 2 },
    { "productId": "cmfhaqgqq00010wjewzhtgm5n", "quantity": 1 }
  ],
  "total": 599.97,
  "status": "pending"
}
```

---

### 🔹 Get Orders

**GET** `/order`

**Headers**

```
Authorization: Bearer <token>
```

---

## 📌 Wishlist

### 🔹 Add to Wishlist

**POST** `/wishlist/add`

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "productId": "cmfharmrb00020wjehbzdda5x"
}
```

---

### 🔹 Remove from Wishlist

**DELETE** `/wishlist/remove/:productId`

**Headers**

```
Authorization: Bearer <token>
```

---

### 🔹 Get Wishlist

**GET** `/wishlist`

**Headers**

```
Authorization: Bearer <token>
```

```

---

```
