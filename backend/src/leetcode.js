import {LeetCode} from "leetcode-query";
const leetcode = new LeetCode();

const userName1 = "risshi-codes";
const userName2 = "ashutoshmaurya12137";
async function user_info(userName) {
    try {
        const profile = await leetcode.user(userName);

       return profile;
    } catch (err) {
        console.log(err.message);
    }
}
async function recent_submission(userName){
    try{
        const submissions = await leetcode.recent_submissions(userName,20);
        return submissions;
    }
    catch(err){
        console.log("Err: "+ err.message);
    }
}
async function getContestHistory(userName) {
    try {
      const profile = await leetcode.user_contest_info(userName);
      const contestHistory = profile.userContestRankingHistory; 
      const attendedContests = contestHistory
        .filter(contest => contest.attended)
        .map(({ contest, ...rest }) => rest); // Remove the 'contest' property
      return attendedContests;
    } catch (error) {
      console.error('Error fetching contest history:', error);
    }
}


async function fetchAndAnalyzeUserData(userName) {
  try {
    const userInfo = await user_info(userName);
    const recentSubmissions  = await recent_submission(userName);
    const contestHistory = await getContestHistory(userName);
    const extractUserProfileSummary = async (data) => {
      const questionsCount = {};
      data.allQuestionsCount.forEach(item => {
        questionsCount[item.difficulty] = item.count;
      });

      const acStats = data.matchedUser.submitStats.acSubmissionNum;
      const totalStats = data.matchedUser.submitStats.totalSubmissionNum;

      const solvedStats = {};
      const submissionStats = {};
      acStats.forEach(item => {
        solvedStats[item.difficulty] = item.count;
      });
      totalStats.forEach(item => {
        submissionStats[item.difficulty] = item.submissions;
      });

      const overallSolved = acStats.reduce((sum, item) => sum + item.count, 0);
      const overallSubmissions = totalStats.reduce((sum, item) => sum + item.submissions, 0);
      const overallAccuracy = overallSubmissions > 0
        ? ((overallSolved / overallSubmissions) * 100).toFixed(2)
        : 0;

      const badges = data.matchedUser.badges;
      const badgeCount = badges.length;
      const badgeNames = badges
        .map(badge => badge.name || badge.displayName || "Unknown")
        .filter(name => name && name.trim().length > 0);

      const calculateMaxStreak = async (submissionCalendarStr) => {
        const calendar = JSON.parse(submissionCalendarStr);
        const timestamps = Object.keys(calendar)
          .map(Number)
          .sort((a, b) => a - b);

        let maxStreak = 0;
        let currentStreak = 0;
        let previousDay = null;

        for (const ts of timestamps) {
          const submissions = calendar[ts];
          if (submissions > 0) {
            if (previousDay && ts - previousDay === 86400) {
              currentStreak++;
            } else {
              currentStreak = 1;
            }
            maxStreak = Math.max(maxStreak, currentStreak);
          } else {
            currentStreak = 0;
          }
          previousDay = ts;
        }
        return maxStreak;
      };

      const maxStreak = await calculateMaxStreak(data.matchedUser.submissionCalendar);

      const contributions = data.matchedUser.contributions.points;
      const ranking = data.matchedUser.profile.ranking;
      const userName = data.matchedUser.profile.realName || data.matchedUser.profile.userName;

      return {
        userName,
        totalQuestions: questionsCount['All'] || 0,
        easyQuestions: questionsCount['Easy'] || 0,
        mediumQuestions: questionsCount['Medium'] || 0,
        hardQuestions: questionsCount['Hard'] || 0,
        solvedStats,
        submissionStats,
        overallSolved,
        overallSubmissions,
        overallAccuracy,
        badgeCount,
        badgeNames,
        maxStreak,
        contributions,
        ranking
      };
    };

    const userProfileSummary = await extractUserProfileSummary(userInfo);
    // console.log("User Profile Summary:", userProfileSummary);
    const analyzeContestHistory = (contestHistory) => {

      if (contestHistory && contestHistory.length > 0) {
        const totalContests = contestHistory.length;

        const averageProblemsSolved = (
          contestHistory.reduce((sum, contest) => sum + contest.problemsSolved, 0) / totalContests
        ).toFixed(2);

        const averageTimeCompletion = (
          contestHistory.reduce((sum, contest) => sum + contest.totalTime, 0) / totalContests
        ).toFixed(2);

        const lastContestRating = contestHistory[contestHistory.length - 1].rating || "N/A";

        const highestContestRating = Math.max(
          ...contestHistory.map(contest => contest.rating || 0)
        );

        return {
          totalContests,
          averageProblemsSolved,
          averageTimeCompletion,
          lastContestRating,
          highestContestRating,
        };
      } else {
        console.log("No contest history available for the user.");
        return null;
      }
    };

    const contestAnalysis = analyzeContestHistory(contestHistory);
    // console.log("Contest Analysis:", contestAnalysis);

    return {
      userProfileSummary,
      contestAnalysis,
      // recentSubmissions,
    };
  } catch (error) {
    console.error("Error fetching and analyzing user data:", error);
  }
}

