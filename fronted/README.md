# 🔥 LeetCode Roast Battle - Frontend

An **engaging, funny, and interactive** frontend for comparing two LeetCode profiles with AI-powered roasts!

## 🎭 Features

- **Live AI Roasting**: Watch as Gemini AI generates hilarious, savage comparisons between two coders in real-time
- **Stunning Animations**: Smooth transitions, rotating trophies, pulsing effects, and bouncing elements
- **Real-time Streaming**: See the roast appear word-by-word as the AI generates it
- **Funny Loading States**: Rotating humorous messages while waiting for the roast
- **Dark Mode Design**: Eye-catching gradients with vibrant colors and emojis
- **Fully Responsive**: Works beautifully on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- **Backend server running** on `http://localhost:3000`

### Installation

1. Navigate to the frontend directory:
```bash
cd fronted
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and go to `http://localhost:5173`

## 🎮 How to Use

1. **Enter Usernames**: Type two valid LeetCode usernames into the input fields
2. **Start the Battle**: Click the **"START ROAST BATTLE!"** button
3. **Watch the Magic**: Enjoy hilarious loading messages while the AI analyzes profiles
4. **Read the Roast**: Watch as the AI-generated roast streams in real-time
5. **Reset & Repeat**: Click **"RESET"** to start a new battle

## 🎨 Tech Stack

- **React 19** - Latest React with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 3** - Utility-first styling
- **Lucide React** - Beautiful icon library
- **Fetch API** - For streaming responses from backend

## 🔗 Backend Integration

This frontend connects to the backend at `http://localhost:3000/stream` and expects:

**Request:**
```json
{
  "user1": "username1",
  "user2": "username2"
}
```

**Response:** 
Streaming text (chunked transfer encoding) with AI-generated roast

## 📁 Project Structure

```
fronted/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point
│   ├── index.css        # Global styles + custom animations
│   └── App.css          # Component-specific styles
├── public/              # Static assets
├── index.html           # HTML template
└── package.json         # Dependencies
```

## 🎯 Key Features Explained

### Streaming Response
The app uses the Fetch API with `ReadableStream` to display the AI roast in real-time as it's being generated.

### Funny Loading Messages
Rotates through 8 different humorous messages every 2 seconds while fetching:
- "🔥 Warming up the roast machine..."
- "😈 Preparing savage developer jokes..."
- "💀 Collecting receipts from LeetCode servers..."
- And more!

### Dynamic Animations
- Rotating trophy emojis on player avatars
- Pulsing glow effects on buttons
- Bouncing VS badge
- Smooth hover transformations

## 🐛 Troubleshooting

**Error: "Backend took a coffee break"**
- Make sure the backend server is running on port 3000
- Check that both usernames are valid LeetCode profiles

**Streaming not working:**
- Verify CORS is enabled in the backend
- Check browser console for errors

**Styles not loading:**
- Run `npm install` to ensure Tailwind is installed
- Clear browser cache

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎉 Fun Easter Eggs

- Trophies rotate every 3 seconds with random emojis
- Hover effects on all interactive elements
- Smooth color transitions throughout
- Witty error messages if something goes wrong

## 👨‍💻 Developer

Made with 💻 and lots of ☕ by **@BabuBhaiya**

---

**May your bugs be few and your LeetCode rating be high!** 🙏

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
