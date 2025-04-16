import { GoogleGenAI } from "@google/genai";
import  LeetCode from "leetcode-query";
import graphql from "leetcode-query";
import axios from "axios";
const leetcode = new LeetCode();

// // graphql api fetching
const getUserData = async (username) => {
  const query = `
    query getUserStats($username: String!) {
      matchedUser(username: $username) {
        profile {
          realName
          userAvatar
          ranking
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
          totalSubmissionNum {
            count
            submissions
          }
        }
        badges {
          displayName
        }
        submissionCalendar
      }
      allQuestionsCount {
        difficulty
        count
      }
      userContestRankingHistory(username: $username){
      attended
      problemsSolved
      totalProblems
      rating
      finishTimeInSeconds
      }
    }
  `;

  try {
    const response = await axios.post(
      'https://leetcode.com/graphql',
      {
          query,
          variables: { username }
      },
      {
          headers: {
              'Content-Type': 'application/json'
          }
      }
     
  )
  return response.data.data;
  } catch (error) {
    console.error(`GraphQL query failed for ${username}:`, error);
    throw error;
  }
};

// Utility functions

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const calculatePercentage = (numerator, denominator) => {
  return ((numerator * 100) / denominator).toFixed(2);
};

const extractBadgeNames = (badges) => {
  return badges?.map(b => b.displayName) || [];
};

// Streak calculations
const calculateCurrentStreak = (submissionCalendar) => {
  const dates = new Set();
  const calendar = typeof (submissionCalendar) === 'string' 
    ? JSON.parse(submissionCalendar) 
    : submissionCalendar;

  for (const timestamp in calendar) {
    const date = new Date(parseInt(timestamp) * 1000);
    dates.add(date.toDateString());
  }

  let streak = 0;
  const currentDate = new Date();
  
  while (true) {
    const dateStr = currentDate.toDateString();
    if (dates.has(dateStr)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
};

const calculateMaxStreak = (submissionCalendar) => {
  const dates = new Set();
  const calendar = typeof (submissionCalendar) === 'string' 
    ? JSON.parse(submissionCalendar) 
    : submissionCalendar;

  for (const timestamp in calendar) {
    const date = new Date(parseInt(timestamp) * 1000);
    dates.add(date.toDateString());
  }

  const sortedDates = Array.from(dates).map(d => new Date(d)).sort((a, b) => a - b);

  let maxStreak = 0;
  let currentStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prev = sortedDates[i - 1];
    const curr = sortedDates[i];
    const diffDays = (curr - prev) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      currentStreak++;
    } else if (diffDays > 1) {
      maxStreak = Math.max(maxStreak, currentStreak);
      currentStreak = 1;
    }
  }

  return Math.max(maxStreak, currentStreak);
};

//  Get Whole Profile
const getProfiledata = async (username) => {
  try {
    const userData = await getUserData(username);
    
    if (!userData?.matchedUser) {
      throw new Error(`No data found for user ${username}`);
    }

    const { matchedUser, allQuestionsCount,userContestRankingHistory } = userData;

    const solvedStats = {};
    const totalStats = {};
    
    matchedUser.submitStats.acSubmissionNum?.forEach(item => {
      solvedStats[item.difficulty] = item.count;
      totalStats[item.difficulty] = item.submissions;
    });

    // Calculate metrics
    const totalProblems = allQuestionsCount?.find(q => q.difficulty === "All")?.count || 0;
    const totalSolved = solvedStats["All"] || 0;
    
    const accuracyData = matchedUser.submitStats.totalSubmissionNum?.find(s => s.difficulty === "All") || {};
    const filteredprofile= userContestRankingHistory.filter(item=>item.attended===true);
    const totalProblemsatcontest=[];
    const solvedProblems=[];
    const finishTime=[];
    const ratings=[];
    filteredprofile.forEach(data=>solvedProblems.push(data.problemsSolved));
    const solvedProblemsNum=solvedProblems.reduce((acc,curr)=>acc+curr,0);
    filteredprofile.forEach(data=>totalProblemsatcontest.push(data.totalProblems));
    const totalProblemsNum=totalProblemsatcontest.reduce((acc,curr)=>acc+curr,0);
    filteredprofile.forEach(data=>ratings.push(data.rating));
    const Totalratings=ratings.reduce((acc,curr)=>acc+curr,0);
    filteredprofile.forEach(data=>finishTime.push(data.finishTimeInSeconds));
    const TotalfinishTime=finishTime.reduce((acc,curr)=>acc+curr,0);
    const totalconstets=filteredprofile.length;
    return {
      totalconstets,
      efficiency:((solvedProblemsNum*100)/totalProblemsNum).toFixed(2)+"%",
      effactiveRating:((Totalratings)/totalconstets).toFixed(0),
      effactiveTime:(TotalfinishTime/totalconstets).toFixed(0),
      profile: {
        realName: matchedUser.profile?.realName,
        avatar: matchedUser.profile?.userAvatar,
        ranking: matchedUser.profile?.ranking,
      },
      problems: {
        easy: solvedStats["Easy"] || 0,
        medium: solvedStats["Medium"] || 0,
        hard: solvedStats["Hard"] || 0,
        totalSolved,
        totalProblems,
        solvedPercentage: calculatePercentage(totalSolved, totalProblems),
        accuracy: calculatePercentage(accuracyData.count, accuracyData.submissions),
        byDifficulty: {
          easy: calculatePercentage(solvedStats["Easy"], totalStats["Easy"]),
          medium: calculatePercentage(solvedStats["Medium"], totalStats["Medium"]),
          hard: calculatePercentage(solvedStats["Hard"], totalStats["Hard"]),
        }
      },
      badges: {
        count: matchedUser.badges?.length || 0,
        names: extractBadgeNames(matchedUser.badges)
      },
      streaks: {
        current: calculateCurrentStreak(matchedUser.submissionCalendar),
        max: calculateMaxStreak(matchedUser.submissionCalendar)
      }
    };

  } catch (error) {
    console.error(`Error analyzing profile ${username}:`, error);
    throw error;
  }
};

// Example usage
export const CompareProfiles = async (usernames) => {
  try {
    const results = [];
    
    for (const username of usernames) {
      // console.log(`Analyzing ${username}...`);
      const result = await getProfiledata(username);
      results.push(result);
      await delay(1500); 
    }
    
    return results;
  } catch (error) {
    console.error("Analysis failed:", error);
  }
};


