# bunnEaze
BunnEaze is a customizable genetic algorithm library for node.js that works with and without sample replacement.

##Overview

If you are not familiar with genetic algorithms, you can find out more [here](https://en.wikipedia.org/wiki/Genetic_algorithm).  A quick summary is that there are certain problems we come across in which a pure brute force solution is not sufficient in order to adequately come to a solution.  A well-known example is the [traveling salesman problem,](https://en.wikipedia.org/wiki/Travelling_salesman_problem) one of many common problems that would take [superpolynomial](https://en.wikipedia.org/wiki/Time_complexity#Superpolynomial_time) time with a conventional algorithm.

It is easy to see why these kinds of problems can be quite troublesome when solving for exactly the right answer.  BunnEaze avoids this issue by allowing you to set a threshold value for a solution you deem to be fit.  BunnEaze instantiates a population of objects (organisms) filled with randomized data (genes) from the dataset, and uses the power of [natural selection](https://en.wikipedia.org/wiki/Natural_selection) to breed generations of children organisms until an organism meets the fitness of the threshold.

##Install bunnEaze

In node

`npm install bunneaze@1.0.2 --save`

Fork from Github

`git clone https://github.com/DavidIValencia/bunnEaze.git`

##Breaking down bunnEaze's main functions

to do...

##How to create an input file

After installing, you can do the following to bring the module into your file:

`var bunneaze = require(./node_modules/bunneaze/bunneaze.js).bunneaze;`

One of the challenging aspects of working with genetic algorithms is that they need to be incredibly customizable to best tackle the problems they were built to solve.  For bunnEaze, this manifests itself in a lengthy input file which you will need to learn to use in order to best work with the module.  However, once you get a hang of it, you will be able to tackle a bevy of complex problems.

Here is the code that you will need to call within your file to instantiate the bunnEaze survival game:

```javascript
bunnEase(input.data, input.sizeOfPopulation, input.selectedNumber, input.replacementPopulation, input.thresholdScore, input.orgShell, input.fitnessTest, input.birthCheck, input.iGenes, input.dGenes, input.geneTag, input.endGame, input.thresholdLog, input.orgShell.score, input.geneIDName, input.banNumbers);
```

and here is the shell of the input file:

```javascript
var input = {

  sizeOfPopulation: /* number greater than 0 */,
  selectedNumber: /* number of solutions that you want to be returned to you */,
  replacementPopulation: /* number greater than 0 and less than sizeOfPopulation */,
  thresholdScore: /* number greater than 0 */,
  orgShell: /* An object that contains a property 'score' which refers to another property name of the orgShell.  iGenes and dGenes are clustered together in order on the organism so they correspond to the Object.keys call */,
  iGenes: /* iGenes stands for independent genes.   */,
  dGenes: /* dGenes stands for dependent genes */,
  banNumbers: /* An object that contains the maximum number of times that iGenes can be played */,
  birthCheck: /* A function that returns true or false and takes in an organism when it is created */,
  fitnessTest: /* A function that takes in the topOrg and the topScore object and returns true or false */,
  geneTag: /* name of gene property that is used to tag iGenes into different properties on the organism */,
  endGame: /* function that takes in the selections array with the solutions found by bunnEaze */,
  thresholdLog: /* function that can be used to log data for each generation */,
  geneIDName: /* name of gene property that is used to distinguish iGenes from one another */,
  data: /* Array containing list of data that will be converted into organisms */

}
```

##Input Walkthrough Demo

to do...

##Other Examples

to do...

