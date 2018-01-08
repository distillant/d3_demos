distillant/D3_demos Reusable D3 chart examples

see blogpost here: http://distillant.com/blog/?p=27
 ~~see live demos at http://distillant.com/D3_demos/index.html
see the https://github.com/distillant/d3_demos/public folder for front end D3 code. ~~

When looking at d3 charts examples out on the web I'm always surprised to see how they almost
never utilize object oriented javascript and therefor are not generalizable or reusable. Granted,
such examples may be written more for less sophisticated web programmers,
though using the library effectively in the first place I would think would require a fairly advanced understanding of javascript.
 Additionally graphs/d3 don't lend themselves that well toward object oriented design, or more accurately, providing full
object oriented implementation would make the code significantly more complex and costly to produce.

seeing as I'm just a impoverished programmer with limited time, I'm not going to create a fully object oriented implementation here,
I'm just going to provide a reusable interface, that works with arrays of object
 data like most json feeds provide and options which allow you to create the charts at whatever size/scale pleases you.
