export default class GeneticAlgorithm {
  points;
  popSize;
  children;
  mutationProb;
  population;
  distanceMatrix;
  iteration;
  constructor(points, popSize, children, winners, mutationProb) {
    // Initialise the genetic algorithm class with the appropriate parameters
    this.points = points;
    this.popSize = popSize;
    this.children = children;
    this.winners = winners;
    this.mutationProb = mutationProb;
    this.population = this.createPopulation(points, popSize);
    this.distanceMatrix = this.createMap(this.points);
    this.gradeAllSolutions();
    this.iteration = 0;
  }

  nextGeneration() {
    // Create the next generation of solutions

    // Keep top winners
    let newPopulation = [];
    for (let i = 0; i < this.winners; i++) {
      newPopulation.push(this.population[i]);
    }

    // Add children to new population and mutate
    for (let i = 0; i < this.children; i++) {
      let child = this.crossover(
        this.population[this.pickParent()],
        this.population[this.pickParent()]
      );
      this.mutate(child);
      newPopulation.push(child);
    }

    // Fill remaining population with random candidates
    while (newPopulation.length < this.popSize) {
      newPopulation.push({ solution: this.createCandidate() });
    }

    // Set new population as the current population
    this.population = JSON.parse(JSON.stringify(newPopulation));

    // Grade and sort solutions
    this.gradeAllSolutions();

    this.iteration++;
  }

  createPopulation() {
    // Create an entire population of randomly generated candidates
    let population = [];
    for (let i = 0; i < this.popSize; i++) {
      population.push({ solution: this.createCandidate(this.points) });
    }
    return population;
  }

  createCandidate() {
    // reate one candidate solutions
    let candidate = [];
    for (let i = 0; i < this.points.length; i++) {
      candidate.push(i);
    }
    return this.shuffle(candidate);
  }

  createMap() {
    // Create a distancer matrix of the points to specity the distance between each point
    let distanceMatrix = [];

    // Create an empty array of size points.size x points.size
    for (let i = 0; i < this.points.length; i++) {
      distanceMatrix.push(new Array(points.length).fill(0));
    }
    // Fill each value with the distance between corresponding points
    for (let i = 0; i < this.points.length; i++) {
      for (let j = 0; j < this.points.length; j++) {
        distanceMatrix[i][j] = Math.sqrt(
          Math.pow(this.points[i][0] - this.points[j][0], 2) +
            Math.pow(this.points[i][1] - this.points[j][1], 2)
        );
      }
    }
    return distanceMatrix;
  }

  gradeAllSolutions() {
    // Grade the entire population
    for (let i = 0; i < this.population.length; i++) {
      let distance = this.gradeSolution(this.population[i]["solution"]);
      this.population[i]["distance"] = distance;
    }
    this.population.sort(function (a, b) {
      return a.distance - b.distance;
    });
  }

  gradeSolution(candidate) {
    // Use the distance matrix to grade an individual candidate
    let distance = 0;
    for (let i = 0; i < candidate.length; i++) {
      if (i === 0) {
        distance += this.distanceMatrix[0][candidate[i]];
      } else if (i === candidate.length) {
        distance += this.distanceMatrix[candidate[candidate.length - 1]][0];
      } else {
        distance += this.distanceMatrix[candidate[i - 1]][candidate[i]];
      }
    }
    return distance;
  }

  pickParent() {
    // Picks solutions to become parents.
    // Solutions with a better fitness are more likely to be picked.

    // Find the sum of the scores array
    let sum = 0;
    for (let i = 0; i < this.population.length; i++) {
      sum += 1 / this.population[i].distance;
    }

    const threshold = Math.random() * sum;

    sum = 0;
    for (let i = 0; i < this.population.length - 1; i++) {
      sum += 1 / this.population[i].distance;
      if (sum >= threshold) {
        return i;
      }
    }
    return this.population.length - 1;
  }

  crossover(p1, p2) {
    // Creates a child solution by swapping parts of two parent solutions
    const m = Math.floor(Math.random() * p1.solution.length);
    let child = [];
    let used = new Set();
    for (let i = 0; i < m; i++) {
      used.add(p1.solution[i]);
      child.push(p1.solution[i]);
    }
    for (let i = 0; i < p2.solution.length; i++) {
      if (!used.has(p2.solution[i])) {
        child.push(p2.solution[i]);
      }
    }
    return { solution: child };
  }

  mutate(candidate) {
    // Mutates a candidate by swapping two random points
    if (Math.random() < this.mutationProb) {
      let m = Math.floor(Math.random() * candidate.solution.length);
      let n = Math.floor(Math.random() * candidate.solution.length);
      let tmp = candidate.solution[m];
      candidate.solution[m] = candidate.solution[n];
      candidate.solution[n] = tmp;
    }
  }

  shuffle(array) {
    var currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
