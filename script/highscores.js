
const highScoresList = document.querySelector('#high-scores-list')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoresList.innerHTML =
highScores.map(score => {
  return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')

//------Use this if you need to delete the list

// function deleteItem() {
//   localStorage.removeItem("highScoresList");
// }
// deleteItem()
