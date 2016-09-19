'use strict';

var bunneaze = (function bunneazeInner() {

  let bunnies = {},
    startTime = new Date().getTime(),
    currentTime = function currentTimeInner () {
      return new Date().getTime();
    },
    clone = function innerClone (original) {
      return JSON.parse(JSON.stringify(original));
    },
    haphazardSelection = function haphazardSelectionInner (selection) {
      return ( Math.floor(Math.random() * (selection) ) );
    },
    sortStrongestLast = function sortStrongestLastInner (population, sortVal) {
      return population.sort(function sortInner (a,b){
        return (a[sortVal] > b[sortVal]) || (a[sortVal] === b[sortVal]) - 1;
      });
    },
    //iGene stands for independent genes within organisms which can be represented by arrays containing objects or a by single object.  The iGenes object containing the Object.keys location of your iGene properties is passed into this function along with a helper function that would make up the usually forEach call.
    iGeneHelper = function iGeneHelperInner (organism, iGenes, helperFunction) {
      Object.keys(organism).slice(iGenes.start, iGenes.stop).forEach(helperFunction);
    },
    //this is a helper method to iGeneHelper.  In order apply the same logic to the objects and the filled arrays, this method can be utilized.
    iGeneLooper = function iGeneLooperInner (org, iGene, func) {
      if ( Array.isArray(org[iGene]) ) {
        org[iGene].forEach(func);
      } else {
        func(org[iGene]);
      }
    },
    //This is similar to the iGeneHelper method, although this method is used for dependent genes.  dGenes are represented as numbers on genes, and are summed together and displayed for the entire organism as a whole.
    dGeneHelper = function iGeneHelperInner (organism, dGenes, helperFunction) {
      Object.keys(organism).slice(dGenes.start, dGenes.stop).forEach(helperFunction);
    },
    mapGenes = function mapGenesInner (geneMap, gene, geneIDName, iGene, genome) {
      if (!geneMap[ gene[geneIDName] ]) {
        geneMap[ gene[geneIDName] ] = true;
        genome[iGene].push(gene);
      }
    },
    //This method is used in order to record the survivors' DNA of the survival game.  This information is recorded, mapGenes is used to ensure that there is only one copy of each gene inside the genome, and then the genome is returned and used to make the next generation of organisms
    recordGenome = function recordGenomeInner (population, iGenes, orgShell, geneIDName) {
      let geneMap = {},
        genome = {};
      iGeneHelper(orgShell, iGenes, function(iGene){
        genome[iGene] = [];
      });
      population.forEach( function(org) {
        iGeneHelper(org, iGenes, function(iGene){
          iGeneLooper(org, iGene, function(gene) {
            mapGenes(geneMap, gene, geneIDName, iGene, genome);
          });
        });
      });
      return genome;
    },
    //This function is responsible for creating and initially judging the organisms that will be fed into the survival game.  This function randomly fills a determined amount of orgShells with random iGenes and then calculates the values of the dGenes.  Utilize the birth check method in order to set standards for each of the child organisms before they are put into the pool to disqualify impossible candidates.
    orgMaker = function orgMakerInner (data, sizeOfPopulation, orgShell, birthCheck, iGenes, dGenes) {
      let population = [];
      do {
        let org = clone(orgShell);
        iGeneHelper(org, iGenes, function(iGene) {
          let dataGene = clone(data)[iGene];
          if ( Array.isArray(org[iGene]) ) {
            org[iGene].forEach( function(gene, index, arr) {
              let selectedOrg = haphazardSelection(dataGene.length);
              arr[index] = dataGene.splice(selectedOrg, 1)[0];
              dGeneHelper(org, dGenes, function(dGene) {
                org[dGene] = org[dGene] + arr[index][dGene];
              });
            });
          } else {
            let selectedOrg = haphazardSelection(dataGene.length);
            org[iGene] = dataGene.splice(selectedOrg, 1)[0];
            dGeneHelper(org, dGenes, function(dGene) {
              org[dGene] = org[dGene] + org[iGene][dGene];
            });
          }
        });
        if ( birthCheck(org) ) {population.push(org);}
      } while (population.length < sizeOfPopulation);
      return population;
    },
    //This method converts normal objects with the information to be passed randomly to genes and converts the data into arrays filled with the categorized gene.
    dataParser = function dataParserInner (orgShell, iGenes, geneTag, data) {
      let dataFeed = {};
      iGeneHelper(clone(orgShell), iGenes, function(iGene){
        dataFeed[iGene] = [];
      });
      data.forEach( function(gene){
        dataFeed[ gene[geneTag] ].push(clone(gene));
      });
      return dataFeed;
    };
  /*
    pointMutate = function pointMutateInner (pop, iGenes, data, mutationRate) {
      if ( haphazardSelection(100) >= mutationRate ) {return;}
      let selectedIGene = haphazardSelection((iGenes[1] - iGenes[0]) +iGenes[0],
        selectedOrg = haphazardSelection(pop.length - 1),
        changedGene =
    };
  */ /* TODO: Cannibalization */
  //The survivalGame runs until it returns the set number of winner organisms determined by the user.  Population of organisms are generated and then sorted by a gene selected by the user.  This gene is compared to the fitnessTest to determine if the top organism from the generation has passed.  Once a winner of the survival game is determined to be good enough to be collected, it is passed into the selections array and then any ban logic of certain genes for biodiversity can be applied at this time.  Once the selections array is full, the endGame method can be utilized to return the data to you any way you see fit.
  bunnies.survivalGame = function survivalGameInner (data, sizeOfPopulation, selectedNumber, replacementPopulation, thresholdScore, orgShell, fitnessTest, birthCheck, iGenes, dGenes, geneTag, endGame, thresholdLog, scoreGene, geneIDName, banNumbers) {
    let selections = [],
      biodiversityMap = {},
      bannedGenes = [];
    data = dataParser(orgShell, iGenes, geneTag, data);
    do {
      let topScore = 0,
        evolutionCounter = 0,
        population = orgMaker(data, sizeOfPopulation, orgShell, birthCheck, iGenes, dGenes),
        generations = 0,
        topOrg = {};
      do {
        let children = [],
          genome = {};
        generations += 1;
        topOrg = sortStrongestLast(population, scoreGene).slice(-1)[0];
        if ( topOrg[scoreGene] > topScore ) {
          evolutionCounter = 0;
          topScore = topOrg[scoreGene];
        } else { evolutionCounter += 1; }
        population = population.splice(replacementPopulation-population.length);
        genome = recordGenome(population, iGenes, orgShell, geneIDName);
        children = orgMaker(genome, replacementPopulation, orgShell, birthCheck, iGenes, dGenes);
        population = population.concat(children);
        if (thresholdLog) {thresholdLog(topScore, evolutionCounter, generations);}
      } while ( fitnessTest(topScore, thresholdScore, evolutionCounter, generations, topOrg) );
      iGeneHelper(topOrg, iGenes, function(iGene){
        iGeneLooper(topOrg, iGene, function(gene){
          if (!biodiversityMap[ gene[geneIDName] ]){
            biodiversityMap[ gene[geneIDName] ] = 1;
          }
          if (biodiversityMap[ gene[geneIDName] ] >= banNumbers[iGene]) {
            data[iGene].forEach( function(dataGene, index){
              if (dataGene[geneIDName] === gene[geneIDName]) {
                let bannedGene = data[iGene].splice(index, 1)[0];
                bannedGenes.push(bannedGene);
              }
            });
          } else { biodiversityMap[ gene[geneIDName] ] += 1; }
        });
      });
      selections.push(topOrg);
    } while ( selections.length < selectedNumber );
    endGame(currentTime(), startTime, selections);
  };

  return bunnies;

}(bunneaze));

exports.bunneaze = bunneaze.survivalGame;
