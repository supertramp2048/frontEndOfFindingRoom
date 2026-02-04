# Empty Room Filter - Frontend

A modern Vue 3 + Vite + Tailwind CSS frontend for finding available classrooms based on schedule.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm build
npm run preview
```

## 📋 Features

✅ **Dashboard** - View statistics about schedules, buildings, and rooms  
✅ **Find Rooms** - Search available classrooms by day, time, and building  
✅ **Upload Schedule** - Import schedule data from Excel files  
✅ **Real-time Search** - Instant results with error handling  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Clean UI** - Minimalist design using Tailwind CSS  

## 🏗️ Project Structure

```
src/
├── api/           # Axios HTTP clients
│   ├── client.js  # Base axios instance
│   ├── rooms.js   # Rooms API
│   └── schedule.js # Schedule API
├── components/    # Vue components
│   ├── Header.vue
│   ├── StatsCard.vue
│   ├── SearchForm.vue
│   ├── RoomsList.vue
│   └── UploadForm.vue
├── views/         # Page components
│   ├── Dashboard.vue
│   ├── FindRooms.vue
│   └── UploadSchedule.vue
├── router/        # Vue Router setup
├── store/         # Pinia store
├── assets/        # Styles
├── App.vue        # Root component
└── main.js        # Entry point
```

## 🔌 API Integration

**Backend Base URL:** `http://localhost:3000/api`

### Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/rooms/available` | Get available rooms |
| POST | `/schedule/upload` | Upload schedule |
| GET | `/schedule/stats` | Get statistics |

## 🎨 Tech Stack

- **Vue 3** - Progressive UI framework
- **Vite** - Next generation build tool
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP client
- **Vue Router** - Client-side routing
- **Pinia** - State management

## 📝 Usage

### 1. Dashboard
- View total schedules, buildings, and rooms
- Refresh statistics in real-time

### 2. Find Rooms
- Select day of week (Mon-Sat)
- Enter session times (start and end)
- Choose building
- Set minimum continuous sessions
- View available rooms with time slots

### 3. Upload Schedule
- Drag & drop or browse Excel file
- Supports .xlsx and .xls formats
- Automatic stats update after upload

## 🛠️ Development

### Environment Requirements

- Node.js 16+
- Backend running on http://localhost:3000

### Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint and format code
```

## ⚡ Performance

- **Client-side caching** via Pinia state
- **Optimized bundle** with Vite
- **Lazy loading** with Vue Router
- **Responsive images** with Tailwind CSS

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Next Steps

1. Make sure backend is running on `http://localhost:3000`
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the dev server
4. Open browser to `http://localhost:5173`

## 📞 Support

For issues or questions, check:
- Backend API documentation
- Vue 3 documentation
- Tailwind CSS documentation
