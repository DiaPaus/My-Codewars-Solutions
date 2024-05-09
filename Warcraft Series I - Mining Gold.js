/* Warcraft Series I - Mining Gold
Greetings! The kata is inspired by my favorite strategy game, Warcraft 3, where players control units to gather resources and build their base. In this kata, the goal is to create a program that simulates the process of gathering gold from a mine and transporting it to a base.

The Workers are assigned to the gold mine and will automatically begin to gather gold from the mine. Once a Worker has collected a certain amount of gold, it will return to the base to deposit the gold at the Town Hall building.

Input
The parameter path represents the initial state of the mining field. It has a mine at index 0, represented by the letter "M", and a base at index 4, represented by the letter "B". The worker is initially positioned at index 2, which is a location between the mine and the base.
The parameter time is the number of iterations or ticks that the simulation should run. The method takes the input string, which represents the initial state of the simulation, and simulates the movement of workers for times iterations. The resulting state of the simulation is then converted into a list of strings, where each string represents a row of the grid.
MiningRepresentation.generate("M..<B", 9);
Output
The output is a list or an array of strings representing the state of the map after each tick of time until time is over.

M..<B // Worker goes to the mine
M.<.B
M<..B
*...B // Worker is mining gold
M>..B
M.>.B
M..>B
M...* // Worker brought the gold
M..<B 
Explanation:
M - Mine (location to gather gold)
B - Base (location to bring gold)
< or > direction where workers go (left/right)
* - marks that Mine or Base is already busy by other worker
# - marks collision (two workers at the same tile)
Note: Mine and Base cannot contain more than one worker at a time
. - Empty tile used to represent road between mine and base
Example colisions
Smooth Colision

"M>....<B"
"M.>..<.B"
"M..><..B" // smooth collision
"M..<>..B"
"M.<..>.B"
Colision on same tile

"M>...<B"
"M.>.<.B"
"M..#..B" // two workers on same tile
"M.<.>.B"
"M<...>B"
Tips:
Mine will be always at index 0, and Base at last index.
Workers always spends one tick/time at base, in mine, or traveling one cell.
There will be no test where workers spawn in collision, base or mine. Currently there is no chance to get a random input that will have # or * in it. But the principle is very simple.
Character # means that two workers are on same tile, and one goes to right and other to left(opposite dirrection).
Character * means that the worker already arrived at one of the destionation so he will go to other one(mine to base or vice versa).*/


function simulateMining(path, time) {
    let out = [path];
    let l = path.length;
    let arrEl = new Array(l).fill(0);
    while (time > 1) {
        path = [...path];
        if (['<', '#'].includes(path[1])) arrEl[0] = '*'; else arrEl[0] = 'M'
        if (['>', '#'].includes(path[l - 2])) arrEl[l - 1] = '*'; else arrEl[l - 1] = 'B'
        for (let i = 1; i < l - 1; i++) {
            if (['M', '<', '.'].includes(path[i - 1])) {
                if (['.', '>', 'B'].includes(path[i + 1])) arrEl[i] = '.';
                if (['<', '#', '*'].includes(path[i + 1])) arrEl[i] = '<';
            }
            if (['>', '*', '#'].includes(path[i - 1])) {
                if (['.', '>', 'B'].includes(path[i + 1])) arrEl[i] = '>';
                if (['<', '#', '*'].includes(path[i + 1])) arrEl[i] = '#';
            }

        }
        path = arrEl.join('');
        out.push(path)
        time--
    }
    return out
}
