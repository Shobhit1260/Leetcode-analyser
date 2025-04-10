import { createPartFromBase64, createPartFromUri, createUserContent, GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";
const ai = new GoogleGenAI({ apiKey: "AIzaSyArPbMj-lZKcgDbKwt0iPsM5N9OSSxpLXk" });
const userName1 = "risshi-codes";
const userName2 = "ashutoshmaurya12137";

// //this function is to interact with the images  and genratethe content from the text or from the images
// // async function main(prompt) {
// //     const image = await ai.files.upload({
// //         file: "images/organ.jpg",
// //     });
// //     const response = await ai.models.generateContent({
// //         model: "gemini-2.0-flash",
// //         contents: [
// //             createUserContent([
// //                 prompt,
// //                 createPartFromUri(image.uri,image.mimeType),
// //             ]),
// //         ],
// //     });
// //     console.log(response.text);
// // }

// console.log(summaryReport1);
// console.log(summaryReport2);
// console.log(topicWiseSolvedProblems1);
// console.log(topicWiseSolvedProblems2);

async function main(prompt) {
    if (!global.chat) {
        global.chat = ai.chats.create({
            model: "gemini-2.0-flash",
            config: {
                systemInstruction:""
            },
            history: [
                {
                    role: "user",
                    parts: [
                        {
                            text: "hello",
                        },
                    ],
                },
                {
                    role: "model",
                    parts: [
                        {
                            text: "Great to meet you. What would you like to know?",
                        },
                    ],
                },
            ],
        });
}
    const response = await global.chat.sendMessage({
        message: prompt,
    });
    console.log("Model: ", response.text);
}


// const prompt = `You need to behave as an evaluator, There is a person named: ${userName1} and his leetcode profile summary which is an object you have to go through the whole object to understand their profile better looks like this: ${summaryReport1} and his topic wise problem solved is ${topicWiseSolvedProblems1} .There also one person named: ${userName2} and his leetcode profile summary is like this: ${summaryReport2} his topic wise problem solved is ${topicWiseSolvedProblems2}. the given data is in the object format so you have to read it deep dive . so take your time to evalute this . and if something occurs in the data   which you can't read then ignore that but don't write about it in the response. anlayze both profiles with your best with the given data,You need to evaluate both the user data considering all the factors like contest rating then number of question solved on the important and the hard topics and you have also to see that number of question solved in easy, medium, hard. The user whose performance is no as good as other make joke of him like anything, you are allowed to use bad words too and the person who's profile is good praise him like anything. Also some data may have links ignore the links, you don't have to scrape. Your response should only include the evaluation result nothing else as it will passed to the frontend app directly. Directly give the response as if you were talking to him. You can use emojis also. Also don't print uncessary [object] [object]thing, handle carefully. Basically analyse everything carefully. Also the answer should be of medium length not too long, not too small, i.e. medium - to a bit long length. Also make sure you heavily criticize and make joke out of the person having not soo good profile. If profiles are almost equal praise both and you should have to take your time to analyze everything`

// await main(prompt);

async function start() {

    while(true){
       const prompt = readlineSync.question('Enter you question? ');
        if (prompt !== "") {
            await main(prompt);
        }
    }
}
start();







// const model = genAi.getGenerativeModel({
//     model: "gemini-2.0-flash"
// });


// async function comparisonHandler(){
    
//     try {
//         // Generate response
//         const response = await model.generateContent(prompt);
//         const result = response.response.text();

//         // Return the reponse
//         return {
//             statusCode: 200,
//             body: JSON.stringify({
//                 message: result,
//             })
//         }
//     }
//     catch (error) {
//         console.log(error)
//         return {
//             statusCode: 500,
//             body: JSON.stringify({
//                 message: "Server error",
//             })
//         }
//     }
// } 

// const comparison = comparisonHandler();
// console.log(comparison);
