# E-Commerce API

A backend API for an e-commerce application, built with **Node.js, Express, Prisma ORM, and PostgreSQL**.  
It supports product management, authentication, wishlists, and admin features.

---

##  Features
- User authentication & authorization (JWT)
- Product CRUD (Create, Read, Update, Delete)
- Image upload (up to 9 images per product)
- Wishlist management
- Admin management (promote users to admin, manage products)
- PostgreSQL with Prisma ORM

---

##  Tech Stack
- **Node.js** + **Express.js**
- **Prisma ORM** with PostgreSQL
- **Multer / Cloudinary** (for file uploads)
- **JWT Authentication**
- **TypeScript** (if enabled)

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Couragenwanduka/Bulky_test_frontend.git
cd Bulky_test_frontend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Environment variables
Create a `.env` file in the root folder and add the following:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce_db"

# JWT
JWT_SECRET="your_jwt_secret_here"
JWT_EXPIRES_IN="7d"

# File uploads (Cloudinary example)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

 See `.env.example` for guidance.

### 4️⃣ Prisma setup
Run migrations and generate the Prisma client:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

(Optional) To seed the database:
```bash
npm run seed
```

### 5️⃣ Start the server
```bash
npm run dev   # for development (with nodemon)
npm start     # for production
```
