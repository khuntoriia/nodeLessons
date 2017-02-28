function Hello(){
  this.name = "mxf";
  this.sayHello = function(){
    console.log("sayHello!"+" "+this.name);
  }
  this.bye="d";
}
module.exports = Hello;
module.exports.bye = function(){
  this.name = "leo";
  this.sayGoodBye = function(){
    console.log("goodbye "+this.name);
  }
  console.log("ghhhh");
}