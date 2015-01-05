var phiThens = [];
var getCoords = function(phi, orbitRadius) {
  return {
    x: Math.cos(phi) * orbitRadius,
    y: Math.sin(phi) * orbitRadius,
    z: Math.sin(phi * 8) * 8
  };
};
module.exports = function(i, dT, totalCubes, orbitRadius) {
  var phiThen = phiThens[i];
  var phiNow;
  //if getting initial phi
  if (phiThen === undefined) {
    phiNow = phiThens[i] = 2 * Math.PI / totalCubes * i;
    return getCoords(phiNow, orbitRadius);
  }
  var angularFreq = 0.0005;
  var rotation = angularFreq * dT;
  phiNow = phiThen + rotation;
  //keep phi between 0 and 2PI
  if (phiNow > 2 * Math.PI) {
    phiNow = phiNow % Math.PI;
  }
  phiThens[i] = phiNow;
  return getCoords(phiNow, orbitRadius);
};
