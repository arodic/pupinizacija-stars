/*
@author zz85
*/

// Utils for FBO Particles Simulations

THREE.FBOUtils = function( size, renderer, simulationShader ) {

	// Init RTT stuff
	this.size = size;
	this.renderer = renderer;
	this.simulationShader = simulationShader;

	// var gl = this.renderer.getContext();
	// if( !gl.getExtension( "OES_texture_float" )) {
	// 	alert( "No OES_texture_float support for float textures!" );
	// 	return;
	// }
	// if( gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) == 0) {
	// 	alert( "No support for vertex shader textures!" );
	// 	return;
	// }

	this.in = new THREE.WebGLRenderTarget(size, size, false);

	this.out = new THREE.WebGLRenderTarget(size, size, false);

	this.in.type = THREE.FloatType;
  this.in.minFilter = THREE.NearestFilter;
  this.in.magFilter = THREE.NearestFilter;
  this.in.format = THREE.RGBAFormat;

  this.in.minFilter = THREE.NearestFilter;
  this.in.magFilter = THREE.NearestFilter;
  this.in.format = THREE.RGBAFormat;

	this.out.type = THREE.FloatType;
  this.out.minFilter = THREE.NearestFilter;
  this.out.magFilter = THREE.NearestFilter;
  this.out.format = THREE.RGBAFormat;

  this.out.minFilter = THREE.NearestFilter;
  this.out.magFilter = THREE.NearestFilter;
  this.out.format = THREE.RGBAFormat;

	this.sceneRTTPos = new THREE.Scene();

	this.cameraRTT = new THREE.OrthographicCamera(-size/2, size/2, size/2, -size/2, -1, 1);
	this.sceneRTTPos.add(this.cameraRTT);

	quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(size, size), this.simulationShader);
	this.sceneRTTPos.add(quad);

};


THREE.FBOUtils.prototype.swap = function() {
	var tmp = this.in;
	this.in = this.out;
	this.out = tmp;
}

THREE.FBOUtils.prototype.simulate = function() {
	this.renderer.render(
		this.sceneRTTPos,
		this.cameraRTT,
		this.out, false);
}
