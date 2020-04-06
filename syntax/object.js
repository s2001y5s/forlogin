/*var f = function() {
  console.log(1+1);
  console.log(2+2);
}

var a = [f];
a[0]();

var o = {
  func:f
}
o.func();

var v1 = 'v1';
v1 = 'egoing';
var v2 = 'v2';
*/

var k = {
  v1:'v1',
  v2:'v2',
  f1:function () {
    console.log(this.v1);
  },
  f2:function () {
    console.log(this.v2);
  }
}

k.f1();
k.f2();