// Example usage:
const userData1 = await fetchAndAnalyzeUserData(userName1);
const userData2 = await fetchAndAnalyzeUserData(userName2);

// console.log(userData1);
// console.log(userData2);
function generateUserProfileSummary(userData) {
  if (!userData || !userData.userProfileSummary || !userData.contestAnalysis) {
    console.log("Invalid user data provided.");
    return "Invalid user data provided.";
  }
  const {
    userName,
    totalQuestions,
    easyQuestions,
    mediumQuestions,
    hardQuestions,
    solvedStats,
    submissionStats,
    overallSolved,
    overallSubmissions,
    overallAccuracy,
    badgeCount,
    badgeNames,
    maxStreak,
    contributions,
    ranking,
  } = userData.userProfileSummary;
  const {
    totalContests,
    averageProblemsSolved,
    averageTimeCompletion,
    lastContestRating,
    highestContestRating,
  } = userData.contestAnalysis;

  const profileSummary = `
This is the profile of ${userName}. They are  a total of ${totalQuestions} questions on the LeetCode platform. Out of these, ${easyQuestions} are easy-level, ${mediumQuestions} are medium-level,and ${hardQuestions} are hard-level problems.${userName} has successfully solved ${solvedStats.All} problems in total, which includes ${solvedStats.Easy || 0} easy, ${solvedStats.Medium || 0} medium, and ${solvedStats.Hard || 0} hard problems.

In terms of submissions, he has made ${submissionStats.Easy || 0} submissions for easy problems, ${submissionStats.Medium || 0} for medium problems, and ${submissionStats.Hard || 0} for hard problems, making a total of ${submissionStats.All} submissions. Out of these, ${overallSolved} were successful submissions, giving an overall accuracy of ${overallAccuracy}%. ${userName} has earned ${badgeCount} badge(s): ${badgeNames.join(", ")}.

Their best historical ranking in the world is ${ranking}, and their longest streak of daily submissions is ${maxStreak} days.In contests, they have participated in ${totalContests} competitions with an average of ${averageProblemsSolved} problems solved per contest. Their most recent contest rating was ${lastContestRating}, while their highest rating achieved so far is ${highestContestRating}.
`;

  console.log(profileSummary);
  return profileSummary;
}

// Example usage:
const userProfileSummary1 = generateUserProfileSummary(userData1);
const userProfileSummary2 = generateUserProfileSummary(userData2);




export {
  userProfileSummary1,
  userProfileSummary2,
};


// Example usage:
// const contestAnalysis1 = analyzeContestHistory(contestHistory1);


// console.log("Total Contests Attended:", totalContests);
// console.log("Average Problems Solved:", averageProblemsSolved);
// console.log("Average Time of Completion:", averageTimeCompletion);
// console.log("Last Contest Rating:", lastContestRating);
// console.log("Highest Contest Rating:", highestContestRating);


// console.log(summaryReport1.solvedStats.All);
// console.log(summaryReport1.solvedStats.Easy);
// console.log(summaryReport1.solvedStats.Medium);
// console.log(summaryReport1.solvedStats.Hard);





// console.log(typeof(summaryReport));
// console.log(typeof(allUserData));
// console.log(typeof(contestHistoryData));

// export {
//     summaryReport1,
//     summaryReport2,
// };

