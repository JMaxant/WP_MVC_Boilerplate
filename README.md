# WP_MVC_Boilerplate
## Who are you ?
Well, my name is Julien, and I'm a --noob-- Junior web developer based in Brittany, France. I love PHP, JS, kittens, ducks, chickens and bad puns. That pretty much sums it up.

## What is it about ?

This is a pet project of mine, that intends to add a healthy dosage of MVC in the development of a wordpress theme.
### Why ?
Mainly because I can and I have too much time on my hands. And also because, if I do enjoy fiddling around with Wordpress, its code hurts my eyes.

So, with the help of custom classes, I put most of the logic in separate files and my templates get much more clearer. Soon(-ish), I may even have an example to show you !

## How does it work ?

It's kind of simple. 
1. First, you need to define a constant, THEME_PREFIX, that will be used to autoload your custom classes (adding them as is, tends to break wordpress, especially if you use ACF Pro).
2. Create your classes : for instance, I created a generic class *THEME_PREFIX*_Controller.php which retrieve most of the useful data of a post. As a habit, I declare it as an abstract class, and extend it at will, but you may of course use it as it is. Store the data you need returned in the class' attributes and ...
3. Instanciate your object in your page (```$page = new *THEME_PREFIX*_Page;``` for instance), and, finally ...
4. Template at will ! Outputting data will look something like ```<div class="omg"><?= $page->content; ?></div>```, making your templates much more readable and esay to maintain

## What's next ?
1. Sass and other nice stuff
2. What about Twig support ? I'm aware there are very good plugins that would do the trick, but as the purpose of this project is to learn, I'm thinking about developing it (although, I don't have a clue about how)

## And after that ?
At some point, I'll get some sleep.

## Support ? Fork ?
Don't hesitate to open issues or ring a bell if you find anything that doesn't seems right, but bear in mind that I'm doing this on my free time, as I started a full time job (Drupal, yay!) recently. This project is open to forks and all, so have at it if you want. And if you reaaaaaaaally want to repay me, just send me food. I love food.
