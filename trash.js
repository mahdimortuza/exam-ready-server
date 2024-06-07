
participation.questions = answer;

const quiz = await ExamQuiz.findById(quizId);

let score = 0;
answer.array.forEach((answer: any) => {
  const question = quiz?.question.id(answer.questionId);
  if (question?.correctOption === answer.answer) {
    score += 1;
  }
});

participation.score = score;
participation.completed = true;
await participation.save();




// ==============================



function compareAnswers(participation: any, answer: any) {
  const result = [];

  participation.forEach((obj1) => {
    const obj2 = answer.find((obj) => obj.questionId === obj1.questionId);

    if (obj2) {
      if (obj1.answer === obj2.answer) {
        result.push({ questionId: obj1.questionId, result: 'correct' });
      } else {
        result.push({ questionId: obj1.questionId, result: 'incorrect' });
      }
    } else {
      result.push({
        questionId: obj1.questionId,
        result: 'not found in array2',
      });
    }
  });
  console.log(result);
  return result;
}
compareAnswers(participation, answer);



// ======================
const participation = await Participation.findOne({
  _id: quizId,
});

if (!participation) {
  throw new AppError(httpStatus.NOT_FOUND, 'Participation record not found.');
}

participation.questions = questions;

console.log(participation.questions);
return participation;