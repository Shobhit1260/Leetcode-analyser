import React, { useState } from 'react';
import { Trophy, Menu, User, RefreshCw, Sparkles } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


function App() {
  const [isfeedback, setFeedback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

    const loadingMessages = [
    "Stalking LeetCode profiles... 🕵️",
    "Counting all those easy problems... 😏",
    "Checking who actually does hard problems... 💀",
    "Reading contest histories... 📊",
    "Preparing the roast... 🔥",
    "AI is typing... ⌨️",
  ];

  const [currentLoadingMsg, setCurrentLoadingMsg] = useState(loadingMessages[0]);

  const handleGetFeedback = async () => {
    if (!user1 || !user2) {
      alert('Whoa there! 🛑 Need TWO LeetCode warriors to compare!');
      return;
    }

    setFeedback(true);
    setLoading(true);
    setIsStreaming(true);
    setFeedbackText('');

    // Rotate loading messages
    let msgIndex = 0;
    const msgInterval = setInterval(() => {
      msgIndex = (msgIndex + 1) % loadingMessages.length;
      setCurrentLoadingMsg(loadingMessages[msgIndex]);
    }, 2000);

    try {
      const response = await fetch('http://localhost:3000/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user1: user1,
          user2: user2,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Backend said NO! Check if server is running on port 3000.');
      }

      clearInterval(msgInterval);
      setLoading(false);

      if (!response.body) {
        throw new Error('No response body received from server');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setIsStreaming(false);
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        setFeedbackText((prev) => prev + chunk);
      }
    } catch (error) {
      clearInterval(msgInterval);
      console.error('Error fetching roast:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setFeedbackText(
        `🚨 ERROR ALERT! 🚨\n\nLooks like the backend took a coffee break ☕\n\nMake sure:\n✅ Backend server is running (npm start in /backend)\n✅ It's on http://localhost:3000\n✅ Both usernames are valid LeetCode profiles\n\nError details: ${errorMessage}\n\n🤓 Pro tip: Check the console for more sass.`
      );
      setLoading(false);
      setIsStreaming(false);
    }
  };
 
  const handleReset = () => {
    setFeedback(false);
    setLoading(false);
    setFeedbackText('');
    setUser1('');
    setUser2('');
    setIsStreaming(false);
  };

  const trophyEmojis = ['🏆', '🥇', '🥈', '🥉', '🎖️', '👑'];
  const [trophy1, setTrophy1] = useState('🏆');
  const [trophy2, setTrophy2] = useState('🏆');

  // Randomly change trophies for fun
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTrophy1(trophyEmojis[Math.floor(Math.random() * trophyEmojis.length)]);
      setTrophy2(trophyEmojis[Math.floor(Math.random() * trophyEmojis.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50 border-b-2 border-indigo-200">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2.5 rounded-xl shadow-lg">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  LeetCode Roast Battle
                </h1>
                <p className="text-gray-600 text-sm">
                  May the better coder survive 😈
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                <User className="w-6 h-6 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Instructions */}
        {!isfeedback && (
          <div className="mb-8 bg-gradient-to-r from-orange-100 to-pink-100 border-2 border-orange-300 p-5 rounded-xl shadow-sm">
            <p className="text-center text-gray-800 font-medium text-lg">
              ⚡ Pick your fighters! Enter two LeetCode usernames and let the AI roast begin! ⚡
            </p>
            <p className="text-center text-gray-600 text-sm mt-1">
              Warning: Might hurt feelings 😅
            </p>
          </div>
        )}

        {/* Player Avatars */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-12">
          {/* Player 1 */}
          <div className="relative group">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl flex items-center justify-center transform group-hover:scale-105 transition-transform border-4 border-white">
              <span className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
                {user1 ? user1[0].toUpperCase() : '🤔'}
              </span>
            </div>
            {user1 && (
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-full shadow-lg border-2 border-white">
                <span className="font-bold text-white text-sm">{user1}</span>
              </div>
            )}
          </div>

          {/* VS Badge */}
          <div className="relative">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-3xl md:text-4xl font-black px-8 py-4 rounded-2xl shadow-xl transform hover:scale-110 hover:rotate-3 transition-all border-4 border-white">
              VS
            </div>
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce">⚔️</div>
          </div>

          {/* Player 2 */}
          <div className="relative group">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 shadow-xl flex items-center justify-center transform group-hover:scale-105 transition-transform border-4 border-white">
              <span className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
                {user2 ? user2[0].toUpperCase() : '🤔'}
              </span>
            </div>
            {user2 && (
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-full shadow-lg border-2 border-white">
                <span className="font-bold text-white text-sm">{user2}</span>
              </div>
            )}
          </div>
        </div>


       
        {/* Input Forms */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 mt-16">
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-200 w-full md:w-80 hover:border-indigo-400 transition-colors">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
              <span>👤 Fighter #1</span>
            </label>
            <input
              type="text"
              value={user1}
              onChange={(e) => setUser1(e.target.value)}
              placeholder="Enter username..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all font-medium"
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-200 w-full md:w-80 hover:border-purple-400 transition-colors">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
              <span>👤 Fighter #2</span>
            </label>
            <input
              type="text"
              value={user2}
              onChange={(e) => setUser2(e.target.value)}
              placeholder="Enter username..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all font-medium"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <RefreshCw className="w-5 h-5" />
            Reset Battle
          </button>
          <button
            onClick={handleGetFeedback}
            disabled={loading || isStreaming}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Sparkles className="w-5 h-5" />
            {loading ? '🔥 Roasting...' : '⚡ Start Roast!'}
          </button>
        </div>

        {/* Feedback Section */}
        <div className="flex justify-center min-h-[400px] items-start">
          {!isfeedback ? (
            <div className="relative">
              <div className="w-72 h-72 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl flex flex-col items-center justify-center transform hover:rotate-2 transition-all">
                <span className="text-8xl mb-3 animate-bounce">⚔️</span>
                <p className="text-white font-bold text-xl">Ready to rumble?</p>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl w-full">
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-indigo-200">
                <div className="p-8">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center gap-6 py-16 min-h-[300px]">
                      <div className="w-64 h-64">
                      </div>
                      <p className="text-gray-700 font-semibold text-lg text-center animate-pulse max-w-md">
                        {currentLoadingMsg}
                      </p>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 rounded-xl mb-6 text-center shadow-lg">
                        <h2 className="text-white font-bold text-2xl flex items-center justify-center gap-3">
                          <span>🔥</span>
                          The Roast is Served
                          <span>🔥</span>
                        </h2>
                      </div>
                      <div className="bg-gradient-to-br from-gray-50 to-indigo-50 p-6 rounded-xl border-2 border-indigo-100">
                        <pre className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap font-sans">
                          {feedbackText || '🤔 Hmm, the AI seems speechless...'}
                        </pre>
                      </div>
                      {isStreaming && (
                        <div className="mt-4 text-center">
                          <p className="text-indigo-600 font-semibold text-sm flex items-center justify-center gap-2">
                            <span className="animate-pulse">✨</span>
                            AI is still typing...
                            <span className="animate-pulse">✨</span>
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 bg-white border-t-2 border-indigo-200">
        <div className="text-center">
          <p className="text-gray-700 font-semibold mb-2 flex items-center justify-center gap-2">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>and lots of</span>
            <span>☕</span>
          </p>
          <p className="text-gray-600 text-sm">
            GitHub: <span className="text-indigo-600 font-bold">@BabuBhaiya</span>
          </p>
          <p className="text-gray-500 text-xs mt-2 italic">
            "Keep calm and solve LeetCode" 🧠
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;