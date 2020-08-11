# valont
![Logo of Valont](valont_logo_github.png)
\
\
(This codebase may be fully rewritten in upcoming days, it does the job, but it could better)
The goal of this framework is to allow one to make a 2D game prototype rapidly, especially for gamejams.

## Status
Documentation will be made soon.\
Currently lacks some basic components such as spritesheet, sound that will allow games to made quickly, however games can still be made without these built-in components. \
Since it is very much in its early infancy, it does not _yet_ have WebGL support,
when it will be supported, code written before WebGL support will require little to none change to be compatible with it.

## Current features

* Ability to make their own components
* Support for rendering on multiple canvas
* Have a group based object, called entity, containing components.
* Vector2 Class
* Basic AABB physics collision detection.
* Draw images, and rectangles.

Examples made so far to show some of these feature in action:
* Falling meteors \
[Game example](https://abajwa.itch.io/valont-falling-meteors) \
[Source code](/example/falling_meteors/falling_meteors.html)
* Breakout \
[Game example](https://abajwa.itch.io/valont-breakout) \
[Source code](/example/breakout/breakout.html) (does not match game's source as, game is not up-to-date *yet*) \
(Has a glitch/issue where ball has unreliable impulse system and also deletes multiple bricks, because it is touching multiple bricks, solution will be implemented later, which is adding a "AlreadyHit" debounce and better impulse system)

The Breakout game example is a special case, it was created in order to compare [phaser 3's breakout source code](https://phaser.io/examples/v3/view/games/breakout/breakout) with the current stage of valont. Although I have no intention of competing with other game libraries, it was nonetheless interesting.



# Basic necessities to implement
* Basic UI Components (could be used for easier debugging as well), ~~Text~~, Button and TextBox
* Implement basic physics engine with impulse response, that can disabled/enabled for customization purpose.
* Create PhysicsBodyComponent, or similar to allow one to create their own physics body with custom physics.
* Create CollisionArea object or type, which is used by Kinematic or static body component, to allow various type of shapes colliding with each other.
* Add spritesheet component, an animating spritesheet component.
* Add camera, a global camera, game.Camera, all entities will be positioned based on this single camera.
* Add audio support, `entity.add(new valont.SoundComponent())`, SoundComponent should have a distance property, meaning that depending on the distance from the camera, the sound plays louder or quieter. However not all soundcomponents should be dependent on this property, for example, environmental/background sound do not usually having an "origin", meaning that sound volume should not decrease, as background music's volume stays constant. A simple solution could be `game.playAudio()`
* Create a game loop instead of relying on window.requestAnimationFrame, something along the lines of `valont.onUpdate(function() {})`




