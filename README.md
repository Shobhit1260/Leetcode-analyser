# 🔥 LeetCode Roast Battle Analyzer

An **entertaining and engaging** full-stack application that compares two LeetCode profiles and generates **hilarious AI-powered roasts** using Google's Gemini AI!

## 🎭 What Does It Do?

Enter two LeetCode usernames, and watch as our AI analyzes their:
- Problems solved
- Contest ratings  
- Accuracy percentages
- Badges earned
- Coding streaks
- Contest efficiency

Then it generates a **savage, funny roast** comparing their skills with developer humor, sarcastic one-liners, and witty observations! 😂

## ✨ Features

### Frontend 🎨
- **Real-time AI Streaming** - Watch the roast appear word-by-word
- **Stunning Animations** - Rotating trophies, pulsing effects, smooth transitions
- **Funny Loading States** - Humorous messages while the AI "warms up"
- **Dark Mode Design** - Eye-catching gradients and vibrant colors
- **Fully Responsive** - Works on all devices

### Backend ⚡
- **LeetCode Profile Fetching** - Comprehensive data from GraphQL API
- **AI-Powered Roasting** - Gemini 2.0 Flash for hilarious comparisons
- **Streaming Responses** - Chunked transfer for real-time experience
- **Contest Analysis** - Detailed efficiency and rating calculations

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/Shobhit1260/Leetcode-analyser.git
cd Leetcode-analyser
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
API_KEY=your_google_gemini_api_key_here
```

Start the backend server:
```bash
npm start
```
Backend will run on `http://localhost:3000`

### 3. Setup Frontend
Open a **new terminal** and run:
```bash
cd fronted
npm install
npm run dev
```
Frontend will run on `http://localhost:5173`

### 4. Start Roasting! 🎉
1. Open `http://localhost:5173` in your browser
2. Enter two LeetCode usernames
3. Click **"START ROAST BATTLE!"**
4. Enjoy the hilarious AI-generated roast!

## 📁 Project Structure

```
leetcode-analyser/
├── backend/
│   ├── index.js           # Express server + Gemini integration
│   ├── src/
│   │   └── topics.js      # LeetCode API fetching & analysis
│   └── package.json
│
├── fronted/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── index.css      # Tailwind + custom animations
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **Node.js + Express** - Server framework
- **Google Gemini AI** - AI roast generation
- **Axios** - LeetCode GraphQL queries
- **leetcode-query** - Helper library
- **CORS** - Cross-origin support

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS 3** - Styling
- **Lucide React** - Icons
- **Fetch API** - Streaming responses

## 🎯 How It Works

1. **User Input** → Frontend sends two usernames to backend
2. **Data Fetching** → Backend queries LeetCode GraphQL API for both profiles
3. **Analysis** → Calculates metrics (efficiency, rating, streaks, etc.)
4. **AI Prompt** → Creates a funny comparison prompt for Gemini
5. **Streaming** → Gemini generates roast, streamed back to frontend
6. **Display** → Frontend shows roast in real-time with animations

## 📊 Backend API

### `POST /stream`

Compares two LeetCode profiles and streams AI roast.

**Request Body:**
```json
{
  "user1": "leetcode_username_1",
  "user2": "leetcode_username_2"
}
```

**Response:** 
Streaming text with AI-generated roast (chunked transfer encoding)

**Example:**
```bash
curl -X POST http://localhost:3000/stream \
  -H "Content-Type: application/json" \
  -d '{"user1":"user1","user2":"user2"}'
```

## 🎨 Screenshots & Features

### Key Frontend Features:
- 🏆 Animated player avatars with rotating trophy emojis
- ⚔️ Epic VS battle design
- 🔥 Gradient buttons with hover effects
- 💬 Real-time streaming roast display
- 😂 8 different funny loading messages
- 🎯 Professional error handling with humor

### Backend Analysis Includes:
- Total problems solved (Easy/Medium/Hard)
- Contest efficiency percentage
- Effective rating calculation
- Current & max coding streaks
- Badge collection
- Accuracy by difficulty

## 🐛 Troubleshooting

**Backend won't start:**
- Check if `.env` file exists with valid `API_KEY`
- Ensure port 3000 is available

**Frontend errors:**
- Make sure backend is running first
- Check CORS settings in backend (`http://localhost:5173`)

**No roast appearing:**
- Verify both usernames are valid LeetCode profiles
- Check browser console for errors
- Ensure streaming is supported by your browser

## 🤝 Contributing

Feel free to fork, improve, and submit PRs! Some ideas:
- Add more animation effects
- Support for more than 2 users
- Historical comparison data
- Export roast as image/PDF
- Different roast styles (friendly, motivational, etc.)

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**@BabuBhaiya** 

---

**"May your bugs be few and your LeetCode rating be high!"** 🙏🚀
