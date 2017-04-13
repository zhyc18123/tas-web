
export default {
  add: function (v1, v2) {


    var r1, r2, m;
    try {
      r1 = v1.toString().split(".")[1].length;
    }
    catch (e) {
      r1 = 0;
    }
    try {
      r2 = v2.toString().split(".")[1].length;
    }
    catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));

    return (v1 * m + v2 * m) / m;
  },


  sub: function (v1, v2) {
    return this.add(v1, -v2);
  },


  mul: function (v1, v2) {
    var m = 0;
    var s1 = v1.toString();
    var s2 = v2.toString();
    try {
      m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
      m += s2.split(".")[1].length;
    }
    catch (e) {
    }

    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  },

  div: function (v1, v2) {
    var t1 = 0;
    var t2 = 0;
    var r1, r2;
    try {
      t1 = v1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
      t2 = v2.toString().split(".")[1].length;
    }
    catch (e) {
    }

    r1 = Number(v1.toString().replace(".", ""));
    r2 = Number(v2.toString().replace(".", ""));

    return (r1 / r2) * Math.pow(10, t2 - t1);
  },
  round:function(num,scale){
    return parseFloat(num.toFixed(scale));
  }
}


