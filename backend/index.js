import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { CompareProfiles } from "./src/topics.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY,
});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


const createFunnyComparisonPrompt = (profiles) => {
  const [user1, user2] = profiles;
  const roastTarget = user1.problems.totalSolved < user2.problems.totalSolved ? user1 : user2;
  const appreciateTarget = roastTarget === user1 ? user2 : user1;

  return `
  You are a savage coding expert with a hilarious sense of humor. Two coders just shared their LeetCode stats. Your job is to act like a friend who's reviewing both and hilariously roasts the weaker performer. Use smart developer humor, sarcastic one-liners, and funny observations about their stats. Be creative, but keep it all friendly and bantery.
  Refer to their usernames or real names. Make coding jokes (e.g., "Your accuracy is like a JavaScript promise—uncertain") and tease with puns, sass, and nerdy insults.
  Here’s their data:
  
  --- User 1: ${user1.profile.realName || "Anonymous"} ---
  Username: ${user1.username}
  Solved: ${user1.problems.totalSolved}/${user1.problems.totalProblems}
  Accuracy: ${user1.problems.accuracy}%
  Efficiency in contests: ${user1.efficiency}
  Rating: ${user1.effactiveRating}
  Contests Attended: ${user1.totalconstets}
  Badges: ${user1.badges.count} (${user1.badges.names.join(", ")})
  Streaks: Current - ${user1.streaks.current}, Max - ${user1.streaks.max}
  
  --- User 2: ${user2.profile.realName || "Anonymous"} ---
  Username: ${user2.username}
  Solved: ${user2.problems.totalSolved}/${user2.problems.totalProblems}
  Accuracy: ${user2.problems.accuracy}%
  Efficiency in contests: ${user2.efficiency}
  Rating: ${user2.effactiveRating}
  Contests Attended: ${user2.totalconstets}
  Badges: ${user2.badges.count} (${user2.badges.names.join(", ")})
  Streaks: Current - ${user2.streaks.current}, Max - ${user2.streaks.max}
  
  Start the roast as a conversation. First, act impressed with both, then slowly start teasing the weaker one. Say things like “Bro, even ChatGPT feels bad for you,” or “Your badges are so few, I thought it was a React bug.”
   end it with a killer punchline and use funny jokes and natural language.
  `;
};


app.get("/stream", async (req, res) => {
  try {
    const usernames = ["Shobhit_S14", "Risshi-codes"];
    const profiles = await CompareProfiles(usernames);
    const prompt = createFunnyComparisonPrompt(profiles);
async function main() {
    const response = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    for await (const chunk of response) {
      res.write(chunk.text);
    }
    res.end();
  }
  await main(); 
  }
  catch (err) {
    console.error("Error:", err);
    res.status(500).send("Something went wrong!");
  }
});




app.listen(port, () => {
  console.log(` Streaming server is running at http://localhost:${port}/stream`);
});
