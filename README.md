# 2048 Automata
A fork of [gabrielecirulli's 2048](https://github.com/gabrielecirulli/2048),
  aiming to implement it as a Chrome App and implement an auto-player system in
  order to test optimal solution strategies.

So far, the Chrome app implementation works as intended. Automation code is in
  progress.

The following Automata are implemented:
* **Random Direction** 
  Randomly moves the tiles around until it hits game over or the 2048 tile. 
  Implemented as a proof-of-concept only.
* **Random Available Direction** Evaluates which directions allow movement into
  empty spaces, but does not evaluate possibility of merges. If there are no
  more empty spaces, all directions are allowed temporarily.
* **Random Available Direction With Merge** Same algorithm as Random Available
  Direction, except now also calculates for the possibility of merges. This
  means it will (probably; not exhaustively tested) not attempt to move in a
  direction it cannot.
* **Random Available Merge Priority** Prioritizes merges. Will only allow
  movement into empty space when there are no merges possible.

More advanced Automata will be implemented later. 

To use, select an Automata from the dropdown menu and hit spacebar. You can
  monitor what the Automata is doing using Chrome's debug console.

## License
2048 is licensed under the [MIT
  license.](https://github.com/gabrielecirulli/2048/blob/master/LICENSE.txt)

Licence will be expanded once I've actually made some progess.
