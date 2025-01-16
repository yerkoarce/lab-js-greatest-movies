// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.

const movies = require("./data")

// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  const directors = moviesArray.map(movie => movie.director)
  let filteredDirectors = []
  for (let i = 0; i < directors.length; i++) {
    if (!filteredDirectors.includes(directors[i])){
      filteredDirectors.push(directors[i])
    }
  }
  return filteredDirectors
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  const dramaMoviesForSteven = moviesArray.filter(movie => movie.director === 'Steven Spielberg' && movie.genre.includes('Drama'))
  return dramaMoviesForSteven.length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  const scoresSum = moviesArray.reduce((sum, movie) => {
    if (movie.score){
      return sum + movie.score
    } else {
      return sum + 0
    }
  }, 0)
  if (moviesArray.length === 0){
    return 0
  } else {
    return Math.round((scoresSum/moviesArray.length)*100)/100
  }
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const sumDramaMovies = moviesArray.reduce((sum, movie) => {
    if (movie.genre.includes('Drama')){
      return sum + movie.score
    } else {
      return sum + 0
    }
  },0)

  const dramaMoviesQuantity = moviesArray.filter(movie => movie.genre.includes('Drama'))

  if (dramaMoviesQuantity.length === 0){
    return 0
  } else {
    return Math.round((sumDramaMovies/dramaMoviesQuantity.length)*100)/100
  }
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const moviesYears = moviesArray.map(movie => {
    return {
      title: movie.title,
      year: movie.year
    }
  }
  )
  const sortedYears = moviesYears.sort((a, b) => {
    if (a.year !== b.year){
      return a.year - b.year
    } else {
      return a.title.localeCompare(b.title) // compara alfabéticamente con localCompare(), es la forma más óptima.
    }
})
  return sortedYears
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const sortedMovies = [...moviesArray].sort((a, b) => a.title.localeCompare(b.title))
  let first20 = []

  for (let i = 0; i < sortedMovies.length ; i++){
    if (i === 20){
      break
    }
    first20.push(sortedMovies[i])
  }

  return first20.map(movie => movie.title)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const newMoviesArray = moviesArray.map(movie => {
    return {
      ...movie,
      duration: movie.duration.split(' ').map(n => parseInt(n) || 0)
    }
  })
  const changeDuration = newMoviesArray.map(movie => {
    return {
      ...movie,
      duration: (movie.duration[0] || 0 )* 60 + (movie.duration[1] || 0)
    }
  })
  return changeDuration
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  let ordenedByYear = []
  for (let i = 0; i < moviesArray.length; i++){
    if (!ordenedByYear.some(obj => obj.year === moviesArray[i].year)){ // Si no existe un objeto que tenga el año lo agrego con las propiedades necesarias
      ordenedByYear.push({
        year: moviesArray[i].year,
        score: moviesArray[i].score,
        count: 1
      })
    } else {
      const movieToModify = ordenedByYear.find(obj => obj.year === moviesArray[i].year)
      movieToModify.count++
      movieToModify.score += moviesArray[i].score
    }
  }
  const ordenedByYearAvg = ordenedByYear.map(year => {
    return {
      year: year.year,
      average: Math.round((year.score / year.count)*100)/100
    }
  })
  const sortedAverageYear = ordenedByYearAvg.sort((a, b) => {
    if (a.average === b.average){
      return b.year - a.year
    } else {
      return a.average - b.average
    }
  })

  if (moviesArray.length === 0){
    return null
  } else {
    return `The best year was ${sortedAverageYear[sortedAverageYear.length - 1].year} with an average score of ${sortedAverageYear[sortedAverageYear.length - 1].average}`
  }
}


// Falta sacar el promedio de cada año para saber cual sería el mejor año 
// Y eso en caso de empate dar el año mas viejo



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
