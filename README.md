## Project Structure

- 'server/' - Express.js Backend API
- 'client/' - React (Vite) Frontend

## วิธีการรันโปรเจค แบบ local

### 1. Clone Repository และ Install dependencies

เปิด Terminal

**ฝั่ง Server**

```bash
cd server
npm install
```

**ฝั่ง Client**

```bash
cd client
npm install
```

---

### 2. สร้างไฟล์ .env

- server/.env

```
CLIENT_URL=http://localhost:5173
```

- client/.env

```
VITE_API_URL=http://localhost:3001/products
```

---

### 3. Start Application

```
cd server
npm run dev
```

_รันบนพอร์ต : http://localhost:3001_

```
cd client
npm run dev
```

_รันบนพอร์ต : http://localhost:5173_

---
