var distance = module.exports = function( positionA, positionB ){
  return Math.sqrt( Math.pow(positionA[ 0 ] - positionB[ 0 ],2) + 
    Math.pow(positionA[ 0 ] - positionB[ 0 ],2) )
}