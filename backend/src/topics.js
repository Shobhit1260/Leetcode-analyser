import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const userName1 = "risshi-codes";
const userName2 = "ashutoshmaurya12137";
export async function leetcodeTopicWise(username) {
  const query = `
    query userTopicWiseStats($username: String!) {
      matchedUser(username: $username) {
        tagProblemCounts {
          advanced {
            tagName
            problemsSolved
          }
          intermediate {
            tagName
            problemsSolved
          }
          fundamental {
            tagName
            problemsSolved
          }
        }
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
      );

      const tagData = response.data.data?.matchedUser?.tagProblemCounts;

      if (!tagData) throw new Error('User not found or data not available');

      // Merge all tags into one array
      const allTags = [
          ...tagData.fundamental,
          ...tagData.intermediate,
          ...tagData.advanced
      ];


      const topicWiseSolved = allTags.filter(tag => tag.problemsSolved > 0);

      return {
          status: 'OK',
          topicWiseSolved
      };

  } catch (error) {
      throw new Error('Failed to fetch topic-wise stats');
  }
}



const topicWiseSolvedProblems1 = await leetcodeTopicWise(userName1);
const topicWiseSolvedProblems2 = await leetcodeTopicWise(userName2);

function formatTopicWiseSolved(username, topicWiseSolved) {
  const filteredTopics = topicWiseSolved.filter(tag => tag.problemsSolved > 25);
  const topicDescriptions = filteredTopics.map(tag => 
    `${tag.problemsSolved} problems in the topic "${tag.tagName}"`
  ).join(', ');
  return `${username} has solved ${topicDescriptions}.`;
}

const topicSolved1 = formatTopicWiseSolved(userName1, topicWiseSolvedProblems1.topicWiseSolved);

const topicSolved2 = formatTopicWiseSolved(userName2, topicWiseSolvedProblems2.topicWiseSolved);

export {
  topicSolved1,
  topicSolved2,
}


