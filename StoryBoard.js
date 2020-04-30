(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"StoryBoard_atlas_1", frames: [[0,0,512,512]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.butterfly = function() {
	this.initialize(ss["StoryBoard_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.zahal = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AD0pZQAAARgMAMQgMANgSAAQgRAAgNgNQgMgMAAgRQAAgSAMgMQANgMARAAQASAAAMAMQAMAMAAASgAA2m5IBqh2ACHlBQAEAIADAIQAQAmAMAqIC+hyAA2m5QAtAkAkBUAgynQQAPgFAQAAQAmAAAjAcAifphQAAAQgMAMQgMAMgQAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAQAQAAAMALQAMAMAAARgAgynQIhthpAlJlnIB2CLQAMgtAQgoQADgHAEgHQA2h8BIgVAj1DUQgEg2gBg6QAAgFAAgFQAAgvADgrQADg0AIgwIiZBkAj1DUIiQhmAjoE2QgIgvgFgzIHCgEIBph2AjshlIAAABADDhuIDDB4ADSBjQgBA5gEA0QgFA2gIAyQgLA8gQA1QgLAggMAdQgLAbgLAXQg8ByhPAAQhQAAg8hxIEXgBADDhuQAIAyAEA2QADAuAAAyQAAAFAAAEAj6BkIHMgBAj3AAIHGgGAjoE2IGoACADDhuImvAJQAJg/AQg4IF9gFQAPA2AKA9gAiwk/IE3gCAClGpICbCRAjOGmIiPB2AifIZQgMgXgMgcQgMgfgLghIFzADAjOGmQgQg1gKg7");
	this.shape.setTransform(39,65.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF33").s().p("AiKF1IEWgBQg8ByhQAAQhOAAg8hxgAiiFCQgMgfgLghIFyADQgLAggMAdQgLAbgLAXIkWABQgMgXgMgcgAi5ECQgQg1gLg7QgHgvgFgzIHBgEQgEA2gJAyImogCIGoACQgLA8gQA1gAi5ECgAjlg/IHLgBQgBA5gEAzInBAEQgFg1AAg6gADhAsIAAAAgAjlg/IAAgKQAAgvADgsQADg0AIgwIAAgBQAJg/AQg4QAMgtAQgoIAHgOIE2gCIAHAQQAQAmAMAqIl8AFIF8gFQAQA2AJA9ImuAJIGugJQAIAyAEA2QADAvAAAyIAAAJInLABIAAAAgAjiikIHFgGg");
	this.shape_1.setTransform(36.95,81.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Ag0AUQAOgFARABQAmAAAjAcQAtAjAkBUIk3ACQA2h7BIgWgACqhXQgMgLAAgSQAAgRAMgNQAMgMASAAQASAAAMAMQAMANAAARQAAASgMALQgMANgSAAQgSAAgMgNgAjmhgQgLgLAAgRQAAgQALgMQAMgMARAAQAQAAAMAMQAMAMAAAQQAAARgMALQgMAMgQAAQgRAAgMgMg");
	this.shape_2.setTransform(39.2,16.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,80,132.1);


(lib.Symbol4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.butterfly();
	this.instance.setTransform(0,0,0.1719,0.1719);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(0,0,88,88), null);


(lib.sun = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFF66").ss(1,1,1).p("AE0AAQAACAhaBaQhaBaiAAAQh/AAhahaQhahaAAiAQAAh/BahaQBahaB/AAQCAAABaBaQBaBaAAB/g");
	this.shape.setTransform(30.75,30.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF66").s().p("AjZDZQhahZAAiAQAAh/BahaQBahaB/AAQCAAABZBaQBaBaAAB/QAACAhaBZQhZBaiAAAQh/AAhahag");
	this.shape_1.setTransform(30.75,30.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sun, new cjs.Rectangle(-1,-1,63.5,63.5), null);


(lib.star2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AABBGQgFgLgBgMQgEAFgGACQgHABgFgEQgFgDgBgHQgBgGAEgFQgRgBgOgNQAHgMAOgEIgDgHIACgBIgFgDIgMgJQgGgGABgHQABgEADgCQADgDADABIAAgDQADABAMAAQAJABADAGIABAJQACAEAHAFIADgBIAAglQAAgJADgCQADgDAEACQADABADADQACAFABAKQATgHAHAJQAGAHgFAKQgCAFgKAIQAEACATABQAPABAFAJQgGALgMAGQgMAHgNAAQABADAHALQAGAJgEAGQgEAFgLgBQACAGgFAGQgFAFgGAAIgBAAg");
	this.shape.setTransform(6.4109,6.9988);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.star2, new cjs.Rectangle(0,0,12.8,14), null);


(lib.star = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AgKAxIgFgEIgIgBQgOgBgBgIQACgGANgEIgPgBQgOgBgBgIQADgGAIgDIALgCIgEgCQgTgIgKgUQAEgHAJACQAEABAJAGIAPAIIAAgXQAAgKAFgCQAEgCAEADQADADACAFQACAJAAASIAAAIIABAAQAKgGAJgDIAAgEQABgGAGgIQAEgFADgBQADgBAEABQADABACAEQADAFgCAGQALAAAJAKQgBAFgHADIgMAGIgJAFIAEABQATAIAEAHQAEAGgCAHQgCAIgHABQgOgLgIgDIgKgDIgGAHIgMAGQAAADgDAFQgCAGgFAAQgDgBgCgDg");
	this.shape.setTransform(6.4583,5.2886);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.star, new cjs.Rectangle(0,0,12.9,10.6), null);


(lib.Scene_1_sky = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// sky
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("EgyegikMBk9AAAMAAABFJMhk9AAAg");
	this.shape.setTransform(290.9,204.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#66FFFF").s().p("EgyeAikMAAAhFHMBk9AAAMAAABFHg");
	this.shape_1.setTransform(290.9,204.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1).p("Eguygi/MBdlAAAMAAABF/MhdlAAAg");
	this.shape_2.setTransform(272.525,211.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#66FFFF").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_3.setTransform(272.525,211.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#65FEFE").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_4.setTransform(272.525,211.025);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#65FCFD").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_5.setTransform(272.525,211.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#64FBFC").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_6.setTransform(272.525,211.025);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#64FAFB").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_7.setTransform(272.525,211.025);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#63F8FA").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_8.setTransform(272.525,211.025);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#63F7F9").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_9.setTransform(272.525,211.025);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#62F6F8").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_10.setTransform(272.525,211.025);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#62F5F7").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_11.setTransform(272.525,211.025);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#61F3F6").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_12.setTransform(272.525,211.025);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#61F2F5").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_13.setTransform(272.525,211.025);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#60F1F4").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_14.setTransform(272.525,211.025);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#60EFF3").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_15.setTransform(272.525,211.025);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#5FEEF1").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_16.setTransform(272.525,211.025);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#5FEDF0").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_17.setTransform(272.525,211.025);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#5EEBEF").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_18.setTransform(272.525,211.025);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#5EEAEE").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_19.setTransform(272.525,211.025);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#5DE9ED").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_20.setTransform(272.525,211.025);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#5DE8EC").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_21.setTransform(272.525,211.025);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#5CE6EB").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_22.setTransform(272.525,211.025);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#5CE5EA").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_23.setTransform(272.525,211.025);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#5BE4E9").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_24.setTransform(272.525,211.025);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#5BE2E8").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_25.setTransform(272.525,211.025);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#5AE1E7").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_26.setTransform(272.525,211.025);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#5AE0E6").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_27.setTransform(272.525,211.025);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#59DEE5").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_28.setTransform(272.525,211.025);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#58DDE4").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_29.setTransform(272.525,211.025);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#58DCE3").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_30.setTransform(272.525,211.025);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#57DBE2").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_31.setTransform(272.525,211.025);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#57D9E1").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_32.setTransform(272.525,211.025);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#56D8E0").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_33.setTransform(272.525,211.025);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#56D7DF").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_34.setTransform(272.525,211.025);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#55D5DE").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_35.setTransform(272.525,211.025);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#55D4DD").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_36.setTransform(272.525,211.025);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#54D3DC").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_37.setTransform(272.525,211.025);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#54D1DB").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_38.setTransform(272.525,211.025);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#53D0DA").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_39.setTransform(272.525,211.025);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#53CFD8").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_40.setTransform(272.525,211.025);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#52CED7").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_41.setTransform(272.525,211.025);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#52CCD6").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_42.setTransform(272.525,211.025);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#51CBD5").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_43.setTransform(272.525,211.025);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#51CAD4").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_44.setTransform(272.525,211.025);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#50C8D3").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_45.setTransform(272.525,211.025);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#50C7D2").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_46.setTransform(272.525,211.025);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#4FC6D1").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_47.setTransform(272.525,211.025);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#4FC4D0").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_48.setTransform(272.525,211.025);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#4EC3CF").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_49.setTransform(272.525,211.025);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#4EC2CE").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_50.setTransform(272.525,211.025);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#4DC1CD").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_51.setTransform(272.525,211.025);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#4DBFCC").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_52.setTransform(272.525,211.025);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#4CBECB").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_53.setTransform(272.525,211.025);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#4BBDCA").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_54.setTransform(272.525,211.025);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#4BBBC9").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_55.setTransform(272.525,211.025);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#4ABAC8").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_56.setTransform(272.525,211.025);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#4AB9C7").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_57.setTransform(272.525,211.025);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#49B7C6").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_58.setTransform(272.525,211.025);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#49B6C5").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_59.setTransform(272.525,211.025);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#48B5C4").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_60.setTransform(272.525,211.025);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#48B4C3").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_61.setTransform(272.525,211.025);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#47B2C2").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_62.setTransform(272.525,211.025);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#47B1C1").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_63.setTransform(272.525,211.025);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#46B0C0").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_64.setTransform(272.525,211.025);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#46AEBE").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_65.setTransform(272.525,211.025);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#45ADBD").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_66.setTransform(272.525,211.025);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#45ACBC").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_67.setTransform(272.525,211.025);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#44AABB").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_68.setTransform(272.525,211.025);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#44A9BA").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_69.setTransform(272.525,211.025);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#43A8B9").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_70.setTransform(272.525,211.025);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#43A7B8").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_71.setTransform(272.525,211.025);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#42A5B7").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_72.setTransform(272.525,211.025);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#42A4B6").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_73.setTransform(272.525,211.025);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#41A3B5").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_74.setTransform(272.525,211.025);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#41A1B4").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_75.setTransform(272.525,211.025);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#40A0B3").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_76.setTransform(272.525,211.025);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#3F9FB2").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_77.setTransform(272.525,211.025);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#3F9DB1").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_78.setTransform(272.525,211.025);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#3E9CB0").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_79.setTransform(272.525,211.025);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#3E9BAF").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_80.setTransform(272.525,211.025);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#3D9AAE").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_81.setTransform(272.525,211.025);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#3D98AD").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_82.setTransform(272.525,211.025);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#3C97AC").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_83.setTransform(272.525,211.025);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#3C96AB").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_84.setTransform(272.525,211.025);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#3B94AA").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_85.setTransform(272.525,211.025);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#3B93A9").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_86.setTransform(272.525,211.025);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#3A92A8").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_87.setTransform(272.525,211.025);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#3A90A7").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_88.setTransform(272.525,211.025);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#398FA5").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_89.setTransform(272.525,211.025);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#398EA4").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_90.setTransform(272.525,211.025);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#388DA3").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_91.setTransform(272.525,211.025);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#388BA2").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_92.setTransform(272.525,211.025);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#378AA1").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_93.setTransform(272.525,211.025);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#3789A0").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_94.setTransform(272.525,211.025);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#36879F").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_95.setTransform(272.525,211.025);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#36869E").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_96.setTransform(272.525,211.025);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#35859D").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_97.setTransform(272.525,211.025);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#35839C").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_98.setTransform(272.525,211.025);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#34829B").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_99.setTransform(272.525,211.025);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#34819A").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_100.setTransform(272.525,211.025);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#338099").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_101.setTransform(272.525,211.025);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#327E98").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_102.setTransform(272.525,211.025);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#327D97").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_103.setTransform(272.525,211.025);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#317C96").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_104.setTransform(272.525,211.025);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#317A95").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_105.setTransform(272.525,211.025);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#307994").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_106.setTransform(272.525,211.025);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#307893").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_107.setTransform(272.525,211.025);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#2F7692").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_108.setTransform(272.525,211.025);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#2F7591").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_109.setTransform(272.525,211.025);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#2E7490").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_110.setTransform(272.525,211.025);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#2E728F").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_111.setTransform(272.525,211.025);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#2D718E").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_112.setTransform(272.525,211.025);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#2D708D").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_113.setTransform(272.525,211.025);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#2C6F8B").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_114.setTransform(272.525,211.025);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#2C6D8A").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_115.setTransform(272.525,211.025);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#2B6C89").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_116.setTransform(272.525,211.025);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#2B6B88").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_117.setTransform(272.525,211.025);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#2A6987").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_118.setTransform(272.525,211.025);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#2A6886").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_119.setTransform(272.525,211.025);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#296785").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_120.setTransform(272.525,211.025);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#296584").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_121.setTransform(272.525,211.025);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#286483").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_122.setTransform(272.525,211.025);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#286382").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_123.setTransform(272.525,211.025);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#276281").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_124.setTransform(272.525,211.025);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#276080").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_125.setTransform(272.525,211.025);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#265F7F").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_126.setTransform(272.525,211.025);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#255E7E").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_127.setTransform(272.525,211.025);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#255C7D").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_128.setTransform(272.525,211.025);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#245B7C").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_129.setTransform(272.525,211.025);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#245A7B").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_130.setTransform(272.525,211.025);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#23587A").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_131.setTransform(272.525,211.025);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#235779").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_132.setTransform(272.525,211.025);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#225678").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_133.setTransform(272.525,211.025);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#225577").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_134.setTransform(272.525,211.025);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#215376").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_135.setTransform(272.525,211.025);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#215275").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_136.setTransform(272.525,211.025);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#205174").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_137.setTransform(272.525,211.025);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#204F72").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_138.setTransform(272.525,211.025);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#1F4E71").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_139.setTransform(272.525,211.025);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#1F4D70").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_140.setTransform(272.525,211.025);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#1E4B6F").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_141.setTransform(272.525,211.025);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#1E4A6E").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_142.setTransform(272.525,211.025);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#1D496D").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_143.setTransform(272.525,211.025);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#1D486C").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_144.setTransform(272.525,211.025);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#1C466B").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_145.setTransform(272.525,211.025);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#1C456A").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_146.setTransform(272.525,211.025);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#1B4469").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_147.setTransform(272.525,211.025);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#1B4268").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_148.setTransform(272.525,211.025);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#1A4167").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_149.setTransform(272.525,211.025);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#1A4066").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_150.setTransform(272.525,211.025);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#193E65").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_151.setTransform(272.525,211.025);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#183D64").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_152.setTransform(272.525,211.025);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#183C63").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_153.setTransform(272.525,211.025);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#173B62").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_154.setTransform(272.525,211.025);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#173961").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_155.setTransform(272.525,211.025);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#163860").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_156.setTransform(272.525,211.025);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#16375F").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_157.setTransform(272.525,211.025);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#15355E").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_158.setTransform(272.525,211.025);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#15345D").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_159.setTransform(272.525,211.025);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#14335C").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_160.setTransform(272.525,211.025);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#14315B").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_161.setTransform(272.525,211.025);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#13305A").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_162.setTransform(272.525,211.025);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#132F58").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_163.setTransform(272.525,211.025);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#122E57").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_164.setTransform(272.525,211.025);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#122C56").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_165.setTransform(272.525,211.025);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#112B55").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_166.setTransform(272.525,211.025);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#112A54").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_167.setTransform(272.525,211.025);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#102853").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_168.setTransform(272.525,211.025);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#102752").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_169.setTransform(272.525,211.025);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#0F2651").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_170.setTransform(272.525,211.025);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#0F2450").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_171.setTransform(272.525,211.025);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#0E234F").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_172.setTransform(272.525,211.025);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#0E224E").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_173.setTransform(272.525,211.025);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#0D214D").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_174.setTransform(272.525,211.025);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#0C1F4C").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_175.setTransform(272.525,211.025);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#0C1E4B").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_176.setTransform(272.525,211.025);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#0B1D4A").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_177.setTransform(272.525,211.025);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#0B1B49").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_178.setTransform(272.525,211.025);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#0A1A48").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_179.setTransform(272.525,211.025);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#0A1947").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_180.setTransform(272.525,211.025);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#091746").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_181.setTransform(272.525,211.025);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#091645").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_182.setTransform(272.525,211.025);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#081544").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_183.setTransform(272.525,211.025);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#081443").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_184.setTransform(272.525,211.025);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#071242").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_185.setTransform(272.525,211.025);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#071141").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_186.setTransform(272.525,211.025);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#06103F").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_187.setTransform(272.525,211.025);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#060E3E").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_188.setTransform(272.525,211.025);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#050D3D").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_189.setTransform(272.525,211.025);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#050C3C").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_190.setTransform(272.525,211.025);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#040A3B").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_191.setTransform(272.525,211.025);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#04093A").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_192.setTransform(272.525,211.025);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#030839").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_193.setTransform(272.525,211.025);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#030738").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_194.setTransform(272.525,211.025);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#020537").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_195.setTransform(272.525,211.025);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#020436").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_196.setTransform(272.525,211.025);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#010335").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_197.setTransform(272.525,211.025);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#010134").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_198.setTransform(272.525,211.025);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#000033").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_199.setTransform(272.525,211.025);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#010235").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_200.setTransform(272.525,211.025);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#020437").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_201.setTransform(272.525,211.025);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#040B3C").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_202.setTransform(272.525,211.025);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#050D3E").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_203.setTransform(272.525,211.025);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#061040").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_204.setTransform(272.525,211.025);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#071241").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_205.setTransform(272.525,211.025);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#0B1B48").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_206.setTransform(272.525,211.025);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#0C1D4A").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_207.setTransform(272.525,211.025);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#0D1F4C").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_208.setTransform(272.525,211.025);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#0D224E").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_209.setTransform(272.525,211.025);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#0E2450").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_210.setTransform(272.525,211.025);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#122D57").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_211.setTransform(272.525,211.025);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#132F59").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_212.setTransform(272.525,211.025);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#14315A").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_213.setTransform(272.525,211.025);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#15335C").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_214.setTransform(272.525,211.025);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#15365E").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_215.setTransform(272.525,211.025);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#173A62").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_216.setTransform(272.525,211.025);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#193F65").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_217.setTransform(272.525,211.025);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#1B4369").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_218.setTransform(272.525,211.025);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#1E4C70").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_219.setTransform(272.525,211.025);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#1F4E72").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_220.setTransform(272.525,211.025);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#205173").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_221.setTransform(272.525,211.025);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#215375").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_222.setTransform(272.525,211.025);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#24597B").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_223.setTransform(272.525,211.025);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#255C7C").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_224.setTransform(272.525,211.025);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#265E7E").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_225.setTransform(272.525,211.025);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#266080").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_226.setTransform(272.525,211.025);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#276282").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_227.setTransform(272.525,211.025);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#286584").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_228.setTransform(272.525,211.025);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#2B6B89").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_229.setTransform(272.525,211.025);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#2C6E8B").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_230.setTransform(272.525,211.025);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#2D708C").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_231.setTransform(272.525,211.025);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#2E728E").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_232.setTransform(272.525,211.025);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#2F7490").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_233.setTransform(272.525,211.025);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#2F7792").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_234.setTransform(272.525,211.025);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#317B95").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_235.setTransform(272.525,211.025);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#35849D").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_236.setTransform(272.525,211.025);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#3788A0").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_237.setTransform(272.525,211.025);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#378BA2").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_238.setTransform(272.525,211.025);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#388DA4").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_239.setTransform(272.525,211.025);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#398FA6").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_240.setTransform(272.525,211.025);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#3A91A7").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_241.setTransform(272.525,211.025);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#3B94A9").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_242.setTransform(272.525,211.025);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#3E9AAE").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_243.setTransform(272.525,211.025);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#3F9DB0").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_244.setTransform(272.525,211.025);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#409FB2").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_245.setTransform(272.525,211.025);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#40A1B4").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_246.setTransform(272.525,211.025);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#41A3B6").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_247.setTransform(272.525,211.025);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#42A6B7").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_248.setTransform(272.525,211.025);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#45ACBD").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_249.setTransform(272.525,211.025);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#46AEBF").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_250.setTransform(272.525,211.025);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#47B1C0").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_251.setTransform(272.525,211.025);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#48B3C2").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_252.setTransform(272.525,211.025);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#4BBCC9").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_253.setTransform(272.525,211.025);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#4DC0CD").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_254.setTransform(272.525,211.025);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#4FC5D0").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_255.setTransform(272.525,211.025);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#51C9D4").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_256.setTransform(272.525,211.025);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#51CCD6").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_257.setTransform(272.525,211.025);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#52CED8").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_258.setTransform(272.525,211.025);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#53D0D9").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_259.setTransform(272.525,211.025);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#54D2DB").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_260.setTransform(272.525,211.025);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#58DBE2").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_261.setTransform(272.525,211.025);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#59DDE4").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_262.setTransform(272.525,211.025);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#59E0E6").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_263.setTransform(272.525,211.025);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#5AE2E8").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_264.setTransform(272.525,211.025);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#5BE4EA").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_265.setTransform(272.525,211.025);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#5FEDF1").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_266.setTransform(272.525,211.025);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#60EFF2").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_267.setTransform(272.525,211.025);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#61F2F4").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_268.setTransform(272.525,211.025);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#62F4F6").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_269.setTransform(272.525,211.025);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#64FBFB").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_270.setTransform(272.525,211.025);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#65FDFD").s().p("EguyAjAMAAAhF/MBdlAAAMAAABF/g");
	this.shape_271.setTransform(272.525,211.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},408).to({state:[{t:this.shape_4},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_2}]},1).to({state:[{t:this.shape_6},{t:this.shape_2}]},1).to({state:[{t:this.shape_7},{t:this.shape_2}]},1).to({state:[{t:this.shape_8},{t:this.shape_2}]},1).to({state:[{t:this.shape_9},{t:this.shape_2}]},1).to({state:[{t:this.shape_10},{t:this.shape_2}]},1).to({state:[{t:this.shape_11},{t:this.shape_2}]},1).to({state:[{t:this.shape_12},{t:this.shape_2}]},1).to({state:[{t:this.shape_13},{t:this.shape_2}]},1).to({state:[{t:this.shape_14},{t:this.shape_2}]},1).to({state:[{t:this.shape_15},{t:this.shape_2}]},1).to({state:[{t:this.shape_16},{t:this.shape_2}]},1).to({state:[{t:this.shape_17},{t:this.shape_2}]},1).to({state:[{t:this.shape_18},{t:this.shape_2}]},1).to({state:[{t:this.shape_19},{t:this.shape_2}]},1).to({state:[{t:this.shape_20},{t:this.shape_2}]},1).to({state:[{t:this.shape_21},{t:this.shape_2}]},1).to({state:[{t:this.shape_22},{t:this.shape_2}]},1).to({state:[{t:this.shape_23},{t:this.shape_2}]},1).to({state:[{t:this.shape_24},{t:this.shape_2}]},1).to({state:[{t:this.shape_25},{t:this.shape_2}]},1).to({state:[{t:this.shape_26},{t:this.shape_2}]},1).to({state:[{t:this.shape_27},{t:this.shape_2}]},1).to({state:[{t:this.shape_28},{t:this.shape_2}]},1).to({state:[{t:this.shape_29},{t:this.shape_2}]},1).to({state:[{t:this.shape_30},{t:this.shape_2}]},1).to({state:[{t:this.shape_31},{t:this.shape_2}]},1).to({state:[{t:this.shape_32},{t:this.shape_2}]},1).to({state:[{t:this.shape_33},{t:this.shape_2}]},1).to({state:[{t:this.shape_34},{t:this.shape_2}]},1).to({state:[{t:this.shape_35},{t:this.shape_2}]},1).to({state:[{t:this.shape_36},{t:this.shape_2}]},1).to({state:[{t:this.shape_37},{t:this.shape_2}]},1).to({state:[{t:this.shape_38},{t:this.shape_2}]},1).to({state:[{t:this.shape_39},{t:this.shape_2}]},1).to({state:[{t:this.shape_40},{t:this.shape_2}]},1).to({state:[{t:this.shape_41},{t:this.shape_2}]},1).to({state:[{t:this.shape_42},{t:this.shape_2}]},1).to({state:[{t:this.shape_43},{t:this.shape_2}]},1).to({state:[{t:this.shape_44},{t:this.shape_2}]},1).to({state:[{t:this.shape_45},{t:this.shape_2}]},1).to({state:[{t:this.shape_46},{t:this.shape_2}]},1).to({state:[{t:this.shape_47},{t:this.shape_2}]},1).to({state:[{t:this.shape_48},{t:this.shape_2}]},1).to({state:[{t:this.shape_49},{t:this.shape_2}]},1).to({state:[{t:this.shape_50},{t:this.shape_2}]},1).to({state:[{t:this.shape_51},{t:this.shape_2}]},1).to({state:[{t:this.shape_52},{t:this.shape_2}]},1).to({state:[{t:this.shape_53},{t:this.shape_2}]},1).to({state:[{t:this.shape_54},{t:this.shape_2}]},1).to({state:[{t:this.shape_55},{t:this.shape_2}]},1).to({state:[{t:this.shape_56},{t:this.shape_2}]},1).to({state:[{t:this.shape_57},{t:this.shape_2}]},1).to({state:[{t:this.shape_58},{t:this.shape_2}]},1).to({state:[{t:this.shape_59},{t:this.shape_2}]},1).to({state:[{t:this.shape_60},{t:this.shape_2}]},1).to({state:[{t:this.shape_61},{t:this.shape_2}]},1).to({state:[{t:this.shape_62},{t:this.shape_2}]},1).to({state:[{t:this.shape_63},{t:this.shape_2}]},1).to({state:[{t:this.shape_64},{t:this.shape_2}]},1).to({state:[{t:this.shape_65},{t:this.shape_2}]},1).to({state:[{t:this.shape_66},{t:this.shape_2}]},1).to({state:[{t:this.shape_67},{t:this.shape_2}]},1).to({state:[{t:this.shape_68},{t:this.shape_2}]},1).to({state:[{t:this.shape_69},{t:this.shape_2}]},1).to({state:[{t:this.shape_70},{t:this.shape_2}]},1).to({state:[{t:this.shape_71},{t:this.shape_2}]},1).to({state:[{t:this.shape_72},{t:this.shape_2}]},1).to({state:[{t:this.shape_73},{t:this.shape_2}]},1).to({state:[{t:this.shape_74},{t:this.shape_2}]},1).to({state:[{t:this.shape_75},{t:this.shape_2}]},1).to({state:[{t:this.shape_76},{t:this.shape_2}]},1).to({state:[{t:this.shape_77},{t:this.shape_2}]},1).to({state:[{t:this.shape_78},{t:this.shape_2}]},1).to({state:[{t:this.shape_79},{t:this.shape_2}]},1).to({state:[{t:this.shape_80},{t:this.shape_2}]},1).to({state:[{t:this.shape_81},{t:this.shape_2}]},1).to({state:[{t:this.shape_82},{t:this.shape_2}]},1).to({state:[{t:this.shape_83},{t:this.shape_2}]},1).to({state:[{t:this.shape_84},{t:this.shape_2}]},1).to({state:[{t:this.shape_85},{t:this.shape_2}]},1).to({state:[{t:this.shape_86},{t:this.shape_2}]},1).to({state:[{t:this.shape_87},{t:this.shape_2}]},1).to({state:[{t:this.shape_88},{t:this.shape_2}]},1).to({state:[{t:this.shape_89},{t:this.shape_2}]},1).to({state:[{t:this.shape_90},{t:this.shape_2}]},1).to({state:[{t:this.shape_91},{t:this.shape_2}]},1).to({state:[{t:this.shape_92},{t:this.shape_2}]},1).to({state:[{t:this.shape_93},{t:this.shape_2}]},1).to({state:[{t:this.shape_94},{t:this.shape_2}]},1).to({state:[{t:this.shape_95},{t:this.shape_2}]},1).to({state:[{t:this.shape_96},{t:this.shape_2}]},1).to({state:[{t:this.shape_97},{t:this.shape_2}]},1).to({state:[{t:this.shape_98},{t:this.shape_2}]},1).to({state:[{t:this.shape_99},{t:this.shape_2}]},1).to({state:[{t:this.shape_100},{t:this.shape_2}]},1).to({state:[{t:this.shape_101},{t:this.shape_2}]},1).to({state:[{t:this.shape_102},{t:this.shape_2}]},1).to({state:[{t:this.shape_103},{t:this.shape_2}]},1).to({state:[{t:this.shape_104},{t:this.shape_2}]},1).to({state:[{t:this.shape_105},{t:this.shape_2}]},1).to({state:[{t:this.shape_106},{t:this.shape_2}]},1).to({state:[{t:this.shape_107},{t:this.shape_2}]},1).to({state:[{t:this.shape_108},{t:this.shape_2}]},1).to({state:[{t:this.shape_109},{t:this.shape_2}]},1).to({state:[{t:this.shape_110},{t:this.shape_2}]},1).to({state:[{t:this.shape_111},{t:this.shape_2}]},1).to({state:[{t:this.shape_112},{t:this.shape_2}]},1).to({state:[{t:this.shape_113},{t:this.shape_2}]},1).to({state:[{t:this.shape_114},{t:this.shape_2}]},1).to({state:[{t:this.shape_115},{t:this.shape_2}]},1).to({state:[{t:this.shape_116},{t:this.shape_2}]},1).to({state:[{t:this.shape_117},{t:this.shape_2}]},1).to({state:[{t:this.shape_118},{t:this.shape_2}]},1).to({state:[{t:this.shape_119},{t:this.shape_2}]},1).to({state:[{t:this.shape_120},{t:this.shape_2}]},1).to({state:[{t:this.shape_121},{t:this.shape_2}]},1).to({state:[{t:this.shape_122},{t:this.shape_2}]},1).to({state:[{t:this.shape_123},{t:this.shape_2}]},1).to({state:[{t:this.shape_124},{t:this.shape_2}]},1).to({state:[{t:this.shape_125},{t:this.shape_2}]},1).to({state:[{t:this.shape_126},{t:this.shape_2}]},1).to({state:[{t:this.shape_127},{t:this.shape_2}]},1).to({state:[{t:this.shape_128},{t:this.shape_2}]},1).to({state:[{t:this.shape_129},{t:this.shape_2}]},1).to({state:[{t:this.shape_130},{t:this.shape_2}]},1).to({state:[{t:this.shape_131},{t:this.shape_2}]},1).to({state:[{t:this.shape_132},{t:this.shape_2}]},1).to({state:[{t:this.shape_133},{t:this.shape_2}]},1).to({state:[{t:this.shape_134},{t:this.shape_2}]},1).to({state:[{t:this.shape_135},{t:this.shape_2}]},1).to({state:[{t:this.shape_136},{t:this.shape_2}]},1).to({state:[{t:this.shape_137},{t:this.shape_2}]},1).to({state:[{t:this.shape_138},{t:this.shape_2}]},1).to({state:[{t:this.shape_139},{t:this.shape_2}]},1).to({state:[{t:this.shape_140},{t:this.shape_2}]},1).to({state:[{t:this.shape_141},{t:this.shape_2}]},1).to({state:[{t:this.shape_142},{t:this.shape_2}]},1).to({state:[{t:this.shape_143},{t:this.shape_2}]},1).to({state:[{t:this.shape_144},{t:this.shape_2}]},1).to({state:[{t:this.shape_145},{t:this.shape_2}]},1).to({state:[{t:this.shape_146},{t:this.shape_2}]},1).to({state:[{t:this.shape_147},{t:this.shape_2}]},1).to({state:[{t:this.shape_148},{t:this.shape_2}]},1).to({state:[{t:this.shape_149},{t:this.shape_2}]},1).to({state:[{t:this.shape_150},{t:this.shape_2}]},1).to({state:[{t:this.shape_151},{t:this.shape_2}]},1).to({state:[{t:this.shape_152},{t:this.shape_2}]},1).to({state:[{t:this.shape_153},{t:this.shape_2}]},1).to({state:[{t:this.shape_154},{t:this.shape_2}]},1).to({state:[{t:this.shape_155},{t:this.shape_2}]},1).to({state:[{t:this.shape_156},{t:this.shape_2}]},1).to({state:[{t:this.shape_157},{t:this.shape_2}]},1).to({state:[{t:this.shape_158},{t:this.shape_2}]},1).to({state:[{t:this.shape_159},{t:this.shape_2}]},1).to({state:[{t:this.shape_160},{t:this.shape_2}]},1).to({state:[{t:this.shape_161},{t:this.shape_2}]},1).to({state:[{t:this.shape_162},{t:this.shape_2}]},1).to({state:[{t:this.shape_163},{t:this.shape_2}]},1).to({state:[{t:this.shape_164},{t:this.shape_2}]},1).to({state:[{t:this.shape_165},{t:this.shape_2}]},1).to({state:[{t:this.shape_166},{t:this.shape_2}]},1).to({state:[{t:this.shape_167},{t:this.shape_2}]},1).to({state:[{t:this.shape_168},{t:this.shape_2}]},1).to({state:[{t:this.shape_169},{t:this.shape_2}]},1).to({state:[{t:this.shape_170},{t:this.shape_2}]},1).to({state:[{t:this.shape_171},{t:this.shape_2}]},1).to({state:[{t:this.shape_172},{t:this.shape_2}]},1).to({state:[{t:this.shape_173},{t:this.shape_2}]},1).to({state:[{t:this.shape_174},{t:this.shape_2}]},1).to({state:[{t:this.shape_175},{t:this.shape_2}]},1).to({state:[{t:this.shape_176},{t:this.shape_2}]},1).to({state:[{t:this.shape_177},{t:this.shape_2}]},1).to({state:[{t:this.shape_178},{t:this.shape_2}]},1).to({state:[{t:this.shape_179},{t:this.shape_2}]},1).to({state:[{t:this.shape_180},{t:this.shape_2}]},1).to({state:[{t:this.shape_181},{t:this.shape_2}]},1).to({state:[{t:this.shape_182},{t:this.shape_2}]},1).to({state:[{t:this.shape_183},{t:this.shape_2}]},1).to({state:[{t:this.shape_184},{t:this.shape_2}]},1).to({state:[{t:this.shape_185},{t:this.shape_2}]},1).to({state:[{t:this.shape_186},{t:this.shape_2}]},1).to({state:[{t:this.shape_187},{t:this.shape_2}]},1).to({state:[{t:this.shape_188},{t:this.shape_2}]},1).to({state:[{t:this.shape_189},{t:this.shape_2}]},1).to({state:[{t:this.shape_190},{t:this.shape_2}]},1).to({state:[{t:this.shape_191},{t:this.shape_2}]},1).to({state:[{t:this.shape_192},{t:this.shape_2}]},1).to({state:[{t:this.shape_193},{t:this.shape_2}]},1).to({state:[{t:this.shape_194},{t:this.shape_2}]},1).to({state:[{t:this.shape_195},{t:this.shape_2}]},1).to({state:[{t:this.shape_196},{t:this.shape_2}]},1).to({state:[{t:this.shape_197},{t:this.shape_2}]},1).to({state:[{t:this.shape_198},{t:this.shape_2}]},1).to({state:[{t:this.shape_199},{t:this.shape_2}]},1).to({state:[{t:this.shape_199},{t:this.shape_2}]},1).to({state:[{t:this.shape_200},{t:this.shape_2}]},1).to({state:[{t:this.shape_201},{t:this.shape_2}]},1).to({state:[{t:this.shape_194},{t:this.shape_2}]},1).to({state:[{t:this.shape_192},{t:this.shape_2}]},1).to({state:[{t:this.shape_202},{t:this.shape_2}]},1).to({state:[{t:this.shape_203},{t:this.shape_2}]},1).to({state:[{t:this.shape_204},{t:this.shape_2}]},1).to({state:[{t:this.shape_205},{t:this.shape_2}]},1).to({state:[{t:this.shape_184},{t:this.shape_2}]},1).to({state:[{t:this.shape_182},{t:this.shape_2}]},1).to({state:[{t:this.shape_180},{t:this.shape_2}]},1).to({state:[{t:this.shape_206},{t:this.shape_2}]},1).to({state:[{t:this.shape_207},{t:this.shape_2}]},1).to({state:[{t:this.shape_208},{t:this.shape_2}]},1).to({state:[{t:this.shape_209},{t:this.shape_2}]},1).to({state:[{t:this.shape_210},{t:this.shape_2}]},1).to({state:[{t:this.shape_170},{t:this.shape_2}]},1).to({state:[{t:this.shape_168},{t:this.shape_2}]},1).to({state:[{t:this.shape_166},{t:this.shape_2}]},1).to({state:[{t:this.shape_211},{t:this.shape_2}]},1).to({state:[{t:this.shape_212},{t:this.shape_2}]},1).to({state:[{t:this.shape_213},{t:this.shape_2}]},1).to({state:[{t:this.shape_214},{t:this.shape_2}]},1).to({state:[{t:this.shape_215},{t:this.shape_2}]},1).to({state:[{t:this.shape_156},{t:this.shape_2}]},1).to({state:[{t:this.shape_216},{t:this.shape_2}]},1).to({state:[{t:this.shape_153},{t:this.shape_2}]},1).to({state:[{t:this.shape_217},{t:this.shape_2}]},1).to({state:[{t:this.shape_149},{t:this.shape_2}]},1).to({state:[{t:this.shape_218},{t:this.shape_2}]},1).to({state:[{t:this.shape_146},{t:this.shape_2}]},1).to({state:[{t:this.shape_144},{t:this.shape_2}]},1).to({state:[{t:this.shape_142},{t:this.shape_2}]},1).to({state:[{t:this.shape_219},{t:this.shape_2}]},1).to({state:[{t:this.shape_220},{t:this.shape_2}]},1).to({state:[{t:this.shape_221},{t:this.shape_2}]},1).to({state:[{t:this.shape_222},{t:this.shape_2}]},1).to({state:[{t:this.shape_134},{t:this.shape_2}]},1).to({state:[{t:this.shape_132},{t:this.shape_2}]},1).to({state:[{t:this.shape_223},{t:this.shape_2}]},1).to({state:[{t:this.shape_224},{t:this.shape_2}]},1).to({state:[{t:this.shape_225},{t:this.shape_2}]},1).to({state:[{t:this.shape_226},{t:this.shape_2}]},1).to({state:[{t:this.shape_227},{t:this.shape_2}]},1).to({state:[{t:this.shape_228},{t:this.shape_2}]},1).to({state:[{t:this.shape_120},{t:this.shape_2}]},1).to({state:[{t:this.shape_118},{t:this.shape_2}]},1).to({state:[{t:this.shape_229},{t:this.shape_2}]},1).to({state:[{t:this.shape_230},{t:this.shape_2}]},1).to({state:[{t:this.shape_231},{t:this.shape_2}]},1).to({state:[{t:this.shape_232},{t:this.shape_2}]},1).to({state:[{t:this.shape_233},{t:this.shape_2}]},1).to({state:[{t:this.shape_234},{t:this.shape_2}]},1).to({state:[{t:this.shape_106},{t:this.shape_2}]},1).to({state:[{t:this.shape_235},{t:this.shape_2}]},1).to({state:[{t:this.shape_103},{t:this.shape_2}]},1).to({state:[{t:this.shape_101},{t:this.shape_2}]},1).to({state:[{t:this.shape_99},{t:this.shape_2}]},1).to({state:[{t:this.shape_236},{t:this.shape_2}]},1).to({state:[{t:this.shape_96},{t:this.shape_2}]},1).to({state:[{t:this.shape_237},{t:this.shape_2}]},1).to({state:[{t:this.shape_238},{t:this.shape_2}]},1).to({state:[{t:this.shape_239},{t:this.shape_2}]},1).to({state:[{t:this.shape_240},{t:this.shape_2}]},1).to({state:[{t:this.shape_241},{t:this.shape_2}]},1).to({state:[{t:this.shape_242},{t:this.shape_2}]},1).to({state:[{t:this.shape_84},{t:this.shape_2}]},1).to({state:[{t:this.shape_82},{t:this.shape_2}]},1).to({state:[{t:this.shape_243},{t:this.shape_2}]},1).to({state:[{t:this.shape_244},{t:this.shape_2}]},1).to({state:[{t:this.shape_245},{t:this.shape_2}]},1).to({state:[{t:this.shape_246},{t:this.shape_2}]},1).to({state:[{t:this.shape_247},{t:this.shape_2}]},1).to({state:[{t:this.shape_248},{t:this.shape_2}]},1).to({state:[{t:this.shape_70},{t:this.shape_2}]},1).to({state:[{t:this.shape_68},{t:this.shape_2}]},1).to({state:[{t:this.shape_249},{t:this.shape_2}]},1).to({state:[{t:this.shape_250},{t:this.shape_2}]},1).to({state:[{t:this.shape_251},{t:this.shape_2}]},1).to({state:[{t:this.shape_252},{t:this.shape_2}]},1).to({state:[{t:this.shape_60},{t:this.shape_2}]},1).to({state:[{t:this.shape_58},{t:this.shape_2}]},1).to({state:[{t:this.shape_56},{t:this.shape_2}]},1).to({state:[{t:this.shape_253},{t:this.shape_2}]},1).to({state:[{t:this.shape_53},{t:this.shape_2}]},1).to({state:[{t:this.shape_254},{t:this.shape_2}]},1).to({state:[{t:this.shape_49},{t:this.shape_2}]},1).to({state:[{t:this.shape_255},{t:this.shape_2}]},1).to({state:[{t:this.shape_46},{t:this.shape_2}]},1).to({state:[{t:this.shape_256},{t:this.shape_2}]},1).to({state:[{t:this.shape_257},{t:this.shape_2}]},1).to({state:[{t:this.shape_258},{t:this.shape_2}]},1).to({state:[{t:this.shape_259},{t:this.shape_2}]},1).to({state:[{t:this.shape_260},{t:this.shape_2}]},1).to({state:[{t:this.shape_36},{t:this.shape_2}]},1).to({state:[{t:this.shape_34},{t:this.shape_2}]},1).to({state:[{t:this.shape_32},{t:this.shape_2}]},1).to({state:[{t:this.shape_261},{t:this.shape_2}]},1).to({state:[{t:this.shape_262},{t:this.shape_2}]},1).to({state:[{t:this.shape_263},{t:this.shape_2}]},1).to({state:[{t:this.shape_264},{t:this.shape_2}]},1).to({state:[{t:this.shape_265},{t:this.shape_2}]},1).to({state:[{t:this.shape_22},{t:this.shape_2}]},1).to({state:[{t:this.shape_20},{t:this.shape_2}]},1).to({state:[{t:this.shape_18},{t:this.shape_2}]},1).to({state:[{t:this.shape_266},{t:this.shape_2}]},1).to({state:[{t:this.shape_267},{t:this.shape_2}]},1).to({state:[{t:this.shape_268},{t:this.shape_2}]},1).to({state:[{t:this.shape_269},{t:this.shape_2}]},1).to({state:[{t:this.shape_10},{t:this.shape_2}]},1).to({state:[{t:this.shape_8},{t:this.shape_2}]},1).to({state:[{t:this.shape_270},{t:this.shape_2}]},1).to({state:[{t:this.shape_271},{t:this.shape_2}]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.grass = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00CC33").s().p("AlWYsQGT4njS5sQJ+VAi+ePg");
	this.shape.setTransform(-167.274,163.975);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.grass, new cjs.Rectangle(-201.5,0,68.5,328), null);


(lib.golem = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#663366").ss(1,1,1).p("ACxlnQAHAVAGAWQAJAeAHAgQAFAaAEAbQAFAaADAaQACAaACAaQACAbABAaQAAAKAAAJQAAANAAAMQAAAFAAAEQAAAfgBAdQgBAYgDAZQgCAdgDAbQgEAYgEAYQgGAhgHAgQgHAZgHAXQgKAcgKAcQgBACgBADQgLAbgMAXQgTAjgUAZQguA2g3AAQg2AAgug2QgFgGgEgGAB8nZIgPAAABfnZIgKAAAh7nZQAqhCAzgQQAPgEAPAAQAnAAAjAcQAaAVAYAlQAQAbAPAiQAEAIAEAJQAHASAHASAAJnZIgSAAAAnlnIARAAABYlnIAeAAAg6nZIhBAAAiwlnIAhAAAiwlnQAGgSAIgSQADgIADgHQAQgkARgbAh6lnIAMAAAiFj+IgzAAIgMAAIgJAAQAGgdAIgcQAHgYAIgYAjIEWQgGgcgGgeQgEgWgCgYQgEgagCgaQgCgagCgbQgBgdAAgeQAAgFAAgFQAAgWABgWQAAgXACgXQABgeAEgdQACgVADgVIAAAAQABgIACgIAjRjnQACgLACgMACEj+Ig2AAAApj+IhjAAAhxHoQgOgSgMgXQgMgYgLgbQgBgDgBgCQgMgdgJgeQgFgQgEgRADOj+IguAAACLlnIAmAA");
	this.shape.setTransform(23,56);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6633FF").s().p("AgFIXQgSAAgJgEQgQgGgBgOQAAgHgCgBQgBgCgEAAIgdABQgQAAgIgFIgBgCQgCgCAAgCQgCgDAAgEQAAgHADgFQAGgJANgIQARgJAEgFQgQABgNgMQgNgMgBgQQgBgJAEgEQAEgFAMgBQANgCAFgDQgdAAgggEQgHgBgDgDQgFgHAGgJQAHgKAPgIQALgGALgEIgMgJIgMgJQgDgCgJAAIgngBQgMAAgDgDIgBgBQgFgFAAgJIAAgHQAAgZASgUQgPgHgFgLQgDgHABgHQABgIAHgDQADgDAJgBIARAAIAAgDIABgWQABgNgGgGIgHgHQgEgFAEgJQAFgJABgFQACgEgCgTIgJAFQgIAEgGgBQgEgBgCgDQgCgEABgDQACgDAGgCQAIgCACgCQgHgPAFgOIAJgQQAEgJgCgHQgQAAgGgNQgGgIAGgGQADgDAIAAIAdAAIAUACQAMABAJgBQAIgBAOgFIgJgEQgFgEgDgHQgDgIAEgFQgmADgjgQQgQgHgFgKQgHgLAGgYQACgJAEgCQAHgCADgDQACgCAAgFIgBgIQgBgIAIgGQAIgFAJAAIASABQALAAAHgCQgFgFgQgFQgOgEgEgGIgDgFIgBAAIgdgHQgJgEgEgDIgEgDQgCgEgBgFQAAgGAEgDIAGgDIAFgDQACgDAAgFIABgIQACgDAEgBIAMAAQAOADAgAAIAFgDIAEgBQAhgCAlADIAfADQAgAEBFAMQgKgCgPgLIgHgGQgKgHgHgCQgHgDgPAAIhwgBQgHAAgEgBIgJgEIgIgFIgTgKQgLgHgHgFQgFgGAAgGQAAgHAJgEQAJgEAOgBIAagCQACgIgGgEIgLgFQgEgDgCgGIAAgEQgBgDACgEQACgJAMgHIARgKQgJgEgDgEQgJgGABgPQgBgNAFgGQAKgHAEgEQADgJADgEQADgDALgBIAZgDIAKgBIAAgBIgBgMQgBgNADgGQADgLAKgDIALAAQAHAAADgDQACgBACgGQACgFADgCQADgDAGAAQAaAAAbACQASACAGAHQAEAGgBAMQgBAOABAEQAFADANgCQAFAAAEAEQAFADgCAFIgCACIABABIAEACIAEAFQAGAHADAGQACAIAAAQIAAARIgBASQgBAIgDAHIALAJQAIAHABAGIABAGQADABAMAAQAJAAAEADQAHAFgBAKQgBAKgNATQgNASACAMQABAGAFAIIAFAHIAEAGQAFAIgBAIQAAAJgFAEQgEACgIABQgtAEhbgPQg2gKgmgCIABAFQgBADgCACQgDACgGgBQgUgEgWgCIAYAGQAiAJAPACQAMACAhAAQAaAAAQADQARAEAgAKIAZgIQAWgGAQgCIA1AAQANAAABAHQAAAHgNABIggABIgOABQACAEgEAEQgDAEgHADQgWAHgYgCIgOgDQhAATg+ACIADAAIA6gCQAhgBAagFIAjgGIAbgBIAXAAQAXAAAIAGQAJAFADAKQAEAKgDAKQgEATgVAKQgEACgBADQAAADAEAEQAGAEgCADQAHAAAKgEQAGAAADADQAEADgBAEQgCAEgHACQgKACgCACQgDADAAAKQAAAGgBAEQAGAAADACQAFADADAIQABAHgBAHQgCAIgMAPQAJABABAMIAAASIADAKQACAJABAJQAAAKgFAGQgEAFgJACIgUACQgNABgGAEQgLAIgFACIgLABIiEAAQgVAAgMgCIgMgCIACAGIADAJQADAFACACQAEAEAIgBQAHgBAOgEQANgGAGgBQAGgBATAAQAZABALAGQAIAFADAJQATgDAUgBQAIgHAIgJQAMgQAHgDQAMgEAVANQAMAHAGAHQAJANgFAcQAJABADADQAGAFgDAFQgCADgFABQgFACgCACQgCACgDAHQgEAEgJABIgnADQAHADADAHQAEAHgDAHQAFABAIgEQAIgEAEABQAEABABAFQABAFgDAEQgEAGgMADQgNACgEAFQAWAFAHAMQAEAIgEAJQgCAFgDADQAFAAACACQAEAEgCAJIgDAZQgCANgEAKQgDAMgIAEQgFADgKABIgQABQABASgHAFQgEAEgKAAQghABgegFIgggFQgrgFhLANQgBAHAGAGQAGAGAJACQAIACAXgFQBEgPBIADQATABAFAIQADAGgBAJQgDAPgTARIgOANQgIAIgFAGQgJALgDACQgHAFgLgCIgUgEQgMgDgfABIgJACQgEAEACAEQAOAIAWACIAnAAQAMABABAHQgBAEgFADIgJABgAAUHiQAHAAALAGIACACIADgBIAFAAIACAAQACgBABgDQADgEABAAIgSgCIgEgBQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAAAAAgBQgHACgGAFgAgxHEQgdAHgSAYQAGAEAJgBQAngBAlg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RgCgIgFIgJgHQgFgEgEAAIgBAAgABnmDIAAgBIgGgBIAGACgAhhmQQAFgFAFgCIgVAAIALAHgABUm9QAJAGACAMQACAMgGAIIAQgBQABgPAAgIQgBgNgGgIIgGgJQgCgFACgEIAAAAIgHAAIgDAAQgGABgGAEIgPAJQgOAHgfAAIgTgBIACADQAGAIAHAAQADAAALgFQAJgFAIAAIAOgBQAVAAAJAFgAgmmbIgLACIATAAIALAAIgDgBQgDgCgFAAIgIABgAAomwQgLAGgHACQADAEAHACIAjAHQADABAEgBIADgFQACgEAAgEQAAgGgGgCQgEgBgIAAIgHAAIgOABgAhgm1QgFACgDAIIA1AAQAHAAACgDQgIgHgUAAIgUAAgAgkm+QAJAEADAFQAAABABAAQAAABAAAAQABAAAAAAQABABAAAAIAFgCQgJgKgFgDIgCgBQgFgCgIAAIgEAAIANAGgAgPnwQgEABgBADQAAACABADIAFAEQAFAGAAAHIAAAEIAWgBIgDgDQgHgHAAgFQAAgFgBgCIgDgFIgEgCIgFgBgAgpnYIACACIACgBQAAgDgCgDIgBgCIAAgDIgBAAgAgCoGIgBAEQADADAKAEQAJAFABAHIgBAFIABAFIAEACIAQAEQAMACAGgJQABgEAAgGIgBgRIgWgEQgIgCgLAAIgTABgAAKGXIgBAAIgBgCQgBgDAAgDQABgDADgBIACAAIAEAAQAFACAAADQABAEgDACIgEACIgBABg");
	this.shape_1.setTransform(22.95,55.745);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#663366").s().p("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");
	this.shape_2.setTransform(23,56);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.golem, new cjs.Rectangle(-1,-1,48,114), null);


(lib.cloud7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AA2GWQgYgRgUgpQgcg5gGgJQgfAngvAUQguAVgygDQgngCgVgTQgUgSgEgiQgDgYAFgmQgmAJgrgLQgngKgkgYQgTgNgMgNQgOgEgPgIQgcgMgKgQQgJgQABgkQACg9ALgkQAQg2AlgcIAGgEQAaguA8gaQAagLAjgIQAUgFArgHQgLgeASgjQAPgcAfgcQBPhGBUgPQAvgKAjAOQArASAaAxQAQAeAQA9QAWgMAogCQA2gCBaALQAhAEAUAFQAcAIAUAOQAdAVAPAkQAOAjgEAmQgEArgYAqIAFAGQAqA2AOAvQAUA+gSA0QgMAggVAMQgRAKgnAAIh3gBIgHAAQADAbgKAcQgLAkgbAaQgaAZgkAPQgiANgmACIgKAAQgwAAgdgVg");
	this.shape.setTransform(54.3397,42.72);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,108.7,85.4);


(lib.cloud6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AguHSQgiAAgQgGQgNgFgNgLIgXgUIgkglQgTgVgMgTQgLgSgSgpIgMgaIgEABQg9ARg9gBQgqAAgYgOQgggSgOgtQgJgfgCg1QgCg0AHgfQAKgsAegVQgngxgQgxQgTg7ASgwQAQgoAzgrQAzgrAzgUQA+gXA2AOIARAEQAJABAHgBQAJgCAJgHIAPgOQAjggAzgOQAtgMA1ACQApACAWAMQAPAIALAMQAKAOACAQQAKAABfgDQA/gDAnANQAtAOArAoQAgAeAHAdQAMAvgpA4QAyAvAYBMQAUA/ABBRQABBigeA/QgTAngeAbQghAdgnAJQgaAFgpgCIhEgFQgbAAgmAGIgdAmQgRAYgMAHQgGAEgLAFIgRAHQgWAOgNAEQgOAFgeAAgAg8F0QAFABAKAAIgSgDIADACg");
	this.shape.setTransform(52.2703,46.6292);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,104.6,93.3);


(lib.cloud5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AiHGTQghgKgkgXQgYgQglgfQgfgagRgFQgNgEgVgBIghgBQgrgFgqghQgbgXgogvQgYgcgKgOQgRgYgIgWQgNghgCg6QgEhiAdg5QATglAigWQAjgYAmADQgJgwAwgzQA6g7BXgMQBXgMBHApIAZAPQAPAHAMAAQALAAAMgFIAVgKQBIglBBACQAlABAhAOQAjAPAYAaIAUAWIABABQASgOAdgIQAvgOAxgDQAzgBAlANQApAQAbAhQAWAbAKAjQAJAigEAjQgEAjgRAgQgQAcgXAWIAKAcQAOAqgDAoQgDAtgZAeQgEAFgQAOQgMAMgGAIQgFAHgGAOIgLAVQgSAhgzAgQgvAeguAOQgsANgugDQgvgCgqgRQg+A4hDAaQguASgsAAQgbAAgbgHg");
	this.shape.setTransform(60.7535,40.9924);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,121.5,82);


(lib.cloud4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ah7E3QgZgTgMgdQgNgeAIgdIhyAoQggAMgTADQgcAFgWgHQgbgJgZgcQgagbgGgbQgGgaANgtQAZhXAwglQgOAFgPgLQgOgKgDgRQgGgXASgnQAZg1AjgdQAUgRAZgHQAagIAYAFQAHgUARgTQALgMAXgUQAcgYATgHQAPgFAVAAIAmACQAZABA1gCQAsABAbAQIAVAOQANAJAJACQAMAEAVgCIA8gDQApgDAXAEQAkAFAVATQAlAigFBYQBBgDAbAiQASAVACAuQAFBtg3AzIgMAMQgGAGgDAHQgDAGABAKIACASQADA4hFA1Qg3AqgyALQgeAHgdgDQgfgEgZgPIg6ARQghAIgaACIgRABQg6AAgogeg");
	this.shape.setTransform(46.6527,34.0571);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,93.3,68.1);


(lib.cloud3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgDEZQgagIgIgWQgqAfhEgHQgXgDghgIIg4gOQgbgGgLgFQgVgIgJgPQgJgPABghIAAhLQAAgfgFgOQgEgIgHgKIgNgQIgGgKQgcgqACg4QABgyAZglIAOgTQAYgcAdgKQATgHAqgBQAoAAAUABQAiACAaAHQAcAHAMgDQAGgCAIgFIANgKQAcgXAlgIQAWgFAiAAIA6ABIAkgBQAVABAOAGQAUAIALAVQALAVgEAWQAigFAiAOQAhANAXAbQAWAaALAjQAJAigCAjQgDAfgNATQgRAXgjAIQgYAGgqgBQAIBBgVA0QgYA9g0AbQgaAOgmAEQgWADgtABQggAAgOgFg");
	this.shape.setTransform(39.7194,28.5688);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,79.5,57.2);


(lib.cloud2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AABFIQgngGgYgHQgUgFgtgRIglgQQgVgKgNgLQgXgUgWgsQgMgagDgPIgJgBQgygKgnghQgogigLguQgHgeAGgzQAHgpALgXQAIggAqgaQBAgoBMACQgEgiAEgVQAEgfATgPQANgKAUgDQANgCAZAAQA2ABAaAGQAtAMAVAgQBTggA5APQAjAKAYAdQAZAfgFAiQAiABAeAMQAgANAWAYQAXAYAIAhQAIAigLAeQgGATgQATIgNAQQALARAIAUQANAggBAiQgBAjgMAXQgRAegnATQgdAOguAJQgmAIgVgDQgQgDgMgIIgLgIQgOAPgXAUQgUASgMAIQgTANgSADQgIACgKAAQgPAAgTgDg");
	this.shape.setTransform(41.1538,33.1092);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,82.3,66.2);


(lib.cloud1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgsFtQhHgJg/gvQgSARgVAIQgSAHgXADQgOABgdABQgpAAgVgDQgjgFgYgOQgmgWgSgvQgQgsAHgwQAFgmAUgrQgRgagMgfQgbhHAJhNQALhWAxg1QAbgdAkgOQAcgLAcAAQATgDAWABQBPABBHAjIAIgHQAXgQAhgIQAQgJAUgIQAbgLAhgKQAogLAYgCQAOgCAbAAIBmAAQAcAAAOACQArAGAeAcIAHAHQAMALANATIAVAhIAQAaQAIAPgBANQgBAMgIALIAUAJIAaAKQAOAHAIAJQAEAGAEAJIAGARIANAfQAIAZgBAxQAAAhgGASQgEAOgOAZQgIARgIAiQgJAigHAQQgMAcgVAKQgGADgNADIgUAGQgGADgKAGIgQAJQgNAGgaACQhQAJgvgBQgSAAgLgCIgFALQgRAighAXQgfAWgnAJQgYAGgYAAQgOAAgOgCg");
	this.shape.setTransform(51.2333,36.656);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,102.5,73.3);


(lib.butterfly_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.butterfly();
	this.instance.setTransform(0,0,0.1719,0.1719);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,88,88);


(lib.___Camera___ = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.zahalcopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AD0pZQAAARgMAMQgMANgSAAQgRAAgNgNQgMgMAAgRQAAgSAMgMQANgMARAAQASAAAMAMQAMAMAAASgAA2m5IBqh2ACHlBQAEAIADAIQAQAmAMAqIC+hyAA2m5QAtAkAkBUAgynQQAPgFAQAAQAmAAAjAcAifphQAAAQgMAMQgMAMgQAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAQAQAAAMALQAMAMAAARgAgynQIhthpAlJlnIB2CLQAMgtAQgoQADgHAEgHQA2h8BIgVAjshkIiZBkAj3AAQADg0AIgwAjshlIAAABAj6BkQAAgFAAgFQAAgvADgrIHGgGQADAuAAAyQAAAFAAAEQgBA5gEA0IBph2AjoE2QgIgvgFgzIiQhmAj1DUQgEg2gBg6IHMgBADDhuQAIAyAEA2ADNDQQgFA2gIAyQgLA8gQA1ICbCRADDhuIDDB4AjshlQAJg/AQg4IF9gFQAPA2AKA9gAiwk/IE3gCAjoE2IGoACAj1DUIHCgEAClGpQgLAggMAdQgLAbgLAXQg8ByhPAAQhQAAg8hxQgMgXgMgcQgMgfgLghIiPB2AjOGmIFzADAifIZIEXgBAjOGmQgQg1gKg7");
	this.shape.setTransform(39,65.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF33").s().p("AiKF1IEWgBQg8ByhQAAQhOAAg8hxgAiKF1QgMgXgMgcQgMgfgLghIFyADQgLAggMAdQgLAbgLAXIkWABIAAAAgACMF0IAAAAgAi5ECQgQg1gLg7IGoACQgLA8gQA1gAjUCSQgHgvgFgzIHBgEQgEA2gJAygAjgAwQgFg1AAg6IHLgBQgBA5gEAzInBAEIAAAAgADhAsIAAAAgAjlg/IAAgKQAAgvADgsIHFgGInFAGQADg0AIgwIAAgBQAJg/AQg4QAMgtAQgoIAHgOIE2gCIAHAQQAQAmAMAqQAQA2AJA9QAIAyAEA2QADAvAAAyIAAAJInLABIAAAAgAjXkJIGugJgAi+mAIF8gFg");
	this.shape_1.setTransform(36.95,81.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Ag0AUQAOgFARABQAmAAAjAcQAtAjAkBUIk3ACQA2h7BIgWgACqhXQgMgLAAgSQAAgRAMgNQAMgMASAAQASAAAMAMQAMANAAARQAAASgMALQgMANgSAAQgSAAgMgNgAjmhgQgLgLAAgRQAAgQALgMQAMgMARAAQAQAAAMAMQAMAMAAAQQAAARgMALQgMAMgQAAQgRAAgMgMg");
	this.shape_2.setTransform(39.2,16.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,1,1).p("AD0pZQAAARgMAMQgMANgSAAQgRAAgNgNQgMgMAAgRQAAgSAMgMQANgMARAAQASAAAMAMQAMAMAAASgAA2m5IBqh2ACHlBQAEAIADAIQAQAmAMAqIC+hyAA2m5QAtAkAkBUAgynQIhthpAifphQAAAQgMAMQgMAMgQAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAQAQAAAMALQAMAMAAARgAgynQQAPgFAQAAQAmAAAjAcAlJlnIB2CLQAMgtAQgoQADgHAEgHQA2h8BIgVAj6BkQAAgFAAgFQAAgvADgrQADg0AIgwIiZBkAjshlIAAABAj1DUQgEg2gBg6IHMgBQgBA5gEA0IBph2Aj1DUIiQhmAjoE2QgIgvgFgzIHCgEQgFA2gIAyQgLA8gQA1QgLAggMAdQgLAbgLAXQgTAjgVAZQgtA2g2AAQg4AAgtg2QgVgYgSgjIEXgBADPgGQADAuAAAyQAAAFAAAEADDhuQAIAyAEA2ADDhuIDDB4AjoE2IGoACAj3AAIHGgGADDhuImvAJQAJg/AQg4IF9gFQAPA2AKA9gAiwk/IE3gCAClGpICbCRAifIZQgMgXgMgcQgMgfgLghIiPB2AjOGmIFzADABQJUIjIAAAjOGmQgQg1gKg7");
	this.shape_3.setTransform(39,65.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#663366").s().p("AhkgaIDJAAQguA1g3AAQg2AAgug1g");
	this.shape_4.setTransform(36.95,127.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF33").s().p("AhkHLQgUgYgSgjIEWgBQgTAkgUAYgAiiFeQgMgggLggIFyACQgLAggMAeQgLAagLAXIkWABQgMgXgMgbgAi5EeQgQg1gLg8IGoACQgLA8gQA1gAi5EegADUCvgAjUCtQgHgugFg0IHBgEQgEA3gJAxgAjlgkIHLAAQgBA3gEA0InBAEQgFg1AAg6gAjlgkIAAgJQAAgwADgrQADg1AIgwIAAgBQAJg+AQg5QAMgtAQgnIAHgPIE2gCIAHARQAQAmAMApIl8AFIF8gFQAQA2AJA9QAIAyAEA2InFAHIHFgHQADAvAAAzIAAAJInLAAIAAAAgAjXjuIGugJg");
	this.shape_5.setTransform(36.95,78.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(1,1,1).p("AD0pZQAAARgMAMQgMANgSAAQgRAAgNgNQgMgMAAgRQAAgSAMgMQANgMARAAQASAAAMAMQAMAMAAASgAA2m5IBqh2ACHlBQAEAIADAIQAQAmAMAqIC+hyAA2m5QAtAkAkBUAgynQIhthpAifphQAAAQgMAMQgMAMgQAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAQAQAAAMALQAMAMAAARgAgynQQAPgFAQAAQAmAAAjAcAlJlnIB2CLQAMgtAQgoQADgHAEgHQA2h8BIgVAj6BkQAAgFAAgFQAAgvADgrQADg0AIgwIiZBkAjshlIAAABAj1DUQgEg2gBg6IHMgBQgBA5gEA0IBph2Aj1DUIiQhmAjoE2QgIgvgFgzIHCgEQgFA2gIAyQgLA8gQA1QgLAggMAdQgLAbgLAXQgTAjgVAZQgtA2g2AAQg4AAgtg2QgVgYgSgjQgMgXgMgcQgMgfgLghIiPB2ADPgGQADAuAAAyQAAAFAAAEADDhuQAIAyAEA2ADDhuIDDB4AjoE2IGoACAj3AAIHGgGADDhuImvAJQAJg/AQg4IF9gFQAPA2AKA9gAiwk/IE3gCAClGpICbCRAifIZIEXgBAjOGmIFzADAjOGmQgQg1gKg7");
	this.shape_6.setTransform(39,65.025);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#663366").s().p("AhkADQgUgXgTgjIEXgBQgTAjgVAYQgtA2g3AAQg2AAgug2g");
	this.shape_7.setTransform(36.975,124.325);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF33").s().p("AiiF7QgMgfgLghIFyACQgLAhgMAdQgLAbgLAXIkWABQgMgYgMgbgAi5E7QgQg1gLg7IGoACQgLA8gQA0gADUDNgAjUDLQgHgvgFgzIHBgFQgEA3gJAygAjlgHIHLAAQgBA3gEA0InBAFQgFg2AAg6gAjlgHIAAgJQAAgvADgsQADg0AIgxIAAAAQAJg/AQg4QAMgtAQgoIAHgOIE2gDIAHARQAQAmAMApIl8AGIF8gGQAQA3AJA9QAIAyAEA1InFAHIHFgHQADAwAAAyIAAAJInLAAIAAAAgAjXjQIGugJg");
	this.shape_8.setTransform(36.95,75.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(1,1,1).p("AD0pZQAAARgMAMQgMANgSAAQgRAAgNgNQgMgMAAgRQAAgSAMgMQANgMARAAQASAAAMAMQAMAMAAASgAA2m5IBqh2ACHlBQAEAIADAIQAQAmAMAqIC+hyAA2m5QAtAkAkBUAgynQIhthpAifphQAAAQgMAMQgMAMgQAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAQAQAAAMALQAMAMAAARgAgynQQAPgFAQAAQAmAAAjAcAlJlnIB2CLQAMgtAQgoQADgHAEgHQA2h8BIgVAj6BkQAAgFAAgFQAAgvADgrQADg0AIgwIiZBkAjshlIAAABAj1DUQgEg2gBg6IHMgBAj1DUIiQhmAjoE2QgIgvgFgzIHCgEIBph2ADDhuQAIAyAEA2QADAuAAAyQAAAFAAAEQgBA5gEA0QgFA2gIAyQgLA8gQA1QgKAdgLAbQgBADgBACQgLAbgLAXQgTAjgVAZQgtA2g2AAQg4AAgtg2QgVgYgSgjQgMgXgMgcQgBgCgBgDQgLgdgKgeIiPB2ADDhuIDDB4AjoE2IGoACAj3AAIHGgGADDhuImvAJQAJg/AQg4IF9gFQAPA2AKA9gAiwk/IE3gCAClGpICbCRAjOGmIFzADAjOGmQgQg1gKg7");
	this.shape_9.setTransform(39,65.025);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#6633FF").s().p("AgaA4QAOgLAlgCQgpgLgpgQQASgSApgHIAhgFQATgCANgFIhbgDQg3gCgggQQgJgGAAgFQAAgDAEgDQADgCAFAAIAOAHQATAMArAAICHACQASAAAAALQAAAGgLAFQg4AYg/AGIBRAZQgTASgcAFQgJACgKAAQgQAAgQgGg");
	this.shape_10.setTransform(35.525,120.6351);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#663366").s().p("AhkAeQgUgYgSgiQgMgXgMgbIgCgGIFJAAIgCAGQgLAbgMAWQgSAjgVAYQguA3g3AAQg2AAgug3gAiChEQgEACAAAEQAAAFAJAFQAgAQA3ACIBbADQgNAFgTADIggAEQgqAHgSASQApAQApALQglACgOAMQAZAJAagFQAcgGATgSIhRgYQA/gFA4gaQALgEAAgHQAAgKgSAAIiHgDQgrAAgTgLIgOgHIgCAAQgDAAgDACg");
	this.shape_11.setTransform(36.925,121.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFF33").s().p("AikGSQgLgdgKgeIFyACQgKAegKAbgAi5FXQgQg1gLg7QgHgvgFgzIHBgFQgEA3gJAyImogCIGoACQgLA8gQA0gAjlAUIHLAAQgBA4gEA0InBAFQgFg2AAg7gADhCAIAAAAgAjlAUIAAgJQAAguADgsQADg0AIgxIAAAAIGugJImuAJQAJg/AQg4QAMgtAQgoIAHgOIE2gDIAHARQAQAmAMApIl8AGIF8gGQAQA3AJA9QAIAyAEA1QADAwAAAxIAAAJInLAAIAAAAgAjihPIHFgHg");
	this.shape_12.setTransform(36.95,72.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#000000").ss(1,1,1).p("AD0pZQAAARgMAMQgMANgSAAQgRAAgNgNQgMgMAAgRQAAgSAMgMQANgMARAAQASAAAMAMQAMAMAAASgAA2m5IBqh2ACHlBQAEAIADAIQAQAmAMAqIC+hyAA2m5QAtAkAkBUAgynQIhthpAifphQAAAQgMAMQgMAMgQAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAQAQAAAMALQAMAMAAARgAgynQQAPgFAQAAQAmAAAjAcAlJlnIB2CLQAMgtAQgoQADgHAEgHQA2h8BIgVAj6BkQAAgFAAgFQAAgvADgrQADg0AIgwIiZBkAjshlIAAABAj1DUQgEg2gBg6IHMgBQgBA5gEA0IBph2Aj1DUIiQhmAjoE2QgIgvgFgzIHCgEQgFA2gIAyQgGAigIAfQgGAZgHAXQgKAdgLAbQgBADgBACQgLAbgLAXQgTAjgVAZQgtA2g2AAQg4AAgtg2QgVgYgSgjQgMgXgMgcQgBgCgBgDQgLgdgKgeQgGgWgGgXADPgGQADAuAAAyQAAAFAAAEADDhuQAIAyAEA2ADDhuIDDB4AjoE2IGoACAj3AAIHGgGADDhuImvAJQAJg/AQg4IF9gFQAPA2AKA9gAiwk/IE3gCACyF5ImMAAQgIgggGgj");
	this.shape_13.setTransform(39,65.025);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#6633FF").s().p("AgZBhIBTgcQhLgJglgQQgIgDgFgFQgGgHADgGQAEgHAOgBIBBgEQgwgBgxgGQgbgEAAgNQAAgKARgKIBWguIiJgDQgGAAgEgCQgGgDABgFQAAgJAPAAIEFgCQARAAAGAHQgXANgnAHIhCAMQgXAGgbAOIgxAbQAGAHARAAIDRADQAPAAACAHQACAGgHAFQgFADgJABIivATQA+AKA8ARQgSAbghALQgQAFgOAAQgRAAgQgHg");
	this.shape_14.setTransform(35.4951,115.6647);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#663366").s().p("AhkBSQgUgYgSgjQgMgXgMgaIgCgGQgLgcgKgeIgMgtIGLAAIgNAvQgKAdgKAbIgDAGQgLAagLAWQgTAkgUAYQguA2g3ABQg2gBgug2gAighsQgPAAAAAJQgBAFAGADQAFACAFAAICJADIhWAuQgRAJAAAKQAAAPAbADQAxAGAxABIhBAEQgPAAgDAIQgEAFAGAHQAFAGAIADQAmAQBKAJIhSAcQAeAMAggKQAigLARgbQg8gRg9gKICugTQAJgBAGgEQAGgEgCgFQgCgIgPAAIjRgDQgQAAgGgHIAwgbQAbgOAZgGIBAgNQAogGAWgNQgGgHgRAAg");
	this.shape_15.setTransform(36.95,116.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFF33").s().p("AjFFeQgIghgHgiIGoACQgGAhgIAggAjUEbQgHgvgFgzIHBgFQgEA3gJAygAjgC5QgFg2AAg7IHLAAQgBA4gEA0InBAFIAAAAgAjlBIIAAgJQAAgvADgrQADg1AIgwIAAAAQAJg/AQg5QAMgsAQgoIAHgPIE2gCIAHARQAQAmAMApIl8AFIF8gFQAQA3AJA8QAIAyAEA2InFAHIHFgHQADAuAAAzIAAAJInLAAIAAAAgAjXiAIGugKg");
	this.shape_16.setTransform(36.95,67.775);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#000000").ss(1,1,1).p("AD0pZQAAARgMAMQgMANgSAAQgRAAgNgNQgMgMAAgRQAAgSAMgMQANgMARAAQASAAAMAMQAMAMAAASgAA2m5IBqh2ACHlBQAEAIADAIQAQAmAMAqIC+hyAA2m5QAtAkAkBUAgynQIhthpAifphQAAAQgMAMQgMAMgQAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAQAQAAAMALQAMAMAAARgAgynQQAPgFAQAAQAmAAAjAcAlJlnIB2CLQAMgtAQgoQADgHAEgHQA2h8BIgVAjshkIiZBkAj3AAQADg0AIgwAjshlIAAABAj6BkQAAgFAAgFQAAgvADgrIHGgGAjvEIQgDgZgDgbIiQhmADHEIQgDAZgEAXQgGAigIAfQgGAZgHAXQgKAdgLAbQgBADgBACQgLAbgLAXQgTAjgVAZQgtA2g2AAQg4AAgtg2QgVgYgSgjQgMgXgMgcQgBgCgBgDQgLgdgKgeQgGgWgGgXQgIgggGgjQgEgWgDgYAj1DUQgEg2gBg6IHMgBADDhuQAIAyAEA2QADAuAAAyQAAAFAAAEQgBA5gEA0QgCAdgEAbIm2AAADDhuIDDB4ADNDQIBph2Aj1DUIHCgEADDhuImvAJQAJg/AQg4IF9gFQAPA2AKA9gAiwk/IE3gC");
	this.shape_17.setTransform(39,65.025);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#6633FF").s().p("AhECjQAFgHATgEQAngKAWgRQgqgIgpgUQgfgPgLgTQAMgJAPgBQgcgDgYgQQABgGAKgBQCKgOBAAAIACgIIjKgoQgZgHgLgKQABgLATAAIAugBIBQgDQAqgDAkgEIAUgDQAQgFAOgKQgOgHgbgDQhGgHgigIQgwgKgsgUQgPgHgGgFQADgJARAAIEIACQALAAABAGQABAGgLAAIjZAGQAfAOArAGIBPAJIAVAEIAOAGIAPAEIAOADQAIACAEAFQgLAJgNAHIgdAQIgNAGIgMACQh2AKgpACQBzAWBmAXQAIACADAFQgEAKgLAFQgHADgPABIgRACQhEAGgjgBIgXAAQgNAAgKAEIB+AdQARADADAKQgDAIgLABQgGAAgMgDQg8gPg/AGQAkAYArAEQAPABAEAGQAEAHgJAOQgJAOgHAEQgHADgHACIglAKQgJACgGAAQgLAAgFgGg");
	this.shape_18.setTransform(38.3,109.0226);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#663366").s().p("AhkCKQgUgYgTgiQgMgYgLgbIgCgFQgMgcgJgeIgMgtQgIgggHgjIgGguIG1AAIgHAwQgGAigIAfIgNAvQgKAegKAaIgDAFQgLAbgLAXQgTAjgUAYQguA3g3AAQg2AAgug3gAhtAKQgKABAAAGQAXAQAcADQgPABgMAJQALATAfAPQApAUArAIQgYARgmAJQgSAFgGAGQAHALAYgGIAlgKQAHgCAHgDQAHgFAKgNQAIgOgEgHQgDgGgQgBQgqgEglgYQA+gGA9APQAMACAGAAQALAAAEgJQgDgKgSgCIh+geQAKgDANAAIAXAAQAjABBEgHIARgCQAPgBAHgCQAMgGADgJQgCgFgJgCQhlgXh0gWQApgCB2gKIAMgCIANgHIAdgQQANgGALgJQgDgFgIgCIgPgDIgOgEIgPgHIgUgDIhPgJQgsgGgfgOIDZgGQALAAAAgGQgBgGgLAAIkJgDQgRABgDAIQAGAGAPAHQAtAUAwAKQAhAHBGAIQAcACAOAIQgOAKgRAEIgUAEQgjAEgsADIhPADIguABQgTAAgBAKQALALAZAGIDKAqIgCAIIgEAAQhAAAiGANg");
	this.shape_19.setTransform(36.9625,110.75);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFF33").s().p("AjaElIgGg0IHBgEIgGA4gAjlCBIHLgBQgBA5gEA0InBAEQgFg2AAg6gADhDtIAAAAgAjlCBIAAgKQAAgvADgsIHFgGInFAGQADgzAIgwIAAgBQAJg/AQg4QAMgtAQgoIAHgOIE2gCIAHAQQAQAmAMAqIl8AFIF8gFQAQA2AJA9QAIAyAEA1QADAvAAAyIAAAJInLABIAAAAgAjXhIIGugJg");
	this.shape_20.setTransform(36.95,62.125);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#000000").ss(1,1,1).p("AD0pZQAAARgMAMQgMANgSAAQgRAAgNgNQgMgMAAgRQAAgSAMgMQANgMARAAQASAAAMAMQAMAMAAASgAA2m5IBqh2ACHlBQAEAIADAIQAQAmAMAqIC+hyAA2m5QAtAkAkBUAgynQIhthpAifphQAAAQgMAMQgMAMgQAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAQAQAAAMALQAMAMAAARgAgynQQAPgFAQAAQAmAAAjAcAlJlnIB2CLQAMgtAQgoQADgHAEgHQA2h8BIgVAjshkIiZBkAj3AAQADg0AIgwAjshlIAAABAj6BkQAAgFAAgFQAAgvADgrIHGgGQADAuAAAyQAAAFAAAEQgBA5gEA0QgCAdgEAbQgDAZgEAXQgGAigIAfQgGAZgHAXQgKAdgLAbQgBADgBACQgLAbgLAXQgTAjgVAZQgtA2g2AAQg4AAgtg2QgVgYgSgjQgMgXgMgcQgBgCgBgDQgLgdgKgeQgGgWgGgXQgIgggGgjQgEgWgDgYQgDgZgDgbQgEg2gBg6IHMgBADDhuQAIAyAEA2ADDhuIDDB4Aj1DUIHCgEADDhuImvAJQAJg/AQg4IF9gFQAPA2AKA9gAiwk/IE3gC");
	this.shape_21.setTransform(39,65.025);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#6633FF").s().p("AgaDBQgLAAgCgGQACgGALgCIAugEQgKgHgfgJQgfgJgYgSQgQgMAHgKQADgFALAAIBigDQgLgGgRgDIgfgFQgmgEgRgUQAFgGAQAAQA/gCAmgLQhEgEhGgPQgOgCgDgJQgBgHAIgFQAFgDAJAAIBggLQA2gIAlgSIipgDQgNAAgIgEQgEgCgDgFQgDgFABgFQADgJANgEQARgFAkgDQAjgCAQgGQg5gGhmgcQgagGgIgMQACgLAagBQARAAAsgLQAegIAVAAIhYgFQgOAAgEgGQACgIARAAIDKABQAbABAHABQAPACASAJQgDAHgNABIjRATQgfAEgIANQB5AhB/AGQAQABAFAGQgBAFgKABIjVAXID8AGQAMAAACAGQgEAGgMAEQgLADgXAEQgXAEgKADIgcALQgRAGgcAGQggAHgMABIgZABQgPACgKAEQBgAQBaADQANAAADAHQgGAPggAEIhVAJQgKABgBAFQAFAFAPAAIBcADQAGAAACACQAEACAAAGQAAAEgEADQgDAFgNADQg4ALhmAIQAqAWAyAMQAJACADAEQAEAFgCAHQgCAHgFADQgHAEgSABg");
	this.shape_22.setTransform(35.45,108.25);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#663366").s().p("AhkCnQgUgYgTgjQgMgXgLgcIgDgFQgLgdgJgdIgMgtQgJgggGgjIgHguIgFg0IHBgEIgGA4IgHAwQgGAigIAfIgNAwQgKAcgLAbIgCAFQgLAbgLAXQgTAjgVAZQgtA2g3AAQg2AAgug2gAili1QAEAGANABIBYAEQgUAAgfAIQgrALgSABQgZABgDAKQAJAMAZAGQBnAcA6AHQgRAFgkACQgjADgSAGQgNAEgCAIQgBAFADAFQACAFAFACQAIAEANAAICpADQgmASg1AIIhgAKQgJABgFADQgJAFACAIQACAIAOADQBHAOBEAFQgnAKg/ACQgPAAgGAHQASATAmAFIAfAEQARADALAGIhiADQgLAAgEAFQgGAKAQAMQAYASAfAJQAgAJAIAHIgtAFQgMABgBAGQABAGAMAAIAxABQARAAAHgFQAGgDACgHQACgHgEgFQgDgDgKgCQgxgNgqgWQBmgHA4gMQANgDADgEQAEgDAAgFQAAgGgEgCQgCgCgGAAIhdgDQgNAAgGgFQACgFAKgBIBUgJQAggDAFgQQgCgHgNAAQhbgDhfgPQAJgFAPgBIAagBQAMgBAggIQAcgFARgHIAbgLQALgDAXgEQAXgEALgDQALgEAFgFQgCgHgMAAIj8gGIDVgXQAKgBABgFQgFgGgRgBQh+gGh5ghQAIgNAfgDIDQgUQAOgBACgHQgRgIgPgCQgIgCgagBIjKgBQgRAAgCAIg");
	this.shape_23.setTransform(36.975,107.925);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFF33").s().p("AjlCbIHLgBQgBA5gEA0InBAEQgFg2AAg6gAjlCRQAAgvADgsIHFgGQADAvAAAyIAAAJInLABIAAgKgAjXgtIAAgBIGugJImuAJQAJg/AQg4QAMgtAQgoIAHgOIE2gCIAHAQQAQAmAMAqIl8AFIF8gFQAQA2AJA9QAIAyAEA1InFAGQADg0AIgvg");
	this.shape_24.setTransform(36.95,59.525);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#000000").ss(1,1,1).p("AD0pZQAAARgMAMQgMANgSAAQgRAAgNgNQgMgMAAgRQAAgSAMgMQANgMARAAQASAAAMAMQAMAMAAASgAA2m5IBqh2ACHlBQAEAIADAIQAQAmAMAqIC+hyAA2m5QAtAkAkBUAgynQIhthpAifphQAAAQgMAMQgMAMgQAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAQAQAAAMALQAMAMAAARgAgynQQAPgFAQAAQAmAAAjAcAlJlnIB2CLQAMgtAQgoQADgHAEgHQA2h8BIgVAj6BkQAAgFAAgFQAAgvADgrQADg0AIgwIiZBkAjshlIAAABAj4CfQgBgdgBgeIHMgBQgBAfgBAdQgBAZgCAYQgCAdgEAbQgDAZgEAXQgGAigIAfQgGAZgHAXQgKAdgLAbQgBADgBACQgCAFgCAEACIH1QgIATgIAQQgTAjgVAZQgtA2g2AAQg4AAgtg2QgVgYgSgjQgMgXgMgcQgBgCgBgDQgLgdgKgeQgGgWgGgXQgIgggGgjQgEgWgDgYQgDgZgDgbQgCgagBgbADPgGQADAuAAAyQAAAFAAAEADDhuQAIAyAEA2ADDhuIDDB4ADQCfInIAAAj3AAIHGgGADDhuImvAJQAJg/AQg4IF9gFQAPA2AKA9gAiwk/IE3gC");
	this.shape_25.setTransform(39,65.025);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#6633FF").s().p("AgYDMQgPgBAAgIQAYgIAbgBQgUgOgygJQgzgIgUgPQAVgLAtgGICBgTQhhAAhZgrQAFgJATAAIDFACIABAAIhTgRIgXgFIgTgIQgUgIgSgGQgjgJhCgFQgLgBgDgGQABgIANABIDBAEQAlAAAXgCQAhgEAZgLQhXgRgsgEIgagEQgUgJgKgCQgMgBgGgCIgQgIQgIgEgUgDIg1gIQgLgBgCgGQABgGALgBIA/ACIA+ACIBegBQAegBANgHQgmgNhKAAQhPgBgjgJQgOgEgDgIQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQACgCADgBQADgBAGACQAvANAvgFQgagGgNgIIgSgMIgLgDIgMgDQgKgIgGgCIgMgBIglgCQgMgBgBgGQABgIAQAAIE0ACQAQAAAIADQAOAHgCANQgBANgZAGIhKAVQADAFANABIA2ACQANABABAHQgEAEgRALIggARQgGAEgHACQgIADgLAAIhmADQAPAIAhAEQBcALA3AMQANACADAHQgGAPgcAIQgdAJgKACQgcAGglACQgWABgrAAQALAJAXAEIBcASQASAEAGAEQAHAEACAGQABADgBAEQgBADgDACQgCABgHAAIgSgCIgCAAIgCAAIiMAGQAVAKAqADIBvAHQAMABAFAFIADACIgFAEQgMAHgRAEQgLACgbACQhPAFhKATQBHAPBAAlQAAAKgSAAgAgpioQAoAQAVACQAUABAogLIBNgVQABgGgKAAIjhAAQALAJAZAKg");
	this.shape_26.setTransform(37.075,104.675);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#663366").s().p("AhkC/QgUgYgSgjQgMgXgMgbIgCgGQgLgcgKgeIgMgsQgIghgHgjIgGguIgGg0IgDg1IHHAAIgDAxIgGA4IgHAwQgGAigIAgIgNAuQgKAdgKAbIgDAGIgDAJQgFgFgMgBIhwgIQgqgCgVgKICMgGIACAAIACAAIASABQAHAAACgBQADgBABgDQABgEgBgDQgCgGgGgEQgHgEgSgFIhcgRQgXgFgLgHQArAAAWgBQAlgCAdgHQAJgCAegKQAbgHAGgPQgCgHgNgCQg3gMhdgMQghgEgPgHIBmgEQAMAAAHgCQAIgCAFgEIAggRQARgLAEgEQAAgHgNgBIg2gCQgNgBgDgFIBKgVQAYgGACgNQABgNgOgHQgHgDgRgBIk0gBQgPgBgBAJQAAAFAMACIAlACIANABQAGACAJAHIAMAEIAMADIASAMQAMAIAaAGQgvAFgugNQgHgCgDABQgDABgCACQAAAAAAABQAAAAgBABQAAAAAAABQAAAAAAABQADAHAOAFQAjAIBQACQBJAAAmANQgNAHgeABIhdABIg/gCIg+gCQgMABAAAGQABAFALABIA1AIQAUADAIAEIARAJQAFACAMABQALACATAJIAaAEQAsAEBXAQQgZAMghAEQgXACglAAIjBgEQgNgBAAAHQACAHALAAQBCAHAjAIQATAGATAHIAUAIIAWAGIBUARIgCAAIjFgCQgTAAgFAJQBZArBhAAIiBATQgsAGgWALQAUAPAzAIQAyAIAUAOQgaACgZAIQAAAIAPABIBMACQASAAAAgKQg/gmhHgOQBJgTBPgGQAbgBALgCQASgEALgIIgQAjQgTAkgUAYQguA2g3ABQg2gBgug2gAAVifQgVgBgogQQgZgKgKgJIDgAAQAKgBAAAHIhOAVQgkAKgUAAIgEgBg");
	this.shape_27.setTransform(36.95,105.5);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFF33").s().p("AjjDxIgCg8IHLAAIgCA8gAjlCsQAAgvADgsIHFgHQADAvAAAzIAAAJInLAAIAAgJgAjXgTIAAAAIGugKImuAKQAJg/AQg5QAMgsAQgoIAHgPIE2gCIAHARQAQAmAMApIl8AFIF8gFQAQA3AJA8QAIAxAEA2InFAHQADg1AIgvg");
	this.shape_28.setTransform(36.95,56.875);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#000000").ss(1,1,1).p("AD0pZQAAARgMAMQgMANgSAAQgRAAgNgNQgMgMAAgRQAAgSAMgMQANgMARAAQASAAAMAMQAMAMAAASgAA2m5IBqh2AgynQQAPgFAQAAQAmAAAjAcQAtAkAkBUQAEAIADAIQAQAmAMAqIC+hyAifphQAAAQgMAMQgLAMgRAAQgRAAgLgMQgMgMAAgQQAAgRAMgMQALgLARAAQARAAALALQAMAMAAARgAgynQIhthpAjTjcQAMgtARgoQADgHADgHQA2h8BIgVAlJlnIB2CLIF9gFQAQA2AJA9QAIAyAEA2QADAuAAAyQAAAFAAAEQgBAfgBAdQgBAZgCAYQgCAdgEAbQgDAZgEAXQgGAigIAfQgGAZgHAXQgKAdgKAbQgCADgBACQgLAbgLAXQgTAjgUAZQguA2g2AAQg3AAgug2QgVgYgSgjQgMgXgLgcQgBgCgBgDQgMgdgKgeQgGgWgFgXQgJgfgFgiAj5BkQAAgFAAgFQAAgvADgrQADg0AHgwIiZBkAjshlIAAABAjsEXQgCgHAAgIQgEgZgCgbQgCgagCgbQgBgdAAgeIHLgBAj2AAIHFgGADDhuImvAJQAJg/AQg4Aiwk/IE3gCADDhuIDDB4");
	this.shape_29.setTransform(43.05,65.025);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#6633FF").s().p("AASDxQgHAAgEgDQgDgDAAgJIAAgmQgKACgNgHIgWgNQgTgLgDgEQgFgFgBgHQgCgHAEgFQgiADgHgRQgDgIAFgNQAJgZATgVQgKgOAEgSQgGgDgTABQgPABgGgHQgEgGACgLQABgPgBgFQgQgEgRgLQgJgGgTgPIgBgBQgKgIgCgGQgBgIAJgKIADgDQAPgQAWgRQANgKAEgIQADgGgBgGQgBgHgFgEIgIgEQgGgCgCgCQgGgHAFgJQADgFAKgGQAdgSArgHQAbgEAygBQB1gEBEADQAJAAACAGQAAAFgMABIimAGQAcAAA3ALQA3ALAcgBQALgBAFAEQAFADABAHQABAGgDAGQgEAJgPAIQg0AihCAhIAxAEQAMABADAEQADAEgBAFQgBAFgEADQgDADgOAFIhUAXIA8gFQAigBAbADQAeAEAQAMQAGAGADAHQADAIgEAFQgDAEgKADIhZAbQgWAHgOACIgcACIhSACQgIAAgGACQgFACgHAJQgRAVgDAZQAeADArgLIBIgSQAkgHAmAFQAHABADACQAEADgBAGQAAAGgEAEQgEAFgOAEQhIAUhKgCQgSgBgFAJQAWAYAhAEQgCgFAFgFQAEgDAGgCQAngJAjADQAJABAEADQAGAFAAAJQABALgHAFQgEAEgLABIhFAEIAAAiQASAAAOALQgIAGgUAAIgGAAgAArCmIAyAAIgugCQgBAAgBAAQAAAAgBAAQAAABgBAAQAAAAAAABgAA9BkIgRAFIgRAEIAUAAQANABAIgBQAJgCASgGIgYgBIgKAAgABugJQgbAIgOABIg4AJQggAGgUANQBLAEApgHIBTgUQAPgFgBgHQgHgHgQAAIgCAAQgQAAgXAFgAhVgCQATABALgEIAWgKQAXgLAYgBIiCgCIAAAaIAJAAIAWABgAhBhFQgaAEgVAPQAhgBBCABQA8gCAkgSIh5AAIgbABgAiUh7IgLAOQgEADgKAGQgKAHgEAMQAPAQATAKQAOAIAHgEQgCgHAJgGQAVgQAYgEQADgEgFgEIgJgEQgNgDgNgHQgHgDgEgFQgHgIACgKQgIAAgHAJgAhriVQgHAFgBAHQgBAIALAJQAVAPAfAFQAWADAigBQAcgBAQgEQATgFAagOQA1gbAughIgpgBQgFAVgdAMQgmARg2gEQgYgChHgNIgQgBQgNAAgHAEgAg4inQALAFAXADQA2AHApgGIAXgEQAVgGARgPQgUACgcgBIgxgCIgGAAQg1AAgiARgAh1i2QALAEAGgCIAHgFIAGgGIAJgDIAJgCQAIgDAOgHQANgFAbgCIhDgCIgKABIgIAEIgMADIgLACQgPAEgEAOIABAAQAFAAALAFg");
	this.shape_30.setTransform(39.1575,102.6242);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#663366").s().p("AhjDdQgVgYgSgjQgMgXgMgbIgCgGQgLgcgKgeIgMgtQgIgfgGgiQASAPAKAGQARALAPAEQACAFgCAPQgBALAEAGQAFAHAQgBQATgBAGAEQgEARAJAOQgSAVgJAZQgFANADAIQAGARAjgDQgEAFABAHQACAHAFAFQADAEASALIAXAOQANAHALgDIAAAnQAAAIADADQAEADAGAAQAYACAKgIQgPgLgRAAIAAghIBFgFQALgBAEgDQAHgGgCgLQABgJgGgFQgEgDgKgBQgigDgmAJQgGACgEADQgGAFADAFQgigEgXgYQAFgJATABQBKACBIgUQANgEAFgFQADgEABgGQABgFgFgEQgCgCgIgBQglgEgkAGIhIASQgsAMgdgEQADgZARgVQAHgIAFgCQAGgDAIAAIBSgCIAbgCQAOgBAWgIIBagaQAKgEADgEQAEgFgDgIQgDgHgGgGQgRgMgegEQgagDgiABIg9AFIBVgXQAOgFADgDQAEgDABgFQABgFgDgEQgEgEgLgBIgxgEQBBghA1ghQAPgJAEgJQADgFgBgHQgBgGgFgEQgFgDgLAAQgcABg3gLQg3gLgcAAICmgGQALgBABgFQgCgFgJAAQhEgEh0AEQgzACgbAEQgrAGgeASQgJAGgDAFQgFAJAFAHQACADAHACIAIADQAFAEAAAHQACAGgEAHQgEAHgNAKQgVASgQAPIgCAEIgCgQIgGg0IgDg1IgCg7IHLAAIgCA7IgDAxIgGA4IgHAwQgGAigIAfIgNAvQgKAdgKAbIgDAGQgLAagLAXQgTAkgUAYQguA2g3ABQg2gBgtg2gAAZCnQAAgBAAAAQAAAAABgBQAAAAABAAQABAAAAAAIAvACgAAdBvIgVAAIASgFIARgEQALgCAXADQgSAFgJACIgNABIgIAAgAg5AdQAUgNAggGIA4gIQANgCAbgIQAZgGARABQAPAAAIAHQABAHgPAFIhTAUQgbAEgnAAIgygBgAhogBQgWgBgIAAIAAgaICDACQgaABgWALIgWALQgJACgNAAIgJAAgAhThDIAbgBIB5AAQglARg7ACQhCgBgiACQAWgPAagEgAirg2QgTgKgPgQQAEgMAKgHQAKgGAEgDIALgOQAHgIAHAAQgBAJAHAIQAEAFAHAEQANAHANADIAJADQAEAEgCAEQgYAEgWAQQgJAGACAHQgCABgDAAQgGAAgJgFgAhHhjQgggFgUgPQgLgJAAgIQABgHAIgEQALgIAZAFQBIANAXABQA2AEAmgQQAdgNAFgVIAoABQgtAhg2AcQgaAOgSAEQgQAEgbABIgUAAQgWAAgPgCgAgoidQgYgDgKgFQAjgSA6ABIAxABQAcABAUgCQgRAPgVAGIgXAFQgTACgWAAQgYAAgegDgAiHi1QgMgFgGABQAEgPAPgEIAMgCIAMgDIAIgEIAKgBIBDACQgbACgNAFQgOAIgIACIgKACIgIADIgGAGIgHAFIgFABQgFAAgHgDg");
	this.shape_31.setTransform(41,102.5);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFF33").s().p("AjlDKQAAgwADgrIHFgHInFAHQADg1AIgwIAAgBIGugJImuAJQAJg9AQg5QAMgtAQgnIAHgPIE2gCIAHARQAQAmAMApIl8AFIF8gFQAQA2AJA8QAIAyAEA2QADAvAAAzIAAAJInLAAIAAgJg");
	this.shape_32.setTransform(41,53.9);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#000000").ss(1,1,1).p("AD0pZQAAARgMAMQgMANgSAAQgRAAgNgNQgMgMAAgRQAAgSAMgMQANgMARAAQASAAAMAMQAMAMAAASgAA2m5IBqh2ACHlBQAEAIADAIQAQAmAMAqIC+hyAA2m5QAtAkAkBUAgynQQAPgFAQAAQAmAAAjAcAifphQAAAQgMAMQgMAMgQAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAQAQAAAMALQAMAMAAARgAgynQIhthpAlJlnIB2CLQAMgtAQgoQADgHAEgHQA2h8BIgVAjshlIAAABIiZBkAj5AuQABgYABgWQADg0AIgwADRAuQAAAJAAAJQABANAAANQAAAFAAAEQgBAfgBAdQgBAZgCAYQgCAdgEAbQgDAZgEAXQgGAigIAfQgGAZgHAXQgKAdgLAbQgBADgBACQgLAbgLAXQgTAjgVAZQgtA2g2AAQg4AAgtg2QgVgYgSgjQgMgXgMgcQgBgCgBgDQgLgdgKgeQgGgWgGgXQgIgggGgjQgEgWgDgYQgDgZgDgbQgCgagBgbQgBgdgBgeQAAgFAAgFQAAgWABgWADPgGQABAZABAbInKAAADDhuQAIAyAEA2ADDhuIDDB4Aj3AAIHGgGAjshlQAJg/AQg4IF9gFQAPA2AKA9gAiwk/IE3gC");
	this.shape_33.setTransform(39,65.025);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#6633FF").s().p("AgrERQgHAAgEgDQgFgEABgLQABgOgBgEQgJABgHgHQgHgGgCgJQgDgMAFgYIgtgCQgagBgMgMQgKgJADgKQADgGALgFIAbgNQAMgFADgHQABgEAAgKQAAgJADgDQgfgBgJgNQgMgSAUgeIAOgVQAHgMAAgLQgNgBgOgRQgRgVgGgEIgLgGQgHgEgDgEQgEgGACgKQACgIAGgGQgKAAgHgHQgIgIgBgKQgCgUATgQQAJgIAagLQgQgEgIgGQgMgJACgMQADgNAUgHQAzgUBFgHQAqgFBQgBQAYAAAJADIARAFQALAFAFABQAOADAcgCQAbABAJAQQgGAEgQgBQgvgEgWgFIghgHQgIgBgXABIhJAEQg4AEgbAEQgtAIggASQANAOAUgBQAOgBAagNQAMgDARgBQBIgFAsAAQBAABAzANQAQAEAFAGQAEAEAAAGQAAAHgEADIgEADQgBAAAAABQgBAAAAABQAAAAgBABQAAAAAAABQAAAEAIABQANACAIAIQAJALgFALQgEAJgPAGQgrAQghAIIAYAKQAOAGAIAGQAJAHADAIQACAIgDAIQgDAIgGAGQgHAHgTAHQhuAkhwgQQgNgCgGACQgGAEgFAJIgPAZQgHAMAFAGQADAEAIAAQATACAZgIIArgQQAlgNAvgCQAegCA6ACQAKAAAHADQAJAEAAAIQACANgVAGQgrAPg4AFQglAEhAAAQgfAAgIAOQAGAGARgEQAlgJAugBQAbgBA7ADQAJABADACQADADAAAEQAAAFgCADQgCAFgJAHQAFACABAGQABAHgDAEQgFAHgOAEQhGAVhNAKIAAAiQAOADAVgIIAigNQAKgDAcgBQAUAAALADQARAEAIAKQAFAGgCAFQgCAEgIACQg5ALgygCQgPAAgEADQgFADgCAFQgBAFADAEQAWgDASAOQgQAGgQAAIgKgBgAACDWIA+AAIg4gCQgFAAgBACgAhUB8IgQAEQgTAGgNAHQgOAGgGAIQADAEAKAAIA1gBQAIAAAGgCQAJgCANgIQAWgMAbgJQgNABgdgCIgVgBQgMAAgIABgAADCNQgHABgMAGIgUAJQAHABAKgBIAQgEIAdgEQAQgDAKgHIgYAAIgJAAQgJAAgHACgAApA9QA1gCAjgPQg4gDghADIgdADQgpAFgUAIIAeAAIA9ABgAhBgXQgPADAAAIIAPACQBuAHBqgpQABgBAAAAQAAAAAAAAQAAgBAAAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQgBgBAAAAQAAAAgBAAQhvAHhnASgAhBhTQgoAHgYAWQAIADAKABQAsAEBIgNQBXgQAfgBQgQgKgkAAIhAgBIgIAAQgpAAgXAEgAiyhbIAVARQAKAIAGgBQADgBAFgEQAKgIAOgGIgrgEIgIgBIgDgDQgDgBgFABIgIAAQAAAAAAAAQAAABAAAAQAAAAAAABQABAAAAABgABvinQgQABgYAEIgoAHQgRACghABQgiACgRACQg+AHgeAiICMAAQBHAAAlgFQA8gJApgaQgZgVgqAAIgJABgAiRi0IgKAIQgFADgMAEIgLAJQgHAGgFABIAAASQAIAHAMgDIAKgDIAKgFIAegOQASgJALgHQgVgFgRgKQgEgDgDAAgAh0i/QAeARAVABQAJABAZgDQBVgNBcgBQgOgTgrAAIhFAAQhVACgzAPg");
	this.shape_34.setTransform(38.2194,98.6298);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#663366").s().p("AhkD4QgUgYgSgjQgMgXgMgcIgCgFQgLgdgKgeIgMgtQgIgfgHgjIgGguIgGg0IgDg1IgCg7IAAgKIABgsIHJAAIABASIAAAaIAAAJIgCA8IgDAxIgGA4IgHAwQgGAigIAeIgNAwQgKAdgKAbIgDAFQgLAbgLAXQgTAjgUAZQguA2g3AAQg2AAgug2gAgtDzQgBALAEAEQAFADAHAAQAVADAUgIQgRgOgWADQgDgEABgFQACgFAEgDQAFgDAPAAQAyACA4gLQAJgCACgEQABgFgEgGQgJgKgQgEQgMgDgUAAQgbABgKADIgiANQgVAIgPgDIAAgiQBOgKBFgVQAOgEAGgHQADgEgBgHQgCgGgFgCQAKgHACgFQACgDAAgFQgBgEgDgDQgCgCgJgBQg7gDgbABQgvABgkAJQgRAEgGgGQAIgOAfAAQBAAAAkgEQA4gFArgPQAWgGgCgNQAAgIgKgEQgGgDgLAAQg6gCgdACQgwACgkANIgrAQQgZAIgUgCQgHAAgEgEQgEgGAGgMIAPgZQAGgIAGgEQAFgCAOACQBwAPBtgkQAUgHAGgHQAHgGADgIQADgIgDgIQgCgIgJgHQgJgGgOgGIgXgKQAhgIAqgQQAQgGAEgJQAFgLgJgLQgIgIgNgCQgIgBAAgEQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAIAEgDQAFgDAAgHQAAgGgFgEQgEgGgQgEQgzgNhAgBQgtAAhHAFQgRABgMADQgaANgOABQgVABgMgOQAggSAtgIQAbgEA4gEIBIgEQAYgBAHABIAhAHQAXAFAvAEQAQABAGgEQgKgQgbgBQgcACgNgDQgFgBgLgFIgRgFQgJgDgYAAQhRABgpAFQhFAHgzAUQgVAHgCANQgCAMAMAJQAIAGAPAEQgZALgJAIQgTAQACAUQAAAKAJAIQAHAHAKAAQgGAGgCAIQgCAKAEAGQADAEAGAEIALAGQAHAEARAVQANARAOABQAAALgHANIgPAUQgTAeAMASQAJANAfABQgEADABAJQAAAKgBAEQgEAHgLAFIgbANQgLAFgDAGQgEAKAKAJQANAMAaABIAsACQgEAYACAMQADAJAGAGQAIAHAJgBQAAAEAAAOgAAPDKQABgCAEAAIA5ACgAiLCPQAGgIAOgGQANgHATgGIAQgEQAPgCAaACQAcACAMgBQgaAJgVAMQgNAIgJACQgHACgHAAIg1ABQgLAAgCgEgAgXCRIAUgJQALgGAIgBQAJgDAQABIAYAAQgKAHgRADIgdAEIgQAEIgKABIgGgBgAglAwQAUgIApgFIAdgDQAggDA5ADQgjAPg2ACQg7gCgfABgAg0gWIgQgCQABgIAPgDQBngSBvgHQAAAAABAAQAAAAAAABQABAAAAAAQAAAAAAABQAAAAAAAAQABAAAAABQAAAAgBAAQAAABAAAAQhaAjhcAAIgigBgAhig+QgLgBgHgDQAYgWAogHQAagEAtAAIBBABQAkAAAPAKQgeABhXAQQg3AKgnAAIgWgBgAiQhWIgVgRQgBgBAAAAQAAgBAAAAQgBAAAAgBQAAAAAAAAIAIAAQAGgBACABIAEADIAIABIArAEQgOAGgKAIQgFAEgDABIgCAAQgGAAgIgHgAiWh3QAfgiA+gHQAQgCAjgCQAhgBARgCIAogHQAYgEAQgBQAwgDAbAXQgoAag8AJQglAFhHAAgAi2iPIAAgSQAFgBAGgGIAMgJQAMgEAEgDIALgIIAEgDQADAAADADQASAKAVAFQgLAHgTAJIgeAOIgJAFIgKADIgHABQgIAAgFgFgAg1i5QgUgBgfgRQAzgPBWgCIBFAAQArAAAOATQhcABhVANQgUACgKAAIgFAAg");
	this.shape_35.setTransform(36.95,99.825);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFF33").s().p("AjkC4IACguQADg1AIgwIAAgBQAJg9AQg5QAMgtAQgnIAHgPIE2gCIAHARQAQAmAMApQAQA2AJA8QAIAyAEA2InFAHIHFgHIACA1gAjXAkIGugJgAi+hSIF8gFg");
	this.shape_36.setTransform(36.95,51.2);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#000000").ss(1,1,1).p("AD0pZQAAARgMAMQgMANgSAAQgRAAgNgNQgMgMAAgRQAAgSAMgMQANgMARAAQASAAAMAMQAMAMAAASgAA2m5IBqh2ACHlBQAEAIADAIQAQAmAMAqIC+hyAA2m5QAtAkAkBUAgynQQAPgFAQAAQAmAAAjAcAifphQAAAQgMAMQgMAMgQAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAQAQAAAMALQAMAMAAARgAgynQIhthpAlJlnIB2CLQAMgtAQgoQADgHAEgHQA2h8BIgVAjyg6QADgWADgUIiZBkAjshlIAAABADSBeQAAADAAACQgBAfgBAdQgBAZgCAYQgCAdgEAbQgDAZgEAXQgGAigIAfQgGAZgHAXQgKAdgLAbQgBADgBACQgLAbgLAXQgTAjgVAZQgtA2g2AAQg4AAgtg2QgVgYgSgjQgMgXgMgcQgBgCgBgDQgLgdgKgeQgGgWgGgXQgIgggGgjQgEgWgDgYQgDgZgDgbQgCgagBgbQgBgdgBgeQAAgFAAgFQAAgWABgWQABgYABgWQACgeADgcADDhuQAEAZADAbQADAZACAbQABAZABAbQAAAJAAAJQAAAEABAFADDhuIDDB4ADKg6Im8AAADDhuImvAJQAJg/AQg4IF9gFQAPA2AKA9gAiwk/IE3gC");
	this.shape_37.setTransform(39,65.025);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#6633FF").s().p("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");
	this.shape_38.setTransform(37.4702,93.779);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#663366").s().p("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");
	this.shape_39.setTransform(36.95,94.575);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFF33").s().p("AjdCEIAFgrIAAAAIGvgJIAHA0gAi/gdIF9gGQAQA2AJA9ImvAJQAJg/AQg3gAiihyIAGgOIE3gDIAHARQAQAmAMApIl9AGQAMgtARgog");
	this.shape_40.setTransform(36.9625,45.95);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#000000").ss(1,1,1).p("ADlpZQAAARgMAMQgMANgSAAQgRAAgNgNQgMgMAAgRQAAgSAMgMQANgMARAAQASAAAMAMQAMAMAAASgAAnm5IBqh2AB4lBQAEAIADAIQAQAmAMAqIC+hyAAnm5QAtAkAkBUAhBnQQAPgFAQAAQAmAAAjAcAhBnQIhthpAiuphQAAAQgMAMQgMAMgQAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAQAQAAAMALQAMAMAAARgAlYlnIB2CLQAMgtAQgoQADgHAEgHQA2h8BIgVAC0huQAEAZADAbQADAZACAbQABAZABAbQAAAJAAAJQABANAAANQAAAFAAAEQgBAfgBAdQgBAZgCAYQgCAWgDAWQAAAEAAAEQgBACAAACQgDAZgEAXQgGAigIAfQgGAZgHAXQgKAdgLAbQgBADgBACQgLAbgLAXQgTAjgVAZQgtA2g2AAQg4AAgtg2QgVgYgSgjQgMgXgMgcQgBgCgBgDQgLgdgKgeQgGgWgGgXQgIgggGgjQgEgWgDgYQgDgZgDgbQgCgagBgbQgBgdgBgeQAAgFAAgFQAAgWABgWQABgYABgWQACgeADgcQADgWADgUIAAgBAC0huImvAJQAJg/AQg4IF9gFQAPA2AKA9gAi/k/IE3gC");
	this.shape_41.setTransform(40.5,65.025);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#6633FF").s().p("AgyFeQgHAAgDgCQgGgEACgJQACgRAbgKQgdgJgRgZQgPgBgTgWIgegjQgHgJgCgFQgCgGACgHQADgHAFgEQAJgJAPABQgDgHgIgFIgQgIQgZgLgOgVQgIgOAEgKQAFgLAVgEIBEgNIAYgEQANgBARABIAsABIgDgBIgVgLQgVgMgpgPQgugRgSgJQgMgHABgHQgVgKgNgRQgJgKAEgIQAFgGACgDQACgHgJgKQgKgLABgGQAAgIAMgGQATgMANgFIAVgHQAHgDAXgNIARgIQgdgCgUgFQgPgDgigNIgMgHQgFgGADgIQACgIAHgGIANgJQAIgFAEgFQgUgGgIgMQgGgHAAgIQgBgKAFgGQAEgGAJgEIAQgFQALgEAZgNQAXgNAOgDQAKgDATgCQAngEATAAQApgCAoAGIAlAGIAbAFQAQADAHAEQAMAIAAALQgGAFgIgDQgIgDgCgHIgxgEQgCgDgGgCQgngKg5AFIgzAFIgVACIgSADQgQADgbANIgjAQQgJAFAAAFQAAAEAEAFQANAMAPAAQAJgBASgJQAagPArgRQARgHAJgCQAMgCAPABIAaAAQAOABAvAIIAhAGIAVAFQAXAHASASQARARAJAXQAJAXgNAJIgKADIhkAWIAEABIBPADQANAAAEAHQgDAGgMAAIg2AAQA0AfAfAYQANALgCAIQgDAJgPACQgRACgEAGQAFAGAJAGIAQAMQAHAHACAJIABADIgBAJIgEAFQgDACgKADQhpAehrgDQAOAMAXAFQAQADAbABIBWACQAMAAABAGQgBAGgLAAIhGABQANAFASAMQAcATAOAEIAKAEQAGADACAFQACAGgFAHQgFAFgIADQgdAMgjAAQgNAAgBAHIAOASQAGALACAJQABALgGAEQgDACgHAAIiVgCQgbAAgOgGQgIgDgDgFIgCgGQgBgEgCgBIgNAHQAQAiAgAWQACgLASgGQAagIAigCQAUgBApABIAVAAQAWABAJAHQAHAEACAJQACAJgGAGQgEADgIACQgeAHgvABIhOACQARALAdABIAxADQAJABABAFQgDAGgOACQgdAEgUALIgMAHQgHAFgFABIBFAFQALABABAGQAAAGgLAAgAgKDyIgRABIgTAGIgMACICCAAQAIAAADgBQAHgDgBgGIgyAAQgcAAgVABgAheCzQgLACABAHQALAJAbAAICNgCQAAgHgGgHQgFgGgHgDQgJgEgVAAIg9AAQgUACgoAJgAimBgQgIACgDAGQAJAQAOAJIAZAOQAEADAFABQAFABAIgBIANgBIACgGQgEgHgKgFQgNgFgFgEIgMgHIgMgFQgIgFADgGIgGgBIgHABgAg6CSIBcAAIhNgCQgKAAgFACgAgLBOQgpABgTABQgiADgZAIQAZAfAnABQAMABAlgHQBCgNBCADQgXgTglgGQgVgEgkAAIgJAAgACEgkIkGAOIA1AWQAPAIAKACQAJABASAAQBJAAAmgDQA+gGAugRQgLgVgrAAIgIAAgAiUg8IgVAFIAAAKIArgCIACgGQgKgHgGgBIgIABgAAJg7QgNAEgKAAIBRAAQAPABAFgHQgEgEgJAAIgkAAIgdAGgAhqhHQAUAEAGADIAIACIAHAAQAKgBAagIIhCgCQgIAAgDACgABnhOQAcAGAQAAQAYAAAOgNQgvgpg4gYIgCAAIgNgBQADAGAGAJQAIANgEAHQgEAGgOACQhIAHhKAAQgigBgNgEQgVgGgGABQgIABgFAFQgGAFAAAHQAOAJAVAAQALAAAbgDQAngFAmAAQBBAABBAOgAgxiZQgGAAgLAEIg4ATQgKADgDAGQAHADAOAAQA6AAAegBQAwgCAngHQgJgTgKgEQgGgCgIAAIg+gBIgHAAIgIABgAgGjFQAWALANACQAOACAVgCQA+gFA8gVQgFgEgDgOQgDgOgHgCQgEgCgNAFQgMAEgSACQhjAKhaAAgAiajpIgJAEQgUALgFALQAeAOAQAEQAZAHAngBIBBgCIghgLQgUgHgMgIIgSgNIgygIIgGgBIgCAAgAgdkjQgUAEgmARIg0AXIEIgcIhOgNQgcgFgVAAQgPAAgMACgAAkj3IArgCIgIgBIgMgBIgFAAQgKAAgIAEg");
	this.shape_42.setTransform(37.9583,91.66);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#663366").s().p("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");
	this.shape_43.setTransform(36.95,91.975);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFF33").s().p("Ai+gIIF9gFQAPA1AKA9ImvAJQAJg/AQg3gAiihdIAHgOIE3gCIAHAQQAPAmANAqIl9AFQAMgtAQgog");
	this.shape_44.setTransform(36.9,43.825);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#663366").ss(1,1,1).p("ADOAAImbAA");
	this.shape_45.setTransform(36.9625,48.6);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#000000").ss(1,1,1).p("ADlpZQAAARgMAMQgMANgSAAQgRAAgNgNQgMgMAAgRQAAgSAMgMQANgMARAAQASAAAMAMQAMAMAAASgAAnm5IBqh2ACbjhQAIAeAHAgQAGAaAEAbQAEAZADAbQADAZACAbQABAZABAbQAAAJAAAJQABANAAANQAAAFAAAEQgBAfgBAdQgBAZgCAYQgCAdgEAbQgDAZgEAXQgGAigIAfQgGAZgHAXQgKAdgLAbQgBADgBACQgLAbgLAXQgTAjgVAZQgNAQgOALAB4lBQAEAIADAIQAQAmAMAqIC+hyAAnm5QAtAkAkBUAhBnQQAPgFAQAAQAmAAAjAcAhBnQIhthpAiuphQAAAQgMAMQgMAMgQAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAQAQAAAMALQAMAMAAARgAAYJ5QgbARgfAAQg4AAgtg2QgVgYgSgjQgMgXgMgcQgBgCgBgDQgLgdgKgeQgGgWgGgXQgIgggGgjQgEgWgDgYQgDgZgDgbQgCgagBgbQgBgdgBgeQAAgFAAgFQAAgWABgWQABgYABgWQACgeADgcQADgWADgUIAAgBQAFggAGgeQAGgeAIgbIF9gFAlYlnIB2CLQAMgtAQgoQADgHAEgHQA2h8BIgVAi/k/IE3gC");
	this.shape_46.setTransform(40.5,65.025);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#6633FF").s().p("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");
	this.shape_47.setTransform(37.2244,89.2423);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#663366").s().p("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");
	this.shape_48.setTransform(36.95,89.325);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFF33").s().p("AjNBPQAHgdAHgcQAMgsARgnIAGgPIE3gCIAHARQAQAmAMAoQAJAeAHAggAi/AWIF9gFg");
	this.shape_49.setTransform(36.9625,40.7);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#663366").ss(1,1,1).p("ADOAAIhrAAAgIAAIhcAAAiGAAIhHAA");
	this.shape_50.setTransform(36.9625,48.6);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#000000").ss(1,1,1).p("AD3pZQAAARgMAMQgMANgSAAQgRAAgNgNQgMgMAAgRQAAgSAMgMQANgMARAAQASAAAMAMQAMAMAAASgAA5m5IBqh2ACKlBQAEAIADAIQAQAmAMAqQAJAeAHAgQAFAaAEAbQAEAZADAbQADAZACAbQABAZABAbQAAAJABAJQAAANAAANQAAAFAAAEQgBAfgBAdQgBAZgCAYQgCAdgEAbQgDAZgEAXQgGAigIAfQgGAZgHAXQgKAdgKAbQgCADgBACQgLAbgLAXQgTAjgUAZQgTAVgTANAA5m5QAtAkAkBUAgvnQIhthpAgvnQQAPgFAQAAQAmAAAjAcAicphQAAAQgMAMQgLAMgRAAQgQAAgMgMQgMgMAAgQQAAgRAMgMQAMgLAQAAQARAAALALQAMAMAAARgAAYKCQgUAIgUAAQg3AAgug2QgUgYgTgjQgMgXgLgcQgBgCgBgDQgMgdgJgeQgHgWgFgXQgJgggGgjQgEgWgDgYQgDgZgCgbQgCgagCgbQgBgdAAgeQAAgFAAgFQAAgWAAgWQABgYACgWQABgeAEgcQACgWADgUIAAgBQAFggAGgeQAGgeAIgbQAMgtARgoQADgHADgHQA2h8BIgVAjQjcIF9gFAitk/IE3gC");
	this.shape_51.setTransform(38.675,65.025);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#6633FF").s().p("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");
	this.shape_52.setTransform(35.5072,87.6423);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#663366").s().p("AhkGAQgUgYgSgjQgMgXgMgcIgCgFQgLgdgKgeIgMgtQgIgggHgjIgGguIgGg0IgDg0IgCg7IAAgKIABgsIACgvQACgeADgcIAGgqIAAgBQAEggAGgeQAHgeAIgbIF8gFQAJAeAHAgIAJA1IAHA0IAFA0IACA1IABASIAAAaIAAAJIgCA8IgDAxIgGA3IgHAwQgGAigIAfIgNAwQgKAdgKAbIgDAFQgLAbgLAXQgTAjgUAZQgSAVgUANIhWgPQAbABAfgUQANgIAoggQAQgOADgKQADgLgJgKQgIgKgLABQAOgBAMgIQANgIAGgNQAFgHAAgHQAAgHgFgEQAVgJACgRQAAgNgOgNQAQgNAEgaQADgQgEgcQgBgOgCgGQgEgHgOgLQgYgSgLgEQgNgEgXAAIiSgCQgkAAgTgFQgggJgNgUQAlgKBHAAIBFAAQAPgBALACQAMABATAGQAyAOAzAYQAPAIALgBQAGAAAGgEQAHgEABgHQAAgJgKgLQgognhZgFQgngChJAEQhOAEgigBQgkgBgGgSQAhgPAugGQAdgDA3gBIBdgBQA4AMA6ACQAHAAADgBQAFgEACgHQAEgQgIgWQgLgagDgNQgCgIACgFQACgDAFgDIAIgEQAOgIgCgQQAAgHgGgGQgEgGgHgCQgFgCgLAAIh1gCQg2gBgegDQgvgFgjgNQgOgFgBgJQAOgIAeAAIDXgCQAmgBATAGQAKADADgCQAIgFgJgPQgNgTgJgHIgOgIIgPgIQgSgMgKgEIgVgGQgMgEgEgHIABgHQAIACAKgGIAKgGIAIgFQAGgCAMgBIAegCQANgBACgHQgCgGgLAAIkBgCQgTAAgHAGQgHAGgBAOIhHAAIBHAAQgBAIABAKQACAKADAEQADADANAEQALADAQALQASALAIADQgpAFgVgPIgOgJQgFgBgEABQgEABgCAEQAHAOAPAIQAOAIAPAAQgGACgLACIgSADQgWAGgDAQQgBAMAKAKQAGAGAQAGQA1AVBgAFQgnALgpgBQgXAAgOgGQgRgJgJgDQgIgCgNAAIglgCQgOAAgEAGQAGAPAQAJQAPAIATABIAkACQAUAAANAFQAIADAUAMIAZAQQAJAHAGABQAGACAMAAIBNACIAGAAQAXAKAJASIheABQgagFgXgIQgogMgOgCQgHgBgdAAIg5ABQgLAAAAAGQACAGANABIA0ABQAeABAWAFIAfAIIgGAAQhhABg8APQgSAFgJAHQgOAKADAOQADARAZAJQgEAHABAKQABAHAEAIQAIALAUALQAZAMAZAHQgDAHACAIQACAHAGAGQAGAIAUAIQAIADACAEQABADgEAJQgCAHAEADIhZAFQgLABgEADQgEADAAAHQgBAHAEAFQAEAIAPAHQAQAIAOAFQAMAEAaAFIBOAOQALACAiABQApAAASgIQATgJAGgBQAHAAAFAFQAGAFgDAGQgMAEgWAOQgwgCgyAKIgqAJQgYAGgSAAQgJAAgGACIgTABQgLAAgCAGQABAGAKAAIAMAAQAAAKANAQQAWAcAFAkQgGAFgBAKQAAAIAFAIQAGAMAUAJQAqAXAvgCQgVAIgVAAQg2AAgug2gADOl3IhrAAgAghFiQABgCAEAAIBMAAQgEAEgDAGQgZgEgxgEgAgHFCIARgCQALgBAGgDIAGgDIALgBIAvAAQABAIgKAEQgEACgMAAgAhGEwIA7ACIgcADIgIACIgHAFQgEAFgEABgABSEiIgBAAIABAAgAhOEVIgIAEIgEgIIAfgGIBvAAQAMAAAGgCQAIgDAMgMIAHgEIATACQgLAOgXAIQgPAFgZADQg0AFgxAAQgOAAgFgGgAA8D3IgFABQgJACgMAAIgHABIAhgEgAgEDCQgNgBgcgGIgogHQgcgFgNgFQgTgHgRgNQAQACApgDQAkgCAVAGQALADARAJIA4AbQgLACgOAAIgPAAgAAqCxQgEAAgGgFQgGgFgDgBIAmAAIAEABQAEABAGAIQgOACgPAAgABvCgQAEgDgBgGQgCgGgFgDQgFgCgQAAQgSgBgbgMQgjgPgJgDQgUgFgEgEQAFgPAcAAIAlABIAdAFIA1AKQAGABADACQAFAEABAKQACAYgNAUQgEACgEAAQgFAAgFgEgAAOCRIgSgFIgPgCQgNgGgGAAIgJgBQgGgBgBgDQgCgHgEgCQATgCALADIAWAGIAMAFQATAHANAHIgTABIgDAAgAhVBSQgRgIAAgNQANAAADABIAHACQAGACAIAAIAsADQgDAHgJADIgVAJIgGABQgMAAgNgHgABgBMIhzgXIBSgBQAYAAAMAFQAMAFAQASIgCAAQgLAAgSgEgACfAWIgUgKQgLgGgUgGIg3gSQAPgCAeAGIAYAEQAIADANAGQAcANAJAKQgEACgFAAQgGAAgGgCgACchZQAAgGgDgGQgDgGgOgKIgVgPIAIgFIAYgSQgCAMALAZQAMAYgEANIgMAAQADgDABgFgAAFiSQgSgDgcgVQAkgDAigOIAVgIQANgDAUABQAZABAJgBQAFAHAJABQAEAKgBAFQgBAGgJAIQgLAJgJADQgIACgJAAQgTgEghAAQgMAAgEAGIAAAAIgOgCgACHjNIAfAAQAAACADADQADAEgCADQgJAHgNABQgCgMgLgIgAiXjDQgEAAgBgCIAgACgAhElOIADgGQAsgKAngCQAcgCAPAJIAQALQAPAJAQAAIiGADIgEAAQgcAAgKgMgAhylkQgFgDABgOQAHABAMgDIADgBQARgGAFAAIAPgBIAeABQAMABAJAGIAFADQgKAAgfAIIgoAIIgVACQgGAAgDgCgAgIl3IhbAAgAiGl3gAAXl6IgIgFIAwACIgbADIgIABIgFgBg");
	this.shape_53.setTransform(36.95,86.225);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFF33").s().p("AihghIAGgOIE3gDIAHARQAQAlAMApIl9AGQAMgtARgng");
	this.shape_54.setTransform(36.875,37.85);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#663366").ss(1,1,1).p("ABUA1IgtAAADOA1IgdAAACbA1IglAAAipA1IgkAAAAAA1IhLAAAiwg0IFgAA");
	this.shape_55.setTransform(36.9625,43.35);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#000000").ss(1,1,1).p("AD3pZQAAARgMAMQgMANgSAAQgRAAgNgNQgMgMAAgRQAAgSAMgMQANgMARAAQASAAAMAMQAMAMAAASgAA5m5IBqh2ACKlBQAEAIADAIQAIASAGATQAHAVAHAWQAJAeAHAgQAFAaAEAbQAEAZADAbQADAZACAbQABAZABAbQAAAJABAJQAAANAAANQAAAFAAAEQgBAfgBAdQgBAZgCAYQgCAdgEAbQgDAZgEAXQgGAigIAfQgGAZgHAXQgKAdgKAbQgCADgBACQgLAbgLAXQgTAjgUAZQguA2g2AAQg3AAgug2QgUgYgTgjQgMgXgLgcQgBgCgBgDQgMgdgJgeQgHgWgFgXQgJgggGgjQgEgWgDgYQgDgZgCgbQgCgagCgbQgBgdAAgeQAAgFAAgFQAAgWAAgWQABgYACgWQABgeAEgcQACgWADgUIAAgBQAFggAGgeQAGgeAIgbQAHgZAIgXQAGgTAIgSQADgHADgHQA2h8BIgVQAPgFAQAAQAmAAAjAcQAtAkAkBUgAgvnQIhthpAicphQAAAQgMAMQgLAMgRAAQgQAAgMgMQgMgMAAgQQAAgRAMgMQAMgLAQAAQARAAALALQAMAMAAARgAitk/IE3gC");
	this.shape_56.setTransform(38.675,65.025);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#6633FF").s().p("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AiQkrQgWADgIAFQgDACAAACQgBADAGADIAKAJQAIAFAQgBQAMgBAEgCQAEgBAIgGQAIgGAFgCIgWgKQgJgEgEgBIgCAAIgKACgAC1kQQAAABABAAQABAAAAABQABAAAAAAQAAAAABAAIgCgGIgNgBgAAnkzQgUAFgfAAQgpAAgLABQAPAMAXADQAPADAaAAIBlgBQgJgBgQgMQgRgNgKgBIgBAAQgGAAgSAEgACAlaIgIAEIgLAIQgHAFgHAAQgEAGgFADQAPARAcAFQAQADAggCQACgbgPgWIgDgEIgLgBQgMAAgKAFgAgllaIgdAAQgeABgUAEQgDAPAGAEQADACAHAAQBjABAygFQgHgOgTgGIgMgCIgVgBgAiLlVIgGADIAAAHIAAACIABABIACABIACABIAGABIABgFIAAgMIgCAAIgEABgAAClqIAOABQARACAQANQAPAMAJgBQADAAANgIIAFgDIArgXQgEgEgGgDIgMgEIgSgJIgOgEIgSgFIgRgBQgnAAgTABQggACgZAHQgMAEgGAEIgYAUQAjgCAhAAIArABgACVmIIACACQAAAAABAAQAAABAAAAQABAAAAAAQAAgBAAAAIgDgFIgEgHIgCgCIgGgCQAIAHADAHgABwmPIADACQACABAFgBIAAgCIgLgFIgNgCQAIACAGAFgAhtmoICigBQgHgCgNAAIh4AAQgPAAgHADg");
	this.shape_57.setTransform(36,83.275);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFF33").s().p("AivAaIANgjIAHgOIE3gDIAHARIAOAjg");
	this.shape_58.setTransform(36.925,35.45);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#663366").s().p("AhkGVQgUgYgSgjQgMgXgMgbIgCgGQgLgcgKgeIgMgtQgIghgHgiIgGguIgGg0IgDg0IgCg8IAAgJIABgtIACguQACgeADgdIAGgqIAAAAQAEggAGgfQAHgdAIgcQAGgYAIgYIFgAAIAOArQAJAeAHAgIAJA1IAHA0IAFA0IACA1IABATIAAAaIAAAJIgCA8IgDAvIgGA5IgHAwQgGAhgIAgIgNAvQgKAdgKAbIgDAGQgLAbgLAWQgTAkgUAYQguA3g3AAQg2AAgug3gAhLFfIgIAOQgEAHAAAPQAAASAEAJQAHAOASAFQAMAEAUAAIAaAAQARAAAJgBQAOgDAbgRQATgMADgLQADgFgBgIIgBgOIABgMQABgIgDgFQgDgIgMgGQgQgHggAAIhcgCQgOAAgFgFQgCgCgDgJQgEgHgEgBQAmgEAqgBQASgBANACQAMACAZAJQAYAJANACQASACAIgJQAHgJgFgNQgGgKgLgGQgTgKgmgBIAfgBIAhgCQAZgEALgMQAIgIAAgLQAAgLgIgGQgDgDgMgDIgtgMIgYgGIAXAAQATAAAJgBQATgCAdgOQAYgLABgPQACgLgSgQQAOgGAAgJQABgHgLgHQgWgNgvgBQg9gBgeAEIg2AIQgRABgkAAQgKAAgEgCQgIgEgFgKQgHgOgDgNQA9ABA6gNQATgEAIAEQAFACAJAIQANALAPAFQARAEAQgCIAUgFQAMgDAIAAQAJABAOAHIAWAKQANAEAGgFQAHgEAAgPQAAgngVgSQALgEAFgMQAFgLgCgMQgHgXgZgLQgYgLgrAEQg2AEgRgDQgKgBgRgGQgTgFgJgCQgMgCgeAAQgbABgPgEQgJgDgUgJIgPgIIAeAAQAlAAATACQALABAhAGQAbAEAQABQAXABAHACQAHACAOAHQAhAMAhgQQARgJAFgOQACgNADgFQACgDAHgFQAHgFACgEIADgIIACgKIAJgPQAHgOgDghIgKhDQgDgYgFgLIAdAAIgdAAIAAAAIgKgUQgEgIgEgRQgGgWgLgGQgFgDgKgBIgPAAQgMgBgSgGIgdgKQgPgEggAAIhCAAIgpAAQgYABgSAEQgXAFgGALQgEAJACAOIADAYQABAIABACQADADAFgBQAFgCACgEQACgGgDgLQgCgNADgFIBTgBQggAGgYAYQgNAOgEACIgKADIgIAEQgFADgCAEIgkAAIAkAAQgFALAGAVQgdAGgGAPQgCAJAFAJQAFAJAIAFQAXAPAagGIASgHIATgHQAMgDAPABQARAAAKAFQAJAFALAPIAdAnQgDABgKAJQgIAIgHgBQgEgBgGgGQgigigeADQgKAAgQAHIgaAKIgRAFQgLAFAAAJQgBAKAPAJQAXAOAbADQAbACAbgHIAPgEQAIgCAGABQAHABAIAEQANAIAVAVQhXgSiBADQgHAAgDACQgHADACAGQACAFAKAAIAQAAIAAABQADAHAOAFQAOAEAEAFQgQAAgGACQgNAEgDALQgDAJAJAPQALAQABAHQgPAFgEACQgJAIAAAJQABAGAGALQACAFACALQADALAQAGQALADAEAEQAEAEAEAOQAFASALAOQgVAHgWAOQgNAKAAAIQAAAKAPAJQARALAKADQANAEAWAAQBAgBAegXQAkAUAtgDQAtgCAjgZQAFgEADABQACAAAEAEQAGAHgCADQAAADgHADQgZAOgQAEQgJABgSAAIkAACQgHAAgEACQgDACAAADQgBADABACQACADAIAAIBJABQgZADgpAMQgRAFgCAKQgBAKASAKQAZAOAPANQARAOAJABIALABQAFABAEADQgMAAgIADQgMAEgBAKQgBAHAGALQASAfAVgCQAAAGgFAHgAg2GgQgMgGgCgEQgCgEAAgIQAAgWAHgJIAGgGQADgFAAgDQAngEAjAPQAUAKAIALQADAGgBADQgRgUgcgCQgXgBgaAMQgHAFgBADQAAAEACAFQAKAPAHAIIgEABQgHAAgKgEgAgeGMQAHgHAKgDIAHAAQANgBAQAFIAFACQAFADAFAGQgIAGgQAAIghABQgHgHgEgFgABDGKQACgOgLgMQgIgKgPgIQgPgIgRgFIAgAAQASABANAFQAGACABACQACADAAAGQABAagGAMgABMElIgIgDQgSgGgUgJIAkAAIALABQADABAFADIALAHQAEADgBADIgNABIgKgBgAhLEAIgEgBQAIgBAHADgAhpD6IgcgVQgRgMgNgHIABgCQAKgCAVgGQAVgGALgBIAZgBIB8AAIATAFIA/ARQABADgBADQgCAEgDABIgNACQgFAAgSADIgdAFQgTACgHgBQgHgBgMgFIgqgRQgXgJgLgCQgRgEglAAQgGAAgDACQgEACAAAIQgBAKAMAPQAMAOAIADIgCABQgDAAgFgDgAg8DxIgTgCQgKgCgHgFQgFgFgHgMQAagCAQAEIAQAFQAbAKATAKgAh5CMQgPAAgGgCQgGgCgLgJIgJgHQAGgJAWgHQALgEAKgCQAQgBAcALIAoAQQgQAMgZADQgLACgQAAIgSgBgAAnCEQgYgCgMgHQAUgOAWgCIBIAAQAMAAAGACQgHAGgNAHQgXALgkAAIgRgBgAgkBsQgQgIgJgDQBFgSBlACQAhABANAJQABAAAAABQAAAAAAABQAAAAAAAAQAAABgBAAIgDACQgDABgFgCQgJgEgZgBIgfAAQgYgBgLABQgTACgOAIIgLAGQgFAEgFABIgHABQgIAAgLgEgACoAnIgLgFQgGgDgFAAIAAgCQAKgFAFgKQAEgJgBgJQAEAAACAEIAEAIIAFAHQACAEgBAIIAAAMIgGAAIgGAAgAA0AcQgJgDgOgMQAHgCAQAEIAVAFQANADAHAFQgCADgHAAIgYABQgCgCgGgCgABxASIgYgKQgPgFgKgBQADgCAQgGIAPgHQAJgDARABIAbAAQgDAEgBAJQAAAIgDAEQgCACgJAEIgKAEIgBAAIgJgCgAgnAKQgeAFgxAAQApgHAmACgAisAAQgFgFgEgSIAAgGQABgCAGgCQAKgCAOgBIAZAAIA0ABQATABAIADQAJAFANASQgkgCgmAGQgZAEgMAFQgNAGgEABIgCAAQgLAAgHgMgAAGgJQgSgGgVgdIAtgUQASgIAMABQAGAAANAGIBBAfQgPgCgUAJQgXALgMAEQgPAFgTAAQgJAAgHgCgACpgrIgBgCIAAgUQAEAAAFAEQAFAGgDAGIgDAHIgEABQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAgBgACFgyIg6gZIAnAAQAXgBAPAFIgBAagAiZg5QgGgCgFgKIgKgWQADgEAJAAIAmAAIAOABIAWAJQATAHAZACQARABAdgBIgsARIgKACIgKgEQgGgDgSAAIgaAAQgPAAgKAEQgJAEgFAAIgCgBgAg+heIgHgBIAoABgABCiKIgQgCQgMgDgTgOIgagTIgCgEQAAgCAEgEIAIgIQAFgFAFAAQAHgBAKAGQAtAYA1AGQAMABgCAGQAAABAAAAQgBABAAAAQAAABgBAAQAAABgBAAQgMAKgVADQgJACgSAAIgJAAgACVivIgJgDIgWgFQgsgGgngVQAegPAdAGQAJACARAHQAXAGAUgBQACANgCAGQgEALgJAAIgBAAgAh+izIgIgDIgagMQATgJAWgHIATgFQAIgCAFAAQAEABAJAFIATANQAJAFABAGQgPAGgUACIgkABIgKgBgAARjeIgEgDIgeglQAOACAVAKQAaAMAJACQgCADgEABIgXAJIgFABIgCAAgACIjsQgSAAgKgBQgVgBgggNIgzgVQBhgBAxADQAIAAADADQAEAEgBAIQAAAMgBAMQgKgFgRAAgAirkYIgKgJQgHgDABgDQAAgCAEgCQAIgFAWgDQAIgCADAAQAFABAJAEIAVAKQgFACgHAGQgJAGgEABQgDACgMABIgGAAQgMAAgGgEgACrkYIgKgFIAMABIACAGIAAAAIgEgCgAgkkmQgXgDgOgMQAKgBAqAAQAfAAATgFQAUgFAFABQAKABARANQAQAMAKABIhlABQgbAAgPgDgAB3kyQgcgFgOgRQAEgDAFgGQAGAAAHgFIALgIIAIgEQAQgHASADIADAEQAOAWgBAbIgXABQgQAAgKgCgACbliIglAAgAhxlIQgGAAgEgCQgGgEADgPQAUgEAfgBIAdAAIAXgBIAXABIAKACQATAGAHAOQgoAEhKAAIgjAAgAAAliIhLAAgAiWlOIgCgBIgBgBIgBgBIAAgCIAAgHIAFgDQADgCADABIAAAMIgBAFgAAnliQgPgNgRgCIgOgBQg1gCg6ADIAXgUQAGgEANgEQAZgHAggCQATgBAmAAIARABIASAFIAPAEIASAJIALAEQAGADAEAEIgrAXIgEADQgNAIgEAAIgBAAQgJAAgOgLgABUliIgtAAgACxligAipligACOmOIgCgCQgEgHgIgHIAGACIACACIAFAHIACAFIAAABIgBgBgABqmVIgEgCQgGgFgHgCIAMACIAMAFIAAACIgEAAIgDAAgAhhmzIB5AAQANAAAHACIiiABQAHgDAOAAg");
	this.shape_59.setTransform(36.95,84.075);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#663366").ss(1,1,1).p("ABug0IAHAAABsA1IhEAAACMg0IAkAAADOA1Ig5AAAh4A1IgVAAAieA1IgvAAAiwg0IAoAAAgcg0IBpAA");
	this.shape_60.setTransform(36.9625,43.35);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#000000").ss(1,1,1).p("AD3pZQAAARgMAMQgMANgSAAQgRAAgNgNQgMgMAAgRQAAgSAMgMQANgMARAAQASAAAMAMQAMAMAAASgAA5m5IBqh2ACKlBQAEAIADAIQAIASAGATQAHAVAHAWQAJAeAHAgQAFAaAEAbQADASACATAA5m5QAtAkAkBUAgvnQQAPgFAQAAQAmAAAjAcAgvnQIhthpAicphQAAAQgMAMQgLAMgRAAQgQAAgMgMQgMgMAAgQQAAgRAMgMQAMgLAQAAQARAAALALQAMAMAAARgAjVGAQgBgEAAgDQgJgggGgjQgEgWgDgYQgDgZgCgbQgCgagCgbQgBgdAAgeQAAgFAAgFQAAgWAAgWQABgYACgWQABgeAEgcQACgWADgUIAAgBQAFggAGgeQAGgeAIgbQAHgZAIgXQAGgTAIgSQADgHADgHQA2h8BIgVADNg5QADAZACAaQABAZABAbQAAAJABAJQAAANAAANQAAAFAAAEQgBAfgBAdQAAANgBAMADODnQgCARgCAQQgDAZgEAXQgGAigIAfQgGAZgHAXQgKAdgKAbQgCADgBACQgLAbgLAXQgTAjgUAZQguA2g2AAQg3AAgug2QgUgYgTgjQgMgXgLgcQgBgCgBgDQgMgdgJgeQgCgFgBgFAitk/IE3gC");
	this.shape_61.setTransform(38.675,65.025);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#6633FF").s().p("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");
	this.shape_62.setTransform(43.4775,81.4);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#663366").s().p("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");
	this.shape_63.setTransform(36.95,81.425);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#663366").ss(1,1,1).p("ACUAFIAcAAADOBuIgiAAAiBBuIgQAAIgiAAIgaAAAB8htIjSABIgkgBAiwAFIAZAAABbBuIhUAAAgwAFICzAA");
	this.shape_64.setTransform(36.9625,37.65);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#000000").ss(1,1,1).p("AD3pZQAAARgMAMQgMANgSAAQgRAAgNgNQgMgMAAgRQAAgSAMgMQANgMARAAQASAAAMAMQAMAMAAASgAA5m5IBqh2AA5m5QAaAVAYAmQAQAaAPAjQAEAIADAIQAIASAGATQAHAVAHAWQAJAeAHAgQAFAaAEAbQAEAZADAbQADAZACAbQABAZABAbQAAAJABAJQAAANAAANQAAAFAAAEQgBAfgBAdQgBAZgCAYQgCAdgEAbQgDAZgEAXQgGAigIAfQgGAZgHAXQgKAdgKAbQgCADgBACQgLAbgLAXQgTAjgUAZQgBABgBABAicphQAAAQgMAMQgLAMgRAAQgQAAgMgMQgMgMAAgQQAAgRAMgMQAMgLAQAAQARAAALALQAMAMAAARgAgvnQIhthpAgvnQQAPgFAQAAQAmAAAjAcAA2JwQghAaglAAQg3AAgug2QgUgYgTgjQgMgXgLgcQgBgCgBgDQgMgdgJgeQgHgWgFgXQgJgggGgjQgEgWgDgYQgDgZgCgbQgCgagCgbQgBgdAAgeQAAgFAAgFQAAgWAAgWQABgYACgWQABgeAEgcQACgWADgUIAAgBQAFggAGgeQAGgeAIgbQAHgZAIgXQAGgTAIgSQADgHADgHQAKgXALgTAiMl+QAqhDAzgP");
	this.shape_65.setTransform(38.675,65.025);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#6633FF").s().p("AG2ItIgBAAIgBgCQgCgDABgDIACgDQAEgCADACIAFACQADAFgEADIgEACIgCABgAjLHIQghgBgcgOQgUgJgNgPQgOgSAAgSQAAgPAJgHQAHgFARAAIBtgCQgTgPgfgCQgQgCgoAEQgaABgVAAQgMAAgHgFQgEgBgGgKQgIgOgCgLQgDgPAKgJQgFAAgEgFQgDgEgBgGIgCgKQgBgHgCgDQgEgGgNgGQgWgLgFgQQgEgKAEgKQAEgKAIgDQgXgKgGgXQgHgXAOgUQgMgFgIgYQgFgPADgHQADgJAOgGQAYgLAXgHQgSgGgTgEQgMgEAAgFQAAgHAHgBIALABQAeAHAdANQAYgFAXgBIgVgCQgNgCgagLIgygWQgUgIAAgNQAAgHAIgFQAGgEAJgBIAQAAQAKAAAGgBQgIgCgEgJQgCgGAAgKQAAgLAEgDQACgCAIgBQAkAAAcAFQAgAEAHAAQAJABALgCIgTgEIhGgQQgqgLgdgDQgGgBgCgCQgBgCABgEQABgDADgBQACgBAJAAIAfACQgJgKgCgaIgBgSIgUgBQgHAAgDgEQgBgDABgDQACgDACgCQADgBAKAAIAMAAIgBgKQgBgLAEgFQADgCAJgBQA6gGAdAEQAYACAjAKIARAEQAYgCAWgJQgmAAgkgHQgIACgEAAQgDgBgCgCIgDgDIgLgCQgXgFgPgJQgIgEgFgBIgMgCIgjADQgZABgLgGQgNgFgFgLQgCgGACgGQABgGAFgEQAEgCALgBIAEgBIAiAAQAJACAGADIAOAKQAIAGAGACQAHADAPAAIArgCQAZgBATgDIAOgDIhdgHIglgFQgLgCgKgDIgPgGQgSgKgMgPQgIgLAFgFQAFgFAGAEIAIAJQAPARAUAHQAIADAYADQA9AHAmACIAJABQApABAigCIAhgDQgxgEgZgKIgWgHIgSABQgoAFgkgEQgagDgUgGQgVgGgJgLQgIgLADgPQAEgPANgGQgEgDgHgDIgKgEIgBAAQgGgDgEgGQgDgGADgFQADgEAHgDQANgFASgCQARgCAJAIIAHAGIAHAIQAIAIARAEIAHACQAbAHAdACQAsADBQgLIAAgBQgDgJgIgFQgSABgdgGIgKgCIh4ADIgNAAQgNgDgVgTQgHgIAAgEQAAgJARgCIAEgBIgDgBQgIgDgPgJQgNgIgFgGIgCgCQgHgJAFgHQAEgFALAAIAAAAIAkAAIAkABQAuAAAXAFIAeAHQARAEANgBQAIgBAEACQADABACACQACADgBADQgBAEgIABQgRACgZgEQgbgGgOgDQgXgDgjABIg7AAQAUATAyACQAhABBXgDIAlgCIANADQAHACAGAJQAMAPAAAPQABAHgEAGQgDADgEACQAGAIAAAJIAAACQAHgDAGAIQADAEABAJQABASgJAPIAaARQARAMgFALQgCAGgMADIgJADIgmAMIAkAAQAIgBADAEQAEADgDAIIgGAKQgEAGgCAEIAAACIAGAAQAIAAACAEQACADgDAJIgLAXQgDAIAAADQABAEAGAGQAGAGABAEIgBAIQgBAFABADQABADAFAEIAIAGQALAIABAdQAAARgEAHQgFAJgMAFIgBAYQAAAIACAEIAGAEIAHACQAIAFACALQADAKgEAKQgDAJgIAHIgMALIgCAEQgBAEgCABQgDADgIgBIgVABQgJAAgEABQgFAFgDAJIgHAPQAaAAAbgGIAMAAQADABACACQACADgBADQAAAFgHACQgQAFgVABQgRABgWgCQgEADgFACQgIABgLAAQhMgFhLgHQgXgEgHgCIgZgLIgMgGQghAHgfARQgHAEgBACQgBAFADAGQAGAQAIADQAGACAKgDIAQgEQAGAAAJACIAQAFQAJADASAAIA9AAQAiAAAagFIA1gMQAhgGAVgCQASgBAJAFQAIADANAQQAOASADAMQACAJgDAIQgDAJgHAFQgJAEgBADQgBADACAGQAFAPgBAKQgDAQgMAEIgGACQgDABgBABQgCADABAGQACAXgRANQAKAEAEAMQAEAKgDAKQgGAUgWAMQgiASgkgFQACACAQAIQANAHgCAJQgCANgWAAIh7ACQgFAWAKAGQAGADANgDIAUgJIAUgJQAZgHAaAIQAaAHAQAUQAGAGACAGQABAEgCAFQgCAHgMAGIgNAEQgWAIgYAAIgDAAgAjdGNQgPAEgcASQAJAMATAEQAIACAZABQAUAAALgCQARgCALgJQgHgLgLgIQgJgGgKgCQgJgCgMAAgAlWEgQgCADAAADQAAAEAEAGIAKARIBhgGQgEgBgHgFIgKgHIgNgCIgfgCQgXABgJgJIgHgEIgBAAQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAABgAisEMQgFACgNAJQg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");
	this.shape_66.setTransform(59.608,82.6);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#663366").s().p("AhkHOQgUgYgSgjQgMgXgMgbIgCgGQgLgcgKgeIgMgtQgIghgHgiIgGguIgGg0IgDg1IgCg7IAAgJIABgtIACguQACgeADgdIAGgqIAAAAQAEggAGgfQAHgdAIgcQAGgYAIgYIAOgkIAHgPQAJgWALgUIABACQAGAGANAIQAPAJAIADIADABIgEABQgRACAAAKQAAAEAGAHQAWATAMADIAOAAIB3gDIAJACQAdAGATAAQAHAFAEAIIAAABQhRALgrgDQgdgCgagHICzAAIizAAIgHgCQgRgEgJgHIgGgIIgHgHQgKgHgQACQgSABgNAFQgIADgDAEQgDAFAEAGQAEAGAFADIABAAIALAEQAHADAEADQgNAGgEAPQgEAPAJALQAIALAWAGQAUAGAaAEQAkADAmgFIATgBIAWAHQAYAKAyAEIghADIhUAAQgmgCg8gHQgYgDgJgDQgTgHgPgRIgJgIQgGgEgEAEQgGAGAJAKQALAQATAJIAPAGQAJAEAMACIAlAEIBbAHIgNADQgTADgYACIgsABQgPAAgGgCQgHgCgIgHIgNgKQgHgDgJgCIAQAAIgQAAIgiAAIgaAAIAaAAIgDABQgLABgEADQgFADgCAGQgBAHACAGQAEAKANAGQAMAFAZgBIAjgCIAMABQAEABAIAFQAQAIAXAFIALADIADADQACACADAAQADABAJgCQAjAGAmABQgXAIgXACIgQgEQgjgKgYgCQgdgDg6AFQgJABgEADQgDAEAAALIABALIgLgBQgKAAgDACQgCABgCADQgCAEACACQADAEAHAAIATABIACATQACAZAJAKIgggCQgIAAgCABQgDACgCADQgBADACACQABACAHABQAdAEApAKIBGAQIATAEQgLACgIAAQgHAAgggFQgdgEgjAAQgJABgBABQgEAEAAAKQgBAKADAGQAEAJAHACQgFACgKAAIgQgBQgJABgHAEQgHAFAAAIQAAAMAUAJIAxAUQAaALAOADIAVABQgYABgXAFQgdgMgfgIIgKgBQgIABAAAHQABAGALADQAUAEASAHQgXAHgYALQgOAGgEAJQgDAHAGAQQAIAXAMAFQgPAVAHAXQAGAWAYAKQgJAEgDAKQgEAKAEAJQAFAQAWALQAMAGAFAGQACAEABAGIABALQABAFAEAFQAEAEAFAAQgKAJACAPQADALAHA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DgCQAFgDACACIAAADgAinkLQgGgBgOgIQAEABAGgDIAKgDIAIAAIAJAAIAFABQAGABAIAIQgCADgHAAIgQABIgGAAIgFAAgAAQkoIgJgBIBUAAIgpABIgiAAgAAHkpgAiRkpgAizkpgACEkwQACgEAEgIIAHgNQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBABAAQADgCAEADIAIAGQAKAHABADQgDACgHACIgLACIgKAEIgIABIgDAAgABZlBQgRgBgRgIQACgEAIAAIA/ABIgDAHQgBAEgCABIgFABgAhBlQQghgDgWgLQgMgGABgIQAAgFAHgDQAFgCAIAAIAVAAQANAAAEABQAGABAKAFIA5AdQgCABgGABIghABIgYgBgAAclYQgGgBgOgGQgegPgUgNIA2APIAYAFQAOADAJAEQgOAJgMAAIgFgBgABulnIAKgLQAFgGAFgDIAEgCQAEgCAJABQADAPgJAOIgrABQAHgBAFgGgABNlxQgSAAgHgEIANgBIAPgCIAHgCIARAAIgDAEQgDAEgCABIgGAAgAgwmSgAhrmVIgHgBQgPgDgGgEIAMgFIAEAAIANABIADACIAJAKIgKAAIgDAAgABNm4IgPAAIgMgCIgXgCIgIgDIglgLQAZAAAggBQBAgEATAAQAGAIAFAIQADAGgCADQAAACgGABIgGABQgQgHgdABgAhGm1IgFgDIgNgKQAYgBAMACIANADQARADAIAFIgxABg");
	this.shape_67.setTransform(36.95,78.375);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AiQCFIgBAAQAqhCAzgQQAOgEARAAQAmAAAjAcQAaAVAXAlIjSABgACqg3QgMgMAAgSQAAgRAMgNQAMgMASAAQASAAAMAMQAMANAAARQAAASgMAMQgMAMgSAAQgSAAgMgMgAjmhBQgLgLAAgRQAAgQALgMQAMgMARAAQAQAAAMAMQAMAMAAAQQAAARgMALQgMAMgQAAQgRAAgMgMg");
	this.shape_68.setTransform(39.2,13.3625);

	this.instance = new lib.golem();
	this.instance.setTransform(36.95,74.05,1,1,0,0,0,23,56);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2,p:{x:39.2}},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2,p:{x:39.2}},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},4).to({state:[{t:this.shape_2,p:{x:39.2}},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]},4).to({state:[{t:this.shape_2,p:{x:39.2}},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]},4).to({state:[{t:this.shape_2,p:{x:39.2}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},4).to({state:[{t:this.shape_2,p:{x:39.2}},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]},4).to({state:[{t:this.shape_2,p:{x:39.2}},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21}]},4).to({state:[{t:this.shape_2,p:{x:39.2}},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25}]},4).to({state:[{t:this.shape_2,p:{x:43.25}},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29}]},4).to({state:[{t:this.shape_2,p:{x:39.2}},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33}]},4).to({state:[{t:this.shape_2,p:{x:39.2}},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37}]},4).to({state:[{t:this.shape_2,p:{x:39.2}},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41}]},4).to({state:[{t:this.shape_2,p:{x:39.2}},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45}]},4).to({state:[{t:this.shape_2,p:{x:39.2}},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50}]},4).to({state:[{t:this.shape_2,p:{x:39.2}},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55}]},4).to({state:[{t:this.shape_2,p:{x:39.2}},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60}]},4).to({state:[{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64}]},4).to({state:[{t:this.instance}]},4).wait(767));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,105.7,139.5);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.cloud7("synched",0);
	this.instance.setTransform(817.75,42.7,1,1,0,0,0,54.4,42.7);

	this.instance_1 = new lib.cloud1("synched",0);
	this.instance_1.setTransform(732.7,184.45,1,1,0,0,0,51.2,36.6);

	this.instance_2 = new lib.cloud2("synched",0);
	this.instance_2.setTransform(669.8,69.8,1,1,0,0,0,41.1,33.1);

	this.instance_3 = new lib.cloud2("synched",0);
	this.instance_3.setTransform(581.15,157.55,1,1,0,0,0,41.1,33.1);

	this.instance_4 = new lib.cloud1("synched",0);
	this.instance_4.setTransform(51.2,167.5,1,1,0,0,0,51.2,36.6);

	this.instance_5 = new lib.cloud3("synched",0);
	this.instance_5.setTransform(363.2,51.6,1,1,0,0,0,39.7,28.6);

	this.instance_6 = new lib.cloud4("synched",0);
	this.instance_6.setTransform(538.15,60.5,1,1,0,0,0,46.6,34);

	this.instance_7 = new lib.cloud5("synched",0);
	this.instance_7.setTransform(242.25,171.55,1,1,0,0,0,60.8,41);

	this.instance_8 = new lib.cloud7("synched",0);
	this.instance_8.setTransform(140.25,68.55,1,1,0,0,0,54.4,42.7);

	this.instance_9 = new lib.cloud5("synched",0);
	this.instance_9.setTransform(406.25,144.55,1,1,0,0,0,60.8,41);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(0,0,872.1,221.2), null);


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.grass();
	this.instance.setTransform(138.6,221.15,3.147,1.1739,0,9.2626,180,-167.2,164.1);

	this.instance_1 = new lib.grass();
	this.instance_1.setTransform(226.7,243,1,1.4817,0,0,0,-167.2,164);

	this.instance_2 = new lib.grass();
	this.instance_2.setTransform(503.5,247.1,3.147,1.3477,0,0,180,-167.2,164);

	this.instance_3 = new lib.grass();
	this.instance_3.setTransform(310.2,263.2,2.8049,1.4817,0,0,0,-167.1,164);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,611.6,506.1), null);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.cloud2("synched",0);
	this.instance.setTransform(255.4,57.7,1,1,0,0,0,41.1,33.1);

	this.instance_1 = new lib.cloud3("synched",0);
	this.instance_1.setTransform(174.55,123.65,1,1,0,0,0,39.7,28.6);

	this.instance_2 = new lib.cloud3("synched",0);
	this.instance_2.setTransform(655.05,211.9,1,1,0,0,0,39.7,28.6);

	this.instance_3 = new lib.cloud4("synched",0);
	this.instance_3.setTransform(958.35,191.35,1,1,0,0,0,46.6,34);

	this.instance_4 = new lib.cloud3("synched",0);
	this.instance_4.setTransform(901.3,90.05,1,1,0,0,0,39.7,28.6);

	this.instance_5 = new lib.cloud5("synched",0);
	this.instance_5.setTransform(795.55,159.6,1,1,0,0,0,60.8,41);

	this.instance_6 = new lib.cloud7("synched",0);
	this.instance_6.setTransform(536.55,157.9,1,1,0,0,0,54.4,42.7);

	this.instance_7 = new lib.cloud7("synched",0);
	this.instance_7.setTransform(669.75,84.8,1,1,0,0,0,54.4,42.7);

	this.instance_8 = new lib.cloud6("synched",0);
	this.instance_8.setTransform(394.5,68.55,1,1,0,0,0,52.2,46.6);

	this.instance_9 = new lib.cloud5("synched",0);
	this.instance_9.setTransform(312.05,165.45,1,1,0,0,0,60.8,41);

	this.instance_10 = new lib.cloud4("synched",0);
	this.instance_10.setTransform(100,56.7,1,1,0,0,0,46.6,34);

	this.instance_11 = new lib.cloud3("synched",0);
	this.instance_11.setTransform(39.7,143.8,1,1,0,0,0,39.7,28.6);

	this.instance_12 = new lib.cloud2("synched",0);
	this.instance_12.setTransform(554.6,33.1,1,1,0,0,0,41.1,33.1);

	this.instance_13 = new lib.cloud1("synched",0);
	this.instance_13.setTransform(790.35,36.6,1,1,0,0,0,51.2,36.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,1005.1,240.5), null);


(lib.Scene_1_zahal = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// zahal
	this.instance = new lib.zahal();
	this.instance.setTransform(-46.85,292.1,0.5692,0.5692,104.9989,0,0,36.2,60.7);

	this.instance_1 = new lib.zahalcopy();
	this.instance_1.setTransform(420,189,1.2152,1.2152);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1,p:{regX:0,regY:0,x:420,y:189,scaleX:1.2152,scaleY:1.2152}}]},1).to({state:[{t:this.instance_1,p:{regX:39.1,regY:65,x:467.5,y:268,scaleX:1.2152,scaleY:1.2152}}]},349).to({state:[{t:this.instance_1,p:{regX:39,regY:65,x:509,y:343.1,scaleX:0.5953,scaleY:0.5953}}]},116).to({state:[{t:this.instance}]},322).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:39,regY:65,rotation:104.2683,x:-46.05,y:294.9},0).wait(1).to({rotation:103.5366,x:-42.5,y:296.85},0).wait(1).to({rotation:102.8049,x:-39,y:298.7},0).wait(1).to({rotation:102.0732,x:-35.5,y:300.6},0).wait(1).to({rotation:101.3415,x:-31.9,y:302.5},0).wait(1).to({rotation:100.6098,x:-28.35,y:304.45},0).wait(1).to({rotation:99.8781,x:-24.8,y:306.35},0).wait(1).to({rotation:99.1464,x:-21.3,y:308.25},0).wait(1).to({rotation:98.4147,x:-17.7,y:310.2},0).wait(1).to({rotation:97.683,x:-14.1,y:312.1},0).wait(1).to({rotation:96.9513,x:-10.65,y:314},0).wait(1).to({rotation:96.2196,x:-7.05,y:315.9},0).wait(1).to({rotation:95.4879,x:-3.5,y:317.8},0).wait(1).to({rotation:94.7562,x:0.05,y:319.7},0).wait(1).to({rotation:94.0245,x:3.65,y:321.6},0).wait(1).to({rotation:93.2928,x:7.2,y:323.55},0).wait(1).to({rotation:92.5611,x:10.75,y:325.45},0).wait(1).to({rotation:91.8294,x:14.25,y:327.35},0).wait(1).to({rotation:91.0977,x:17.85,y:329.25},0).wait(1).to({rotation:90.366,x:21.4,y:331.15},0).wait(1).to({rotation:89.6343,x:24.95,y:333.05},0).wait(1).to({rotation:88.9026,x:28.45,y:334.95},0).wait(1).to({rotation:88.1709,x:32.05,y:336.9},0).wait(1).to({rotation:87.4392,x:35.65,y:338.8},0).wait(1).to({rotation:86.7075,x:39.15,y:340.65},0).wait(1).to({rotation:85.9758,x:42.75,y:342.6},0).wait(1).to({rotation:85.2441,x:46.35,y:344.45},0).wait(1).to({rotation:84.5124,x:49.8,y:346.4},0).wait(1).to({rotation:83.7807,x:53.4,y:348.25},0).wait(1).to({rotation:83.049,x:56.95,y:350.25},0).wait(1).to({rotation:82.3173,x:60.55,y:352.1},0).wait(1).to({rotation:81.5856,x:64.1,y:354},0).wait(1).to({rotation:80.8539,x:67.65,y:355.9},0).wait(1).to({rotation:80.1222,x:71.2,y:357.8},0).wait(1).to({rotation:79.3905,x:74.8,y:359.7},0).wait(1).to({rotation:78.6588,x:78.3,y:361.6},0).wait(1).to({rotation:77.9271,x:81.9,y:363.5},0).wait(1).to({rotation:77.1954,x:85.45,y:365.4},0).wait(1).to({rotation:76.4637,x:89.05,y:367.3},0).wait(1).to({rotation:75.732,x:92.6,y:369.2},0).wait(1).to({rotation:75.0003,x:96.15,y:371.15},0).wait(1).to({rotation:72.9703,x:98.4,y:366.4},0).wait(1).to({rotation:70.9402,x:100.7,y:361.6},0).wait(1).to({rotation:68.9102,x:102.95,y:356.75},0).wait(1).to({rotation:66.8801,x:105.1,y:352},0).wait(1).to({rotation:64.8501,x:107.4,y:347.2},0).wait(1).to({rotation:62.8201,x:109.7,y:342.45},0).wait(1).to({rotation:60.79,x:111.95,y:337.65},0).wait(1).to({rotation:58.76,x:114.15,y:332.9},0).wait(1).to({rotation:56.7299,x:116.45,y:328.05},0).wait(1).to({rotation:54.6999,x:118.7,y:323.25},0).wait(1).to({rotation:52.6699,x:120.95,y:318.5},0).wait(1).to({rotation:50.6398,x:123.25,y:313.65},0).wait(1).to({rotation:48.6098,x:125.5,y:308.85},0).wait(1).to({rotation:46.5798,x:127.75,y:304.05},0).wait(1).to({rotation:44.5497,x:130,y:299.2},0).wait(1).to({rotation:42.5197,x:132.3,y:294.4},0).wait(1).to({rotation:40.4896,x:134.6,y:289.6},0).wait(1).to({rotation:38.4596,x:136.85,y:284.7},0).wait(1).to({rotation:36.4296,x:139.1,y:279.9},0).wait(1).to({rotation:34.3995,x:141.35,y:275.1},0).wait(1).to({rotation:32.3695,x:143.65,y:270.25},0).wait(1).to({rotation:30.3394,x:145.9,y:265.4},0).wait(1).to({rotation:28.3094,x:148.15,y:260.55},0).wait(1).to({rotation:26.2794,x:150.4,y:255.7},0).wait(1).to({rotation:24.2493,x:152.7,y:250.85},0).wait(1).to({rotation:22.2193,x:154.95,y:246},0).wait(1).to({rotation:20.1892,x:157.25,y:241.1},0).wait(1).to({rotation:18.1592,x:159.5,y:236.25},0).wait(1).to({rotation:17.9838,x:159.7,y:235.85},0).wait(1).to({rotation:17.8083,x:159.9,y:235.5},0).wait(1).to({rotation:17.6329,x:160.1,y:235},0).wait(1).to({rotation:17.4575,x:160.3,y:234.6},0).wait(1).to({rotation:17.282,x:160.5,y:234.2},0).wait(1).to({rotation:17.1066,x:160.65,y:233.75},0).wait(1).to({rotation:16.9312,x:160.9,y:233.35},0).wait(1).to({rotation:16.7557,x:161.1,y:232.95},0).wait(1).to({rotation:16.5803,x:161.3,y:232.5},0).wait(1).to({rotation:16.4049,x:161.45,y:232.05},0).wait(1).to({rotation:16.2294,x:161.65,y:231.65},0).wait(1).to({rotation:16.054,x:161.85,y:231.25},0).wait(1).to({rotation:15.8786,x:162.05,y:230.8},0).wait(1).to({rotation:15.7031,x:162.25,y:230.35},0).wait(1).to({rotation:15.5277,x:162.45,y:230},0).wait(1).to({rotation:15.3523,x:162.6,y:229.6},0).wait(1).to({rotation:15.1768,x:162.8,y:229.1},0).wait(1).to({rotation:15.0014,x:163,y:228.75},0).wait(1).to({rotation:21.0011,x:164.15,y:231.65},0).wait(1).to({rotation:27.0008,x:165.3,y:234.55},0).wait(1).to({rotation:33.0006,x:166.4,y:237.45},0).wait(1).to({rotation:39.0003,x:167.55,y:240.25},0).wait(1).to({rotation:45,x:168.7,y:243.1},0).wait(1).to({rotation:51.0001,x:169.8,y:245.9},0).wait(1).to({rotation:57.0001,x:170.95,y:248.65},0).wait(1).to({rotation:63.0002,x:172.15,y:251.4},0).wait(1).to({rotation:69.0002,x:173.25,y:254.05},0).wait(1).to({rotation:75.0003,x:174.45,y:256.75},0).wait(1).to({rotation:82.5004,x:175.65,y:259.35},0).wait(1).to({rotation:90.0005,x:176.85,y:261.9},0).wait(1).to({rotation:97.5006,x:178.05,y:264.4},0).wait(1).to({rotation:105.0008,x:179.35,y:266.9},0).wait(1).to({rotation:112.5009,x:180.7,y:269.4},0).wait(1).to({rotation:120.001,x:182.1,y:271.85},0).wait(1).to({rotation:126.0008,x:183.5,y:274.45},0).wait(1).to({rotation:132.0006,x:185,y:277},0).wait(1).to({rotation:138.0004,x:186.5,y:279.55},0).wait(1).to({rotation:144.0002,x:188.05,y:282.15},0).wait(1).to({rotation:150,x:189.55,y:284.7},0).wait(1).to({rotation:148.0001,x:190.95,y:287.65},0).wait(1).to({rotation:146.0001,x:192.35,y:290.65},0).wait(1).to({rotation:144.0002,x:193.75,y:293.6},0).wait(1).to({rotation:142.0002,x:195.1,y:296.55},0).wait(1).to({rotation:140.0003,x:196.55,y:299.5},0).wait(1).to({rotation:138.0004,x:197.95,y:302.45},0).wait(1).to({rotation:136.0004,x:199.35,y:305.45},0).wait(1).to({rotation:134.0005,x:200.8,y:308.4},0).wait(1).to({rotation:132.0005,x:202.15,y:311.4},0).wait(1).to({rotation:130.0006,x:203.6,y:314.3},0).wait(1).to({rotation:128.0007,x:205.05,y:317.3},0).wait(1).to({rotation:126.0007,x:206.4,y:320.25},0).wait(1).to({rotation:124.0008,x:207.9,y:323.2},0).wait(1).to({rotation:122.0008,x:209.3,y:326.2},0).wait(1).to({rotation:120.0009,x:210.7,y:329.15},0).wait(1).to({rotation:118.001,x:212.2,y:332.15},0).wait(1).to({rotation:116.001,x:213.6,y:335.1},0).wait(1).to({rotation:114.0011,x:215.05,y:338.05},0).wait(1).to({rotation:112.0011,x:216.55,y:341.05},0).wait(1).to({rotation:110.0012,x:217.95,y:343.95},0).wait(1).to({rotation:108.0013,x:219.4,y:346.9},0).wait(1).to({rotation:106.0013,x:220.9,y:349.9},0).wait(1).to({rotation:104.0014,x:222.35,y:352.85},0).wait(1).to({rotation:102.0014,x:223.8,y:355.8},0).wait(1).to({rotation:100.0015,x:225.25,y:358.75},0).wait(1).to({rotation:98.0016,x:226.75,y:361.75},0).wait(1).to({rotation:96.0016,x:228.25,y:364.7},0).wait(1).to({rotation:94.0017,x:229.7,y:367.6},0).wait(1).to({rotation:92.0017,x:231.15,y:370.6},0).wait(1).to({rotation:90.0018,x:232.65,y:373.55},0).wait(1).to({rotation:90.0019,x:238.3,y:372.2},0).wait(1).to({rotation:90.002,x:244,y:370.9},0).wait(1).to({rotation:90.0021,x:249.65,y:369.6},0).wait(1).to({rotation:90.0022,x:255.3,y:368.3},0).wait(1).to({x:260.95,y:367},0).wait(1).to({rotation:90.0023,x:266.6,y:365.65},0).wait(1).to({rotation:90.0024,x:272.25,y:364.35},0).wait(1).to({rotation:90.0025,x:277.9,y:363.05},0).wait(1).to({rotation:90.0026,x:283.55,y:361.75},0).wait(1).to({rotation:90.0027,x:289.2,y:360.45},0).wait(1).to({rotation:90.0028,x:294.85,y:359.1},0).wait(1).to({rotation:90.0029,x:300.5,y:357.8},0).wait(1).to({rotation:90.003,x:306.15,y:356.5},0).wait(1).to({rotation:90.0031,x:311.8,y:355.2},0).wait(1).to({x:317.45,y:353.9},0).wait(1).to({rotation:90.0032,x:323.15,y:352.55},0).wait(1).to({rotation:90.0033,x:328.8,y:351.25},0).wait(1).to({rotation:90.0034,x:334.45,y:349.95},0).wait(1).to({rotation:90.0035,x:340.1,y:348.65},0).wait(1).to({rotation:90.0036,x:345.75,y:347.35},0).wait(1).to({rotation:90.0037,x:351.4,y:346},0).wait(1).to({rotation:90.0038,x:357.05,y:344.7},0).wait(1).to({rotation:90.0039,x:362.7,y:343.4},0).wait(1).to({rotation:90.004,x:368.35,y:342.1},0).wait(1).to({x:374,y:340.75},0).wait(1).to({rotation:90.0041,x:379.65,y:339.45},0).wait(1).to({rotation:90.0042,x:385.3,y:338.15},0).wait(1).to({rotation:90.0043,x:390.95,y:336.85},0).wait(1).to({rotation:90.0044,x:396.6,y:335.55},0).wait(1).to({rotation:88.8506,x:402.65,y:338.35},0).wait(1).to({rotation:87.6968,x:408.7,y:341.2},0).wait(1).to({rotation:86.543,x:414.7,y:344},0).wait(1).to({rotation:85.3893,x:420.75,y:346.8},0).wait(1).to({rotation:84.2355,x:426.85,y:349.6},0).wait(1).to({rotation:83.0817,x:432.8,y:352.45},0).wait(1).to({rotation:81.9279,x:438.85,y:355.25},0).wait(1).to({rotation:80.7741,x:444.9,y:358.05},0).wait(1).to({rotation:79.6203,x:450.95,y:360.85},0).wait(1).to({rotation:78.4666,x:457,y:363.7},0).wait(1).to({rotation:77.3128,x:463.05,y:366.5},0).wait(1).to({rotation:76.159,x:469.1,y:369.3},0).wait(1).to({rotation:75.0052,x:475.1,y:372.1},0).wait(1).to({rotation:70.0053,x:477.25,y:365.1},0).wait(1).to({rotation:65.0054,x:479.35,y:358.1},0).wait(1).to({rotation:60.0055,x:481.5,y:351.05},0).wait(1).to({rotation:55.0056,x:483.65,y:343.95},0).wait(1).to({rotation:50.0057,x:485.8,y:336.9},0).wait(1).to({rotation:45.0058,x:488,y:329.8},0).wait(1).to({rotation:40.0058,x:490.1,y:322.65},0).wait(1).to({rotation:35.0059,x:492.35,y:315.55},0).wait(1).to({rotation:30.006,x:494.45,y:308.35},0).wait(1).to({rotation:25.0061,x:496.6,y:301.2},0).wait(1).to({rotation:20.0062,x:498.8,y:293.95},0).wait(1).to({rotation:15.0063,x:500.95,y:286.75},0).wait(1).to({regX:39.1,regY:65.1,scaleX:1.2154,scaleY:1.2154,rotation:0,x:467.15,y:268.1},0).wait(1).to({regX:39,regY:65,x:467,y:267.95},0).wait(60).to({_off:true},1).wait(787).to({_off:false,regX:36.9,regY:62.6,scaleX:0.4192,scaleY:0.4192,rotation:60.0003,x:-22.9,y:429.05},0).wait(1).to({regX:39,regY:65,rotation:59.8384,x:-22.35,y:429.95},0).wait(1).to({rotation:59.678,x:-21.3,y:429.5},0).wait(1).to({rotation:59.5175,x:-20.3,y:429.15},0).wait(1).to({rotation:59.3571,x:-19.3,y:428.75},0).wait(1).to({rotation:59.1967,x:-18.3,y:428.4},0).wait(1).to({rotation:59.0363,x:-17.25,y:427.95},0).wait(1).to({rotation:58.8758,x:-16.2,y:427.65},0).wait(1).to({rotation:58.7154,x:-15.25,y:427.2},0).wait(1).to({rotation:58.555,x:-14.25,y:426.85},0).wait(1).to({rotation:58.3946,x:-13.25,y:426.45},0).wait(1).to({rotation:58.2342,x:-12.25,y:426.1},0).wait(1).to({rotation:58.0737,x:-11.25,y:425.7},0).wait(1).to({rotation:57.9133,x:-10.2,y:425.3},0).wait(1).to({rotation:57.7529,x:-9.25,y:424.95},0).wait(1).to({rotation:57.5925,x:-8.2,y:424.55},0).wait(1).to({rotation:57.432,x:-7.15,y:424.15},0).wait(1).to({rotation:57.2716,x:-6.15,y:423.8},0).wait(1).to({rotation:57.1112,x:-5.15,y:423.4},0).wait(1).to({rotation:56.9508,x:-4.15,y:423},0).wait(1).to({rotation:56.7904,x:-3.1,y:422.6},0).wait(1).to({rotation:56.6299,x:-2.1,y:422.25},0).wait(1).to({rotation:56.4695,x:-1.05,y:421.9},0).wait(1).to({rotation:56.3091,x:-0.05,y:421.45},0).wait(1).to({rotation:56.1487,x:0.9,y:421.15},0).wait(1).to({rotation:55.9883,x:1.95,y:420.7},0).wait(1).to({rotation:55.8278,x:3,y:420.35},0).wait(1).to({rotation:55.6674,x:3.95,y:419.9},0).wait(1).to({rotation:55.507,x:5,y:419.55},0).wait(1).to({rotation:55.3466,x:6.05,y:419.2},0).wait(1).to({rotation:55.1861,x:7.05,y:418.75},0).wait(1).to({rotation:55.0257,x:8,y:418.4},0).wait(1).to({rotation:54.8653,x:9.05,y:418},0).wait(1).to({rotation:54.7049,x:10.05,y:417.65},0).wait(1).to({rotation:54.5445,x:11.1,y:417.25},0).wait(1).to({rotation:54.384,x:12.1,y:416.85},0).wait(1).to({rotation:54.2236,x:13.1,y:416.5},0).wait(1).to({rotation:54.0632,x:14.15,y:416.1},0).wait(1).to({rotation:53.9028,x:15.15,y:415.7},0).wait(1).to({rotation:53.7423,x:16.15,y:415.35},0).wait(1).to({rotation:53.5819,x:17.15,y:414.95},0).wait(1).to({rotation:53.4215,x:18.15,y:414.6},0).wait(1).to({rotation:53.2611,x:19.2,y:414.15},0).wait(1).to({rotation:53.1007,x:20.2,y:413.75},0).wait(1).to({rotation:52.9402,x:21.2,y:413.4},0).wait(1).to({rotation:52.7798,x:22.25,y:413},0).wait(1).to({rotation:52.6194,x:23.25,y:412.65},0).wait(1).to({rotation:52.459,x:24.25,y:412.25},0).wait(1).to({rotation:52.2985,x:25.3,y:411.85},0).wait(1).to({rotation:52.1381,x:26.3,y:411.45},0).wait(1).to({rotation:51.9777,x:27.3,y:411.15},0).wait(1).to({rotation:51.8173,x:28.35,y:410.7},0).wait(1).to({rotation:51.6569,x:29.35,y:410.3},0).wait(1).to({rotation:51.4964,x:30.4,y:409.95},0).wait(1).to({rotation:51.336,x:31.4,y:409.5},0).wait(1).to({rotation:51.1756,x:32.35,y:409.2},0).wait(1).to({rotation:51.0152,x:33.4,y:408.8},0).wait(1).to({rotation:50.8548,x:34.35,y:408.45},0).wait(1).to({rotation:50.6943,x:35.4,y:408},0).wait(1).to({rotation:50.5339,x:36.45,y:407.6},0).wait(1).to({rotation:50.3735,x:37.45,y:407.3},0).wait(1).to({rotation:50.2131,x:38.45,y:406.85},0).wait(1).to({rotation:50.0526,x:39.45,y:406.5},0).wait(1).to({rotation:49.8922,x:40.5,y:406.1},0).wait(1).to({rotation:49.7318,x:41.5,y:405.7},0).wait(1).to({rotation:49.5714,x:42.5,y:405.3},0).wait(1).to({rotation:49.411,x:43.55,y:404.95},0).wait(1).to({rotation:49.2505,x:44.5,y:404.6},0).wait(1).to({rotation:49.0901,x:45.55,y:404.2},0).wait(1).to({rotation:48.9297,x:46.6,y:403.75},0).wait(1).to({rotation:48.7693,x:47.55,y:403.4},0).wait(1).to({rotation:48.6088,x:48.6,y:403},0).wait(1).to({rotation:48.4484,x:49.6,y:402.65},0).wait(1).to({rotation:48.288,x:50.65,y:402.25},0).wait(1).to({rotation:48.1276,x:51.6,y:401.85},0).wait(1).to({rotation:47.9672,x:52.65,y:401.5},0).wait(1).to({rotation:47.8067,x:53.7,y:401.1},0).wait(1).to({rotation:47.6463,x:54.65,y:400.75},0).wait(1).to({rotation:47.4859,x:55.7,y:400.3},0).wait(1).to({rotation:47.3255,x:56.7,y:399.9},0).wait(1).to({rotation:47.165,x:57.7,y:399.55},0).wait(1).to({rotation:47.0046,x:58.75,y:399.2},0).wait(1).to({rotation:46.8442,x:59.75,y:398.85},0).wait(1).to({rotation:46.6838,x:60.8,y:398.4},0).wait(1).to({rotation:46.5234,x:61.8,y:398},0).wait(1).to({rotation:46.3629,x:62.85,y:397.65},0).wait(1).to({rotation:46.2025,x:63.8,y:397.25},0).wait(1).to({rotation:46.0421,x:64.85,y:396.85},0).wait(1).to({rotation:45.8817,x:65.9,y:396.5},0).wait(1).to({rotation:45.7212,x:66.85,y:396.05},0).wait(1).to({rotation:45.5608,x:67.9,y:395.7},0).wait(1).to({rotation:45.4004,x:68.9,y:395.35},0).wait(1).to({rotation:45.24,x:69.9,y:394.95},0).wait(1).to({rotation:45.0796,x:70.9,y:394.6},0).wait(1).to({rotation:44.9191,x:71.95,y:394.2},0).wait(1).to({rotation:44.7587,x:72.9,y:393.8},0).wait(1).to({rotation:44.5983,x:73.95,y:393.45},0).wait(1).to({rotation:44.4379,x:74.95,y:393},0).wait(1).to({rotation:44.2775,x:76,y:392.6},0).wait(1).to({rotation:44.117,x:77.05,y:392.25},0).wait(1).to({rotation:43.9566,x:78,y:391.85},0).wait(1).to({rotation:43.7962,x:79.05,y:391.45},0).wait(1).to({rotation:43.6358,x:80.05,y:391.1},0).wait(1).to({rotation:43.4753,x:81.05,y:390.7},0).wait(1).to({rotation:43.3149,x:82.05,y:390.3},0).wait(1).to({rotation:43.1545,x:83.1,y:390},0).wait(1).to({rotation:42.9941,x:84.1,y:389.6},0).wait(1).to({rotation:42.8337,x:85.15,y:389.2},0).wait(1).to({rotation:42.6732,x:86.15,y:388.8},0).wait(1).to({rotation:42.5128,x:87.15,y:388.4},0).wait(1).to({rotation:42.3524,x:88.2,y:388},0).wait(1).to({rotation:42.192,x:89.15,y:387.65},0).wait(1).to({rotation:42.0315,x:90.2,y:387.25},0).wait(1).to({rotation:41.8711,x:91.15,y:386.85},0).wait(1).to({rotation:41.7107,x:92.2,y:386.5},0).wait(1).to({rotation:41.5503,x:93.25,y:386.1},0).wait(1).to({rotation:41.3899,x:94.25,y:385.7},0).wait(1).to({rotation:41.2294,x:95.25,y:385.3},0).wait(1).to({rotation:41.069,x:96.25,y:384.95},0).wait(1).to({rotation:40.9086,x:97.25,y:384.55},0).wait(1).to({rotation:40.7482,x:98.3,y:384.15},0).wait(1).to({rotation:40.5877,x:99.3,y:383.8},0).wait(1).to({rotation:40.4273,x:100.35,y:383.4},0).wait(1).to({rotation:40.2669,x:101.35,y:383},0).wait(1).to({rotation:40.1065,x:102.35,y:382.65},0).wait(1).to({rotation:39.9461,x:103.4,y:382.25},0).wait(1).to({rotation:39.7856,x:104.35,y:381.85},0).wait(1).to({rotation:39.6252,x:105.4,y:381.5},0).wait(1).to({rotation:39.4648,x:106.4,y:381.1},0).wait(1).to({rotation:39.3044,x:107.45,y:380.7},0).wait(1).to({rotation:39.1439,x:108.45,y:380.3},0).wait(1).to({rotation:38.9835,x:109.45,y:379.95},0).wait(1).to({rotation:38.8231,x:110.45,y:379.55},0).wait(1).to({rotation:38.6627,x:111.5,y:379.15},0).wait(1).to({rotation:38.5023,x:112.5,y:378.8},0).wait(1).to({rotation:38.3418,x:113.5,y:378.4},0).wait(1).to({rotation:38.1814,x:114.5,y:378},0).wait(1).to({rotation:38.021,x:115.55,y:377.6},0).wait(1).to({rotation:37.8606,x:116.55,y:377.25},0).wait(1).to({rotation:37.7002,x:117.6,y:376.85},0).wait(1).to({rotation:37.5397,x:118.55,y:376.45},0).wait(1).to({rotation:37.3793,x:119.6,y:376.05},0).wait(1).to({rotation:37.2189,x:120.6,y:375.7},0).wait(1).to({rotation:37.0585,x:121.65,y:375.3},0).wait(1).to({rotation:36.898,x:122.65,y:374.9},0).wait(1).to({rotation:36.7376,x:123.65,y:374.55},0).wait(1).to({rotation:36.5772,x:124.7,y:374.2},0).wait(1).to({rotation:36.4168,x:125.7,y:373.8},0).wait(1).to({rotation:36.2564,x:126.75,y:373.35},0).wait(1).to({rotation:36.0959,x:127.7,y:373},0).wait(1).to({rotation:35.9355,x:128.75,y:372.6},0).wait(1).to({rotation:35.7751,x:129.7,y:372.2},0).wait(1).to({rotation:35.6147,x:130.8,y:371.8},0).wait(1).to({rotation:35.4542,x:131.75,y:371.5},0).wait(1).to({rotation:35.2938,x:132.8,y:371.1},0).wait(1).to({rotation:35.1334,x:133.75,y:370.7},0).wait(1).to({rotation:34.973,x:134.85,y:370.3},0).wait(1).to({rotation:34.8126,x:135.8,y:369.9},0).wait(1).to({rotation:34.6521,x:136.85,y:369.5},0).wait(1).to({rotation:34.4917,x:137.8,y:369.15},0).wait(1).to({rotation:34.3313,x:138.9,y:368.75},0).wait(1).to({rotation:34.1709,x:139.9,y:368.4},0).wait(1).to({rotation:34.0104,x:140.9,y:368},0).wait(1).to({rotation:33.85,x:141.9,y:367.6},0).wait(1).to({rotation:33.6896,x:142.95,y:367.15},0).wait(1).to({rotation:33.5292,x:143.95,y:366.85},0).wait(1).to({rotation:33.3688,x:144.95,y:366.45},0).wait(1).to({rotation:33.2083,x:146,y:366.05},0).wait(1).to({rotation:33.0479,x:147,y:365.65},0).wait(1).to({rotation:32.8875,x:148,y:365.35},0).wait(1).to({rotation:32.7271,x:149,y:364.9},0).wait(1).to({rotation:32.5667,x:150.05,y:364.5},0).wait(1).to({rotation:32.4062,x:151.05,y:364.1},0).wait(1).to({rotation:32.2458,x:152.05,y:363.75},0).wait(1).to({rotation:32.0854,x:153.1,y:363.4},0).wait(1).to({rotation:31.925,x:154.1,y:363},0).wait(1).to({rotation:31.7645,x:155.1,y:362.55},0).wait(1).to({rotation:31.6041,x:156.05,y:362.2},0).wait(1).to({rotation:31.4437,x:157.15,y:361.85},0).wait(1).to({rotation:31.2833,x:158.1,y:361.45},0).wait(1).to({rotation:31.1229,x:159.15,y:361},0).wait(1).to({rotation:30.9624,x:160.15,y:360.65},0).wait(1).to({rotation:30.802,x:161.2,y:360.25},0).wait(1).to({rotation:30.6416,x:162.15,y:359.9},0).wait(1).to({rotation:30.4812,x:163.25,y:359.55},0).wait(1).to({rotation:30.3207,x:164.2,y:359.1},0).wait(1).to({rotation:30.1603,x:165.25,y:358.7},0).wait(1).to({rotation:29.9999,x:166.25,y:358.3},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_sun = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// sun
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFF66").ss(1,1,1).p("AIfAAQAADgifCfQigCgjgAAQjfAAigigQififAAjgQAAjgCfifQCgifDfAAQDgAACgCfQCfCfAADgg");
	this.shape.setTransform(419.25,98.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF66").s().p("Al/F/QifieABjhQgBjfCfigQCgifDfAAQDhAACeCfQCfCgAADfQAADhifCeQieCfjhABQjfgBigifg");
	this.shape_1.setTransform(419.25,98.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFFF66").ss(1,1,1).p("AE0AAQAACAhaBaQhaBaiAAAQh/AAhahaQhahaAAiAQAAh/BahZQBahaB/AAQCAAABaBaQBaBZAAB/g");
	this.shape_2.setTransform(397.75,44.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF66").s().p("AjYDZQhbhZABiAQgBh/BbhaQBZhaB/AAQB/AABaBaQBbBagBB/QABCAhbBZQhaBah/AAQh/AAhZhag");
	this.shape_3.setTransform(397.75,44.8);

	this.instance = new lib.sun();
	this.instance.setTransform(397.8,47.85,1,1,0,0,0,30.8,30.8);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},193).to({state:[{t:this.instance}]},144).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[]},1).to({state:[{t:this.instance}]},197).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).wait(510));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(337).to({_off:false},0).wait(1).to({x:397.75,y:51.75},0).wait(1).to({y:55.7},0).wait(1).to({y:59.6},0).wait(1).to({x:397.7,y:63.55},0).wait(1).to({y:67.45},0).wait(1).to({y:71.4},0).wait(1).to({y:75.35},0).wait(1).to({x:397.65,y:79.25},0).wait(1).to({y:83.2},0).wait(1).to({y:87.1},0).wait(1).to({x:397.6,y:91.05},0).wait(1).to({y:94.95},0).wait(1).to({y:98.9},0).wait(1).to({y:102.85},0).wait(1).to({x:397.55,y:106.75},0).wait(1).to({y:110.7},0).wait(1).to({y:114.6},0).wait(1).to({x:397.5,y:118.55},0).wait(1).to({y:122.45},0).wait(1).to({y:126.4},0).wait(1).to({y:130.35},0).wait(1).to({x:397.45,y:134.25},0).wait(1).to({y:138.2},0).wait(1).to({y:142.1},0).wait(1).to({x:397.4,y:146.05},0).wait(1).to({y:149.95},0).wait(1).to({y:153.9},0).wait(1).to({y:157.85},0).wait(1).to({x:397.35,y:161.75},0).wait(1).to({y:165.7},0).wait(1).to({y:169.6},0).wait(1).to({x:397.3,y:173.55},0).wait(1).to({y:177.45},0).wait(1).to({y:181.4},0).wait(1).to({y:185.35},0).wait(1).to({x:397.25,y:189.25},0).wait(1).to({y:193.2},0).wait(1).to({y:197.1},0).wait(1).to({x:397.2,y:201.05},0).wait(1).to({y:204.95},0).wait(1).to({y:208.9},0).wait(1).to({y:212.85},0).wait(1).to({x:397.15,y:216.75},0).wait(1).to({y:220.7},0).wait(1).to({y:224.6},0).wait(1).to({x:397.1,y:228.55},0).wait(1).to({y:232.45},0).wait(1).to({y:236.4},0).wait(1).to({y:240.35},0).wait(1).to({x:397.05,y:244.25},0).wait(1).to({y:248.2},0).wait(1).to({y:252.1},0).wait(1).to({x:397,y:256.05},0).wait(1).to({y:259.95},0).wait(1).to({y:263.9},0).wait(1).to({y:267.85},0).wait(1).to({x:396.95,y:271.75},0).wait(1).to({y:275.7},0).wait(1).to({y:279.6},0).wait(1).to({x:396.9,y:283.55},0).wait(1).to({y:287.45},0).wait(1).to({y:291.4},0).wait(1).to({y:295.35},0).wait(1).to({x:396.85,y:299.25},0).wait(1).to({y:303.2},0).wait(1).to({y:307.1},0).wait(1).to({x:396.8,y:311.05},0).wait(1).to({y:314.95},0).wait(1).to({y:318.9},0).wait(1).to({y:322.85},0).to({_off:true},1).wait(197).to({_off:false,x:70.05,y:648.95},0).wait(1).to({x:70.1,y:643.85},0).wait(1).to({x:70.15,y:638.75},0).wait(1).to({x:70.2,y:633.7},0).wait(1).to({x:70.25,y:628.6},0).wait(1).to({x:70.3,y:623.55},0).wait(1).to({x:70.35,y:618.45},0).wait(1).to({x:70.4,y:613.4},0).wait(1).to({x:70.45,y:608.3},0).wait(1).to({x:70.5,y:603.2},0).wait(1).to({x:70.55,y:598.15},0).wait(1).to({x:70.6,y:593.05},0).wait(1).to({x:70.65,y:588},0).wait(1).to({x:70.7,y:582.9},0).wait(1).to({x:70.75,y:577.85},0).wait(1).to({x:70.8,y:572.75},0).wait(1).to({x:70.85,y:567.65},0).wait(1).to({x:70.9,y:562.6},0).wait(1).to({x:70.95,y:557.5},0).wait(1).to({x:71.05,y:552.45},0).wait(1).to({x:71.1,y:547.35},0).wait(1).to({x:71.15,y:542.3},0).wait(1).to({x:71.2,y:537.2},0).wait(1).to({x:71.25,y:532.1},0).wait(1).to({x:71.3,y:527.05},0).wait(1).to({x:71.35,y:521.95},0).wait(1).to({x:71.4,y:516.9},0).wait(1).to({x:71.45,y:511.8},0).wait(1).to({x:71.5,y:506.75},0).wait(1).to({x:71.55,y:501.65},0).wait(1).to({x:71.6,y:496.55},0).wait(1).to({x:71.65,y:491.5},0).wait(1).to({x:71.7,y:486.4},0).wait(1).to({x:71.75,y:481.35},0).wait(1).to({x:71.8,y:476.25},0).wait(1).to({x:71.85,y:471.2},0).wait(1).to({x:71.9,y:466.1},0).wait(1).to({x:71.95,y:461},0).wait(1).to({x:72.05,y:455.95},0).wait(1).to({x:72.1,y:450.85},0).wait(1).to({x:72.15,y:445.8},0).wait(1).to({x:72.2,y:440.7},0).wait(1).to({x:72.25,y:435.65},0).wait(1).to({x:72.3,y:430.55},0).wait(1).to({x:72.35,y:425.45},0).wait(1).to({x:72.4,y:420.4},0).wait(1).to({x:72.45,y:415.3},0).wait(1).to({x:72.5,y:410.25},0).wait(1).to({x:72.55,y:405.15},0).wait(1).to({x:72.6,y:400.1},0).wait(1).to({x:72.65,y:395},0).wait(1).to({x:72.7,y:389.9},0).wait(1).to({x:72.75,y:384.85},0).wait(1).to({x:72.8,y:379.75},0).wait(1).to({x:72.85,y:374.7},0).wait(1).to({x:72.9,y:369.6},0).wait(1).to({x:72.95,y:364.55},0).wait(1).to({x:73.05,y:359.45},0).wait(1).to({x:73.1,y:354.35},0).wait(1).to({x:73.15,y:349.3},0).wait(1).to({x:73.2,y:344.2},0).wait(1).to({x:73.25,y:339.15},0).wait(1).to({x:73.3,y:334.05},0).wait(1).to({x:73.35,y:329},0).wait(1).to({x:73.4,y:323.9},0).wait(1).to({x:73.45,y:318.8},0).wait(1).to({x:73.5,y:313.75},0).wait(1).to({x:73.55,y:308.65},0).wait(1).to({x:73.6,y:303.6},0).wait(1).to({x:73.65,y:298.5},0).wait(1).to({x:73.7,y:293.45},0).wait(1).to({x:73.75,y:288.35},0).wait(1).to({x:73.8,y:283.25},0).wait(1).to({x:73.85,y:278.2},0).wait(1).to({x:73.9,y:273.1},0).wait(1).to({x:73.95,y:268.05},0).wait(1).to({x:74.05,y:262.95},0).wait(1).to({x:74.1,y:257.9},0).wait(1).to({x:74.15,y:252.8},0).wait(1).to({x:74.2,y:247.7},0).wait(1).to({x:74.25,y:242.65},0).wait(1).to({x:74.3,y:237.55},0).wait(1).to({x:74.35,y:232.5},0).wait(1).to({x:74.4,y:227.4},0).wait(1).to({x:74.45,y:222.35},0).wait(1).to({x:74.5,y:217.25},0).wait(1).to({x:74.55,y:212.15},0).wait(1).to({x:74.6,y:207.1},0).wait(1).to({x:74.65,y:202},0).wait(1).to({x:74.7,y:196.95},0).wait(1).to({x:74.75,y:191.85},0).wait(1).to({x:74.8,y:186.8},0).wait(1).to({x:74.85,y:181.7},0).wait(1).to({x:74.9,y:176.6},0).wait(1).to({x:74.95,y:171.55},0).wait(1).to({x:75.05,y:166.45},0).wait(1).to({x:75.1,y:161.4},0).wait(1).to({x:75.15,y:156.3},0).wait(1).to({x:75.2,y:151.25},0).wait(1).to({x:75.25,y:146.15},0).wait(1).to({x:75.3,y:141.05},0).wait(1).to({x:75.35,y:136},0).wait(1).to({x:75.4,y:130.9},0).wait(1).to({x:75.45,y:125.85},0).wait(1).to({x:75.5,y:120.75},0).wait(1).to({x:75.55,y:115.7},0).wait(1).to({x:75.6,y:110.6},0).wait(1).to({x:75.65,y:105.5},0).wait(1).to({x:75.7,y:100.45},0).wait(1).to({x:75.75,y:95.35},0).wait(1).to({x:75.8,y:90.3},0).wait(1).to({x:75.85,y:85.2},0).wait(1).to({x:75.9,y:80.15},0).wait(1).to({x:75.95,y:75.05},0).wait(1).to({x:76.05,y:70},0).wait(1).to({y:72.1},0).wait(510));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_clouds = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// clouds
	this.instance = new lib.Symbol1();
	this.instance.setTransform(513.8,111.6,1,1,0,0,0,533.8,120.2);

	this.instance_1 = new lib.Symbol3();
	this.instance_1.setTransform(403.8,94,1,1,0,0,0,436,110.5);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:502.5,x:481.35},0).wait(1).to({x:480.2},0).wait(1).to({x:479},0).wait(1).to({x:477.85},0).wait(1).to({x:476.7},0).wait(1).to({x:475.5},0).wait(1).to({x:474.35},0).wait(1).to({x:473.2},0).wait(1).to({x:472},0).wait(1).to({x:470.85},0).wait(1).to({x:469.7},0).wait(1).to({x:468.5},0).wait(1).to({x:467.35},0).wait(1).to({x:466.2},0).wait(1).to({x:465},0).wait(1).to({x:463.85},0).wait(1).to({x:462.7},0).wait(1).to({x:461.5},0).wait(1).to({x:460.35},0).wait(1).to({x:459.2},0).wait(1).to({x:458},0).wait(1).to({x:456.85},0).wait(1).to({x:455.7},0).wait(1).to({x:454.5},0).wait(1).to({x:453.35},0).wait(1).to({x:452.2},0).wait(1).to({x:451},0).wait(1).to({x:449.85},0).wait(1).to({x:448.7},0).wait(1).to({x:447.5},0).wait(1).to({x:446.35},0).wait(1).to({x:445.2},0).wait(1).to({x:444},0).wait(1).to({x:442.85},0).wait(1).to({x:441.7},0).wait(1).to({x:440.5},0).wait(1).to({x:439.35},0).wait(1).to({x:438.2},0).wait(1).to({x:437},0).wait(1).to({x:435.85},0).wait(1).to({x:434.7},0).wait(1).to({x:433.5},0).wait(1).to({x:432.35},0).wait(1).to({x:431.2},0).wait(1).to({x:430},0).wait(1).to({x:428.85},0).wait(1).to({x:427.7},0).wait(1).to({x:426.5},0).wait(1).to({x:425.35},0).wait(1).to({x:424.2},0).wait(1).to({x:423},0).wait(1).to({x:421.85},0).wait(1).to({x:420.7},0).wait(1).to({x:419.5},0).wait(1).to({x:418.35},0).wait(1).to({x:417.2},0).wait(1).to({x:416},0).wait(1).to({x:414.85},0).wait(1).to({x:413.7},0).wait(1).to({x:412.5},0).wait(1).to({x:411.35},0).wait(1).to({x:410.2},0).wait(1).to({x:409},0).wait(1).to({x:407.85},0).wait(1).to({x:406.7},0).wait(1).to({x:405.5},0).wait(1).to({x:404.35},0).wait(1).to({x:403.2},0).wait(1).to({x:402},0).wait(1).to({x:400.85},0).wait(1).to({x:399.7},0).wait(1).to({x:398.5},0).wait(1).to({x:397.35},0).wait(1).to({x:396.2},0).wait(1).to({x:395},0).wait(1).to({x:393.85},0).wait(1).to({x:392.7},0).wait(1).to({x:391.5},0).wait(1).to({x:390.35},0).wait(1).to({x:389.2},0).wait(1).to({x:388},0).wait(1).to({x:386.85},0).wait(1).to({x:385.7},0).wait(1).to({x:384.5},0).wait(1).to({x:383.35},0).wait(1).to({x:382.2},0).wait(1).to({x:381},0).wait(1).to({x:379.85},0).wait(1).to({x:378.7},0).wait(1).to({x:377.5},0).wait(1).to({x:376.35},0).wait(1).to({x:375.2},0).wait(1).to({x:374},0).wait(1).to({x:372.85},0).wait(1).to({x:371.7},0).wait(1).to({x:370.5},0).wait(1).to({x:369.35},0).wait(1).to({x:368.2},0).wait(1).to({x:367},0).wait(1).to({x:365.85},0).wait(1).to({x:364.7},0).wait(1).to({x:363.5},0).wait(1).to({x:362.35},0).wait(1).to({x:361.2},0).wait(1).to({x:360},0).wait(1).to({x:358.85},0).wait(1).to({x:357.7},0).wait(1).to({x:356.5},0).wait(1).to({x:355.35},0).wait(1).to({x:354.2},0).wait(1).to({x:353},0).wait(1).to({x:351.85},0).wait(1).to({x:350.7},0).wait(1).to({x:349.5},0).wait(1).to({x:348.35},0).wait(1).to({x:347.2},0).wait(1).to({x:346},0).wait(1).to({x:344.85},0).wait(1).to({x:343.7},0).wait(1).to({x:342.5},0).wait(1).to({x:341.35},0).wait(1).to({x:340.2},0).wait(1).to({x:339},0).wait(1).to({x:337.85},0).wait(1).to({x:336.7},0).wait(1).to({x:335.5},0).wait(1).to({x:334.35},0).wait(1).to({x:333.2},0).wait(1).to({x:332},0).wait(1).to({x:330.85},0).wait(1).to({x:329.7},0).wait(1).to({x:328.5},0).wait(1).to({x:327.35},0).wait(1).to({x:326.2},0).wait(1).to({x:325},0).wait(1).to({x:323.85},0).wait(1).to({x:322.7},0).wait(1).to({x:321.5},0).wait(1).to({x:320.35},0).wait(1).to({x:319.2},0).wait(1).to({x:318},0).wait(1).to({x:316.85},0).wait(1).to({x:315.7},0).wait(1).to({x:314.5},0).wait(1).to({x:313.35},0).wait(1).to({x:312.2},0).wait(1).to({x:311},0).wait(1).to({x:309.85},0).wait(1).to({x:308.7},0).wait(1).to({x:307.5},0).wait(1).to({x:306.35},0).wait(1).to({x:305.2},0).wait(1).to({x:304},0).wait(1).to({x:302.85},0).wait(1).to({x:301.7},0).wait(1).to({x:300.5},0).wait(1).to({x:299.35},0).wait(1).to({x:298.2},0).wait(1).to({x:297},0).wait(1).to({x:295.85},0).wait(1).to({x:294.7},0).wait(1).to({x:293.5},0).wait(1).to({x:292.35},0).wait(1).to({x:291.2},0).wait(1).to({x:290},0).wait(1).to({x:288.85},0).wait(1).to({x:287.7},0).wait(1).to({x:286.5},0).wait(1).to({x:285.35},0).wait(1).to({x:284.2},0).wait(1).to({x:283},0).wait(1).to({x:281.85},0).wait(1).to({x:280.7},0).wait(1).to({x:279.5},0).wait(1).to({x:278.35},0).wait(1).to({x:277.2},0).wait(1).to({x:276},0).wait(1).to({x:274.85},0).wait(1).to({x:273.7},0).wait(1).to({x:272.5},0).wait(1).to({x:271.35},0).wait(1).to({x:270.2},0).wait(1).to({x:269},0).wait(1).to({x:267.85},0).wait(1).to({x:266.7},0).wait(1).to({x:265.5},0).wait(1).to({x:264.35},0).wait(1).to({x:263.2},0).wait(1).to({x:262},0).wait(1).to({x:260.85},0).wait(1).to({x:259.7},0).wait(1).to({x:258.5},0).to({_off:true},1).wait(412).to({_off:false,regX:533.8,x:533.8,y:710.9},0).wait(1).to({regX:502.5,x:502.5,y:705.55},0).wait(1).to({y:700.2},0).wait(1).to({y:694.85},0).wait(1).to({y:689.5},0).wait(1).to({y:684.15},0).wait(1).to({y:678.8},0).wait(1).to({y:673.45},0).wait(1).to({y:668.1},0).wait(1).to({y:662.75},0).wait(1).to({y:657.4},0).wait(1).to({y:652.05},0).wait(1).to({y:646.7},0).wait(1).to({y:641.35},0).wait(1).to({y:636},0).wait(1).to({y:630.65},0).wait(1).to({y:625.3},0).wait(1).to({y:619.95},0).wait(1).to({y:614.6},0).wait(1).to({y:609.25},0).wait(1).to({y:603.9},0).wait(1).to({y:598.55},0).wait(1).to({y:593.2},0).wait(1).to({y:587.85},0).wait(1).to({y:582.5},0).wait(1).to({y:577.15},0).wait(1).to({y:571.8},0).wait(1).to({y:566.45},0).wait(1).to({y:561.1},0).wait(1).to({y:555.8},0).wait(1).to({y:550.45},0).wait(1).to({y:545.1},0).wait(1).to({y:539.75},0).wait(1).to({y:534.4},0).wait(1).to({y:529.05},0).wait(1).to({y:523.7},0).wait(1).to({y:518.35},0).wait(1).to({y:513},0).wait(1).to({y:507.65},0).wait(1).to({y:502.3},0).wait(1).to({y:496.95},0).wait(1).to({y:491.6},0).wait(1).to({y:486.25},0).wait(1).to({y:480.9},0).wait(1).to({y:475.55},0).wait(1).to({y:470.2},0).wait(1).to({y:464.85},0).wait(1).to({y:459.5},0).wait(1).to({y:454.15},0).wait(1).to({y:448.8},0).wait(1).to({y:443.45},0).wait(1).to({y:438.1},0).wait(1).to({y:432.75},0).wait(1).to({y:427.4},0).wait(1).to({y:422.05},0).wait(1).to({y:416.7},0).wait(1).to({y:411.35},0).wait(1).to({y:406.05},0).wait(1).to({y:400.7},0).wait(1).to({y:395.35},0).wait(1).to({y:390},0).wait(1).to({y:384.65},0).wait(1).to({y:379.3},0).wait(1).to({y:373.95},0).wait(1).to({y:368.6},0).wait(1).to({y:363.25},0).wait(1).to({y:357.9},0).wait(1).to({y:352.55},0).wait(1).to({y:347.2},0).wait(1).to({y:341.85},0).wait(1).to({y:336.5},0).wait(1).to({y:331.15},0).wait(1).to({y:325.8},0).wait(1).to({y:320.45},0).wait(1).to({y:315.1},0).wait(1).to({y:309.75},0).wait(1).to({y:304.4},0).wait(1).to({y:299.05},0).wait(1).to({y:293.7},0).wait(1).to({y:288.35},0).wait(1).to({y:283},0).wait(1).to({y:277.65},0).wait(1).to({y:272.3},0).wait(1).to({y:266.95},0).wait(1).to({y:261.6},0).wait(1).to({y:256.25},0).wait(1).to({y:250.95},0).wait(1).to({y:245.6},0).wait(1).to({y:240.25},0).wait(1).to({y:234.9},0).wait(1).to({y:229.55},0).wait(1).to({y:224.2},0).wait(1).to({y:218.85},0).wait(1).to({y:213.5},0).wait(1).to({y:208.15},0).wait(1).to({y:202.8},0).wait(1).to({y:197.45},0).wait(1).to({y:192.1},0).wait(1).to({y:186.75},0).wait(1).to({y:181.4},0).wait(1).to({y:176.05},0).wait(1).to({y:170.7},0).wait(1).to({y:165.35},0).wait(1).to({y:160},0).wait(1).to({y:154.65},0).wait(1).to({y:149.3},0).wait(1).to({y:143.95},0).wait(1).to({y:138.6},0).wait(1).to({y:133.25},0).wait(1).to({y:127.9},0).wait(1).to({y:122.55},0).wait(1).to({y:117.25},0).wait(1).to({y:111.9},0).wait(1).to({y:106.55},0).wait(1).to({y:101.2},0).to({_off:true},1).wait(510));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(193).to({_off:false},0).wait(1).to({regY:110.6,x:400.5,y:94.1},0).wait(1).to({x:397.2},0).wait(1).to({x:393.85},0).wait(1).to({x:390.55},0).wait(1).to({x:387.2},0).wait(1).to({x:383.9},0).wait(1).to({x:380.6},0).wait(1).to({x:377.25},0).wait(1).to({x:373.95},0).wait(1).to({x:370.6},0).wait(1).to({x:367.3},0).wait(1).to({x:364},0).wait(1).to({x:360.65},0).wait(1).to({x:357.35},0).wait(1).to({x:354},0).wait(1).to({x:350.7},0).wait(1).to({x:347.4},0).wait(1).to({x:344.05},0).wait(1).to({x:340.75},0).wait(1).to({x:337.4},0).wait(1).to({x:334.1},0).wait(1).to({x:330.8},0).wait(1).to({x:327.45},0).wait(1).to({x:324.15},0).wait(1).to({x:320.8},0).wait(1).to({x:317.5},0).wait(1).to({x:314.2},0).wait(1).to({x:310.85},0).wait(1).to({x:307.55},0).wait(1).to({x:304.2},0).wait(1).to({x:300.9},0).wait(1).to({x:297.6},0).wait(1).to({x:294.25},0).wait(1).to({x:290.95},0).wait(1).to({x:287.6},0).wait(1).to({x:284.3},0).wait(1).to({x:280.95},0).wait(1).to({x:277.65},0).wait(1).to({x:274.35},0).wait(1).to({x:271},0).wait(1).to({x:267.7},0).wait(1).to({x:264.35},0).wait(1).to({x:261.05},0).wait(1).to({x:257.75},0).wait(1).to({x:254.4},0).wait(1).to({x:251.1},0).wait(1).to({x:247.75},0).wait(1).to({x:244.45},0).wait(1).to({x:241.15},0).wait(1).to({x:237.8},0).wait(1).to({x:234.5},0).wait(1).to({x:231.15},0).wait(1).to({x:227.85},0).wait(1).to({x:224.55},0).wait(1).to({x:221.2},0).wait(1).to({x:217.9},0).wait(1).to({x:214.55},0).wait(1).to({x:211.25},0).wait(1).to({x:207.95},0).wait(1).to({x:204.6},0).wait(1).to({x:201.3},0).wait(1).to({x:197.95},0).wait(1).to({x:194.65},0).wait(1).to({x:191.35},0).wait(1).to({x:188},0).wait(1).to({x:184.7},0).wait(1).to({x:181.35},0).wait(1).to({x:178.05},0).wait(1).to({x:174.75},0).wait(1).to({x:171.4},0).wait(1).to({x:168.1},0).wait(1).to({x:164.75},0).wait(1).to({x:161.45},0).wait(1).to({x:158.1},0).wait(1).to({x:154.8},0).wait(1).to({x:151.5},0).wait(1).to({x:148.15},0).wait(1).to({x:144.85},0).wait(1).to({x:141.5},0).wait(1).to({x:138.2},0).wait(1).to({x:134.9},0).wait(1).to({x:131.55},0).wait(1).to({x:128.25},0).wait(1).to({x:124.9},0).wait(1).to({x:121.6},0).wait(1).to({x:118.3},0).wait(1).to({x:114.95},0).wait(1).to({x:111.65},0).wait(1).to({x:108.3},0).wait(1).to({x:105},0).wait(1).to({x:101.7},0).wait(1).to({x:98.35},0).wait(1).to({x:95.05},0).wait(1).to({x:91.7},0).wait(1).to({x:88.4},0).wait(1).to({x:85.1},0).wait(1).to({x:81.75},0).wait(1).to({x:78.45},0).wait(1).to({x:75.1},0).wait(1).to({x:71.8},0).wait(1).to({x:68.5},0).wait(1).to({x:65.15},0).wait(1).to({x:61.85},0).wait(1).to({x:58.5},0).wait(1).to({x:55.2},0).wait(1).to({x:51.9},0).wait(1).to({x:48.55},0).wait(1).to({x:45.25},0).wait(1).to({x:41.9},0).wait(1).to({x:38.6},0).wait(1).to({x:35.25},0).wait(1).to({x:31.95},0).wait(1).to({x:28.65},0).wait(1).to({x:25.3},0).wait(1).to({x:22},0).wait(1).to({x:18.65},0).wait(1).to({x:15.35},0).wait(1).to({x:12.05},0).wait(1).to({x:8.7},0).wait(1).to({x:5.4},0).wait(1).to({x:2.05},0).wait(1).to({x:-1.25},0).wait(1).to({x:-4.55},0).wait(1).to({x:-7.9},0).wait(1).to({x:-11.2},0).wait(1).to({x:-14.55},0).wait(1).to({x:-17.85},0).wait(1).to({x:-21.15},0).wait(1).to({x:-24.5},0).wait(1).to({x:-27.8},0).wait(1).to({x:-31.15},0).wait(1).to({x:-34.45},0).wait(1).to({x:-37.75},0).wait(1).to({x:-41.1},0).wait(1).to({x:-44.4},0).wait(1).to({x:-47.75},0).wait(1).to({x:-51.05},0).wait(1).to({x:-54.35},0).wait(1).to({x:-57.7},0).wait(1).to({x:-61},0).wait(1).to({x:-64.35},0).wait(1).to({x:-67.65},0).wait(1).to({x:-70.95},0).wait(1).to({x:-74.3},0).wait(1).to({x:-77.6},0).wait(1).to({x:-80.95},0).wait(1).to({x:-84.25},0).wait(1).to({x:-87.6},0).wait(1).to({x:-90.9},0).wait(1).to({x:-94.2},0).wait(1).to({x:-97.55},0).wait(1).to({x:-100.85},0).wait(1).to({x:-104.2},0).wait(1).to({x:-107.5},0).wait(1).to({x:-110.8},0).wait(1).to({x:-114.15},0).wait(1).to({x:-117.45},0).wait(1).to({x:-120.8},0).wait(1).to({x:-124.1},0).wait(1).to({x:-127.4},0).wait(1).to({x:-130.75},0).wait(1).to({x:-134.05},0).wait(1).to({x:-137.4},0).wait(1).to({x:-140.7},0).wait(1).to({x:-144},0).wait(1).to({x:-147.35},0).wait(1).to({x:-150.65},0).wait(1).to({x:-154},0).wait(1).to({x:-157.3},0).wait(1).to({x:-160.6},0).wait(1).to({x:-163.95},0).wait(1).to({x:-167.25},0).wait(1).to({x:-170.6},0).wait(1).to({x:-173.9},0).wait(1).to({x:-177.2},0).wait(1).to({x:-180.55},0).wait(1).to({x:-183.85},0).wait(1).to({x:-187.2},0).wait(1).to({x:-190.5},0).wait(1).to({x:-193.8},0).wait(1).to({x:-197.15},0).wait(1).to({x:-200.45},0).wait(1).to({x:-203.8},0).wait(1).to({x:-207.1},0).wait(1).to({x:-210.45},0).wait(1).to({x:-213.75},0).wait(1).to({x:-217.05},0).wait(1).to({x:-220.4},0).wait(1).to({x:-223.7},0).wait(1).to({x:-227.05},0).wait(1).to({x:-230.35},0).wait(1).to({x:-233.65},0).wait(1).to({x:-237},0).wait(1).to({x:-240.3},0).wait(1).to({x:-243.65},0).wait(1).to({x:-246.95},0).wait(1).to({x:-250.25},0).wait(1).to({x:-253.6},0).wait(1).to({x:-256.9},0).wait(1).to({x:-260.25},0).wait(1).to({x:-263.55},0).wait(1).to({x:-266.85},0).wait(1).to({x:-270.2},0).wait(1).to({x:-273.5},0).wait(1).to({x:-276.85},0).wait(1).to({x:-280.15},0).wait(1).to({x:-283.45},0).wait(1).to({x:-286.8},0).wait(1).to({x:-290.1},0).wait(1).to({x:-293.45},0).wait(1).to({x:-296.75},0).wait(1).to({x:-300.05},0).wait(1).to({x:-303.4},0).wait(1).to({x:-306.7},0).wait(1).to({x:-310.05},0).wait(1).to({x:-313.35},0).wait(1).to({x:-316.65},0).wait(1).to({x:-320},0).wait(1).to({x:-323.3},0).wait(1).to({x:-326.65},0).wait(1).to({x:-329.95},0).wait(1).to({x:-333.3},0).wait(1).to({x:-336.6},0).wait(1).to({x:-339.9},0).wait(1).to({x:-343.25},0).wait(1).to({x:-346.55},0).wait(1).to({x:-349.9},0).wait(1).to({x:-353.2},0).wait(1).to({x:-356.5},0).wait(1).to({x:-359.85},0).wait(1).to({x:-363.15},0).wait(1).to({x:-366.5},0).wait(1).to({x:-369.8},0).wait(1).to({x:-373.1},0).wait(1).to({x:-376.45},0).wait(1).to({x:-379.75},0).wait(1).to({x:-383.1},0).wait(1).to({x:-386.4},0).wait(1).to({x:-389.7},0).wait(1).to({x:-393.05},0).wait(1).to({x:-396.35},0).wait(1).to({x:-399.7},0).wait(1).to({x:-403},0).wait(1).to({x:-406.3},0).wait(1).to({x:-409.65},0).wait(1).to({x:-412.95},0).wait(1).to({x:-416.3},0).wait(1).to({x:-419.6},0).wait(1).to({x:-422.9},0).wait(1).to({x:-426.25},0).wait(1).to({x:-429.55},0).wait(1).to({x:-432.9},0).wait(1).to({x:-436.2},0).wait(1).to({x:-439.5},0).wait(1).to({x:-442.85},0).wait(1).to({x:-446.15},0).wait(1).to({x:-449.5},0).wait(1).to({x:-452.8},0).wait(1).to({x:-456.15},0).to({_off:true},1).wait(267).to({_off:false,regY:110.5,x:428,y:114.9},0).wait(1).to({regY:110.6,x:427.4,y:114.95},0).wait(1).to({x:426.75},0).wait(1).to({x:426.15},0).wait(1).to({x:425.5},0).wait(1).to({x:424.85},0).wait(1).to({x:424.25},0).wait(1).to({x:423.6},0).wait(1).to({x:422.95},0).wait(1).to({x:422.35},0).wait(1).to({x:421.7},0).wait(1).to({x:421.05},0).wait(1).to({x:420.45},0).wait(1).to({x:419.8},0).wait(1).to({x:419.15},0).wait(1).to({x:418.55},0).wait(1).to({x:417.9},0).wait(1).to({x:417.25},0).wait(1).to({x:416.65},0).wait(1).to({x:416},0).wait(1).to({x:415.35},0).wait(1).to({x:414.75},0).wait(1).to({x:414.1,y:114.9},0).wait(1).to({x:413.45},0).wait(1).to({x:412.85},0).wait(1).to({x:412.2},0).wait(1).to({x:411.55},0).wait(1).to({x:410.95},0).wait(1).to({x:410.3},0).wait(1).to({x:409.65},0).wait(1).to({x:409.05},0).wait(1).to({x:408.4},0).wait(1).to({x:407.75},0).wait(1).to({x:407.15},0).wait(1).to({x:406.5},0).wait(1).to({x:405.85},0).wait(1).to({x:405.25},0).wait(1).to({x:404.6},0).wait(1).to({x:403.95},0).wait(1).to({x:403.35},0).wait(1).to({x:402.7},0).wait(1).to({x:402.05},0).wait(1).to({x:401.45},0).wait(1).to({x:400.8,y:114.85},0).wait(1).to({x:400.15},0).wait(1).to({x:399.55},0).wait(1).to({x:398.9},0).wait(1).to({x:398.25},0).wait(1).to({x:397.65},0).wait(1).to({x:397},0).wait(1).to({x:396.35},0).wait(1).to({x:395.75},0).wait(1).to({x:395.1},0).wait(1).to({x:394.45},0).wait(1).to({x:393.85},0).wait(1).to({x:393.2},0).wait(1).to({x:392.55},0).wait(1).to({x:391.95},0).wait(1).to({x:391.3},0).wait(1).to({x:390.65},0).wait(1).to({x:390.05},0).wait(1).to({x:389.4},0).wait(1).to({x:388.75},0).wait(1).to({x:388.15},0).wait(1).to({x:387.5,y:114.8},0).wait(1).to({x:386.85},0).wait(1).to({x:386.25},0).wait(1).to({x:385.6},0).wait(1).to({x:384.95},0).wait(1).to({x:384.35},0).wait(1).to({x:383.7},0).wait(1).to({x:383.05},0).wait(1).to({x:382.45},0).wait(1).to({x:381.8},0).wait(1).to({x:381.15},0).wait(1).to({x:380.55},0).wait(1).to({x:379.9},0).wait(1).to({x:379.25},0).wait(1).to({x:378.65},0).wait(1).to({x:378},0).wait(1).to({x:377.35},0).wait(1).to({x:376.75},0).wait(1).to({x:376.1},0).wait(1).to({x:375.45},0).wait(1).to({x:374.85},0).wait(1).to({x:374.2,y:114.75},0).wait(1).to({x:373.55},0).wait(1).to({x:372.95},0).wait(1).to({x:372.3},0).wait(1).to({x:371.65},0).wait(1).to({x:371.05},0).wait(1).to({x:370.4},0).wait(1).to({x:369.75},0).wait(1).to({x:369.15},0).wait(1).to({x:368.5},0).wait(1).to({x:367.85},0).wait(1).to({x:367.25},0).wait(1).to({x:366.6},0).wait(1).to({x:365.95},0).wait(1).to({x:365.35},0).wait(1).to({x:364.7},0).wait(1).to({x:364.05},0).wait(1).to({x:363.45},0).wait(1).to({x:362.8},0).wait(1).to({x:362.15},0).wait(1).to({x:361.55},0).wait(1).to({x:360.9},0).wait(1).to({x:360.25,y:114.7},0).wait(1).to({x:359.65},0).wait(1).to({x:359},0).wait(1).to({x:358.35},0).wait(1).to({x:357.75},0).wait(1).to({x:357.1},0).wait(1).to({x:356.45},0).wait(1).to({x:355.85},0).wait(1).to({x:355.2},0).wait(1).to({x:354.55},0).wait(1).to({x:353.95},0).wait(1).to({x:353.3},0).wait(1).to({x:352.65},0).wait(1).to({x:352.05},0).wait(1).to({x:351.4},0).wait(1).to({x:350.75},0).wait(1).to({x:350.15},0).wait(1).to({x:349.5},0).wait(1).to({x:348.85},0).wait(1).to({x:348.25},0).wait(1).to({x:347.6},0).wait(1).to({x:347,y:114.65},0).wait(1).to({x:346.35},0).wait(1).to({x:345.7},0).wait(1).to({x:345.1},0).wait(1).to({x:344.45},0).wait(1).to({x:343.8},0).wait(1).to({x:343.2},0).wait(1).to({x:342.55},0).wait(1).to({x:341.9},0).wait(1).to({x:341.3},0).wait(1).to({x:340.65},0).wait(1).to({x:340},0).wait(1).to({x:339.4},0).wait(1).to({x:338.75},0).wait(1).to({x:338.1},0).wait(1).to({x:337.5},0).wait(1).to({x:336.85},0).wait(1).to({x:336.2},0).wait(1).to({x:335.6},0).wait(1).to({x:334.95},0).wait(1).to({x:334.3},0).wait(1).to({x:333.7,y:114.6},0).wait(1).to({x:333.05},0).wait(1).to({x:332.4},0).wait(1).to({x:331.8},0).wait(1).to({x:331.15},0).wait(1).to({x:330.5},0).wait(1).to({x:329.9},0).wait(1).to({x:329.25},0).wait(1).to({x:328.6},0).wait(1).to({x:328},0).wait(1).to({x:327.35},0).wait(1).to({x:326.7},0).wait(1).to({x:326.1},0).wait(1).to({x:325.45},0).wait(1).to({x:324.8},0).wait(1).to({x:324.2},0).wait(1).to({x:323.55},0).wait(1).to({x:322.9},0).wait(1).to({x:322.3},0).wait(1).to({x:321.65},0).wait(1).to({x:321},0).wait(1).to({x:320.4,y:114.55},0).wait(1).to({x:319.75},0).wait(1).to({x:319.1},0).wait(1).to({x:318.5},0).wait(1).to({x:317.85},0).wait(1).to({x:317.2},0).wait(1).to({x:316.6},0).wait(1).to({x:315.95},0).wait(1).to({x:315.3},0).wait(1).to({x:314.7},0).wait(1).to({x:314.05},0).wait(1).to({x:313.4},0).wait(1).to({x:312.8},0).wait(1).to({x:312.15},0).wait(1).to({x:311.5},0).wait(1).to({x:310.9},0).wait(1).to({x:310.25},0).wait(1).to({x:309.6},0).wait(1).to({x:309},0).wait(1).to({x:308.35},0).wait(1).to({x:307.7},0).wait(1).to({x:307.1,y:114.5},0).wait(1).to({x:306.45},0).wait(1).to({x:305.8},0).wait(1).to({x:305.2},0).wait(1).to({x:304.55},0).wait(1).to({x:303.9},0).wait(1).to({x:303.3},0).wait(1).to({x:302.65},0).wait(1).to({x:302},0).wait(1).to({x:301.4},0).wait(1).to({x:300.75},0).wait(1).to({x:300.1},0).wait(1).to({x:299.5},0).wait(1).to({x:298.85},0).wait(1).to({x:298.2},0).wait(1).to({x:297.6},0).wait(1).to({x:296.95},0).wait(1).to({x:296.3},0).wait(1).to({x:295.7},0).wait(1).to({x:295.05},0).wait(1).to({x:294.4},0).wait(1).to({x:293.8},0).wait(1).to({x:293.15,y:114.45},0).wait(1).to({x:292.5},0).wait(1).to({x:291.9},0).wait(1).to({x:291.25},0).wait(1).to({x:290.6},0).wait(1).to({x:290},0).wait(1).to({x:289.35},0).wait(1).to({x:288.7},0).wait(1).to({x:288.1},0).wait(1).to({x:287.45},0).wait(1).to({x:286.8},0).wait(1).to({x:286.2},0).wait(1).to({x:285.55},0).wait(1).to({x:284.9},0).wait(1).to({x:284.3},0).wait(1).to({x:283.65},0).wait(1).to({x:283},0).wait(1).to({x:282.4},0).wait(1).to({x:281.75},0).wait(1).to({x:281.1},0).wait(1).to({x:280.5},0).wait(1).to({x:279.85,y:114.4},0).wait(1).to({x:279.2},0).wait(1).to({x:278.6},0).wait(1).to({x:277.95},0).wait(1).to({x:277.3},0).wait(1).to({x:276.7},0).wait(1).to({x:276.05},0).wait(1).to({x:275.4},0).wait(1).to({x:274.8},0).wait(1).to({x:274.15},0).wait(1).to({x:273.5},0).wait(1).to({x:272.9},0).wait(1).to({x:272.25},0).wait(1).to({x:271.6},0).wait(1).to({x:271},0).wait(1).to({x:270.35},0).wait(1).to({x:269.7},0).wait(1).to({x:269.1},0).wait(1).to({x:268.45},0).wait(1).to({x:267.8},0).wait(1).to({x:267.2},0).wait(1).to({x:266.55,y:114.35},0).wait(1).to({x:265.95},0).wait(1).to({x:265.3},0).wait(1).to({x:264.65},0).wait(1).to({x:264.05},0).wait(1).to({x:263.4},0).wait(1).to({x:262.75},0).wait(1).to({x:262.15},0).wait(1).to({x:261.5},0).wait(1).to({x:260.85},0).wait(1).to({x:260.25},0).wait(1).to({x:259.6},0).wait(1).to({x:258.95},0).wait(1).to({x:258.35},0).wait(1).to({x:257.7},0).wait(1).to({x:257.05},0).wait(1).to({x:256.45},0).wait(1).to({x:255.8},0).wait(1).to({x:255.15},0).wait(1).to({x:254.55},0).wait(1).to({x:253.9},0).wait(1).to({x:253.25,y:114.3},0).wait(1).to({x:252.65},0).wait(1).to({x:252},0).wait(1).to({x:251.35},0).wait(1).to({x:250.75},0).wait(1).to({x:250.1},0).wait(1).to({x:249.45},0).wait(1).to({x:248.85},0).wait(1).to({x:248.2},0).wait(1).to({x:247.55},0).wait(1).to({x:246.95},0).wait(1).to({x:246.3},0).wait(1).to({x:245.65},0).wait(1).to({x:245.05},0).wait(1).to({x:244.4},0).wait(1).to({x:243.75},0).wait(1).to({x:243.15},0).wait(1).to({x:242.5},0).wait(1).to({x:241.85},0).wait(1).to({x:241.25},0).wait(1).to({x:240.6},0).wait(1).to({x:239.95,y:114.25},0).wait(1).to({x:239.35},0).wait(1).to({x:238.7},0).wait(1).to({x:238.05},0).wait(1).to({x:237.45},0).wait(1).to({x:236.8},0).wait(1).to({x:236.15},0).wait(1).to({x:235.55},0).wait(1).to({x:234.9},0).wait(1).to({x:234.25},0).wait(1).to({x:233.65},0).wait(1).to({x:233},0).wait(1).to({x:232.35},0).wait(1).to({x:231.75},0).wait(1).to({x:231.1},0).wait(1).to({x:230.45},0).wait(1).to({x:229.85},0).wait(1).to({x:229.2},0).wait(1).to({x:228.55},0).wait(1).to({x:227.95},0).wait(1).to({x:227.3},0).wait(1).to({x:226.65},0).wait(1).to({x:226.05,y:114.2},0).wait(1).to({x:225.4},0).wait(1).to({x:224.75},0).wait(1).to({x:224.15},0).wait(1).to({x:223.5},0).wait(1).to({x:222.85},0).wait(1).to({x:222.25},0).wait(1).to({x:221.6},0).wait(1).to({x:220.95},0).wait(1).to({x:220.35},0).wait(1).to({x:219.7},0).wait(1).to({x:219.05},0).wait(1).to({x:218.45},0).wait(1).to({x:217.8},0).wait(1).to({x:217.15},0).wait(1).to({x:216.55},0).wait(1).to({x:215.9},0).wait(1).to({x:215.25},0).wait(1).to({x:214.65},0).wait(1).to({x:214},0).wait(1).to({x:213.35},0).wait(1).to({x:212.75,y:114.15},0).wait(1).to({x:212.1},0).wait(1).to({x:211.45},0).wait(1).to({x:210.85},0).wait(1).to({x:210.2},0).wait(1).to({x:209.55},0).wait(1).to({x:208.95},0).wait(1).to({x:208.3},0).wait(1).to({x:207.65},0).wait(1).to({x:207.05},0).wait(1).to({x:206.4},0).wait(1).to({x:205.75},0).wait(1).to({x:205.15},0).wait(1).to({x:204.5},0).wait(1).to({x:203.85},0).wait(1).to({x:203.25},0).wait(1).to({x:202.6},0).wait(1).to({x:201.95},0).wait(1).to({x:201.35},0).wait(1).to({x:200.7},0).wait(1).to({x:200.05},0).wait(1).to({x:199.45,y:114.1},0).wait(1).to({x:198.8},0).wait(1).to({x:198.15},0).wait(1).to({x:197.55},0).wait(1).to({x:196.9},0).wait(1).to({x:196.25},0).wait(1).to({x:195.65},0).wait(1).to({x:195},0).wait(1).to({x:194.35},0).wait(1).to({x:193.75},0).wait(1).to({x:193.1},0).wait(1).to({x:192.45},0).wait(1).to({x:191.85},0).wait(1).to({x:191.2},0).wait(1).to({x:190.55},0).wait(1).to({x:189.95},0).wait(1).to({x:189.3},0).wait(1).to({x:188.65},0).wait(1).to({x:188.05},0).wait(1).to({x:187.4},0).wait(1).to({x:186.75},0).wait(1).to({x:186.15,y:114.05},0).wait(1).to({x:185.5},0).wait(1).to({x:184.9},0).wait(1).to({x:184.25},0).wait(1).to({x:183.6},0).wait(1).to({x:183},0).wait(1).to({x:182.35},0).wait(1).to({x:181.7},0).wait(1).to({x:181.1},0).wait(1).to({x:180.45},0).wait(1).to({x:179.8},0).wait(1).to({x:179.2},0).wait(1).to({x:178.55},0).wait(1).to({x:177.9},0).wait(1).to({x:177.3},0).wait(1).to({x:176.65},0).wait(1).to({x:176},0).wait(1).to({x:175.4},0).wait(1).to({x:174.75},0).wait(1).to({x:174.1},0).wait(1).to({x:173.5},0).wait(1).to({x:172.85,y:114},0).wait(1).to({x:172.2},0).wait(1).to({x:171.6},0).wait(1).to({x:170.95},0).wait(1).to({x:170.3},0).wait(1).to({x:169.7},0).wait(1).to({x:169.05},0).wait(1).to({x:168.4},0).wait(1).to({x:167.8},0).wait(1).to({x:167.15},0).wait(1).to({x:166.5},0).wait(1).to({x:165.9},0).wait(1).to({x:165.25},0).wait(1).to({x:164.6},0).wait(1).to({x:164},0).wait(1).to({x:163.35},0).wait(1).to({x:162.7},0).wait(1).to({x:162.1},0).wait(1).to({x:161.45},0).wait(1).to({x:160.8},0).wait(1).to({x:160.2},0).wait(1).to({x:159.55},0).wait(1).to({x:158.9,y:113.95},0).wait(1).to({x:158.3},0).wait(1).to({x:157.65},0).wait(1).to({x:157},0).wait(1).to({x:156.4},0).wait(1).to({x:155.75},0).wait(1).to({x:155.1},0).wait(1).to({x:154.5},0).wait(1).to({x:153.85},0).wait(1).to({x:153.2},0).wait(1).to({x:152.6},0).wait(1).to({x:151.95},0).wait(1).to({x:151.3},0).wait(1).to({x:150.7},0).wait(1).to({x:150.05},0).wait(1).to({x:149.4},0).wait(1).to({x:148.8},0).wait(1).to({x:148.15},0).wait(1).to({x:147.5},0).wait(1).to({x:146.9},0).wait(1).to({x:146.25},0).wait(1).to({x:145.6,y:113.9},0).wait(1).to({x:145},0).wait(1).to({x:144.35},0).wait(1).to({x:143.7},0).wait(1).to({x:143.1},0).wait(1).to({x:142.45},0).wait(1).to({x:141.8},0).wait(1).to({x:141.2},0).wait(1).to({x:140.55},0).wait(1).to({x:139.9},0).wait(1).to({x:139.3},0).wait(1).to({x:138.65},0).wait(1).to({x:138},0).wait(1).to({x:137.4},0).wait(1).to({x:136.75},0).wait(1).to({x:136.1},0).wait(1).to({x:135.5},0).wait(1).to({x:134.85},0).wait(1).to({x:134.2},0).wait(1).to({x:133.6},0).wait(1).to({x:132.95},0).wait(1).to({x:132.3,y:113.85},0).wait(1).to({x:131.7},0).wait(1).to({x:131.05},0).wait(1).to({x:130.4},0).wait(1).to({x:129.8},0).wait(1).to({x:129.15},0).wait(1).to({x:128.5},0).wait(1).to({x:127.9},0).wait(1).to({x:127.25},0).wait(1).to({x:126.6},0).wait(1).to({x:126},0).wait(1).to({x:125.35},0).wait(1).to({x:124.7},0).wait(1).to({x:124.1},0).wait(1).to({x:123.45},0).wait(1).to({x:122.8},0).wait(1).to({x:122.2},0).wait(1).to({x:121.55},0).wait(1).to({x:120.9},0).wait(1).to({x:120.3},0).wait(1).to({x:119.65},0).wait(1).to({x:119,y:113.8},0).wait(1).to({x:118.4},0).wait(1).to({x:117.75},0).wait(1).to({x:117.1},0).wait(1).to({x:116.5},0).wait(1).to({x:115.85},0).wait(1).to({x:115.2},0).wait(1).to({x:114.6},0).wait(1).to({x:113.95},0).wait(1).to({x:113.3},0).wait(1).to({x:112.7},0).wait(1).to({x:112.05},0).wait(1).to({x:111.4},0).wait(1).to({x:110.8},0).wait(1).to({x:110.15},0).wait(1).to({x:109.5},0).wait(1).to({x:108.9},0).wait(1).to({x:108.25},0).wait(1).to({x:107.6},0).wait(1).to({x:107},0).wait(1).to({x:106.35},0).wait(1).to({x:105.7},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.moonstars = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.star2();
	this.instance.setTransform(309.65,50,1,1,0,0,0,6.4,7);

	this.instance_1 = new lib.star2();
	this.instance_1.setTransform(258.8,91,1,1,0,0,0,6.4,7);

	this.instance_2 = new lib.star2();
	this.instance_2.setTransform(381.8,146,1,1,0,0,0,6.4,7);

	this.instance_3 = new lib.star2();
	this.instance_3.setTransform(414.8,15,1,1,0,0,0,6.4,7);

	this.instance_4 = new lib.star2();
	this.instance_4.setTransform(147.85,64,1,1,0,0,0,6.4,7);

	this.instance_5 = new lib.star2();
	this.instance_5.setTransform(205.9,7,1,1,0,0,0,6.4,7);

	this.instance_6 = new lib.star2();
	this.instance_6.setTransform(296.85,140.3,1,1,0,0,0,6.4,7);

	this.instance_7 = new lib.star2();
	this.instance_7.setTransform(6.4,132,1,1,0,0,0,6.4,7);

	this.instance_8 = new lib.star2();
	this.instance_8.setTransform(105.85,137,1,1,0,0,0,6.4,7);

	this.instance_9 = new lib.star2();
	this.instance_9.setTransform(496.8,118,1,1,0,0,0,6.4,7);

	this.instance_10 = new lib.star2();
	this.instance_10.setTransform(534.8,209,1,1,0,0,0,6.4,7);

	this.instance_11 = new lib.star2();
	this.instance_11.setTransform(47.25,193.7,1,1,0,0,0,6.4,7);

	this.instance_12 = new lib.star();
	this.instance_12.setTransform(172.9,195.6,1,1,0,0,0,6.5,5.3);

	this.instance_13 = new lib.star();
	this.instance_13.setTransform(205.9,125,1,1,0,0,0,6.5,5.3);

	this.instance_14 = new lib.star();
	this.instance_14.setTransform(534.4,37.7,1,1,0,0,0,6.5,5.3);

	this.instance_15 = new lib.star();
	this.instance_15.setTransform(415.85,206,1,1,0,0,0,6.5,5.3);

	this.instance_16 = new lib.star();
	this.instance_16.setTransform(447.95,84.7,1,1,0,0,0,6.5,5.3);

	this.instance_17 = new lib.star();
	this.instance_17.setTransform(460.85,171,1,1,0,0,0,6.5,5.3);

	this.instance_18 = new lib.star();
	this.instance_18.setTransform(288.7,206,1,1,0,0,0,6.5,5.3);

	this.instance_19 = new lib.star();
	this.instance_19.setTransform(73.3,51.7,1,1,0,0,0,6.5,5.3);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CCCCCC").ss(1,1,1).p("ABepIQthM4QpFZQpzmBGrsQg");
	this.shape.setTransform(31.4536,66.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("ABepIQmrMPJzGCQwplZNhs4g");
	this.shape_1.setTransform(31.4536,66.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,541.2,216);


(lib.grass_big = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_3
	this.instance = new lib.grass();
	this.instance.setTransform(141.25,232.05,1.7068,1.0493,0,0,180,68.2,164.3);

	this.instance_1 = new lib.grass();
	this.instance_1.setTransform(104.15,223.6,1.0023,1.1773,0,0,180,68,164.5);

	this.instance_2 = new lib.grass();
	this.instance_2.setTransform(533.4,296.6,1.1078,1.0126,0,0,0,68.2,164.4);

	this.instance_3 = new lib.grass();
	this.instance_3.setTransform(-69.15,231.45,0.865,1.4087,0,0,180,68.2,164.3);

	this.instance_4 = new lib.grass();
	this.instance_4.setTransform(89.85,259.8,1.3284,0.9279,0,0,180,68,164.4);

	this.instance_5 = new lib.grass();
	this.instance_5.setTransform(716.3,234.05,1.1078,1.0371,0,0,0,68.1,164.3);

	this.instance_6 = new lib.grass();
	this.instance_6.setTransform(237.1,277.05,0.8788,1.2995,0,0,0,68.2,164.2);

	this.instance_7 = new lib.grass();
	this.instance_7.setTransform(604.1,327.6,0.735,1.5553,0,0,0,67.8,164.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(145));

	// Layer_2
	this.instance_8 = new lib.grass();
	this.instance_8.setTransform(352.5,246.05,1.1925,1.244,0,0,0,68,164);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1).to({regX:-167.3,scaleX:1.1937,skewY:0.2029,x:71.6,y:245.05},0).wait(1).to({scaleX:1.195,skewY:0.4058,x:71.3,y:244.05},0).wait(1).to({scaleX:1.1962,skewY:0.6087,x:71.05,y:243.05},0).wait(1).to({scaleX:1.1974,skewY:0.8116,x:70.75,y:242},0).wait(1).to({scaleX:1.1986,skewY:1.0144,x:70.45,y:241.05},0).wait(1).to({scaleX:1.1999,skewY:1.2173,x:70.2,y:240.05},0).wait(1).to({scaleX:1.2011,skewY:1.4202,x:69.9,y:239},0).wait(1).to({scaleX:1.2023,skewY:1.6231,x:69.7,y:238},0).wait(1).to({scaleX:1.2035,skewY:1.826,x:69.4,y:237},0).wait(1).to({scaleX:1.2048,skewY:2.0289,x:69.15,y:236},0).wait(1).to({scaleX:1.206,skewY:2.2318,x:68.9,y:235},0).wait(1).to({scaleX:1.2073,skewY:2.4347,x:68.65,y:233.95},0).wait(1).to({scaleX:1.2085,skewY:2.6375,x:68.4,y:232.95},0).wait(132));

	// Layer_1
	this.instance_9 = new lib.grass();
	this.instance_9.setTransform(-246.25,235.45,1.9588,1.1772,0,0,180,68.2,164.3);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AR8lPIAZAQAqWAAQAAC3hLCAQhKCBhqAAQhpAAhLiBQhLiAAAi3QAAi2BLiBQBLiABpAAQBqAABKCAQBLCBAAC2g");
	this.shape.setTransform(281.3,319.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF33").s().p("AizE3QhLiAAAi3QAAi2BLiAQBKiBBpAAQBqAABKCBQBLCAAAC2QAAC3hLCAQhKCBhqAAQhpAAhKiBg");
	this.shape_1.setTransform(189.55,319.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance_9}]}).wait(145));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,601.7,582.3);


(lib.butterflyflying = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Symbol4();
	this.instance.setTransform(44,44,1,1,0,0,0,44,44);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1).to({scaleX:1},0).wait(1).to({scaleX:0.8486},0).wait(1).to({scaleX:0.6972,x:43.95},0).wait(1).to({scaleX:0.5457},0).wait(1).to({scaleX:0.3943,x:44},0).wait(1).to({scaleX:0.5152,x:43.95},0).wait(1).to({scaleX:0.6361,x:44},0).wait(1).to({scaleX:0.757,x:43.95},0).wait(1).to({scaleX:0.8779,x:44},0).wait(1).to({scaleX:0.9988},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,88,88);


(lib.Scene_1_stars = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// stars
	this.instance = new lib.moonstars("synched",0);
	this.instance.setTransform(287.6,519.95,1,1,0,0,0,270.6,108);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(408).to({_off:false},0).wait(1).to({y:517.8},0).wait(1).to({y:515.7},0).wait(1).to({y:513.6},0).wait(1).to({y:511.45},0).wait(1).to({y:509.35},0).wait(1).to({y:507.25},0).wait(1).to({y:505.15},0).wait(1).to({x:287.65,y:503},0).wait(1).to({y:500.9},0).wait(1).to({y:498.8},0).wait(1).to({y:496.7},0).wait(1).to({y:494.55},0).wait(1).to({y:492.45},0).wait(1).to({y:490.35},0).wait(1).to({y:488.25},0).wait(1).to({x:287.7,y:486.1},0).wait(1).to({y:484},0).wait(1).to({y:481.9},0).wait(1).to({y:479.8},0).wait(1).to({y:477.65},0).wait(1).to({y:475.55},0).wait(1).to({y:473.45},0).wait(1).to({y:471.35},0).wait(1).to({x:287.75,y:469.2},0).wait(1).to({y:467.1},0).wait(1).to({y:465},0).wait(1).to({y:462.9},0).wait(1).to({y:460.75},0).wait(1).to({y:458.65},0).wait(1).to({y:456.55},0).wait(1).to({y:454.45},0).wait(1).to({x:287.8,y:452.3},0).wait(1).to({y:450.2},0).wait(1).to({y:448.1},0).wait(1).to({y:446},0).wait(1).to({y:443.85},0).wait(1).to({y:441.75},0).wait(1).to({y:439.65},0).wait(1).to({y:437.55},0).wait(1).to({x:287.85,y:435.4},0).wait(1).to({y:433.3},0).wait(1).to({y:431.2},0).wait(1).to({y:429.1},0).wait(1).to({y:426.95},0).wait(1).to({y:424.85},0).wait(1).to({y:422.75},0).wait(1).to({x:287.9,y:420.65},0).wait(1).to({y:418.5},0).wait(1).to({y:416.4},0).wait(1).to({y:414.3},0).wait(1).to({y:412.2},0).wait(1).to({y:410.05},0).wait(1).to({y:407.95},0).wait(1).to({y:405.85},0).wait(1).to({x:287.95,y:403.75},0).wait(1).to({y:401.6},0).wait(1).to({y:399.5},0).wait(1).to({y:397.4},0).wait(1).to({y:395.3},0).wait(1).to({y:393.15},0).wait(1).to({y:391.05},0).wait(1).to({y:388.95},0).wait(1).to({x:288,y:386.85},0).wait(1).to({y:384.7},0).wait(1).to({y:382.6},0).wait(1).to({y:380.5},0).wait(1).to({y:378.4},0).wait(1).to({y:376.25},0).wait(1).to({y:374.15},0).wait(1).to({y:372.05},0).wait(1).to({x:288.05,y:369.95},0).wait(1).to({y:367.8},0).wait(1).to({y:365.7},0).wait(1).to({y:363.6},0).wait(1).to({y:361.5},0).wait(1).to({y:359.35},0).wait(1).to({y:357.25},0).wait(1).to({y:355.15},0).wait(1).to({x:288.1,y:353.05},0).wait(1).to({y:350.9},0).wait(1).to({y:348.8},0).wait(1).to({y:346.7},0).wait(1).to({y:344.6},0).wait(1).to({y:342.45},0).wait(1).to({y:340.35},0).wait(1).to({y:338.25},0).wait(1).to({x:288.15,y:336.15},0).wait(1).to({y:334},0).wait(1).to({y:331.9},0).wait(1).to({y:329.8},0).wait(1).to({y:327.7},0).wait(1).to({y:325.55},0).wait(1).to({y:323.45},0).wait(1).to({x:288.2,y:321.35},0).wait(1).to({y:319.25},0).wait(1).to({y:317.1},0).wait(1).to({y:315},0).wait(1).to({y:312.9},0).wait(1).to({y:310.8},0).wait(1).to({y:308.65},0).wait(1).to({y:306.55},0).wait(1).to({x:288.25,y:304.45},0).wait(1).to({y:302.35},0).wait(1).to({y:300.2},0).wait(1).to({y:298.1},0).wait(1).to({y:296},0).wait(1).to({y:293.9},0).wait(1).to({y:291.75},0).wait(1).to({y:289.65},0).wait(1).to({x:288.3,y:287.55},0).wait(1).to({y:285.45},0).wait(1).to({y:283.3},0).wait(1).to({y:281.2},0).wait(1).to({y:279.1},0).wait(1).to({y:277},0).wait(1).to({y:274.85},0).wait(1).to({y:272.75},0).wait(1).to({x:288.35,y:270.65},0).wait(1).to({y:268.55},0).wait(1).to({y:266.4},0).wait(1).to({y:264.3},0).wait(1).to({y:262.2},0).wait(1).to({y:260.1},0).wait(1).to({y:257.95},0).wait(1).to({y:255.85},0).wait(1).to({x:288.4,y:253.75},0).wait(1).to({y:251.65},0).wait(1).to({y:249.5},0).wait(1).to({y:247.4},0).wait(1).to({y:245.3},0).wait(1).to({y:243.2},0).wait(1).to({y:241.05},0).wait(1).to({y:238.95},0).wait(1).to({x:288.45,y:236.85},0).wait(1).to({y:234.75},0).wait(1).to({y:232.6},0).wait(1).to({y:230.5},0).wait(1).to({y:228.4},0).wait(1).to({y:226.3},0).wait(1).to({y:224.15},0).wait(1).to({x:288.5,y:222.05},0).wait(1).to({y:219.95},0).wait(1).to({y:217.85},0).wait(1).to({y:215.7},0).wait(1).to({y:213.6},0).wait(1).to({y:211.5},0).wait(1).to({y:209.4},0).wait(1).to({y:207.25},0).wait(1).to({x:288.55,y:205.15},0).wait(1).to({y:203.05},0).wait(1).to({y:200.95},0).wait(1).to({y:198.8},0).wait(1).to({y:196.7},0).wait(1).to({y:194.6},0).wait(1).to({y:192.5},0).wait(1).to({y:190.35},0).wait(1).to({x:288.6,y:188.25},0).wait(1).to({y:186.15},0).wait(1).to({y:184},0).wait(1).to({y:181.9},0).wait(1).to({y:179.8},0).wait(1).to({y:177.7},0).wait(1).to({y:175.55},0).wait(1).to({y:173.45},0).wait(1).to({x:288.65,y:171.35},0).wait(1).to({y:169.25},0).wait(1).to({y:167.1},0).wait(1).to({y:165},0).wait(1).to({y:162.9},0).wait(1).to({y:160.8},0).wait(1).to({y:158.65},0).wait(1).to({y:156.55},0).wait(1).to({x:288.7,y:154.45},0).wait(1).to({y:152.35},0).wait(1).to({y:150.2},0).wait(1).to({y:148.1},0).wait(1).to({y:146},0).wait(1).to({y:143.9},0).wait(1).to({y:141.75},0).wait(1).to({y:139.65},0).wait(1).to({x:288.75,y:137.55},0).wait(1).to({y:135.45},0).wait(1).to({y:133.3},0).wait(1).to({y:131.2},0).wait(1).to({y:129.1},0).wait(1).to({y:127},0).wait(1).to({y:124.85},0).wait(1).to({x:288.8,y:122.75},0).wait(1).to({y:120.65},0).wait(1).to({y:118.55},0).wait(1).to({y:116.4},0).wait(1).to({y:114.3},0).wait(1).to({y:112.2},0).wait(1).to({y:110.1},0).wait(1).to({y:108},0).wait(1).to({x:289.4},0).wait(1).to({x:289.35,y:106},0).wait(1).to({y:103.95},0).wait(1).to({y:101.9},0).wait(1).to({y:99.85},0).wait(1).to({y:97.8},0).wait(1).to({x:289.3,y:95.75},0).wait(1).to({y:93.7},0).wait(1).to({y:91.7},0).wait(1).to({y:89.65},0).wait(1).to({y:87.6},0).wait(1).to({y:85.55},0).wait(1).to({x:289.25,y:83.5},0).wait(1).to({y:81.45},0).wait(1).to({y:79.4},0).wait(1).to({y:77.35},0).wait(1).to({y:75.35},0).wait(1).to({y:73.3},0).wait(1).to({x:289.2,y:71.25},0).wait(1).to({y:69.2},0).wait(1).to({y:67.15},0).wait(1).to({y:65.1},0).wait(1).to({y:63.05},0).wait(1).to({y:61},0).wait(1).to({x:289.15,y:59},0).wait(1).to({y:56.95},0).wait(1).to({y:54.9},0).wait(1).to({y:52.85},0).wait(1).to({y:50.8},0).wait(1).to({x:289.1,y:48.75},0).wait(1).to({y:46.7},0).wait(1).to({y:44.7},0).wait(1).to({y:42.65},0).wait(1).to({y:40.6},0).wait(1).to({y:38.55},0).wait(1).to({x:289.05,y:36.5},0).wait(1).to({y:34.45},0).wait(1).to({y:32.4},0).wait(1).to({y:30.35},0).wait(1).to({y:28.35},0).wait(1).to({y:26.3},0).wait(1).to({x:289,y:24.25},0).wait(1).to({y:22.2},0).wait(1).to({y:20.15},0).wait(1).to({y:18.1},0).wait(1).to({y:16.05},0).wait(1).to({y:14},0).wait(1).to({x:288.95,y:12},0).wait(1).to({y:9.95},0).wait(1).to({y:7.9},0).wait(1).to({y:5.85},0).wait(1).to({y:3.8},0).wait(1).to({x:288.9,y:1.75},0).wait(1).to({y:-0.3},0).wait(1).to({y:-2.3},0).wait(1).to({y:-4.35},0).wait(1).to({y:-6.4},0).wait(1).to({y:-8.45},0).wait(1).to({x:288.85,y:-10.5},0).wait(1).to({y:-12.55},0).wait(1).to({y:-14.6},0).wait(1).to({y:-16.65},0).wait(1).to({y:-18.65},0).wait(1).to({y:-20.7},0).wait(1).to({x:288.8,y:-22.75},0).wait(1).to({y:-24.8},0).wait(1).to({y:-26.85},0).wait(1).to({y:-28.9},0).wait(1).to({y:-30.95},0).wait(1).to({y:-33},0).wait(1).to({x:288.75,y:-35},0).wait(1).to({y:-37.05},0).wait(1).to({y:-39.1},0).wait(1).to({y:-41.15},0).wait(1).to({y:-43.2},0).wait(1).to({x:288.7,y:-45.25},0).wait(1).to({y:-47.3},0).wait(1).to({y:-49.3},0).wait(1).to({y:-51.35},0).wait(1).to({y:-53.4},0).wait(1).to({y:-55.45},0).wait(1).to({x:288.65,y:-57.5},0).wait(1).to({y:-59.55},0).wait(1).to({y:-61.6},0).wait(1).to({y:-63.65},0).wait(1).to({y:-65.65},0).wait(1).to({y:-67.7},0).wait(1).to({x:288.6,y:-69.75},0).wait(1).to({y:-71.8},0).wait(1).to({y:-73.85},0).wait(1).to({y:-75.9},0).wait(1).to({y:-77.95},0).wait(1).to({y:-80},0).wait(1).to({x:288.55,y:-82},0).wait(1).to({y:-84.05},0).wait(1).to({y:-86.1},0).wait(1).to({y:-88.15},0).wait(1).to({y:-90.2},0).wait(1).to({x:288.5,y:-92.25},0).wait(1).to({y:-94.3},0).wait(1).to({y:-96.3},0).wait(1).to({y:-98.35},0).wait(1).to({y:-100.4},0).wait(1).to({y:-102.45},0).wait(1).to({x:288.45,y:-104.5},0).wait(1).to({y:-106.55},0).wait(1).to({y:-108.6},0).wait(1).to({y:-110.65},0).wait(1).to({y:-112.65},0).wait(1).to({y:-114.7},0).wait(1).to({x:288.4,y:-116.75},0).wait(1).to({y:-118.8},0).wait(1).to({y:-120.85},0).wait(1).to({y:-122.9},0).wait(1).to({y:-124.95},0).wait(1).to({y:-127},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_grass_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// grass_1
	this.instance = new lib.grass_big("synched",0);
	this.instance.setTransform(218.05,292.05,1,1,0,0,0,235.1,291.1);

	this.instance_1 = new lib.Symbol2();
	this.instance_1.setTransform(290.7,253.1,1,1,0,0,0,305.8,253.1);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:300.8,scaleX:1.0001,scaleY:1.0001,skewX:-0.1245,x:283.8,startPosition:1},0).wait(1).to({scaleY:1.0003,skewX:-0.2489,y:292,startPosition:2},0).wait(1).to({scaleX:1.0002,scaleY:1.0004,skewX:-0.3734,startPosition:3},0).wait(1).to({scaleX:1.0003,scaleY:1.0005,skewX:-0.4978,x:283.85,y:292.05,startPosition:4},0).wait(1).to({scaleY:1.0006,skewX:-0.6223,x:283.8,y:292,startPosition:5},0).wait(1).to({scaleX:1.0004,scaleY:1.0007,skewX:-0.7467,y:292.05,startPosition:6},0).wait(1).to({scaleX:1.0005,scaleY:1.0009,skewX:-0.8712,x:283.85,y:292,startPosition:7},0).wait(1).to({scaleY:1.001,skewX:-0.9956,x:283.8,y:292.05,startPosition:8},0).wait(1).to({scaleX:1.0006,scaleY:1.0011,skewX:-1.1201,x:283.85,y:292,startPosition:9},0).wait(1).to({scaleX:1.0007,scaleY:1.0013,skewX:-1.2445,y:292.05,startPosition:10},0).wait(1).to({scaleY:1.0014,skewX:-1.369,x:283.8,y:292,startPosition:11},0).wait(1).to({scaleX:1.0008,scaleY:1.0015,skewX:-1.4935,x:283.85,y:292.05,startPosition:12},0).wait(1).to({scaleX:1.0009,scaleY:1.0016,skewX:-1.6179,startPosition:13},0).wait(1).to({scaleY:1.0017,skewX:-1.7424,y:292,startPosition:14},0).wait(1).to({scaleX:1.001,scaleY:1.0018,skewX:-1.8668,y:292.05,startPosition:15},0).wait(1).to({scaleX:1.0011,scaleY:1.002,skewX:-1.9913,startPosition:16},0).wait(1).to({scaleY:1.0021,skewX:-2.1157,y:292,startPosition:17},0).wait(1).to({scaleX:1.0012,scaleY:1.0022,skewX:-2.2402,startPosition:18},0).wait(1).to({scaleX:1.0013,scaleY:1.0024,skewX:-2.3646,x:283.9,y:292.05,startPosition:19},0).wait(1).to({scaleY:1.0025,skewX:-2.4891,x:283.85,startPosition:20},0).wait(1).to({scaleX:1.0014,scaleY:1.0026,skewX:-2.6135,startPosition:21},0).wait(1).to({scaleX:1.0015,scaleY:1.0027,skewX:-2.738,x:283.9,y:292,startPosition:22},0).wait(1).to({scaleY:1.0028,skewX:-2.8624,startPosition:23},0).wait(1).to({scaleX:1.0016,scaleY:1.003,skewX:-2.9869,startPosition:24},0).wait(1).to({scaleX:1.0017,scaleY:1.0031,skewX:-3.1114,startPosition:25},0).wait(1).to({scaleY:1.0032,skewX:-3.2358,startPosition:26},0).wait(1).to({scaleX:1.0018,scaleY:1.0033,skewX:-3.3603,startPosition:27},0).wait(1).to({scaleX:1.0019,scaleY:1.0034,skewX:-3.4847,startPosition:28},0).wait(1).to({scaleY:1.0036,skewX:-3.6092,x:283.95,startPosition:29},0).wait(1).to({scaleX:1.002,scaleY:1.0037,skewX:-3.7336,x:283.9,startPosition:30},0).wait(1).to({scaleX:1.0021,scaleY:1.0038,skewX:-3.8581,y:292.05,startPosition:31},0).wait(1).to({scaleY:1.004,skewX:-3.9825,x:283.95,startPosition:32},0).wait(1).to({scaleX:1.0022,scaleY:1.0041,skewX:-4.107,startPosition:33},0).wait(1).to({scaleX:1.0023,scaleY:1.0042,skewX:-4.2314,y:292,startPosition:34},0).wait(1).to({scaleY:1.0043,skewX:-4.3559,x:283.9,startPosition:35},0).wait(1).to({scaleX:1.0024,scaleY:1.0044,skewX:-4.4804,y:292.05,startPosition:36},0).wait(1).to({scaleX:1.0025,scaleY:1.0046,skewX:-4.6048,x:283.95,startPosition:37},0).wait(1).to({scaleY:1.0047,skewX:-4.7293,x:283.9,y:292,startPosition:38},0).wait(1).to({scaleX:1.0026,scaleY:1.0048,skewX:-4.8537,x:283.95,y:292.05,startPosition:39},0).wait(1).to({scaleX:1.0027,scaleY:1.0049,skewX:-4.9782,y:292,startPosition:40},0).wait(1).to({scaleY:1.0051,skewX:-5.1026,x:283.9,startPosition:41},0).wait(1).to({scaleX:1.0028,scaleY:1.0052,skewX:-5.2271,x:283.95,y:292.05,startPosition:42},0).wait(1).to({scaleX:1.0029,scaleY:1.0053,skewX:-5.3515,y:292,startPosition:43},0).wait(1).to({scaleY:1.0054,skewX:-5.476,x:284,y:292.05,startPosition:44},0).wait(1).to({scaleX:1.003,scaleY:1.0055,skewX:-5.6004,x:283.95,y:292,startPosition:45},0).wait(1).to({scaleX:1.0031,scaleY:1.0057,skewX:-5.7249,y:292.05,startPosition:46},0).wait(1).to({scaleY:1.0058,skewX:-5.8493,x:284,y:292,startPosition:47},0).wait(1).to({scaleX:1.0032,scaleY:1.0059,skewX:-5.9738,x:283.95,startPosition:48},0).wait(1).to({scaleX:1.0033,scaleY:1.006,skewX:-6.0983,x:284,y:292.05,startPosition:49},0).wait(1).to({scaleY:1.0061,skewX:-6.2227,y:292,startPosition:50},0).wait(1).to({scaleX:1.0034,scaleY:1.0063,skewX:-6.3472,y:292.05,startPosition:51},0).wait(1).to({scaleX:1.0035,scaleY:1.0064,skewX:-6.4716,startPosition:52},0).wait(1).to({scaleY:1.0063,skewX:-6.3145,y:292,startPosition:53},0).wait(1).to({scaleX:1.0036,skewX:-6.1574,y:292.05,startPosition:54},0).wait(1).to({scaleX:1.0037,skewX:-6.0002,y:292,startPosition:55},0).wait(1).to({scaleY:1.0062,skewX:-5.8431,y:292.05,startPosition:56},0).wait(1).to({scaleX:1.0038,skewX:-5.686,y:292,startPosition:57},0).wait(1).to({scaleX:1.0039,scaleY:1.0061,skewX:-5.5289,startPosition:58},0).wait(1).to({skewX:-5.3717,x:284.05,y:292.05,startPosition:59},0).wait(1).to({scaleX:1.004,skewX:-5.2146,x:284,startPosition:60},0).wait(1).to({scaleX:1.0041,scaleY:1.006,skewX:-5.0575,y:292,startPosition:61},0).wait(1).to({skewX:-4.9004,x:284.05,startPosition:62},0).wait(1).to({scaleX:1.0042,scaleY:1.0059,skewX:-4.7432,startPosition:63},0).wait(1).to({scaleX:1.0043,skewX:-4.5861,startPosition:64},0).wait(1).to({scaleY:1.0058,skewX:-4.429,startPosition:65},0).wait(1).to({scaleX:1.0044,skewX:-4.2719,startPosition:66},0).wait(1).to({scaleX:1.0045,skewX:-4.1147,startPosition:67},0).wait(1).to({scaleY:1.0057,skewX:-3.9576,y:292.05,startPosition:68},0).wait(1).to({scaleX:1.0046,skewX:-3.8005,x:284.1,startPosition:69},0).wait(1).to({scaleX:1.0047,scaleY:1.0056,skewX:-3.6433,y:292.1,startPosition:70},0).wait(1).to({skewX:-3.4862,x:284.05,startPosition:71},0).wait(1).to({scaleX:1.0048,scaleY:1.0055,skewX:-3.3291,x:284.1,y:292.05,startPosition:72},0).wait(1).to({scaleX:1.0049,skewX:-3.172,y:292.1,startPosition:73},0).wait(1).to({skewX:-3.0148,x:284.15,startPosition:74},0).wait(1).to({scaleX:1.005,scaleY:1.0054,skewX:-2.8577,x:284.1,y:292.05,startPosition:75},0).wait(1).to({scaleX:1.0051,scaleY:1.0053,skewX:-2.7006,y:292.1,startPosition:76},0).wait(1).to({skewX:-2.5435,x:284.15,y:292.05,startPosition:77},0).wait(1).to({scaleX:1.0052,skewX:-2.3863,x:284.1,y:292.1,startPosition:78},0).wait(1).to({scaleX:1.0053,skewX:-2.2292,x:284.15,y:292.05,startPosition:79},0).wait(1).to({scaleY:1.0052,skewX:-2.0721,startPosition:80},0).wait(1).to({scaleX:1.0054,skewX:-1.915,y:292.1,startPosition:81},0).wait(1).to({scaleY:1.0051,skewX:-1.7578,x:284.1,startPosition:82},0).wait(1).to({scaleX:1.0055,skewX:-1.6007,y:292.05,startPosition:83},0).wait(1).to({scaleX:1.0056,scaleY:1.005,skewX:-1.4436,x:284.15,startPosition:84},0).wait(1).to({skewX:-1.2865,startPosition:85},0).wait(1).to({scaleX:1.0057,scaleY:1.0049,skewX:-1.1293,x:284.1,y:292.1,startPosition:86},0).wait(1).to({scaleX:1.0058,skewX:-0.9722,x:284.15,startPosition:87},0).wait(1).to({scaleY:1.0048,skewX:-0.8151,startPosition:88},0).wait(1).to({scaleX:1.0059,skewX:-0.658,x:284.2,startPosition:89},0).wait(1).to({scaleX:1.006,skewX:-0.5008,x:284.15,y:292.05,startPosition:90},0).wait(1).to({scaleY:1.0047,skewX:-0.3437,startPosition:91},0).wait(1).to({scaleX:1.0061,skewX:-0.1866,x:284.2,startPosition:92},0).wait(1).to({scaleX:1.0062,scaleY:1.0046,rotation:-0.0294,skewX:0,x:284.15,y:292.1,startPosition:93},0).wait(1).to({rotation:0,skewX:0.1277,x:284.2,startPosition:94},0).wait(1).to({scaleX:1.0063,skewX:0.2848,y:292.05,startPosition:95},0).wait(1).to({scaleX:1.0064,scaleY:1.0045,skewX:0.4419,startPosition:96},0).wait(1).to({skewX:0.5991,y:292.1,startPosition:97},0).wait(1).to({scaleX:1.0065,scaleY:1.0044,skewX:0.7562,y:292.05,startPosition:98},0).wait(1).to({scaleX:1.0066,skewX:0.9133,x:284.25,y:292.1,startPosition:99},0).wait(1).to({scaleY:1.0043,skewX:1.0704,x:284.2,y:292.05,startPosition:100},0).wait(1).to({scaleX:1.0067,skewX:1.2276,y:292.1,startPosition:101},0).wait(1).to({scaleX:1.0068,skewX:1.3847,x:284.25,startPosition:102},0).wait(1).to({scaleY:1.0042,skewX:1.5418,y:292.05,startPosition:103},0).wait(1).to({scaleX:1.0069,skewX:1.6989,x:284.2,y:292.1,startPosition:104},0).wait(1).to({scaleX:1.007,scaleY:1.0041,skewX:1.8561,x:284.25,startPosition:105},0).wait(1).to({skewX:2.0132,y:292.05,startPosition:106},0).wait(1).to({scaleX:1.0071,scaleY:1.004,skewX:2.1703,startPosition:107},0).wait(1).to({scaleX:1.0072,skewX:2.3274,y:292,startPosition:108},0).wait(1).to({skewX:2.4846,x:284.3,startPosition:109},0).wait(1).to({scaleX:1.0073,scaleY:1.0039,skewX:2.6417,startPosition:110},0).wait(1).to({scaleX:1.0074,skewX:2.7988,x:284.25,startPosition:111},0).wait(1).to({scaleY:1.0038,skewX:2.956,x:284.3,startPosition:112},0).wait(1).to({scaleX:1.0075,skewX:3.1131,startPosition:113},0).wait(1).to({scaleX:1.0076,scaleY:1.0037,skewX:3.2702,startPosition:114},0).wait(1).to({skewX:3.4273,y:292.05,startPosition:115},0).wait(1).to({scaleX:1.0077,scaleY:1.0036,skewX:3.5845,startPosition:116},0).wait(1).to({scaleX:1.0078,skewX:3.7416,x:284.25,y:292,startPosition:117},0).wait(1).to({skewX:3.8987,startPosition:118},0).wait(1).to({scaleX:1.0079,scaleY:1.0035,skewX:4.0558,x:284.3,y:292.05,startPosition:119},0).wait(1).to({scaleX:1.008,skewX:4.213,x:284.25,y:292,startPosition:120},0).wait(1).to({scaleY:1.0034,skewX:4.3701,y:292.05,startPosition:121},0).wait(1).to({scaleX:1.0081,skewX:4.5272,y:292,startPosition:122},0).wait(1).to({scaleX:1.0082,skewX:4.6843,y:292.05,startPosition:123},0).wait(1).to({scaleY:1.0033,skewX:4.5619,startPosition:124},0).wait(1).to({scaleX:1.0083,skewX:4.4395,x:284.3,startPosition:125},0).wait(1).to({scaleX:1.0084,skewX:4.317,x:284.25,startPosition:126},0).wait(1).to({skewX:4.1946,x:284.3,y:292,startPosition:127},0).wait(1).to({scaleX:1.0085,skewX:4.0722,x:284.25,startPosition:128},0).wait(1).to({scaleX:1.0086,skewX:3.9497,x:284.3,y:292.05,startPosition:129},0).wait(1).to({scaleY:1.0032,skewX:3.8273,startPosition:130},0).wait(1).to({scaleX:1.0087,skewX:3.7049,x:284.35,y:292,startPosition:131},0).wait(1).to({scaleX:1.0088,skewX:3.5824,startPosition:132},0).wait(1).to({skewX:3.46,y:292.05,startPosition:133},0).wait(1).to({scaleX:1.0089,skewX:3.3376,x:284.4,y:292,startPosition:134},0).wait(1).to({scaleX:1.009,skewX:3.2151,x:284.35,startPosition:135},0).wait(1).to({scaleY:1.0031,skewX:3.0927,y:292.05,startPosition:136},0).wait(1).to({scaleX:1.0091,skewX:2.9703,y:292,startPosition:137},0).wait(1).to({scaleX:1.0092,skewX:2.8478,x:284.4,y:292.05,startPosition:138},0).wait(1).to({skewX:2.7254,y:292,startPosition:139},0).wait(1).to({scaleX:1.0093,skewX:2.603,y:292.05,startPosition:140},0).wait(1).to({scaleX:1.0094,scaleY:1.003,skewX:2.4805,x:284.35,y:292,startPosition:141},0).wait(1).to({skewX:2.3581,x:284.4,y:292.05,startPosition:142},0).wait(1).to({scaleX:1.0095,skewX:2.2357,y:292,startPosition:143},0).wait(1).to({scaleX:1.0096,skewX:2.1132,x:284.45,startPosition:144},0).wait(1).to({skewX:1.9908,x:284.4,y:292.05,startPosition:0},0).wait(1).to({scaleX:1.0097,skewX:1.8684,y:292,startPosition:1},0).wait(1).to({scaleX:1.0098,scaleY:1.0029,skewX:1.746,startPosition:2},0).wait(1).to({skewX:1.6235,x:284.45,y:292.05,startPosition:3},0).wait(1).to({scaleX:1.0099,skewX:1.5011,x:284.4,startPosition:4},0).wait(1).to({scaleX:1.01,skewX:1.3787,x:284.45,y:292,startPosition:5},0).wait(1).to({skewX:1.2562,x:284.4,startPosition:6},0).wait(1).to({scaleX:1.0101,skewX:1.1338,x:284.5,startPosition:7},0).wait(1).to({scaleX:1.0102,scaleY:1.0028,skewX:1.0114,x:284.45,y:292.05,startPosition:8},0).wait(1).to({skewX:0.8889,startPosition:9},0).wait(1).to({scaleX:1.0103,skewX:0.7665,startPosition:10},0).wait(1).to({scaleX:1.0104,skewX:0.6441,x:284.4,startPosition:11},0).wait(1).to({skewX:0.5216,x:284.5,startPosition:12},0).wait(1).to({scaleX:1.0105,skewX:0.3992,x:284.45,startPosition:13},0).wait(1).to({scaleX:1.0106,scaleY:1.0027,skewX:0.2768,x:284.5,startPosition:14},0).wait(1).to({skewX:0.1543,x:284.45,startPosition:15},0).wait(1).to({scaleX:1.0107,rotation:0.0319,skewX:0,startPosition:16},0).wait(1).to({scaleX:1.0108,rotation:0,skewX:-0.0905,x:284.5,startPosition:17},0).wait(1).to({skewX:-0.213,y:292,startPosition:18},0).wait(1).to({scaleX:1.0109,skewX:-0.3354,startPosition:19},0).wait(1).to({scaleX:1.011,skewX:-0.4578,startPosition:20},0).wait(1).to({scaleY:1.0026,skewX:-0.5803,y:292.05,startPosition:21},0).wait(1).to({scaleX:1.0111,skewX:-0.7027,x:284.55,startPosition:22},0).wait(1).to({scaleX:1.0112,skewX:-0.8251,x:284.5,y:292,startPosition:23},0).wait(1).to({skewX:-0.9476,startPosition:24},0).wait(1).to({scaleX:1.0113,skewX:-1.07,y:292.05,startPosition:25},0).wait(1).to({scaleX:1.0114,scaleY:1.0025,skewX:-1.1924,y:292,startPosition:26},0).wait(1).to({skewX:-1.3149,x:284.55,startPosition:27},0).wait(1).to({scaleX:1.0115,skewX:-1.4373,x:284.5,y:292.05,startPosition:28},0).wait(1).to({scaleX:1.0116,skewX:-1.5597,y:292,startPosition:29},0).wait(1).to({skewX:-1.6822,x:284.55,y:292.05,startPosition:30},0).wait(1).to({scaleX:1.0117,scaleY:1.0024,skewX:-1.8046,y:292,startPosition:31},0).wait(1).to({scaleX:1.0118,skewX:-1.927,y:292.05,startPosition:32},0).wait(1).to({skewX:-2.0495,y:292,startPosition:33},0).wait(1).to({scaleX:1.0119,skewX:-2.1719,y:292.05,startPosition:34},0).wait(1).to({scaleX:1.012,skewX:-2.2943,x:284.6,y:292,startPosition:35},0).wait(1).to({skewX:-2.4168,x:284.55,y:292.05,startPosition:36},0).wait(1).to({scaleX:1.0121,scaleY:1.0023,skewX:-2.5392,x:284.6,startPosition:37},0).wait(1).to({scaleX:1.0122,skewX:-2.6616,x:284.55,y:292,startPosition:38},0).wait(1).to({skewX:-2.7841,x:284.6,startPosition:39},0).wait(1).to({scaleX:1.0123,skewX:-2.9065,y:292.05,startPosition:40},0).wait(1).to({scaleX:1.0124,skewX:-3.0289,x:284.55,y:292,startPosition:41},0).wait(1).to({skewX:-3.1514,x:284.6,startPosition:42},0).wait(1).to({scaleX:1.0125,skewX:-3.2738,startPosition:43},0).wait(1).to({scaleX:1.0126,scaleY:1.0022,skewX:-3.3962,x:284.65,y:292.05,startPosition:44},0).wait(1).to({skewX:-3.5187,x:284.6,startPosition:45},0).wait(1).to({scaleX:1.0127,skewX:-3.6411,startPosition:46},0).wait(1).to({scaleX:1.0128,skewX:-3.7635,x:284.65,y:292,startPosition:47},0).to({_off:true},1).wait(527).to({_off:false,regX:233.8,regY:291.2,scaleX:0.9864,scaleY:0.4985,skewX:0,x:218.3,y:362.05,startPosition:0},0).wait(1).to({regX:300.8,regY:291.1,scaleY:0.4987,skewX:0.2846,x:284.35,y:362,startPosition:1},0).wait(1).to({scaleY:0.4989,skewX:0.5692,x:284.25,startPosition:2},0).wait(1).to({scaleY:0.4991,skewX:0.8538,x:284.2,startPosition:3},0).wait(1).to({scaleY:0.4993,skewX:1.1384,x:284.15,startPosition:4},0).wait(1).to({scaleY:0.4996,skewX:1.423,x:284.1,y:361.95,startPosition:5},0).wait(1).to({scaleY:0.4998,skewX:1.7076,x:284,y:362,startPosition:6},0).wait(1).to({scaleY:0.5,skewX:1.9922,startPosition:7},0).wait(1).to({scaleY:0.5002,skewX:2.2768,x:283.9,startPosition:8},0).wait(1).to({scaleY:0.5004,skewX:2.5614,x:283.85,startPosition:9},0).wait(1).to({scaleY:0.5006,skewX:2.8461,x:283.8,startPosition:10},0).wait(1).to({scaleY:0.5008,skewX:3.1307,x:283.75,startPosition:11},0).wait(1).to({scaleY:0.501,skewX:3.4153,x:283.65,startPosition:12},0).wait(1).to({scaleY:0.5012,skewX:3.6999,startPosition:13},0).wait(1).to({scaleY:0.5014,skewX:3.9845,x:283.55,startPosition:14},0).wait(1).to({scaleY:0.5016,skewX:4.2691,x:283.5,startPosition:15},0).wait(1).to({scaleY:0.5018,skewX:4.5537,x:283.45,startPosition:16},0).wait(1).to({scaleY:0.502,skewX:4.8383,x:283.4,startPosition:17},0).wait(1).to({scaleY:0.5022,skewX:5.1229,x:283.35,startPosition:18},0).wait(1).to({scaleY:0.5024,skewX:5.4075,x:283.2,startPosition:19},0).wait(1).to({scaleY:0.5026,skewX:5.6921,x:283.15,startPosition:20},0).wait(1).to({scaleY:0.5028,skewX:5.9767,x:283.1,startPosition:21},0).wait(1).to({scaleY:0.503,skewX:6.2613,x:283.05,startPosition:22},0).wait(1).to({scaleY:0.5032,skewX:6.5459,x:283,startPosition:23},0).wait(1).to({scaleY:0.5035,skewX:6.8305,x:282.9,startPosition:24},0).wait(1).to({scaleY:0.5036,skewX:7.1151,x:282.85,startPosition:25},0).wait(1).to({scaleY:0.5039,skewX:7.3997,x:282.8,startPosition:26},0).wait(1).to({scaleY:0.5041,skewX:7.6843,x:282.75,startPosition:27},0).wait(1).to({scaleY:0.5043,skewX:7.969,x:282.7,y:361.95,startPosition:28},0).wait(1).to({scaleY:0.5045,skewX:8.2536,x:282.6,y:362,startPosition:29},0).wait(1).to({scaleY:0.5047,skewX:8.5382,startPosition:30},0).wait(1).to({scaleY:0.5049,skewX:8.8228,x:282.5,startPosition:31},0).wait(1).to({scaleY:0.5051,skewX:9.1074,startPosition:32},0).wait(1).to({scaleY:0.5053,skewX:9.392,x:282.4,y:361.95,startPosition:33},0).wait(1).to({scaleY:0.5052,skewX:8.9764,x:282.35,y:362,startPosition:34},0).wait(1).to({scaleY:0.5051,skewX:8.5609,x:282.25,startPosition:35},0).wait(1).to({scaleY:0.505,skewX:8.1453,x:282.2,y:361.95,startPosition:36},0).wait(1).to({scaleY:0.5049,skewX:7.7298,y:362,startPosition:37},0).wait(1).to({scaleY:0.5048,skewX:7.3142,x:282.1,startPosition:38},0).wait(1).to({scaleY:0.5047,skewX:6.8987,x:282.05,startPosition:39},0).wait(1).to({scaleY:0.5046,skewX:6.4831,x:281.95,startPosition:40},0).wait(1).to({scaleY:0.5045,skewX:6.0675,startPosition:41},0).wait(1).to({scaleY:0.5044,skewX:5.652,x:281.9,y:361.95,startPosition:42},0).wait(1).to({scaleY:0.5043,skewX:5.2364,x:281.85,y:362,startPosition:43},0).wait(1).to({scaleY:0.5042,skewX:4.8209,x:281.8,startPosition:44},0).wait(1).to({scaleY:0.5041,skewX:4.4053,x:281.75,y:361.95,startPosition:45},0).wait(1).to({skewX:3.9898,x:281.7,startPosition:46},0).wait(1).to({scaleY:0.5039,skewX:3.5742,x:281.6,y:362,startPosition:47},0).wait(1).to({skewX:3.1587,x:281.55,startPosition:48},0).wait(1).to({scaleY:0.5038,skewX:2.7431,x:281.5,y:361.95,startPosition:49},0).wait(1).to({scaleY:0.5037,skewX:2.3275,x:281.45,y:362,startPosition:50},0).wait(1).to({scaleY:0.5036,skewX:1.912,x:281.35,startPosition:51},0).wait(1).to({scaleY:0.5035,skewX:1.4964,startPosition:52},0).wait(1).to({scaleY:0.5034,skewX:1.0809,x:281.25,startPosition:53},0).wait(1).to({scaleY:0.5033,skewX:0.6653,x:281.2,startPosition:54},0).wait(1).to({scaleY:0.5032,skewX:0.2498,x:281.15,y:361.95,startPosition:55},0).wait(1).to({scaleY:0.5031,skewX:-0.1658,x:281.05,y:362,startPosition:56},0).wait(1).to({scaleY:0.503,skewX:-0.5813,startPosition:57},0).wait(1).to({scaleY:0.5029,skewX:-0.9969,x:280.95,startPosition:58},0).wait(1).to({scaleY:0.5028,skewX:-1.4124,x:280.9,startPosition:59},0).wait(1).to({scaleY:0.5027,skewX:-1.828,x:280.85,startPosition:60},0).wait(1).to({scaleY:0.5026,skewX:-2.2436,x:280.8,startPosition:61},0).wait(1).to({scaleY:0.5025,skewX:-2.6591,x:280.75,y:361.95,startPosition:62},0).wait(1).to({scaleY:0.5024,skewX:-3.0747,x:280.65,y:362,startPosition:63},0).wait(1).to({scaleY:0.5023,skewX:-3.4902,x:280.6,startPosition:64},0).wait(1).to({scaleY:0.5022,skewX:-3.9058,x:280.55,startPosition:65},0).wait(1).to({scaleY:0.5021,skewX:-4.3213,x:280.45,startPosition:66},0).wait(1).to({scaleY:0.502,skewX:-4.7369,x:280.4,startPosition:67},0).wait(1).to({scaleY:0.5019,skewX:-5.1524,x:280.35,y:361.95,startPosition:68},0).wait(1).to({scaleY:0.5018,skewX:-5.568,x:280.3,y:362,startPosition:69},0).wait(1).to({scaleY:0.5017,skewX:-5.9836,x:280.2,startPosition:70},0).wait(1).to({scaleY:0.5016,skewX:-6.3991,x:280.15,startPosition:71},0).wait(1).to({scaleY:0.5018,skewX:-5.9886,startPosition:72},0).wait(1).to({scaleY:0.502,skewX:-5.5782,x:280.05,startPosition:73},0).wait(1).to({scaleY:0.5022,skewX:-5.1677,x:280,startPosition:74},0).wait(1).to({scaleY:0.5024,skewX:-4.7572,startPosition:75},0).wait(1).to({scaleY:0.5026,skewX:-4.3468,x:279.9,startPosition:76},0).wait(1).to({scaleY:0.5028,skewX:-3.9363,x:279.85,y:361.95,startPosition:77},0).wait(1).to({scaleY:0.503,skewX:-3.5258,x:279.8,y:362,startPosition:78},0).wait(1).to({scaleY:0.5032,skewX:-3.1154,x:279.7,startPosition:79},0).wait(1).to({scaleY:0.5034,skewX:-2.7049,x:279.65,y:361.95,startPosition:80},0).wait(1).to({scaleY:0.5036,skewX:-2.2944,x:279.6,startPosition:81},0).wait(1).to({scaleY:0.5038,skewX:-1.8839,x:279.55,y:362,startPosition:82},0).wait(1).to({scaleY:0.504,skewX:-1.4735,x:279.45,startPosition:83},0).wait(1).to({scaleY:0.5042,skewX:-1.063,x:279.4,startPosition:84},0).wait(1).to({scaleY:0.5044,skewX:-0.6525,x:279.35,startPosition:85},0).wait(1).to({scaleY:0.5046,skewX:-0.2421,x:279.3,y:361.95,startPosition:86},0).wait(1).to({scaleY:0.5047,skewX:0.1684,x:279.25,y:362,startPosition:87},0).wait(1).to({scaleY:0.5049,skewX:0.5789,x:279.2,startPosition:88},0).wait(1).to({scaleY:0.5051,skewX:0.9893,x:279.15,y:361.95,startPosition:89},0).wait(1).to({scaleY:0.5053,skewX:1.3998,x:279.1,y:362,startPosition:90},0).wait(1).to({scaleY:0.5055,skewX:1.8103,x:279,startPosition:91},0).wait(1).to({scaleY:0.5057,skewX:2.2208,x:278.95,startPosition:92},0).wait(1).to({scaleY:0.5059,skewX:2.6312,x:278.9,startPosition:93},0).wait(1).to({scaleY:0.5061,skewX:3.0417,x:278.85,startPosition:94},0).wait(1).to({scaleY:0.5063,skewX:3.4522,x:278.8,startPosition:95},0).wait(1).to({scaleY:0.5065,skewX:3.8626,x:278.7,startPosition:96},0).wait(1).to({scaleY:0.5067,skewX:4.2731,x:278.65,startPosition:97},0).wait(1).to({scaleY:0.5069,skewX:4.6836,x:278.6,startPosition:98},0).wait(1).to({scaleY:0.5071,skewX:5.094,x:278.55,y:361.95,startPosition:99},0).wait(1).to({scaleY:0.5073,skewX:5.5045,x:278.5,y:362,startPosition:100},0).wait(1).to({scaleY:0.5075,skewX:5.915,x:278.45,startPosition:101},0).wait(1).to({scaleY:0.5076,skewX:6.3255,x:278.35,y:361.95,startPosition:102},0).wait(1).to({scaleY:0.5079,skewX:6.7359,x:278.3,y:362,startPosition:103},0).wait(1).to({scaleY:0.508,skewX:7.1464,x:278.25,startPosition:104},0).wait(1).to({scaleY:0.5082,skewX:7.5569,x:278.15,startPosition:105},0).wait(1).to({scaleY:0.5084,skewX:7.9673,x:278.1,y:361.95,startPosition:106},0).wait(1).to({scaleY:0.5086,skewX:8.3778,x:278.05,y:362,startPosition:107},0).wait(1).to({scaleY:0.5088,skewX:8.7883,x:277.95,startPosition:108},0).wait(1).to({scaleY:0.509,skewX:9.1987,x:277.9,startPosition:109},0).wait(1).to({scaleY:0.5092,skewX:9.6092,x:277.85,startPosition:110},0).wait(1).to({scaleY:0.5094,skewX:10.0197,x:277.8,y:361.95,startPosition:111},0).wait(1).to({scaleY:0.5096,skewX:10.4302,x:277.75,y:362,startPosition:112},0).wait(1).to({scaleY:0.5098,skewX:10.8406,x:277.7,startPosition:113},0).wait(1).to({scaleY:0.51,skewX:11.2511,x:277.65,startPosition:114},0).wait(1).to({scaleY:0.5102,skewX:11.6616,x:277.6,startPosition:115},0).wait(1).to({scaleY:0.5104,skewX:12.072,x:277.55,startPosition:116},0).wait(1).to({scaleY:0.5106,skewX:12.4825,x:277.5,startPosition:117},0).wait(1).to({scaleY:0.5104,skewX:12.15,x:277.4,startPosition:118},0).wait(1).to({scaleY:0.5102,skewX:11.8175,x:277.35,startPosition:119},0).wait(1).to({scaleY:0.5099,skewX:11.485,x:277.3,y:361.95,startPosition:120},0).wait(1).to({scaleY:0.5097,skewX:11.1524,x:277.2,y:362,startPosition:121},0).wait(1).to({scaleY:0.5095,skewX:10.8199,x:277.15,startPosition:122},0).wait(1).to({scaleY:0.5093,skewX:10.4874,x:277.1,startPosition:123},0).wait(1).to({scaleY:0.5091,skewX:10.1549,x:277,startPosition:124},0).wait(1).to({scaleY:0.5089,skewX:9.8224,y:361.95,startPosition:125},0).wait(1).to({scaleY:0.5087,skewX:9.4899,x:276.95,y:362,startPosition:126},0).wait(1).to({scaleY:0.5085,skewX:9.1573,x:276.85,startPosition:127},0).wait(1).to({scaleY:0.5083,skewX:8.8248,x:276.8,startPosition:128},0).wait(1).to({scaleY:0.5081,skewX:8.4923,x:276.75,startPosition:129},0).wait(1).to({scaleY:0.5079,skewX:8.1598,x:276.65,startPosition:130},0).wait(1).to({scaleY:0.5077,skewX:7.8273,startPosition:131},0).wait(1).to({scaleY:0.5075,skewX:7.4948,startPosition:132},0).wait(1).to({scaleY:0.5072,skewX:7.1622,x:276.55,startPosition:133},0).wait(1).to({scaleY:0.5071,skewX:6.8297,x:276.5,startPosition:134},0).wait(1).to({scaleY:0.5068,skewX:6.4972,x:276.45,startPosition:135},0).wait(1).to({scaleY:0.5066,skewX:6.1647,x:276.35,y:361.95,startPosition:136},0).wait(1).to({scaleY:0.5064,skewX:5.8322,x:276.3,y:362,startPosition:137},0).wait(1).to({scaleY:0.5062,skewX:5.4997,startPosition:138},0).wait(1).to({scaleY:0.506,skewX:5.1671,x:276.2,startPosition:139},0).wait(1).to({scaleY:0.5058,skewX:4.8346,x:276.15,startPosition:140},0).wait(1).to({scaleY:0.5056,skewX:4.5021,x:276.1,y:361.95,startPosition:141},0).wait(1).to({scaleY:0.5054,skewX:4.1696,x:276,y:362,startPosition:142},0).wait(1).to({scaleY:0.5052,skewX:3.8371,x:275.95,y:361.95,startPosition:143},0).wait(1).to({scaleY:0.505,skewX:3.5046,x:275.9,startPosition:144},0).wait(1).to({scaleY:0.5048,skewX:3.172,x:275.85,y:362,startPosition:0},0).wait(1).to({scaleY:0.5046,skewX:2.8395,x:275.75,startPosition:1},0).wait(1).to({scaleY:0.5044,skewX:2.507,y:361.95,startPosition:2},0).wait(1).to({scaleY:0.5042,skewX:2.1745,x:275.7,y:362,startPosition:3},0).wait(1).to({scaleY:0.5039,skewX:1.842,x:275.65,y:361.95,startPosition:4},0).wait(1).to({scaleY:0.5037,skewX:1.5095,x:275.55,y:362,startPosition:5},0).wait(1).to({scaleY:0.5035,skewX:1.1769,x:275.5,startPosition:6},0).wait(1).to({scaleY:0.5033,skewX:0.8444,x:275.45,startPosition:7},0).wait(1).to({scaleY:0.5031,skewX:0.5119,x:275.4,startPosition:8},0).wait(1).to({scaleY:0.5029,skewX:0.1794,x:275.3,startPosition:9},0).wait(1).to({scaleY:0.5027,skewX:-0.1531,x:275.25,startPosition:10},0).wait(1).to({scaleY:0.5025,skewX:-0.4856,x:275.2,startPosition:11},0).wait(1).to({scaleY:0.5023,skewX:-0.8182,x:275.15,startPosition:12},0).wait(1).to({scaleY:0.5021,skewX:-1.1507,x:275.1,y:361.95,startPosition:13},0).wait(1).to({scaleY:0.5019,skewX:-1.4832,x:275.05,y:362,startPosition:14},0).wait(1).to({scaleY:0.5017,skewX:-1.8157,x:274.95,startPosition:15},0).wait(1).to({scaleY:0.5015,skewX:-2.1482,x:274.9,y:361.95,startPosition:16},0).wait(1).to({scaleY:0.5012,skewX:-2.4807,x:274.85,startPosition:17},0).wait(1).to({scaleY:0.501,skewX:-2.8133,x:274.75,startPosition:18},0).wait(1).to({scaleY:0.5008,skewX:-3.1458,x:274.7,startPosition:19},0).wait(1).to({scaleY:0.5006,skewX:-3.4783,x:274.65,y:362,startPosition:20},0).wait(1).to({scaleY:0.5004,skewX:-3.8108,x:274.6,startPosition:21},0).wait(1).to({scaleY:0.5002,skewX:-4.1433,x:274.55,startPosition:22},0).wait(1).to({scaleY:0.5,skewX:-4.4758,x:274.5,startPosition:23},0).wait(1).to({scaleY:0.5002,skewX:-4.155,x:274.45,y:361.95,startPosition:24},0).wait(1).to({scaleY:0.5004,skewX:-3.8342,x:274.4,y:362,startPosition:25},0).wait(1).to({scaleY:0.5005,skewX:-3.5133,startPosition:26},0).wait(1).to({scaleY:0.5007,skewX:-3.1925,x:274.35,startPosition:27},0).wait(1).to({scaleY:0.5009,skewX:-2.8717,startPosition:28},0).wait(1).to({scaleY:0.5011,skewX:-2.5508,x:274.4,y:361.95,startPosition:29},0).wait(1).to({scaleY:0.5013,skewX:-2.23,y:362,startPosition:30},0).wait(1).to({scaleY:0.5015,skewX:-1.9091,x:274.35,startPosition:31},0).wait(1).to({scaleY:0.5017,skewX:-1.5883,x:274.4,startPosition:32},0).wait(1).to({scaleY:0.5019,skewX:-1.2675,startPosition:33},0).wait(1).to({scaleY:0.502,skewX:-0.9466,x:274.35,y:361.95,startPosition:34},0).wait(1).to({scaleY:0.5022,skewX:-0.6258,x:274.4,y:362,startPosition:35},0).wait(1).to({scaleY:0.5024,skewX:-0.305,startPosition:36},0).wait(1).to({scaleY:0.5026,rotation:0.0159,skewX:0,x:274.35,startPosition:37},0).wait(1).to({scaleY:0.5028,rotation:0,skewX:0.3367,x:274.4,startPosition:38},0).wait(1).to({scaleY:0.503,skewX:0.6576,x:274.35,startPosition:39},0).wait(1).to({scaleY:0.5031,skewX:0.9784,x:274.4,startPosition:40},0).wait(1).to({scaleY:0.5033,skewX:1.2992,y:361.95,startPosition:41},0).wait(1).to({scaleY:0.5035,skewX:1.6201,x:274.35,y:362,startPosition:42},0).wait(1).to({scaleY:0.5037,skewX:1.9409,x:274.4,startPosition:43},0).wait(1).to({scaleY:0.5039,skewX:2.2618,x:274.35,startPosition:44},0).wait(1).to({scaleY:0.5041,skewX:2.5826,x:274.4,startPosition:45},0).wait(1).to({scaleY:0.5042,skewX:2.9034,x:274.35,startPosition:46},0).wait(1).to({scaleY:0.5044,skewX:3.2243,x:274.4,startPosition:47},0).wait(1).to({scaleY:0.5046,skewX:3.5451,x:274.35,startPosition:48},0).wait(1).to({scaleY:0.5048,skewX:3.8659,x:274.4,startPosition:49},0).wait(1).to({scaleY:0.505,skewX:4.1868,x:274.35,startPosition:50},0).wait(1).to({scaleY:0.5052,skewX:4.5076,x:274.4,startPosition:51},0).wait(1).to({scaleY:0.5054,skewX:4.8285,x:274.35,startPosition:52},0).wait(1).to({scaleY:0.5055,skewX:5.1493,x:274.4,startPosition:53},0).wait(1).to({scaleY:0.5057,skewX:5.4701,x:274.35,startPosition:54},0).wait(1).to({scaleY:0.5059,skewX:5.791,x:274.4,startPosition:55},0).wait(1).to({scaleY:0.5061,skewX:6.1118,x:274.35,startPosition:56},0).wait(1).to({scaleY:0.5063,skewX:6.4327,x:274.4,startPosition:57},0).wait(1).to({scaleY:0.5065,skewX:6.7535,x:274.35,startPosition:58},0).wait(1).to({scaleY:0.5066,skewX:7.0743,x:274.4,startPosition:59},0).wait(1).to({scaleY:0.5068,skewX:7.3952,x:274.35,startPosition:60},0).wait(1).to({scaleY:0.507,skewX:7.716,x:274.4,startPosition:61},0).wait(1).to({scaleY:0.5072,skewX:8.0368,startPosition:62},0).wait(1).to({scaleY:0.5074,skewX:8.3577,y:361.95,startPosition:63},0).wait(1).to({scaleY:0.5076,skewX:8.6785,y:362,startPosition:64},0).wait(1).to({scaleY:0.5077,skewX:8.9994,x:274.35,startPosition:65},0).wait(1).to({scaleY:0.5079,skewX:9.3202,startPosition:66},0).wait(1).to({scaleY:0.5081,skewX:9.641,y:361.95,startPosition:67},0).wait(1).to({scaleY:0.5083,skewX:9.9619,y:362,startPosition:68},0).wait(1).to({scaleY:0.5085,skewX:10.2827,startPosition:69},0).wait(1).to({scaleY:0.5087,skewX:10.6035,startPosition:70},0).wait(1).to({scaleY:0.5089,skewX:10.9244,startPosition:71},0).wait(1).to({scaleY:0.509,skewX:11.2452,startPosition:72},0).wait(1).to({scaleY:0.5092,skewX:11.5661,y:361.95,startPosition:73},0).wait(1).to({scaleY:0.5094,skewX:11.8869,y:362,startPosition:74},0).wait(1).to({skewX:11.4068,startPosition:75},0).wait(1).to({skewX:10.9268,startPosition:76},0).wait(1).to({skewX:10.4467,startPosition:77},0).wait(1).to({skewX:9.9667,startPosition:78},0).wait(1).to({scaleY:0.5095,skewX:9.4866,y:361.95,startPosition:79},0).wait(1).to({scaleY:0.5094,skewX:9.0065,startPosition:80},0).wait(1).to({scaleY:0.5095,skewX:8.5265,y:362,startPosition:81},0).wait(1).to({skewX:8.0464,x:274.4,startPosition:82},0).wait(1).to({skewX:7.5664,x:274.35,startPosition:83},0).wait(1).to({skewX:7.0863,x:274.4,startPosition:84},0).wait(1).to({skewX:6.6062,startPosition:85},0).wait(1).to({skewX:6.1262,x:274.35,y:361.95,startPosition:86},0).wait(1).to({skewX:5.6461,y:362,startPosition:87},0).wait(1).to({skewX:5.1661,x:274.4,y:361.95,startPosition:88},0).wait(1).to({skewX:4.686,startPosition:89},0).wait(1).to({skewX:4.2059,x:274.35,y:362,startPosition:90},0).wait(1).to({skewX:3.7259,startPosition:91},0).wait(1).to({scaleY:0.5096,skewX:3.2458,x:274.4,startPosition:92},0).wait(1).to({skewX:2.7658,startPosition:93},0).wait(1).to({skewX:2.2857,y:361.95,startPosition:94},0).wait(1).to({skewX:1.8056,y:362,startPosition:95},0).wait(1).to({skewX:1.3256,x:274.35,startPosition:96},0).wait(1).to({skewX:0.8455,startPosition:97},0).wait(1).to({skewX:0.3655,startPosition:98},0).wait(1).to({skewX:-0.1146,x:274.4,startPosition:99},0).wait(1).to({skewX:-0.5947,startPosition:100},0).wait(1).to({skewX:-1.0747,startPosition:101},0).wait(1).to({skewX:-1.5548,x:274.35,startPosition:102},0).wait(1).to({scaleY:0.5097,skewX:-2.0348,startPosition:103},0).wait(1).to({skewX:-2.5149,y:361.95,startPosition:104},0).wait(1).to({skewX:-2.995,y:362,startPosition:105},0).wait(1).to({skewX:-3.475,x:274.4,startPosition:106},0).wait(1).to({skewX:-3.9551,startPosition:107},0).wait(1).to({skewX:-4.4351,x:274.35,startPosition:108},0).wait(1).to({skewX:-4.9152,y:361.95,startPosition:109},0).wait(1).to({skewX:-5.3953,startPosition:110},0).wait(1).to({skewX:-5.8753,x:274.4,y:362,startPosition:111},0).wait(1).to({skewX:-6.3554,x:274.35,y:361.95,startPosition:112},0).wait(1).to({skewX:-6.8354,y:362,startPosition:113},0).wait(1).to({scaleY:0.5098,skewX:-7.3155,startPosition:114},0).wait(1).to({skewX:-7.7956,x:274.4,startPosition:115},0).wait(1).to({skewX:-8.2756,x:274.35,startPosition:116},0).wait(1).to({skewX:-8.7557,startPosition:117},0).wait(1).to({skewX:-9.2357,y:361.95,startPosition:118},0).wait(1).to({skewX:-9.7158,startPosition:119},0).wait(1).to({skewX:-10.1959,y:362,startPosition:120},0).wait(1).to({skewX:-10.6759,startPosition:121},0).wait(1).to({skewX:-11.156,startPosition:122},0).wait(1).to({skewX:-11.636,x:274.4,startPosition:123},0).wait(1).to({skewX:-12.1161,x:274.35,startPosition:124},0).wait(1).to({skewX:-11.6558,x:274.4,startPosition:125},0).wait(1).to({skewX:-11.1955,x:274.35,startPosition:126},0).wait(1).to({skewX:-10.7352,startPosition:127},0).wait(1).to({skewX:-10.2749,startPosition:128},0).wait(1).to({skewX:-9.8146,y:361.95,startPosition:129},0).wait(1).to({skewX:-9.3543,y:362,startPosition:130},0).wait(1).to({scaleY:0.5097,skewX:-8.8941,startPosition:131},0).wait(1).to({scaleY:0.5098,skewX:-8.4338,startPosition:132},0).wait(1).to({scaleY:0.5097,skewX:-7.9735,x:274.4,startPosition:133},0).wait(1).to({skewX:-7.5132,x:274.35,startPosition:134},0).wait(1).to({skewX:-7.0529,startPosition:135},0).wait(1).to({skewX:-6.5926,x:274.4,startPosition:136},0).wait(1).to({skewX:-6.1323,x:274.35,y:361.95,startPosition:137},0).wait(1).to({skewX:-5.672,y:362,startPosition:138},0).wait(1).to({skewX:-5.2117,x:274.4,startPosition:139},0).wait(1).to({skewX:-4.7514,startPosition:140},0).wait(1).to({scaleY:0.5096,skewX:-4.2911,x:274.35,startPosition:141},0).wait(1).to({skewX:-3.8308,y:361.95,startPosition:142},0).wait(1).to({skewX:-3.3705,y:362,startPosition:143},0).wait(1).to({skewX:-2.9103,x:274.4,startPosition:144},0).wait(1).to({skewX:-2.45,startPosition:0},0).wait(1).to({skewX:-1.9897,x:274.35,startPosition:1},0).wait(1).to({skewX:-1.5294,startPosition:2},0).wait(1).to({skewX:-1.0691,startPosition:3},0).wait(1).to({skewX:-0.6088,y:361.95,startPosition:4},0).wait(1).to({skewX:-0.1485,x:274.4,y:362,startPosition:5},0).wait(1).to({scaleY:0.5095,skewX:0.3118,y:361.95,startPosition:6},0).wait(1).to({skewX:0.7721,x:274.35,y:362,startPosition:7},0).wait(1).to({skewX:1.2324,startPosition:8},0).wait(1).to({skewX:1.6927,startPosition:9},0).wait(1).to({skewX:2.153,x:274.4,startPosition:10},0).wait(1).to({skewX:2.6133,startPosition:11},0).wait(1).to({skewX:3.0735,startPosition:12},0).wait(1).to({skewX:3.5338,x:274.35,y:361.95,startPosition:13},0).wait(1).to({skewX:3.9941,y:362,startPosition:14},0).wait(1).to({scaleY:0.5094,skewX:4.4544,x:274.4,startPosition:15},0).wait(1).to({skewX:4.9147,startPosition:16},0).wait(1).to({skewX:5.375,x:274.35,startPosition:17},0).wait(1).to({skewX:5.8353,y:361.95,startPosition:18},0).wait(1).to({skewX:6.2956,x:274.4,y:362,startPosition:19},0).wait(1).to({skewX:6.7559,startPosition:20},0).wait(1).to({skewX:7.2162,startPosition:21},0).wait(1).to({skewX:7.6765,startPosition:22},0).wait(1).to({skewX:8.1368,x:274.35,startPosition:23},0).wait(1).to({scaleY:0.5093,skewX:8.5971,x:274.4,startPosition:24},0).wait(1).to({skewX:9.0573,x:274.35,startPosition:25},0).wait(1).to({skewX:9.5176,y:361.95,startPosition:26},0).wait(1).to({skewX:9.9779,y:362,startPosition:27},0).wait(1).to({skewX:10.4382,startPosition:28},0).wait(1).to({skewX:10.8985,x:274.3,startPosition:29},0).wait(1).to({skewX:11.3588,x:274.35,startPosition:30},0).wait(1).to({skewX:11.8191,startPosition:31},0).wait(1).to({scaleY:0.5091,skewX:11.5533,x:274.3,startPosition:32},0).wait(1).to({scaleY:0.5089,skewX:11.2876,x:274.35,startPosition:33},0).wait(1).to({scaleY:0.5088,skewX:11.0218,startPosition:34},0).wait(1).to({scaleY:0.5086,skewX:10.7561,x:274.3,startPosition:35},0).wait(1).to({scaleY:0.5084,skewX:10.4903,x:274.35,y:361.95,startPosition:36},0).wait(1).to({scaleY:0.5083,skewX:10.2246,y:362,startPosition:37},0).wait(1).to({scaleY:0.5081,skewX:9.9588,x:274.3,y:361.95,startPosition:38},0).wait(1).to({scaleY:0.5079,skewX:9.6931,x:274.35,y:362,startPosition:39},0).wait(1).to({scaleY:0.5077,skewX:9.4273,startPosition:40},0).wait(1).to({scaleY:0.5076,skewX:9.1616,startPosition:41},0).wait(1).to({scaleY:0.5074,skewX:8.8958,y:361.95,startPosition:42},0).wait(1).to({scaleY:0.5072,skewX:8.6301,x:274.4,y:362,startPosition:43},0).wait(1).to({scaleY:0.5071,skewX:8.3643,startPosition:44},0).wait(1).to({scaleY:0.5069,skewX:8.0985,x:274.35,startPosition:45},0).wait(1).to({scaleY:0.5067,skewX:7.8328,x:274.4,startPosition:46},0).wait(1).to({scaleY:0.5066,skewX:7.567,y:361.95,startPosition:47},0).wait(1).to({scaleY:0.5064,skewX:7.3013,x:274.35,y:362,startPosition:48},0).wait(1).to({scaleY:0.5062,skewX:7.0355,x:274.4,startPosition:49},0).wait(1).to({scaleY:0.506,skewX:6.7698,startPosition:50},0).wait(1).to({scaleY:0.5059,skewX:6.504,x:274.35,startPosition:51},0).wait(1).to({scaleY:0.5057,skewX:6.2383,x:274.4,startPosition:52},0).wait(1).to({scaleY:0.5055,skewX:5.9725,startPosition:53},0).wait(1).to({scaleY:0.5054,skewX:5.7068,x:274.35,startPosition:54},0).wait(1).to({scaleY:0.5052,skewX:5.441,x:274.4,startPosition:55},0).wait(1).to({scaleY:0.505,skewX:5.1753,startPosition:56},0).wait(1).to({scaleY:0.5049,skewX:4.9095,y:361.95,startPosition:57},0).wait(1).to({scaleY:0.5047,skewX:4.6437,y:362,startPosition:58},0).wait(1).to({scaleY:0.5045,skewX:4.378,startPosition:59},0).wait(1).to({scaleY:0.5044,skewX:4.1122,x:274.35,startPosition:60},0).wait(1).to({scaleY:0.5042,skewX:3.8465,x:274.4,startPosition:61},0).wait(1).to({scaleY:0.504,skewX:3.5807,startPosition:62},0).wait(1).to({scaleY:0.5038,skewX:3.315,x:274.35,y:361.95,startPosition:63},0).wait(1).to({scaleY:0.5037,skewX:3.0492,x:274.4,y:362,startPosition:64},0).wait(1).to({scaleY:0.5035,skewX:2.7835,startPosition:65},0).wait(1).to({scaleY:0.5033,skewX:2.5177,x:274.35,startPosition:66},0).wait(1).to({scaleY:0.5032,skewX:2.252,x:274.4,startPosition:67},0).wait(1).to({scaleY:0.503,skewX:1.9862,startPosition:68},0).wait(1).to({scaleY:0.5028,skewX:1.7205,x:274.35,startPosition:69},0).wait(1).to({scaleY:0.5027,skewX:1.4547,x:274.4,y:361.95,startPosition:70},0).wait(1).to({scaleY:0.5025,skewX:1.1889,x:274.35,y:362,startPosition:71},0).wait(1).to({scaleY:0.5023,skewX:0.9232,x:274.4,startPosition:72},0).wait(1).to({scaleY:0.5022,skewX:0.6574,startPosition:73},0).wait(1).to({scaleY:0.502,skewX:0.3917,x:274.35,y:361.95,startPosition:74},0).wait(1).to({scaleY:0.5018,skewX:0.1259,x:274.4,startPosition:75},0).wait(1).to({scaleY:0.5016,skewX:-0.1398,x:274.35,y:362,startPosition:76},0).wait(1).to({scaleY:0.5015,skewX:-0.4056,x:274.4,y:361.95,startPosition:77},0).wait(1).to({scaleY:0.5013,skewX:-0.6713,x:274.35,y:362,startPosition:78},0).wait(1).to({scaleY:0.5011,skewX:-0.9371,x:274.4,startPosition:79},0).wait(1).to({scaleY:0.501,skewX:-1.2028,x:274.35,startPosition:80},0).wait(1).to({scaleY:0.5008,skewX:-1.4686,x:274.4,startPosition:81},0).wait(1).to({scaleY:0.5006,skewX:-1.7343,x:274.35,startPosition:82},0).wait(1).to({scaleY:0.5005,skewX:-2.0001,x:274.4,startPosition:83},0).wait(1).to({scaleY:0.5003,skewX:-2.2659,x:274.35,startPosition:84},0).wait(1).to({scaleY:0.5001,skewX:-2.5316,x:274.4,startPosition:85},0).wait(1).to({scaleY:0.4999,skewX:-2.7974,x:274.35,startPosition:86},0).wait(1).to({scaleY:0.4998,skewX:-3.0631,y:361.95,startPosition:87},0).wait(1).to({scaleY:0.4996,skewX:-3.3289,x:274.4,y:362,startPosition:88},0).wait(1).to({scaleY:0.4994,skewX:-3.5946,x:274.35,startPosition:89},0).wait(1).to({scaleY:0.4996,skewX:-3.3231,x:274.4,startPosition:90},0).wait(1).to({scaleY:0.4998,skewX:-3.0517,startPosition:91},0).wait(1).to({scaleY:0.5,skewX:-2.7802,x:274.35,startPosition:92},0).wait(1).to({scaleY:0.5002,skewX:-2.5087,y:361.95,startPosition:93},0).wait(1).to({scaleY:0.5004,skewX:-2.2372,x:274.4,y:362,startPosition:94},0).wait(1).to({scaleY:0.5006,skewX:-1.9658,x:274.35,startPosition:95},0).wait(1).to({scaleY:0.5008,skewX:-1.6943,startPosition:96},0).wait(1).to({scaleY:0.501,skewX:-1.4228,startPosition:97},0).wait(1).to({scaleY:0.5012,skewX:-1.1513,x:274.4,startPosition:98},0).wait(1).to({scaleY:0.5013,skewX:-0.8798,y:361.95,startPosition:99},0).wait(1).to({scaleY:0.5016,skewX:-0.6084,x:274.35,y:362,startPosition:100},0).wait(1).to({scaleY:0.5018,skewX:-0.3369,startPosition:101},0).wait(1).to({scaleY:0.5019,skewX:-0.0654,startPosition:102},0).wait(1).to({scaleY:0.5021,skewX:0.2061,x:274.4,startPosition:103},0).wait(1).to({scaleY:0.5023,skewX:0.4775,startPosition:104},0).wait(1).to({scaleY:0.5025,skewX:0.749,startPosition:105},0).wait(1).to({scaleY:0.5027,skewX:1.0205,startPosition:106},0).wait(1).to({scaleY:0.5029,skewX:1.292,startPosition:107},0).wait(1).to({scaleY:0.5031,skewX:1.5634,x:274.35,startPosition:108},0).wait(1).to({scaleY:0.5033,skewX:1.8349,startPosition:109},0).wait(1).to({scaleY:0.5035,skewX:2.1064,startPosition:110},0).wait(1).to({scaleY:0.5037,skewX:2.3779,startPosition:111},0).wait(1).to({scaleY:0.5038,skewX:2.6494,startPosition:112},0).wait(1).to({scaleY:0.504,skewX:2.9208,startPosition:113},0).wait(1).to({scaleY:0.5042,skewX:3.1923,x:274.4,startPosition:114},0).wait(1).to({scaleY:0.5044,skewX:3.4638,y:361.95,startPosition:115},0).wait(1).to({scaleY:0.5046,skewX:3.7353,y:362,startPosition:116},0).wait(1).to({scaleY:0.5048,skewX:4.0067,startPosition:117},0).wait(1).to({scaleY:0.505,skewX:4.2782,startPosition:118},0).wait(1).to({scaleY:0.5052,skewX:4.5497,startPosition:119},0).wait(1).to({scaleY:0.5054,skewX:4.8212,startPosition:120},0).wait(1).to({scaleY:0.5056,skewX:5.0926,startPosition:121},0).wait(1).to({scaleY:0.5058,skewX:5.3641,startPosition:122},0).wait(1).to({scaleY:0.506,skewX:5.6356,y:361.95,startPosition:123},0).wait(1).to({scaleY:0.5062,skewX:5.9071,y:362,startPosition:124},0).wait(1).to({scaleY:0.5063,skewX:6.1786,startPosition:125},0).wait(1).to({scaleY:0.5065,skewX:6.45,startPosition:126},0).wait(1).to({scaleY:0.5067,skewX:6.7215,startPosition:127},0).wait(1).to({scaleY:0.5069,skewX:6.993,startPosition:128},0).wait(1).to({scaleY:0.5071,skewX:7.2645,startPosition:129},0).wait(1).to({scaleY:0.5073,skewX:7.5359,startPosition:130},0).wait(1).to({scaleY:0.5075,skewX:7.8074,startPosition:131},0).wait(1).to({scaleY:0.5077,skewX:8.0789,y:361.95,startPosition:132},0).wait(1).to({scaleY:0.5079,skewX:8.3504,startPosition:133},0).wait(1).to({scaleY:0.5081,skewX:8.6218,y:362,startPosition:134},0).wait(1).to({scaleY:0.5083,skewX:8.8933,x:274.35,y:361.95,startPosition:135},0).wait(1).to({scaleY:0.5085,skewX:9.1648,startPosition:136},0).wait(1).to({scaleY:0.5086,skewX:9.4363,y:362,startPosition:137},0).wait(1).to({scaleY:0.5088,skewX:9.7078,x:274.3,startPosition:138},0).wait(1).to({scaleY:0.509,skewX:9.9792,x:274.35,startPosition:139},0).wait(1).to({scaleY:0.5092,skewX:10.2507,x:274.3,startPosition:140},0).wait(1).to({scaleY:0.5094,skewX:10.5222,startPosition:141},0).wait(1).to({scaleY:0.5096,skewX:10.7937,y:361.95,startPosition:142},0).wait(1).to({scaleY:0.5098,skewX:11.0651,y:362,startPosition:143},0).wait(1).to({scaleY:0.51,skewX:11.3366,startPosition:144},0).wait(1).to({scaleY:0.5102,skewX:11.6081,y:361.95,startPosition:0},0).wait(1).to({scaleY:0.5104,skewX:11.8796,y:362,startPosition:1},0).wait(1).to({scaleY:0.5106,skewX:12.151,startPosition:2},0).wait(1).to({scaleY:0.5107,skewX:12.4225,x:274.35,startPosition:3},0).wait(1).to({scaleY:0.5109,skewX:12.694,startPosition:4},0).wait(1).to({scaleY:0.5108,skewX:12.4381,x:274.3,startPosition:5},0).wait(1).to({scaleY:0.5106,skewX:12.1822,x:274.35,startPosition:6},0).wait(1).to({scaleY:0.5105,skewX:11.9263,startPosition:7},0).wait(1).to({scaleY:0.5104,skewX:11.6704,startPosition:8},0).wait(1).to({scaleY:0.5102,skewX:11.4144,startPosition:9},0).wait(1).to({scaleY:0.5101,skewX:11.1585,x:274.3,startPosition:10},0).wait(1).to({scaleY:0.5099,skewX:10.9026,x:274.35,startPosition:11},0).wait(1).to({scaleY:0.5098,skewX:10.6467,startPosition:12},0).wait(1).to({scaleY:0.5096,skewX:10.3908,startPosition:13},0).wait(1).to({scaleY:0.5095,skewX:10.1349,startPosition:14},0).wait(1).to({scaleY:0.5093,skewX:9.879,x:274.3,startPosition:15},0).wait(1).to({scaleY:0.5092,skewX:9.6231,x:274.35,startPosition:16},0).wait(1).to({scaleY:0.509,skewX:9.3672,startPosition:17},0).wait(1).to({scaleY:0.5089,skewX:9.1113,startPosition:18},0).wait(1).to({scaleY:0.5087,skewX:8.8553,y:361.95,startPosition:19},0).wait(1).to({scaleY:0.5086,skewX:8.5994,y:362,startPosition:20},0).wait(1).to({scaleY:0.5084,skewX:8.3435,x:274.4,startPosition:21},0).wait(1).to({scaleY:0.5083,skewX:8.0876,startPosition:22},0).wait(1).to({scaleY:0.5081,skewX:7.8317,startPosition:23},0).wait(1).to({scaleY:0.508,skewX:7.5758,startPosition:24},0).wait(1).to({scaleY:0.5078,skewX:7.3199,x:274.35,y:361.95,startPosition:25},0).wait(1).to({scaleY:0.5077,skewX:7.064,x:274.4,y:362,startPosition:26},0).wait(1).to({scaleY:0.5075,skewX:6.8081,startPosition:27},0).wait(1).to({scaleY:0.5074,skewX:6.5521,startPosition:28},0).wait(1).to({scaleY:0.5072,skewX:6.2962,startPosition:29},0).wait(1).to({scaleY:0.5071,skewX:6.0403,x:274.35,startPosition:30},0).wait(1).to({scaleY:0.5069,skewX:5.7844,x:274.4,startPosition:31},0).wait(1).to({scaleY:0.5068,skewX:5.5285,startPosition:32},0).wait(1).to({scaleY:0.5066,skewX:5.2726,startPosition:33},0).wait(1).to({scaleY:0.5065,skewX:5.0167,x:274.35,y:361.95,startPosition:34},0).wait(1).to({scaleY:0.5063,skewX:4.7608,y:362,startPosition:35},0).wait(1).to({scaleY:0.5062,skewX:4.5049,x:274.4,startPosition:36},0).wait(1).to({scaleY:0.506,skewX:4.249,startPosition:37},0).wait(1).to({scaleY:0.5059,skewX:3.993,startPosition:38},0).wait(1).to({scaleY:0.5057,skewX:3.7371,startPosition:39},0).wait(1).to({scaleY:0.5056,skewX:3.4812,x:274.35,startPosition:40},0).wait(1).to({scaleY:0.5054,skewX:3.2253,startPosition:41},0).wait(1).to({scaleY:0.5053,skewX:2.9694,x:274.4,startPosition:42},0).wait(1).to({scaleY:0.5051,skewX:2.7135,startPosition:43},0).wait(1).to({scaleY:0.505,skewX:2.4576,startPosition:44},0).wait(1).to({scaleY:0.5048,skewX:2.2017,x:274.35,startPosition:45},0).wait(1).to({scaleY:0.5047,skewX:1.9458,startPosition:46},0).wait(1).to({scaleY:0.5045,skewX:1.6899,startPosition:47},0).wait(1).to({scaleY:0.5044,skewX:1.4339,x:274.4,startPosition:48},0).wait(1).to({scaleY:0.5042,skewX:1.178,startPosition:49},0).wait(1).to({scaleY:0.5041,skewX:0.9221,y:361.95,startPosition:50},0).wait(1).to({scaleY:0.5039,skewX:0.6662,y:362,startPosition:51},0).wait(1).to({scaleY:0.5038,skewX:0.4103,startPosition:52},0).wait(1).to({scaleY:0.5037,skewX:0.1544,x:274.35,startPosition:53},0).wait(1).to({scaleY:0.5035,skewX:-0.1015,startPosition:54},0).wait(1).to({scaleY:0.5034,skewX:-0.3574,y:361.95,startPosition:55},0).wait(1).to({scaleY:0.5032,skewX:-0.6133,startPosition:56},0).wait(1).to({scaleY:0.503,skewX:-0.8693,startPosition:57},0).wait(1).to({scaleY:0.5029,skewX:-1.1252,y:362,startPosition:58},0).wait(1).to({scaleY:0.5028,skewX:-1.3811,x:274.4,startPosition:59},0).wait(1).to({scaleY:0.5026,skewX:-1.637,startPosition:60},0).wait(1).to({scaleY:0.5025,skewX:-1.8929,startPosition:61},0).wait(1).to({scaleY:0.5023,skewX:-2.1488,startPosition:62},0).wait(1).to({scaleY:0.5022,skewX:-2.4047,startPosition:63},0).wait(1).to({scaleY:0.502,skewX:-2.6606,startPosition:64},0).wait(1).to({scaleY:0.5019,skewX:-2.9165,startPosition:65},0).wait(1).to({scaleY:0.5017,skewX:-3.1724,y:361.95,startPosition:66},0).wait(1).to({scaleY:0.5016,skewX:-3.4284,y:362,startPosition:67},0).wait(1).to({scaleY:0.5014,skewX:-3.6843,startPosition:68},0).wait(1).to({scaleY:0.5013,skewX:-3.9402,y:361.95,startPosition:69},0).wait(1).to({scaleY:0.5011,skewX:-4.1961,x:274.35,y:362,startPosition:70},0).wait(1).to({scaleY:0.501,skewX:-4.452,startPosition:71},0).wait(1).to({scaleY:0.5008,skewX:-4.7079,startPosition:72},0).wait(1).to({scaleY:0.5007,skewX:-4.9638,startPosition:73},0).wait(1).to({scaleY:0.5005,skewX:-5.2197,startPosition:74},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(193).to({_off:false},0).wait(1).to({rotation:0.037,x:290.75},0).wait(1).to({rotation:0,skewX:0.0739},0).wait(1).to({scaleY:1.0001,skewX:0.1109,x:290.7},0).wait(1).to({skewX:0.1478,x:290.75},0).wait(1).to({skewX:0.1848},0).wait(1).to({skewX:0.2217,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0002,skewX:0.2587},0).wait(1).to({skewX:0.2957,x:290.75},0).wait(1).to({skewX:0.3326},0).wait(1).to({skewX:0.3696,x:290.7},0).wait(1).to({scaleY:1.0003,skewX:0.4065,y:253.1},0).wait(1).to({skewX:0.4435,x:290.75},0).wait(1).to({skewX:0.4805},0).wait(1).to({skewX:0.5174,x:290.7},0).wait(1).to({skewX:0.5544},0).wait(1).to({scaleY:1.0004,skewX:0.5913,x:290.75},0).wait(1).to({skewX:0.6283,y:253.15},0).wait(1).to({skewX:0.6652,x:290.7},0).wait(1).to({skewX:0.7022,x:290.75},0).wait(1).to({skewX:0.7392},0).wait(1).to({scaleY:1.0005,skewX:0.7761,x:290.7},0).wait(1).to({skewX:0.8131},0).wait(1).to({skewX:0.85,x:290.75},0).wait(1).to({skewX:0.887,y:253.1},0).wait(1).to({skewX:0.9239,x:290.7},0).wait(1).to({scaleY:1.0006,skewX:0.9609},0).wait(1).to({skewX:0.9979,x:290.75},0).wait(1).to({skewX:1.0348},0).wait(1).to({skewX:1.0718,x:290.7},0).wait(1).to({scaleY:1.0007,skewX:1.1087},0).wait(1).to({skewX:1.1457,x:290.75},0).wait(1).to({skewX:1.1826,x:290.7},0).wait(1).to({skewX:1.2196},0).wait(1).to({scaleY:1.0008,skewX:1.2566,x:290.75},0).wait(1).to({skewX:1.2935,y:253.15},0).wait(1).to({skewX:1.3305,x:290.7},0).wait(1).to({skewX:1.3674},0).wait(1).to({skewX:1.4044,x:290.75},0).wait(1).to({scaleY:1.0009,skewX:1.4414},0).wait(1).to({skewX:1.4783,x:290.7},0).wait(1).to({skewX:1.5153},0).wait(1).to({skewX:1.5522,x:290.75},0).wait(1).to({scaleY:1.001,skewX:1.5892},0).wait(1).to({skewX:1.6261,x:290.7},0).wait(1).to({skewX:1.6631,x:290.75},0).wait(1).to({skewX:1.7001},0).wait(1).to({skewX:1.737,x:290.7},0).wait(1).to({skewX:1.774},0).wait(1).to({scaleY:1.0011,skewX:1.8109,x:290.75},0).wait(1).to({skewX:1.8479},0).wait(1).to({skewX:1.8848,x:290.7},0).wait(1).to({skewX:1.9218},0).wait(1).to({scaleY:1.0012,skewX:1.9588,x:290.75},0).wait(1).to({skewX:1.9957},0).wait(1).to({skewX:2.0327,x:290.7},0).wait(1).to({skewX:2.0696},0).wait(1).to({scaleY:1.0013,skewX:2.1066,x:290.75},0).wait(1).to({skewX:2.1436,x:290.7},0).wait(1).to({skewX:2.1805},0).wait(1).to({skewX:2.2175,x:290.75},0).wait(1).to({scaleY:1.0014,skewX:2.2544},0).wait(1).to({skewX:2.2914,x:290.7},0).wait(1).to({skewX:2.3283},0).wait(1).to({skewX:2.3653,x:290.75},0).wait(1).to({skewX:2.4023},0).wait(1).to({skewX:2.4392,x:290.7},0).wait(1).to({scaleY:1.0015,skewX:2.4762},0).wait(1).to({skewX:2.5131,x:290.75},0).wait(1).to({skewX:2.5501,x:290.7},0).wait(1).to({skewX:2.587},0).wait(1).to({scaleY:1.0016,skewX:2.624,x:290.75,y:253.1},0).wait(1).to({skewX:2.661},0).wait(1).to({skewX:2.6979,x:290.7},0).wait(1).to({skewX:2.7349},0).wait(1).to({skewX:2.7718,x:290.75},0).wait(1).to({scaleY:1.0017,skewX:2.8088},0).wait(1).to({skewX:2.8457,x:290.7},0).wait(1).to({skewX:2.8827},0).wait(1).to({skewX:2.9197,x:290.75},0).wait(1).to({scaleY:1.0018,skewX:2.9566,x:290.7},0).wait(1).to({skewX:2.9936},0).wait(1).to({skewX:3.0305,x:290.75,y:253.15},0).wait(1).to({skewX:3.0675},0).wait(1).to({scaleY:1.0019,skewX:3.1045,x:290.7},0).wait(1).to({skewX:3.1414},0).wait(1).to({skewX:3.1784,x:290.75},0).wait(1).to({skewX:3.2153},0).wait(1).to({skewX:3.2523,x:290.7},0).wait(1).to({scaleY:1.002,skewX:3.2892,y:253.1},0).wait(1).to({skewX:3.3262,x:290.75},0).wait(1).to({skewX:3.3632,x:290.7},0).wait(1).to({skewX:3.4001},0).wait(1).to({skewX:3.4371},0).wait(1).to({scaleY:1.0021,skewX:3.474},0).wait(1).to({skewX:3.511,x:290.65,y:253.15},0).wait(1).to({skewX:3.5479},0).wait(1).to({skewX:3.5849,x:290.7},0).wait(1).to({skewX:3.6219},0).wait(1).to({scaleY:1.0022,skewX:3.6588,x:290.65},0).wait(1).to({skewX:3.6958,y:253.1},0).wait(1).to({skewX:3.7327,x:290.7},0).wait(1).to({skewX:3.7697,x:290.65},0).wait(1).to({scaleY:1.0023,skewX:3.8067},0).wait(1).to({skewX:3.8436,x:290.7},0).wait(1).to({skewX:3.8009},0).wait(1).to({scaleY:1.0022,skewX:3.7583,x:290.65},0).wait(1).to({skewX:3.7156},0).wait(1).to({skewX:3.6729,y:253.15},0).wait(1).to({skewX:3.6302,x:290.7},0).wait(1).to({scaleY:1.0021,skewX:3.5875},0).wait(1).to({skewX:3.5449,x:290.65,y:253.1},0).wait(1).to({skewX:3.5022},0).wait(1).to({skewX:3.4595,x:290.7},0).wait(1).to({skewX:3.4168},0).wait(1).to({skewX:3.3742,y:253.15},0).wait(1).to({scaleY:1.002,skewX:3.3315},0).wait(1).to({skewX:3.2888},0).wait(1).to({skewX:3.2461,x:290.75},0).wait(1).to({skewX:3.2035,y:253.1},0).wait(1).to({skewX:3.1608,x:290.7},0).wait(1).to({scaleY:1.0019,skewX:3.1181},0).wait(1).to({skewX:3.0754,x:290.75},0).wait(1).to({skewX:3.0327},0).wait(1).to({skewX:2.9901},0).wait(1).to({skewX:2.9474,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0018,skewX:2.9047},0).wait(1).to({skewX:2.862,x:290.75},0).wait(1).to({skewX:2.8194},0).wait(1).to({skewX:2.7767,x:290.7},0).wait(1).to({scaleY:1.0017,skewX:2.734,y:253.1},0).wait(1).to({skewX:2.6913,x:290.75},0).wait(1).to({skewX:2.6487},0).wait(1).to({skewX:2.606},0).wait(1).to({skewX:2.5633,x:290.7},0).wait(1).to({scaleY:1.0016,skewX:2.5206},0).wait(1).to({skewX:2.4779,x:290.75},0).wait(1).to({skewX:2.4353},0).wait(1).to({skewX:2.3926,x:290.7},0).wait(1).to({skewX:2.3499,y:253.15},0).wait(1).to({skewX:2.3072,x:290.75},0).wait(1).to({scaleY:1.0015,skewX:2.2646},0).wait(1).to({skewX:2.2219},0).wait(1).to({skewX:2.1792,x:290.7},0).wait(1).to({skewX:2.1365},0).wait(1).to({scaleY:1.0014,skewX:2.0939,x:290.75},0).wait(1).to({skewX:2.0512},0).wait(1).to({skewX:2.0085,x:290.7},0).wait(1).to({skewX:1.9658},0).wait(1).to({scaleY:1.0013,skewX:1.9231,x:290.75},0).wait(1).to({skewX:1.8805},0).wait(1).to({skewX:1.8378,x:290.7},0).wait(1).to({skewX:1.7951,y:253.1},0).wait(1).to({skewX:1.7524},0).wait(1).to({scaleY:1.0012,skewX:1.7098,x:290.75},0).wait(1).to({skewX:1.6671},0).wait(1).to({skewX:1.6244,x:290.7},0).wait(1).to({skewX:1.5817},0).wait(1).to({skewX:1.5391,x:290.75},0).wait(1).to({skewX:1.4964},0).wait(1).to({scaleY:1.0011,skewX:1.4537,x:290.7},0).wait(1).to({skewX:1.411},0).wait(1).to({skewX:1.3683},0).wait(1).to({skewX:1.3257,x:290.75,y:253.15},0).wait(1).to({skewX:1.283},0).wait(1).to({scaleY:1.001,skewX:1.2403,x:290.7},0).wait(1).to({skewX:1.1976},0).wait(1).to({skewX:1.155,x:290.75},0).wait(1).to({skewX:1.1123},0).wait(1).to({scaleY:1.0009,skewX:1.0696,x:290.7},0).wait(1).to({skewX:1.0269},0).wait(1).to({skewX:0.9843,x:290.75},0).wait(1).to({skewX:0.9416},0).wait(1).to({scaleY:1.0008,skewX:0.8989},0).wait(1).to({skewX:0.8562,x:290.7},0).wait(1).to({skewX:0.8135},0).wait(1).to({skewX:0.7709,x:290.75,y:253.1},0).wait(1).to({skewX:0.7282},0).wait(1).to({skewX:0.6855,x:290.7},0).wait(1).to({scaleY:1.0007,skewX:0.6428},0).wait(1).to({skewX:0.6002,x:290.75},0).wait(1).to({skewX:0.5575},0).wait(1).to({skewX:0.5148},0).wait(1).to({skewX:0.4721,x:290.7},0).wait(1).to({scaleY:1.0006,skewX:0.4295},0).wait(1).to({skewX:0.3868,x:290.75,y:253.15},0).wait(1).to({skewX:0.3441},0).wait(1).to({skewX:0.3014,x:290.7},0).wait(1).to({skewX:0.2587},0).wait(1).to({scaleY:1.0005,skewX:0.2161,x:290.75},0).wait(1).to({skewX:0.1734,y:253.1},0).wait(1).to({skewX:0.1307,x:290.7},0).wait(1).to({skewX:0.088},0).wait(1).to({scaleY:1.0004,rotation:0.0454,skewX:0,x:290.75},0).wait(1).to({rotation:0.0027},0).wait(1).to({rotation:-0.04,x:290.7},0).wait(1).to({rotation:0,skewX:-0.0827,y:253.15},0).wait(1).to({skewX:-0.1253},0).wait(1).to({scaleY:1.0003,skewX:-0.168,x:290.75},0).wait(1).to({skewX:-0.2107},0).wait(1).to({skewX:-0.2534,x:290.7,y:253.1},0).wait(1).to({skewX:-0.2961},0).wait(1).to({skewX:-0.3387,x:290.75},0).wait(1).to({skewX:-0.3814},0).wait(1).to({scaleY:1.0002,skewX:-0.4241,x:290.7,y:253.15},0).wait(1).to({skewX:-0.4668},0).wait(1).to({skewX:-0.5094},0).wait(1).to({skewX:-0.5521,x:290.75,y:253.1},0).wait(1).to({skewX:-0.5948},0).wait(1).to({scaleY:1.0001,skewX:-0.6375,x:290.7},0).wait(1).to({skewX:-0.6801},0).wait(1).to({scaleY:1.0003,skewX:-0.5834,x:290.75,y:253.15},0).wait(1).to({scaleY:1.0004,skewX:-0.4866},0).wait(1).to({scaleY:1.0006,skewX:-0.3898,x:290.7},0).wait(1).to({scaleY:1.0007,skewX:-0.293,x:290.75,y:253.1},0).wait(1).to({scaleY:1.0009,skewX:-0.1962,x:290.7},0).wait(1).to({scaleY:1.001,skewX:-0.0994,x:290.75},0).wait(1).to({scaleY:1.0011,rotation:-0.0027,skewX:0,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0013,rotation:0,skewX:0.0941,x:290.75,y:253.1},0).wait(1).to({scaleY:1.0015,skewX:0.1909,x:290.7},0).wait(1).to({scaleY:1.0016,skewX:0.2877,x:290.75},0).wait(1).to({scaleY:1.0018,skewX:0.3845,y:253.15},0).wait(1).to({scaleY:1.0019,skewX:0.4813,x:290.7,y:253.1},0).wait(1).to({scaleY:1.0021,skewX:0.5781,x:290.75},0).wait(1).to({scaleY:1.0022,skewX:0.6748,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0023,skewX:0.7716,x:290.75,y:253.1},0).wait(1).to({scaleY:1.0025,skewX:0.8684,x:290.7},0).wait(1).to({scaleY:1.0026,skewX:0.9652,x:290.75,y:253.15},0).wait(1).to({scaleY:1.0028,skewX:1.062,y:253.1},0).wait(1).to({scaleY:1.003,skewX:1.1588,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0031,skewX:1.2555,x:290.75,y:253.1},0).wait(1).to({scaleY:1.0033,skewX:1.3523,x:290.7},0).wait(1).to({scaleY:1.0034,skewX:1.4491,x:290.75,y:253.15},0).wait(1).to({scaleY:1.0036,skewX:1.5459,y:253.1},0).wait(1).to({scaleY:1.0037,skewX:1.6427,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0038,skewX:1.7395,x:290.75,y:253.1},0).wait(1).to({scaleY:1.004,skewX:1.8362,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0042,skewX:1.933,x:290.75,y:253.1},0).wait(1).to({scaleY:1.0043,skewX:2.0298,y:253.15},0).wait(1).to({scaleY:1.0045,skewX:2.1266,x:290.7,y:253.1},0).wait(1).to({scaleY:1.0046,skewX:2.2234,x:290.75},0).wait(1).to({scaleY:1.0048,skewX:2.3202,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0049,skewX:2.417,x:290.75,y:253.1},0).wait(1).to({scaleY:1.0051,skewX:2.5137,y:253.15},0).wait(1).to({scaleY:1.0052,skewX:2.6105,x:290.7,y:253.1},0).wait(1).to({scaleY:1.0054,skewX:2.7073,x:290.75},0).wait(1).to({scaleY:1.0055,skewX:2.8041,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0057,skewX:2.9009,y:253.1},0).wait(1).to({scaleY:1.0058,skewX:2.9977,x:290.75},0).wait(1).to({scaleY:1.006,skewX:3.0944,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0061,skewX:3.1912,x:290.75,y:253.1},0).wait(1).to({scaleY:1.0063,skewX:3.288},0).wait(1).to({scaleY:1.0064,skewX:3.3848,x:290.7},0).wait(1).to({scaleY:1.0066,skewX:3.4816,y:253.15},0).wait(1).to({scaleY:1.0067,skewX:3.5784,x:290.65,y:253.1},0).wait(1).to({scaleY:1.0069,skewX:3.6751},0).wait(1).to({scaleY:1.007,skewX:3.7719,x:290.7},0).wait(1).to({scaleY:1.0072,skewX:3.8687,x:290.65,y:253.15},0).wait(1).to({scaleY:1.0073,skewX:3.9655},0).wait(1).to({scaleY:1.0075,skewX:4.0623,x:290.7},0).wait(1).to({scaleY:1.0076,skewX:4.1591,x:290.65,y:253.1},0).wait(1).to({scaleY:1.0078,skewX:4.2559},0).wait(1).to({scaleY:1.0079,skewX:4.3526,x:290.7},0).wait(1).to({scaleY:1.0081,skewX:4.4494,x:290.65},0).wait(1).to({scaleY:1.0082,skewX:4.5462},0).wait(1).to({scaleY:1.0084,skewX:4.643,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0085,skewX:4.7398,x:290.65},0).wait(1).to({scaleY:1.0087,skewX:4.8366,x:290.7},0).wait(1).to({scaleY:1.0088,skewX:4.9333},0).wait(1).to({scaleY:1.009,skewX:5.0301,x:290.65},0).wait(1).to({scaleY:1.0091,skewX:5.1269,x:290.7},0).wait(1).to({scaleY:1.0093,skewX:5.2237},0).wait(1).to({scaleY:1.0094,skewX:5.3205,x:290.65},0).wait(1).to({scaleY:1.0096,skewX:5.4173,x:290.7},0).wait(1).to({scaleY:1.0097,skewX:5.514,y:253.1},0).wait(1).to({scaleY:1.0099,skewX:5.6108,x:290.65},0).wait(1).to({scaleY:1.01,skewX:5.7076,x:290.7},0).wait(1).to({scaleY:1.0102,skewX:5.8044},0).wait(1).to({scaleY:1.0103,skewX:5.9012,x:290.65},0).wait(1).to({scaleY:1.0105,skewX:5.998,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0106,skewX:6.0948},0).wait(1).to({scaleY:1.0108,skewX:6.1915,x:290.65},0).wait(1).to({scaleY:1.0109,skewX:6.2883,x:290.7,y:253.1},0).wait(1).to({scaleY:1.0111,skewX:6.3851},0).wait(1).to({scaleY:1.0112,skewX:6.4819,x:290.65},0).wait(1).to({scaleY:1.0114,skewX:6.5787,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0115,skewX:6.6755},0).wait(1).to({scaleY:1.0117,skewX:6.7722,x:290.65,y:253.1},0).wait(1).to({scaleY:1.0118,skewX:6.869},0).wait(1).to({scaleY:1.012,skewX:6.9658,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0121,skewX:7.0626,x:290.65,y:253.1},0).wait(1).to({scaleY:1.0123,skewX:7.1594},0).wait(1).to({scaleY:1.0124,skewX:7.2562,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0126,skewX:7.353,x:290.65,y:253.1},0).wait(1).to({scaleY:1.0127,skewX:7.4497},0).wait(1).to({scaleY:1.0129,skewX:7.5465,x:290.7,y:253.15},0).wait(1).to({scaleY:1.013,skewX:7.6433,x:290.65,y:253.1},0).wait(1).to({scaleY:1.0132,skewX:7.7401,y:253.15},0).wait(1).to({scaleY:1.0133,skewX:7.8369,x:290.7},0).wait(1).to({scaleY:1.0135,skewX:7.9337,x:290.65,y:253.1},0).wait(1).to({scaleY:1.0136,skewX:8.0304,y:253.15},0).wait(1).to({scaleY:1.0138,skewX:8.1272,x:290.7,y:253.1},0).wait(1).to({scaleY:1.0139,skewX:8.224,y:253.15},0).wait(1).to({scaleY:1.0141,skewX:8.3208,x:290.65,y:253.1},0).wait(1).to({scaleY:1.0143,skewX:8.4176,y:253.15},0).wait(1).to({scaleY:1.0144,skewX:8.5144,x:290.7,y:253.1},0).wait(1).to({scaleY:1.0145,skewX:8.6111,x:290.65,y:253.15},0).wait(1).to({scaleY:1.0147,skewX:8.7079,y:253.1},0).wait(1).to({scaleY:1.0148,skewX:8.8047,x:290.7,y:253.15},0).wait(1).to({scaleY:1.015,skewX:8.9015,x:290.65},0).wait(1).to({scaleY:1.0151,skewX:8.9983,y:253.1},0).wait(1).to({scaleY:1.0153,skewX:9.0951,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0155,skewX:9.1919,x:290.65,y:253.1},0).wait(1).to({scaleY:1.0156,skewX:9.2886},0).wait(1).to({scaleY:1.0158,skewX:9.3854,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0159,skewX:9.4822,x:290.65,y:253.1},0).wait(1).to({scaleY:1.016,skewX:9.579},0).wait(1).to({scaleY:1.0162,skewX:9.6758,y:253.15},0).wait(1).to({scaleY:1.0163,skewX:9.7726,x:290.7,y:253.1},0).wait(1).to({scaleY:1.0165,skewX:9.8693,x:290.65},0).wait(1).to({scaleY:1.0167,skewX:9.9661},0).wait(1).to({scaleY:1.0168,skewX:10.0629,x:290.7,y:253.15},0).wait(1).to({scaleY:1.017,skewX:10.1597,x:290.65,y:253.1},0).wait(1).to({scaleY:1.0171,skewX:10.2565},0).wait(1).to({scaleY:1.0173,skewX:10.3533,x:290.7},0).wait(1).to({scaleY:1.0174,skewX:10.45,x:290.65,y:253.15},0).wait(1).to({scaleY:1.0175,skewX:10.5468},0).wait(1).to({scaleY:1.0177,skewX:10.6436,x:290.7},0).wait(1).to({scaleY:1.0178,skewX:10.7404,x:290.65,y:253.1},0).wait(1).to({skewX:10.6421,x:290.7},0).wait(1).to({skewX:10.5438,x:290.65},0).wait(1).to({skewX:10.4456},0).wait(1).to({scaleY:1.0177,skewX:10.3473,x:290.7,y:253.15},0).wait(1).to({skewX:10.249,x:290.65,y:253.1},0).wait(1).to({skewX:10.1507,y:253.15},0).wait(1).to({scaleY:1.0176,skewX:10.0525,y:253.1},0).wait(1).to({skewX:9.9542,x:290.7},0).wait(1).to({skewX:9.8559,x:290.65,y:253.15},0).wait(1).to({scaleY:1.0175,skewX:9.7576,y:253.1},0).wait(1).to({skewX:9.6594,x:290.7,y:253.15},0).wait(1).to({skewX:9.5611},0).wait(1).to({skewX:9.4628,x:290.65,y:253.1},0).wait(1).to({scaleY:1.0174,skewX:9.3645},0).wait(1).to({skewX:9.2662,x:290.7,y:253.15},0).wait(1).to({skewX:9.168,y:253.1},0).wait(1).to({scaleY:1.0173,skewX:9.0697,x:290.65},0).wait(1).to({skewX:8.9714},0).wait(1).to({scaleY:1.0172,skewX:8.8731,x:290.7,y:253.15},0).wait(1).to({skewX:8.7749},0).wait(1).to({skewX:8.6766,x:290.65,y:253.1},0).wait(1).to({skewX:8.5783},0).wait(1).to({skewX:8.48,x:290.7},0).wait(1).to({scaleY:1.0171,skewX:8.3818,y:253.15},0).wait(1).to({skewX:8.2835,x:290.65},0).wait(1).to({scaleY:1.017,skewX:8.1852},0).wait(1).to({skewX:8.0869,x:290.7},0).wait(1).to({skewX:7.9886},0).wait(1).to({scaleY:1.0169,skewX:7.8904,x:290.65,y:253.1},0).wait(1).to({skewX:7.7921},0).wait(1).to({skewX:7.6938},0).wait(1).to({skewX:7.5955,x:290.7},0).wait(1).to({scaleY:1.0168,skewX:7.4973,x:290.65},0).wait(1).to({skewX:7.399},0).wait(1).to({skewX:7.3007},0).wait(1).to({scaleY:1.0167,skewX:7.2024,x:290.7},0).wait(1).to({skewX:7.1042,y:253.15},0).wait(1).to({skewX:7.0059,x:290.65},0).wait(1).to({scaleY:1.0166,skewX:6.9076},0).wait(1).to({skewX:6.8093,x:290.7},0).wait(1).to({skewX:6.711},0).wait(1).to({skewX:6.6128,x:290.65,y:253.1},0).wait(1).to({scaleY:1.0165,skewX:6.5145},0).wait(1).to({skewX:6.4162},0).wait(1).to({skewX:6.3179,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0164,skewX:6.2197},0).wait(1).to({skewX:6.1214,x:290.65},0).wait(1).to({skewX:6.0231,y:253.1},0).wait(1).to({scaleY:1.0163,skewX:5.9248},0).wait(1).to({skewX:5.8266,x:290.7,y:253.15},0).wait(1).to({skewX:5.7283},0).wait(1).to({scaleY:1.0162,skewX:5.63,x:290.65,y:253.1},0).wait(1).to({skewX:5.5317},0).wait(1).to({skewX:5.4334,y:253.15},0).wait(1).to({scaleY:1.0161,skewX:5.3352,x:290.7,y:253.1},0).wait(1).to({skewX:5.2369},0).wait(1).to({skewX:5.1386,x:290.65,y:253.15},0).wait(1).to({skewX:5.0403,y:253.1},0).wait(1).to({scaleY:1.016,skewX:4.9421,y:253.15},0).wait(1).to({skewX:4.8438,x:290.7,y:253.1},0).wait(1).to({skewX:4.7455},0).wait(1).to({scaleY:1.0159,skewX:4.6472,x:290.65,y:253.15},0).wait(1).to({skewX:4.549,y:253.1},0).wait(1).to({scaleY:1.0158,skewX:4.4507,y:253.15},0).wait(1).to({skewX:4.3524,x:290.7,y:253.1},0).wait(1).to({skewX:4.2541,y:253.15},0).wait(1).to({skewX:4.1558,x:290.65,y:253.1},0).wait(1).to({scaleY:1.0157,skewX:4.0576,y:253.15},0).wait(1).to({skewX:3.9593,y:253.1},0).wait(1).to({skewX:3.861,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0156,skewX:3.7627,y:253.1},0).wait(1).to({skewX:3.6645,x:290.65},0).wait(1).to({skewX:3.5662,y:253.15},0).wait(1).to({skewX:3.4679,y:253.1},0).wait(1).to({scaleY:1.0155,skewX:3.3696,x:290.7,y:253.15},0).wait(1).to({skewX:3.2714,x:290.75},0).wait(1).to({skewX:3.1731,y:253.1},0).wait(1).to({scaleY:1.0154,skewX:3.0748,x:290.7,y:253.15},0).wait(1).to({skewX:2.9765},0).wait(1).to({skewX:2.8782,x:290.75,y:253.1},0).wait(1).to({scaleY:1.0153,skewX:2.78},0).wait(1).to({skewX:2.6817,y:253.15},0).wait(1).to({skewX:2.5834,x:290.7,y:253.1},0).wait(1).to({skewX:2.4851},0).wait(1).to({scaleY:1.0152,skewX:2.3869},0).wait(1).to({skewX:2.2886,x:290.75,y:253.15},0).wait(1).to({skewX:2.1903},0).wait(1).to({scaleY:1.0151,skewX:2.092,x:290.7,y:253.1},0).wait(1).to({skewX:1.9938},0).wait(1).to({scaleY:1.015,skewX:1.8955},0).wait(1).to({skewX:1.7972,x:290.75},0).wait(1).to({skewX:1.6989,y:253.15},0).wait(1).to({skewX:1.6006},0).wait(1).to({scaleY:1.0149,skewX:1.5024,x:290.7},0).wait(1).to({skewX:1.4041},0).wait(1).to({skewX:1.3058,x:290.75},0).wait(1).to({scaleY:1.0148,skewX:1.2075},0).wait(1).to({skewX:1.1093},0).wait(1).to({skewX:1.011,x:290.7},0).wait(1).to({scaleY:1.0147,skewX:0.9127},0).wait(1).to({skewX:0.8144},0).wait(1).to({skewX:0.7162,x:290.75},0).wait(1).to({skewX:0.6179},0).wait(1).to({scaleY:1.0146,skewX:0.5196,x:290.7},0).wait(1).to({skewX:0.4213},0).wait(1).to({skewX:0.323},0).wait(1).to({scaleY:1.0145,skewX:0.2248,x:290.75,y:253.1},0).wait(1).to({skewX:0.1265},0).wait(1).to({rotation:0.0282,skewX:0},0).wait(1).to({scaleY:1.0144,rotation:0,skewX:-0.0701,x:290.7,y:253.15},0).wait(1).to({skewX:-0.1683},0).wait(1).to({skewX:-0.2666,x:290.75},0).wait(1).to({skewX:-0.3649,y:253.1},0).wait(1).to({scaleY:1.0143,skewX:-0.4632,x:290.7},0).wait(1).to({skewX:-0.5614,y:253.15},0).wait(1).to({scaleY:1.0142,skewX:-0.6597},0).wait(1).to({skewX:-0.758,x:290.75,y:253.1},0).wait(1).to({skewX:-0.8563},0).wait(1).to({scaleY:1.0141,skewX:-0.9546,y:253.15},0).wait(1).to({skewX:-1.0528,x:290.7},0).wait(1).to({skewX:-1.1511,y:253.1},0).wait(1).to({skewX:-1.2494,x:290.75,y:253.15},0).wait(1).to({scaleY:1.014,skewX:-1.3477},0).wait(1).to({skewX:-1.4459,x:290.7,y:253.1},0).wait(1).to({skewX:-1.5442,y:253.15},0).wait(1).to({scaleY:1.0139,skewX:-1.6425,y:253.1},0).wait(1).to({skewX:-1.7408,x:290.75,y:253.15},0).wait(1).to({skewX:-1.839},0).wait(1).to({scaleY:1.0138,skewX:-1.9373,x:290.7,y:253.1},0).wait(1).to({skewX:-2.0356,y:253.15},0).wait(1).to({skewX:-2.1339,y:253.1},0).wait(1).to({skewX:-2.2322,x:290.75,y:253.15},0).wait(1).to({scaleY:1.0137,skewX:-2.3304,y:253.1},0).wait(1).to({skewX:-2.4287,x:290.7,y:253.15},0).wait(1).to({skewX:-2.527,y:253.1},0).wait(1).to({scaleY:1.0136,skewX:-2.6253,x:290.75},0).wait(1).to({skewX:-2.7235,y:253.15},0).wait(1).to({skewX:-2.8218,y:253.1},0).wait(1).to({scaleY:1.0135,skewX:-2.9201,x:290.7,y:253.15},0).wait(1).to({skewX:-3.0184,y:253.1},0).wait(1).to({skewX:-3.1166,x:290.75},0).wait(1).to({skewX:-3.2149,y:253.15},0).wait(1).to({scaleY:1.0134,skewX:-3.3132,x:290.7,y:253.1},0).wait(1).to({skewX:-3.4115,y:253.15},0).wait(1).to({scaleY:1.0133,skewX:-3.5098,x:290.75},0).wait(1).to({skewX:-3.608,y:253.1},0).wait(1).to({skewX:-3.7063},0).wait(1).to({skewX:-3.8046,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0132,skewX:-3.9029},0).wait(1).to({skewX:-4.0011,x:290.75,y:253.1},0).wait(1).to({skewX:-4.0994},0).wait(1).to({scaleY:1.0131,skewX:-4.1977,x:290.7,y:253.15},0).wait(1).to({skewX:-4.296},0).wait(1).to({skewX:-4.3942,x:290.75,y:253.1},0).wait(1).to({scaleY:1.013,skewX:-4.4925},0).wait(1).to({skewX:-4.5908,x:290.7},0).wait(1).to({skewX:-4.6891},0).wait(1).to({skewX:-4.7874,x:290.75,y:253.15},0).wait(1).to({scaleY:1.0129,skewX:-4.8856},0).wait(1).to({skewX:-4.9839,x:290.7},0).wait(1).to({skewX:-5.0822},0).wait(1).to({scaleY:1.0128,skewX:-5.1805,x:290.75},0).wait(1).to({skewX:-5.2787},0).wait(1).to({scaleY:1.0127,skewX:-5.377,x:290.7},0).wait(1).to({skewX:-5.4753},0).wait(1).to({skewX:-5.5736,x:290.75},0).wait(1).to({skewX:-5.6718},0).wait(1).to({scaleY:1.0126,skewX:-5.7701,x:290.7},0).wait(1).to({skewX:-5.8684,x:290.75},0).wait(1).to({skewX:-5.9667},0).wait(1).to({scaleY:1.0125,skewX:-6.065},0).wait(1).to({skewX:-6.1632,x:290.7},0).wait(1).to({skewX:-6.2615,x:290.75},0).wait(1).to({scaleY:1.0124,skewX:-6.3598,y:253.1},0).wait(1).to({skewX:-6.4581,x:290.7},0).wait(1).to({skewX:-6.5563},0).wait(1).to({skewX:-6.6546,x:290.75,y:253.15},0).wait(1).to({scaleY:1.0123,skewX:-6.7529},0).wait(1).to({skewX:-6.8512,x:290.7},0).wait(1).to({skewX:-6.9494,x:290.75,y:253.1},0).wait(1).to({scaleY:1.0122,skewX:-7.0477},0).wait(1).to({skewX:-7.146,x:290.7,y:253.15},0).wait(1).to({skewX:-7.2443,x:290.75},0).wait(1).to({scaleY:1.0121,skewX:-7.3426,y:253.1},0).wait(1).to({skewX:-7.4408,x:290.7},0).wait(1).to({skewX:-7.5391,y:253.15},0).wait(1).to({skewX:-7.6374,x:290.75,y:253.1},0).wait(1).to({scaleY:1.012,skewX:-7.7357},0).wait(1).to({skewX:-7.8339,x:290.7,y:253.15},0).wait(1).to({scaleY:1.0119,skewX:-7.9322,x:290.75,y:253.1},0).wait(1).to({skewX:-8.0305},0).wait(1).to({skewX:-8.1288,x:290.7,y:253.15},0).wait(1).to({skewX:-8.227,x:290.75,y:253.1},0).wait(1).to({scaleY:1.0118,skewX:-8.3253,y:253.15},0).wait(1).to({skewX:-8.4236,x:290.7,y:253.1},0).wait(1).to({skewX:-8.5219,x:290.75,y:253.15},0).wait(1).to({scaleY:1.0117,skewX:-8.6202,y:253.1},0).wait(1).to({skewX:-8.7184,x:290.7},0).to({_off:true},1).wait(510));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_butterfly = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// butterfly
	this.instance = new lib.butterfly_1("synched",0);
	this.instance.setTransform(507.05,353.05,0.267,0.6091,0,0,0,43.8,43.9);
	this.instance._off = true;

	this.instance_1 = new lib.butterflyflying();
	this.instance_1.setTransform(512.1,291.8,0.75,0.75,0,0,0,44.1,44);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(720).to({_off:false},0).wait(1).to({regX:44,regY:44,y:352.2},0).wait(1).to({y:351.35},0).wait(1).to({y:350.5},0).wait(1).to({y:349.65},0).wait(1).to({y:348.8},0).wait(1).to({y:347.9},0).wait(1).to({y:347.05},0).wait(1).to({y:346.2},0).wait(1).to({y:345.35},0).wait(1).to({y:344.5},0).wait(1).to({y:343.6},0).wait(1).to({scaleX:0.2671,y:342.75},0).wait(1).to({y:341.9},0).wait(1).to({y:341.05},0).wait(1).to({y:340.2},0).wait(1).to({y:339.35},0).wait(1).to({y:338.45},0).wait(1).to({y:337.6},0).wait(1).to({y:336.75},0).wait(1).to({y:335.9},0).wait(1).to({y:335.05},0).wait(1).to({y:334.15},0).wait(1).to({y:333.3},0).wait(1).to({y:332.45},0).wait(1).to({y:331.6},0).wait(1).to({y:330.75},0).wait(1).to({y:329.9},0).wait(1).to({y:329},0).wait(1).to({y:328.15},0).wait(1).to({y:327.3},0).wait(1).to({y:326.45},0).wait(1).to({y:325.6},0).wait(1).to({y:324.7},0).wait(1).to({y:323.85},0).wait(1).to({y:323},0).wait(1).to({y:322.15},0).wait(1).to({y:321.3},0).wait(1).to({y:320.45},0).wait(1).to({y:319.55},0).wait(1).to({y:318.7},0).wait(1).to({y:317.85},0).wait(1).to({y:317},0).wait(1).to({scaleX:0.2672,y:316.15},0).wait(1).to({y:315.25},0).wait(1).to({y:314.4},0).wait(1).to({y:313.55},0).wait(1).to({y:312.7},0).wait(1).to({y:311.85},0).wait(1).to({y:311},0).wait(1).to({y:310.1},0).wait(1).to({y:309.25},0).wait(1).to({y:308.4},0).wait(1).to({y:307.55},0).wait(1).to({y:306.7},0).wait(1).to({y:305.8},0).wait(1).to({y:304.95},0).wait(1).to({y:304.1},0).wait(1).to({y:303.25},0).wait(1).to({y:302.4},0).wait(1).to({y:301.55},0).wait(1).to({y:300.65},0).wait(1).to({y:299.8},0).wait(1).to({y:298.95},0).wait(1).to({y:298.1},0).wait(1).to({y:297.25},0).wait(1).to({y:296.35},0).wait(1).to({y:295.5},0).wait(1).to({y:294.65},0).wait(1).to({y:293.8},0).wait(1).to({y:292.95},0).wait(1).to({y:292.05},0).wait(1).to({scaleX:0.27,x:507.1},0).wait(1).to({scaleX:0.2728,x:507.05},0).wait(1).to({scaleX:0.2756,x:507.1},0).wait(1).to({scaleX:0.2784,x:507.05},0).wait(1).to({scaleX:0.2812},0).wait(1).to({scaleX:0.2841,x:507.1},0).wait(1).to({scaleX:0.2869,x:507.05},0).wait(1).to({scaleX:0.2897,x:507.1},0).wait(1).to({scaleX:0.2925,x:507.05},0).wait(1).to({scaleX:0.2953,x:507.1},0).wait(1).to({scaleX:0.2981,x:507.05},0).wait(1).to({scaleX:0.3009,x:507.1},0).wait(1).to({scaleX:0.3037,x:507.05},0).wait(1).to({scaleX:0.3065,x:507.1},0).wait(1).to({scaleX:0.3093,x:507.05},0).wait(1).to({scaleX:0.3121,x:507.1},0).wait(1).to({scaleX:0.3149},0).wait(1).to({scaleX:0.3177},0).wait(1).to({scaleX:0.3205},0).wait(1).to({scaleX:0.3233,x:507.05},0).wait(1).to({scaleX:0.3261,x:507.1},0).wait(1).to({scaleX:0.3289,x:507.05},0).wait(1).to({scaleX:0.3317,x:507.1},0).wait(1).to({scaleX:0.3345,x:507.05},0).wait(1).to({scaleX:0.3373,x:507.1},0).wait(1).to({scaleX:0.3401,x:507.05},0).wait(1).to({scaleX:0.3429,x:507.1},0).wait(1).to({scaleX:0.3457},0).wait(1).to({scaleX:0.3485},0).wait(1).to({scaleX:0.3513},0).wait(1).to({scaleX:0.3541},0).wait(1).to({scaleX:0.3569},0).wait(1).to({scaleX:0.3597},0).wait(1).to({scaleX:0.3625},0).wait(1).to({scaleX:0.3653,x:507.05},0).wait(1).to({scaleX:0.3681,x:507.1},0).wait(1).to({scaleX:0.3709,x:507.05},0).wait(1).to({scaleX:0.3737,x:507.1},0).wait(1).to({scaleX:0.3765},0).wait(1).to({scaleX:0.3793},0).wait(1).to({scaleX:0.3821},0).wait(1).to({scaleX:0.3849},0).wait(1).to({scaleX:0.3877},0).wait(1).to({scaleX:0.3905},0).wait(1).to({scaleX:0.3933},0).wait(1).to({scaleX:0.3961},0).wait(1).to({scaleX:0.3989},0).wait(1).to({scaleX:0.4017},0).wait(1).to({scaleX:0.4045},0).wait(1).to({scaleX:0.4073},0).wait(1).to({scaleX:0.4101},0).wait(1).to({scaleX:0.4129},0).wait(1).to({scaleX:0.4157},0).wait(1).to({scaleX:0.4185},0).wait(1).to({scaleX:0.4213},0).wait(1).to({scaleX:0.4241},0).wait(1).to({scaleX:0.4269},0).wait(1).to({scaleX:0.4297},0).wait(1).to({scaleX:0.4325,x:507.15},0).wait(1).to({scaleX:0.4353,x:507.1},0).wait(1).to({scaleX:0.4381,x:507.15},0).wait(1).to({scaleX:0.4409,x:507.1},0).wait(1).to({scaleX:0.4437},0).wait(1).to({scaleX:0.4465},0).wait(1).to({scaleX:0.4493},0).wait(1).to({scaleX:0.4521},0).wait(1).to({scaleX:0.4549},0).wait(1).to({scaleX:0.4577},0).wait(1).to({scaleX:0.4605},0).wait(1).to({scaleX:0.4633,x:507.15},0).wait(1).to({scaleX:0.4661,x:507.1},0).wait(1).to({scaleX:0.4689,x:507.15},0).wait(1).to({scaleX:0.4718,x:507.1},0).wait(1).to({scaleX:0.4746,x:507.15},0).wait(1).to({scaleX:0.4774,x:507.1},0).wait(1).to({scaleX:0.4802,x:507.15},0).wait(1).to({scaleX:0.483,x:507.1},0).wait(1).to({scaleX:0.4858},0).wait(1).to({scaleX:0.4886},0).wait(1).to({scaleX:0.4914},0).wait(1).to({scaleX:0.4942,x:507.15},0).wait(1).to({scaleX:0.497,x:507.1},0).wait(1).to({scaleX:0.4998,x:507.15},0).wait(1).to({scaleX:0.5026,x:507.1},0).wait(1).to({scaleX:0.5054,x:507.15},0).wait(1).to({scaleX:0.5082,x:507.1},0).wait(1).to({scaleX:0.511,x:507.15},0).wait(1).to({scaleX:0.5138,x:507.1},0).wait(1).to({scaleX:0.5166,x:507.15},0).wait(1).to({scaleX:0.5194,x:507.1},0).wait(1).to({scaleX:0.5222,x:507.15},0).wait(1).to({scaleX:0.525},0).wait(1).to({scaleX:0.5278,x:507.1},0).wait(1).to({scaleX:0.5306,x:507.15},0).wait(1).to({scaleX:0.5334,x:507.1},0).wait(1).to({scaleX:0.5362,x:507.15},0).wait(1).to({scaleX:0.539,x:507.1},0).to({_off:true},1).wait(341));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(889).to({_off:false},0).wait(1).to({regX:44,rotation:-0.6338,x:506.15,y:290.5},0).wait(1).to({rotation:-1.2676,x:500.35,y:289.15},0).wait(1).to({rotation:-1.9014,x:494.55,y:287.9},0).wait(1).to({rotation:-2.5352,x:488.7,y:286.6},0).wait(1).to({rotation:-3.169,x:482.85,y:285.35},0).wait(1).to({rotation:-3.8027,x:477.1,y:284},0).wait(1).to({rotation:-4.4365,x:471.25,y:282.7},0).wait(1).to({rotation:-5.0703,x:465.4,y:281.4},0).wait(1).to({rotation:-5.7041,x:459.65,y:280.1},0).wait(1).to({rotation:-6.3379,x:453.8,y:278.8},0).wait(1).to({rotation:-6.9717,x:448,y:277.55},0).wait(1).to({rotation:-7.6055,x:442.15,y:276.25},0).wait(1).to({rotation:-8.2393,x:436.35,y:274.9},0).wait(1).to({rotation:-8.8731,x:430.55,y:273.65},0).wait(1).to({rotation:-9.5069,x:424.75,y:272.35},0).wait(1).to({rotation:-10.1406,x:418.9,y:271.1},0).wait(1).to({rotation:-10.7744,x:413.05,y:269.75},0).wait(1).to({rotation:-11.4082,x:407.3,y:268.45},0).wait(1).to({rotation:-12.042,x:401.45,y:267.15},0).wait(1).to({rotation:-12.6758,x:395.65,y:265.9},0).wait(1).to({rotation:-13.3096,x:389.8,y:264.55},0).wait(1).to({rotation:-13.9434,x:384.05,y:263.3},0).wait(1).to({rotation:-14.5772,x:378.2,y:262},0).wait(1).to({rotation:-15.211,x:372.35,y:260.7},0).wait(1).to({rotation:-15.8448,x:366.55,y:259.45},0).wait(1).to({rotation:-16.4785,x:360.75,y:258.15},0).wait(1).to({rotation:-17.1123,x:354.9,y:256.85},0).wait(1).to({rotation:-17.7461,x:349.1,y:255.55},0).wait(1).to({rotation:-18.3799,x:343.25,y:254.2},0).wait(1).to({rotation:-19.0137,x:337.45,y:252.95},0).wait(1).to({rotation:-19.6475,x:331.7,y:251.65},0).wait(1).to({rotation:-20.2813,x:325.85,y:250.35},0).wait(1).to({rotation:-20.9151,x:320.05,y:249.05},0).wait(1).to({rotation:-21.5489,x:314.2,y:247.8},0).wait(1).to({rotation:-22.1827,x:308.35,y:246.45},0).wait(1).to({rotation:-22.8164,x:302.55,y:245.15},0).wait(1).to({rotation:-23.4502,x:296.75,y:243.85},0).wait(1).to({rotation:-24.084,x:290.95,y:242.6},0).wait(1).to({rotation:-24.7178,x:285.15,y:241.3},0).wait(1).to({rotation:-25.3516,x:279.3,y:239.95},0).wait(1).to({rotation:-25.9854,x:273.45,y:238.7},0).wait(1).to({rotation:-26.6192,x:267.7,y:237.4},0).wait(1).to({rotation:-27.253,x:261.85,y:236.15},0).wait(1).to({rotation:-27.8868,x:256.05,y:234.8},0).wait(1).to({rotation:-28.5206,x:250.25,y:233.55},0).wait(1).to({rotation:-29.1543,x:244.4,y:232.2},0).wait(1).to({rotation:-29.7881,x:238.6,y:230.95},0).wait(1).to({rotation:-30.4219,x:232.75,y:229.65},0).wait(1).to({rotation:-31.0557,x:226.9,y:228.35},0).wait(1).to({rotation:-31.6895,x:221.2,y:227.05},0).wait(1).to({rotation:-32.3233,x:215.35,y:225.75},0).wait(1).to({rotation:-32.9571,x:209.5,y:224.45},0).wait(1).to({rotation:-33.5909,x:203.7,y:223.2},0).wait(1).to({rotation:-34.2247,x:197.9,y:221.9},0).wait(1).to({rotation:-34.8585,x:192.1,y:220.6},0).wait(1).to({rotation:-35.4922,x:186.2,y:219.25},0).wait(1).to({rotation:-36.126,x:180.4,y:218},0).wait(1).to({rotation:-36.7598,x:174.65,y:216.7},0).wait(1).to({rotation:-37.3936,x:168.8,y:215.35},0).wait(1).to({rotation:-38.0274,x:163,y:214.1},0).wait(1).to({rotation:-38.6612,x:157.15,y:212.8},0).wait(1).to({rotation:-39.295,x:151.35,y:211.5},0).wait(1).to({rotation:-39.9288,x:145.55,y:210.2},0).wait(1).to({rotation:-40.5626,x:139.7,y:208.9},0).wait(1).to({rotation:-41.1964,x:133.95,y:207.65},0).wait(1).to({rotation:-41.8301,x:128.1,y:206.35},0).wait(1).to({rotation:-42.4639,x:122.3,y:205},0).wait(1).to({rotation:-43.0977,x:116.45,y:203.75},0).wait(1).to({rotation:-43.7315,x:110.65,y:202.45},0).wait(1).to({rotation:-44.3653,x:104.8,y:201.2},0).wait(1).to({rotation:-44.9991,x:99.05,y:199.85},0).wait(1).to({rotation:-43.888,x:102.65,y:198.3},0).wait(1).to({rotation:-42.7769,x:106.2,y:196.75},0).wait(1).to({rotation:-41.6658,x:109.85,y:195.2},0).wait(1).to({rotation:-40.5547,x:113.4,y:193.65},0).wait(1).to({rotation:-39.4437,x:117.05,y:192.15},0).wait(1).to({rotation:-38.3326,x:120.65,y:190.6},0).wait(1).to({rotation:-37.2215,x:124.25,y:189.05},0).wait(1).to({rotation:-36.1104,x:127.85,y:187.5},0).wait(1).to({rotation:-34.9993,x:131.5,y:185.95},0).wait(1).to({rotation:-33.8882,x:135.05,y:184.4},0).wait(1).to({rotation:-32.7771,x:138.65,y:182.9},0).wait(1).to({rotation:-31.666,x:142.25,y:181.35},0).wait(1).to({rotation:-30.5549,x:145.85,y:179.75},0).wait(1).to({rotation:-29.4439,x:149.45,y:178.25},0).wait(1).to({rotation:-28.3328,x:153.05,y:176.7},0).wait(1).to({rotation:-27.2217,x:156.7,y:175.15},0).wait(1).to({rotation:-26.1106,x:160.25,y:173.65},0).wait(1).to({rotation:-24.9995,x:163.85,y:172.05},0).wait(1).to({rotation:-23.8884,x:167.45,y:170.5},0).wait(1).to({rotation:-22.7773,x:171.15,y:168.95},0).wait(1).to({rotation:-21.6662,x:174.7,y:167.35},0).wait(1).to({rotation:-20.5551,x:178.3,y:165.85},0).wait(1).to({rotation:-19.4441,x:181.9,y:164.3},0).wait(1).to({rotation:-18.333,x:185.5,y:162.75},0).wait(1).to({rotation:-17.2219,x:189.05,y:161.25},0).wait(1).to({rotation:-16.1108,x:192.7,y:159.7},0).wait(1).to({rotation:-14.9997,x:196.35,y:158.15},0).wait(1).to({rotation:-13.8886,x:199.9,y:156.65},0).wait(1).to({rotation:-12.7775,x:203.55,y:155.05},0).wait(1).to({rotation:-11.6664,x:207.1,y:153.5},0).wait(1).to({rotation:-10.5553,x:210.75,y:151.95},0).wait(1).to({rotation:-9.4443,x:214.3,y:150.4},0).wait(1).to({rotation:-8.3332,x:217.95,y:148.85},0).wait(1).to({rotation:-7.2221,x:221.55,y:147.35},0).wait(1).to({rotation:-6.111,x:225.1,y:145.8},0).wait(1).to({rotation:-4.9999,x:228.75,y:144.2},0).wait(1).to({rotation:-3.8888,x:232.35,y:142.65},0).wait(1).to({rotation:-2.7777,x:235.95,y:141.15},0).wait(1).to({rotation:-1.6666,x:239.55,y:139.6},0).wait(1).to({rotation:-0.5555,x:243.15,y:138.05},0).wait(1).to({rotation:0.5555,x:246.8,y:136.5},0).wait(1).to({rotation:1.6666,x:250.4,y:134.95},0).wait(1).to({rotation:2.7777,x:254,y:133.4},0).wait(1).to({rotation:3.8888,x:257.55,y:131.85},0).wait(1).to({rotation:4.9999,x:261.15,y:130.3},0).wait(1).to({rotation:6.111,x:264.8,y:128.75},0).wait(1).to({rotation:7.2221,x:268.4,y:127.25},0).wait(1).to({rotation:8.3332,x:272,y:125.7},0).wait(1).to({rotation:9.4443,x:275.65,y:124.1},0).wait(1).to({rotation:10.5553,x:279.25,y:122.6},0).wait(1).to({rotation:11.6664,x:282.85,y:121},0).wait(1).to({rotation:12.7775,x:286.45,y:119.5},0).wait(1).to({rotation:13.8886,x:290.1,y:117.95},0).wait(1).to({rotation:14.9997,x:293.65,y:116.45},0).wait(1).to({rotation:16.1108,x:297.25,y:114.85},0).wait(1).to({rotation:17.2219,x:300.85,y:113.3},0).wait(1).to({rotation:18.333,x:304.4,y:111.75},0).wait(1).to({rotation:19.4441,x:308.05,y:110.25},0).wait(1).to({rotation:20.5551,x:311.65,y:108.7},0).wait(1).to({rotation:21.6662,x:315.25,y:107.15},0).wait(1).to({rotation:22.7773,x:318.9,y:105.65},0).wait(1).to({rotation:23.8884,x:322.5,y:104},0).wait(1).to({rotation:24.9995,x:326.1,y:102.5},0).wait(1).to({rotation:26.1106,x:329.75,y:100.95},0).wait(1).to({rotation:27.2217,x:333.3,y:99.4},0).wait(1).to({rotation:28.3328,x:336.95,y:97.85},0).wait(1).to({rotation:29.4439,x:340.55,y:96.3},0).wait(1).to({rotation:30.5549,x:344.1,y:94.8},0).wait(1).to({rotation:31.666,x:347.75,y:93.2},0).wait(1).to({rotation:32.7771,x:351.35,y:91.7},0).wait(1).to({rotation:33.8882,x:354.95,y:90.15},0).wait(1).to({rotation:34.9993,x:358.55,y:88.65},0).wait(1).to({rotation:36.1104,x:362.15,y:87.05},0).wait(1).to({rotation:37.2215,x:365.8,y:85.5},0).wait(1).to({rotation:38.3326,x:369.4,y:83.95},0).wait(1).to({rotation:39.4437,x:373,y:82.4},0).wait(1).to({rotation:40.5547,x:376.55,y:80.85},0).wait(1).to({rotation:41.6658,x:380.15,y:79.35},0).wait(1).to({rotation:42.7769,x:383.8,y:77.75},0).wait(1).to({rotation:43.888,x:387.4,y:76.3},0).wait(1).to({rotation:44.9991,x:391,y:74.75},0).wait(1).to({rotation:44.3526,x:388.5,y:74.7},0).wait(1).to({rotation:43.706,x:385.9},0).wait(1).to({rotation:43.0595,x:383.3},0).wait(1).to({rotation:42.4129,x:380.8},0).wait(1).to({rotation:41.7664,x:378.2},0).wait(1).to({rotation:41.1198,x:375.7},0).wait(1).to({rotation:40.4733,x:373.15},0).wait(1).to({rotation:39.8267,x:370.6},0).wait(1).to({rotation:39.1802,x:368.05,y:74.75},0).wait(1).to({rotation:38.5336,x:365.5,y:74.7},0).wait(1).to({rotation:37.8871,x:362.95},0).wait(1).to({rotation:37.2405,x:360.4,y:74.65},0).wait(1).to({rotation:36.594,x:357.85,y:74.7},0).wait(1).to({rotation:35.9474,x:355.3,y:74.65},0).wait(1).to({rotation:35.3009,x:352.75,y:74.7},0).wait(1).to({rotation:34.6543,x:350.2},0).wait(1).to({rotation:34.0078,x:347.6},0).wait(1).to({rotation:33.3612,x:345.05},0).wait(1).to({rotation:32.7147,x:342.5},0).wait(1).to({rotation:32.0681,x:339.95},0).wait(1).to({rotation:31.4216,x:337.4},0).wait(1).to({rotation:30.775,x:334.85,y:74.75},0).wait(1).to({rotation:30.1285,x:332.3,y:74.7},0).wait(1).to({rotation:29.4819,x:329.75,y:74.75},0).wait(1).to({rotation:28.8354,x:327.2,y:74.7},0).wait(1).to({rotation:28.1888,x:324.65,y:74.75},0).wait(1).to({rotation:27.5423,x:322.1,y:74.7},0).wait(1).to({rotation:26.8957,x:319.55,y:74.75},0).wait(1).to({rotation:26.2492,x:317},0).wait(1).to({rotation:25.6027,x:314.45,y:74.7},0).wait(1).to({rotation:24.9561,x:311.9},0).wait(1).to({rotation:24.3096,x:309.3},0).wait(1).to({rotation:23.663,x:306.8,y:74.75},0).wait(1).to({rotation:23.0165,x:304.2,y:74.7},0).wait(1).to({rotation:22.3699,x:301.65},0).wait(1).to({rotation:21.7234,x:299.15},0).wait(1).to({rotation:21.0768,x:296.6},0).wait(1).to({rotation:20.4303,x:294},0).wait(1).to({rotation:19.7837,x:291.5},0).wait(1).to({rotation:19.1372,x:288.95,y:74.75},0).wait(1).to({rotation:18.4906,x:286.4},0).wait(1).to({rotation:17.8441,x:283.8,y:74.7},0).wait(1).to({rotation:17.1975,x:281.25},0).wait(1).to({rotation:16.551,x:278.7,y:74.75},0).wait(1).to({rotation:15.9044,x:276.15},0).wait(1).to({rotation:15.2579,x:273.6},0).wait(1).to({rotation:14.6113,x:271.1},0).wait(1).to({rotation:13.9648,x:268.5,y:74.7},0).wait(1).to({rotation:13.3182,x:265.95,y:74.75},0).wait(1).to({rotation:12.6717,x:263.4},0).wait(1).to({rotation:12.0251,x:260.9,y:74.8},0).wait(1).to({rotation:11.3786,x:258.3,y:74.75},0).wait(1).to({rotation:10.732,x:255.7},0).wait(1).to({rotation:10.0855,x:253.15,y:74.8},0).wait(1).to({rotation:9.4389,x:250.65,y:74.75},0).wait(1).to({rotation:8.7924,x:248.05},0).wait(1).to({rotation:8.1458,x:245.5},0).wait(1).to({rotation:7.4993,x:242.95},0).wait(1).to({rotation:6.8528,x:240.4},0).wait(1).to({rotation:6.2062,x:237.9},0).wait(1).to({rotation:5.5597,x:235.3},0).wait(1).to({rotation:4.9131,x:232.75,y:74.8},0).wait(1).to({rotation:4.2666,x:230.2,y:74.75},0).wait(1).to({rotation:3.62,x:227.65,y:74.8},0).wait(1).to({rotation:2.9735,x:225.1,y:74.75},0).wait(1).to({rotation:2.3269,x:222.55},0).wait(1).to({rotation:1.6804,x:220.05},0).wait(1).to({rotation:1.0338,x:217.45,y:74.8},0).wait(1).to({rotation:0.3873,x:214.95,y:74.75},0).wait(1).to({rotation:-0.2593,x:212.35,y:74.8},0).wait(1).to({rotation:-0.9058,x:209.8},0).wait(1).to({rotation:-1.5524,x:207.25},0).wait(1).to({rotation:-2.1989,x:204.7},0).wait(1).to({rotation:-2.8455,x:202.15,y:74.75},0).wait(1).to({rotation:-3.492,x:199.6,y:74.8},0).wait(1).to({rotation:-4.1386,x:197.05,y:74.75},0).wait(1).to({rotation:-4.7851,x:194.5,y:74.8},0).wait(1).to({rotation:-5.4317,x:191.9},0).wait(1).to({rotation:-6.0782,x:189.4,y:74.75},0).wait(1).to({rotation:-6.7248,x:186.8,y:74.8},0).wait(1).to({rotation:-7.3713,x:184.35},0).wait(1).to({rotation:-8.0179,x:181.75},0).wait(1).to({rotation:-8.6644,x:179.15},0).wait(1).to({rotation:-9.311,x:176.65,y:74.75},0).wait(1).to({rotation:-9.9575,x:174.05,y:74.8},0).wait(1).to({rotation:-10.6041,x:171.5,y:74.85},0).wait(1).to({rotation:-11.2506,x:168.95,y:74.75},0).wait(1).to({rotation:-11.8971,x:166.45,y:74.8},0).wait(1).to({rotation:-12.5437,x:163.85},0).wait(1).to({rotation:-13.1902,x:161.35},0).wait(1).to({rotation:-13.8368,x:158.8},0).wait(1).to({rotation:-14.4833,x:156.2},0).wait(1).to({rotation:-15.1299,x:153.65},0).wait(1).to({rotation:-15.7764,x:151.1},0).wait(1).to({rotation:-16.423,x:148.6},0).wait(1).to({rotation:-17.0695,x:146.05},0).wait(1).to({rotation:-17.7161,x:143.5},0).wait(1).to({rotation:-18.3626,x:140.9},0).wait(1).to({rotation:-19.0092,x:138.35},0).wait(1).to({rotation:-19.6557,x:135.85,y:74.85},0).wait(1).to({rotation:-20.3023,x:133.25,y:74.8},0).wait(1).to({rotation:-20.9488,x:130.7},0).wait(1).to({rotation:-21.5954,x:128.2,y:74.85},0).wait(1).to({rotation:-22.2419,x:125.6,y:74.8},0).wait(1).to({rotation:-22.8885,x:123.05},0).wait(1).to({rotation:-23.535,x:120.5},0).wait(1).to({rotation:-24.1816,x:117.95,y:74.85},0).wait(1).to({rotation:-24.8281,x:115.4},0).wait(1).to({rotation:-25.4747,x:112.85},0).wait(1).to({rotation:-26.1212,x:110.35,y:74.8},0).wait(1).to({rotation:-26.7678,x:107.7},0).wait(1).to({rotation:-27.4143,x:105.2,y:74.85},0).wait(1).to({rotation:-28.0609,x:102.6},0).wait(1).to({rotation:-28.7074,x:100.1},0).wait(1).to({rotation:-29.354,x:97.55,y:74.8},0).wait(1).to({rotation:-30.0005,x:95,y:74.85},0).wait(1).to({rotation:-28.9588,x:99.9,y:76.2},0).wait(1).to({rotation:-27.9172,x:104.8,y:77.7},0).wait(1).to({rotation:-26.8755,x:109.75,y:79.15},0).wait(1).to({rotation:-25.8338,x:114.65,y:80.5},0).wait(1).to({rotation:-24.7921,x:119.55,y:81.95},0).wait(1).to({rotation:-23.7505,x:124.5,y:83.4},0).wait(1).to({rotation:-22.7088,x:129.4,y:84.85},0).wait(1).to({rotation:-21.6671,x:134.3,y:86.25},0).wait(1).to({rotation:-20.6254,x:139.2,y:87.75},0).wait(1).to({rotation:-19.5838,x:144.15,y:89.15},0).wait(1).to({rotation:-18.5421,x:149.1,y:90.55},0).wait(1).to({rotation:-17.5004,x:153.95,y:92},0).wait(1).to({rotation:-16.4587,x:158.9,y:93.4},0).wait(1).to({rotation:-15.4171,x:163.8,y:94.85},0).wait(1).to({rotation:-14.3754,x:168.7,y:96.25},0).wait(1).to({rotation:-13.3337,x:173.6,y:97.7},0).wait(1).to({rotation:-12.292,x:178.6,y:99.1},0).wait(1).to({rotation:-11.2504,x:183.45,y:100.5},0).wait(1).to({rotation:-10.2087,x:188.4,y:102},0).wait(1).to({rotation:-9.167,x:193.3,y:103.45},0).wait(1).to({rotation:-8.1254,x:198.2,y:104.85},0).wait(1).to({rotation:-7.0837,x:203.1,y:106.3},0).wait(1).to({rotation:-6.042,x:208,y:107.7},0).wait(1).to({rotation:-5.0003,x:212.95,y:109.05},0).wait(1).to({rotation:-3.9587,x:217.9,y:110.5},0).wait(1).to({rotation:-2.917,x:222.8,y:111.95},0).wait(1).to({rotation:-1.8753,x:227.75,y:113.4},0).wait(1).to({rotation:-0.8336,x:232.65,y:114.8},0).wait(1).to({rotation:0.208,x:237.6,y:116.25},0).wait(1).to({rotation:1.2497,x:242.5,y:117.7},0).wait(1).to({rotation:2.2914,x:247.4,y:119.05},0).wait(1).to({rotation:3.3331,x:252.35,y:120.55},0).wait(1).to({rotation:4.3747,x:257.25,y:121.95},0).wait(1).to({rotation:5.4164,x:262.15,y:123.4},0).wait(1).to({rotation:6.4581,x:267.1,y:124.85},0).wait(1).to({rotation:7.4998,x:271.95,y:126.25},0).wait(1).to({rotation:8.5414,x:276.9,y:127.7},0).wait(1).to({rotation:9.5831,x:281.8,y:129.15},0).wait(1).to({rotation:10.6248,x:286.75,y:130.6},0).wait(1).to({rotation:11.6664,x:291.65,y:131.95},0).wait(1).to({rotation:12.7081,x:296.6,y:133.4},0).wait(1).to({rotation:13.7498,x:301.45,y:134.85},0).wait(1).to({rotation:14.7915,x:306.4,y:136.25},0).wait(1).to({rotation:15.8331,x:311.3,y:137.7},0).wait(1).to({rotation:16.8748,x:316.25,y:139.15},0).wait(1).to({rotation:17.9165,x:321.15,y:140.55},0).wait(1).to({rotation:18.9582,x:326.1,y:141.95},0).wait(1).to({rotation:19.9998,x:330.95,y:143.4},0).wait(1).to({rotation:21.0415,x:335.9,y:144.85},0).wait(1).to({rotation:22.0832,x:340.85,y:146.25},0).wait(1).to({rotation:23.1249,x:345.75,y:147.7},0).wait(1).to({rotation:24.1665,x:350.65,y:149.1},0).wait(1).to({rotation:25.2082,x:355.55,y:150.55},0).wait(1).to({rotation:26.2499,x:360.5,y:152},0).wait(1).to({rotation:27.2915,x:365.4,y:153.45},0).wait(1).to({rotation:28.3332,x:370.35,y:154.8},0).wait(1).to({rotation:29.3749,x:375.2,y:156.25},0).wait(1).to({rotation:30.4166,x:380.15,y:157.65},0).wait(1).to({rotation:31.4582,x:385.1,y:159.1},0).wait(1).to({rotation:32.4999,x:390,y:160.6},0).wait(1).to({rotation:33.5416,x:394.9,y:162},0).wait(1).to({rotation:34.5833,x:399.8,y:163.4},0).wait(1).to({rotation:35.6249,x:404.75,y:164.8},0).wait(1).to({rotation:36.6666,x:409.65,y:166.25},0).wait(1).to({rotation:37.7083,x:414.55,y:167.7},0).wait(1).to({rotation:38.75,x:419.5,y:169.15},0).wait(1).to({rotation:39.7916,x:424.45,y:170.5},0).wait(1).to({rotation:40.8333,x:429.3,y:172},0).wait(1).to({rotation:41.875,x:434.2,y:173.4},0).wait(1).to({rotation:42.9167,x:439.2,y:174.8},0).wait(1).to({rotation:43.9583,x:444.1,y:176.25},0).wait(1).to({rotation:45,x:449,y:177.75},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.StoryBoard = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,1229];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_1229 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1229).call(this.frame_1229).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(275,200);
	this.___camera___instance.depth = 0;
	this.___camera___instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(720).to({_off:false},0).wait(1).to({scaleX:0.9967,scaleY:0.9967,x:275.9107,y:200.7467},0).wait(1).to({scaleX:0.9935,scaleY:0.9935,x:276.8214,y:201.4935},0).wait(1).to({scaleX:0.9902,scaleY:0.9902,x:277.7321,y:202.2402},0).wait(1).to({scaleX:0.9869,scaleY:0.9869,x:278.6429,y:202.9869},0).wait(1).to({scaleX:0.9837,scaleY:0.9837,x:279.5536,y:203.7336},0).wait(1).to({scaleX:0.9804,scaleY:0.9804,x:280.4643,y:204.4804},0).wait(1).to({scaleX:0.9771,scaleY:0.9771,x:281.375,y:205.2271},0).wait(1).to({scaleX:0.9739,scaleY:0.9739,x:282.2857,y:205.9738},0).wait(1).to({scaleX:0.9706,scaleY:0.9706,x:283.1964,y:206.7205},0).wait(1).to({scaleX:0.9673,scaleY:0.9673,x:284.1071,y:207.4673},0).wait(1).to({scaleX:0.9641,scaleY:0.9641,x:285.0179,y:208.214},0).wait(1).to({scaleX:0.9608,scaleY:0.9608,x:285.9286,y:208.9607},0).wait(1).to({scaleX:0.9575,scaleY:0.9575,x:286.8393,y:209.7074},0).wait(1).to({scaleX:0.9543,scaleY:0.9543,x:287.75,y:210.4542},0).wait(1).to({scaleX:0.951,scaleY:0.951,x:288.6607,y:211.2009},0).wait(1).to({scaleX:0.9477,scaleY:0.9477,x:289.5714,y:211.9476},0).wait(1).to({scaleX:0.9444,scaleY:0.9444,x:290.4821,y:212.6944},0).wait(1).to({scaleX:0.9412,scaleY:0.9412,x:291.3929,y:213.4411},0).wait(1).to({scaleX:0.9379,scaleY:0.9379,x:292.3036,y:214.1878},0).wait(1).to({scaleX:0.9346,scaleY:0.9346,x:293.2143,y:214.9345},0).wait(1).to({scaleX:0.9314,scaleY:0.9314,x:294.125,y:215.6813},0).wait(1).to({scaleX:0.9281,scaleY:0.9281,x:295.0357,y:216.428},0).wait(1).to({scaleX:0.9248,scaleY:0.9248,x:295.9464,y:217.1747},0).wait(1).to({scaleX:0.9216,scaleY:0.9216,x:296.8571,y:217.9214},0).wait(1).to({scaleX:0.9183,scaleY:0.9183,x:297.7679,y:218.6682},0).wait(1).to({scaleX:0.915,scaleY:0.915,x:298.6786,y:219.4149},0).wait(1).to({scaleX:0.9118,scaleY:0.9118,x:299.5893,y:220.1616},0).wait(1).to({scaleX:0.9085,scaleY:0.9085,x:300.5,y:220.9083},0).wait(1).to({scaleX:0.9052,scaleY:0.9052,x:301.4107,y:221.6551},0).wait(1).to({scaleX:0.902,scaleY:0.902,x:302.3214,y:222.4018},0).wait(1).to({scaleX:0.8987,scaleY:0.8987,x:303.2321,y:223.1485},0).wait(1).to({scaleX:0.8954,scaleY:0.8954,x:304.1429,y:223.8952},0).wait(1).to({scaleX:0.8922,scaleY:0.8922,x:305.0536,y:224.642},0).wait(1).to({scaleX:0.8889,scaleY:0.8889,x:305.9643,y:225.3887},0).wait(1).to({scaleX:0.8856,scaleY:0.8856,x:306.875,y:226.1354},0).wait(1).to({scaleX:0.8824,scaleY:0.8824,x:307.7857,y:226.8821},0).wait(1).to({scaleX:0.8791,scaleY:0.8791,x:308.6964,y:227.6289},0).wait(1).to({scaleX:0.8758,scaleY:0.8758,x:309.6071,y:228.3756},0).wait(1).to({scaleX:0.8726,scaleY:0.8726,x:310.5179,y:229.1223},0).wait(1).to({scaleX:0.8693,scaleY:0.8693,x:311.4286,y:229.8691},0).wait(1).to({scaleX:0.866,scaleY:0.866,x:312.3393,y:230.6158},0).wait(1).to({scaleX:0.8628,scaleY:0.8628,x:313.25,y:231.3625},0).wait(1).to({scaleX:0.8595,scaleY:0.8595,x:314.1607,y:232.1092},0).wait(1).to({scaleX:0.8562,scaleY:0.8562,x:315.0714,y:232.856},0).wait(1).to({scaleX:0.853,scaleY:0.853,x:315.9821,y:233.6027},0).wait(1).to({scaleX:0.8497,scaleY:0.8497,x:316.8929,y:234.3494},0).wait(1).to({scaleX:0.8464,scaleY:0.8464,x:317.8036,y:235.0961},0).wait(1).to({scaleX:0.8431,scaleY:0.8431,x:318.7143,y:235.8429},0).wait(1).to({scaleX:0.8399,scaleY:0.8399,x:319.625,y:236.5896},0).wait(1).to({scaleX:0.8366,scaleY:0.8366,x:320.5357,y:237.3363},0).wait(1).to({scaleX:0.8333,scaleY:0.8333,x:321.4464,y:238.083},0).wait(1).to({scaleX:0.8301,scaleY:0.8301,x:322.3571,y:238.8298},0).wait(1).to({scaleX:0.8268,scaleY:0.8268,x:323.2679,y:239.5765},0).wait(1).to({scaleX:0.8235,scaleY:0.8235,x:324.1786,y:240.3232},0).wait(1).to({scaleX:0.8203,scaleY:0.8203,x:325.0893,y:241.0699},0).wait(1).to({scaleX:0.817,scaleY:0.817,x:326,y:241.8167},0).wait(1).to({scaleX:0.8137,scaleY:0.8137,x:326.9107,y:242.5634},0).wait(1).to({scaleX:0.8105,scaleY:0.8105,x:327.8214,y:243.3101},0).wait(1).to({scaleX:0.8072,scaleY:0.8072,x:328.7321,y:244.0569},0).wait(1).to({scaleX:0.8039,scaleY:0.8039,x:329.6429,y:244.8036},0).wait(1).to({scaleX:0.8007,scaleY:0.8007,x:330.5536,y:245.5503},0).wait(1).to({scaleX:0.7974,scaleY:0.7974,x:331.4643,y:246.297},0).wait(1).to({scaleX:0.7941,scaleY:0.7941,x:332.375,y:247.0438},0).wait(1).to({scaleX:0.7909,scaleY:0.7909,x:333.2857,y:247.7905},0).wait(1).to({scaleX:0.7876,scaleY:0.7876,x:334.1964,y:248.5372},0).wait(1).to({scaleX:0.7843,scaleY:0.7843,x:335.1071,y:249.2839},0).wait(1).to({scaleX:0.7811,scaleY:0.7811,x:336.0179,y:250.0307},0).wait(1).to({scaleX:0.7778,scaleY:0.7778,x:336.9286,y:250.7774},0).wait(1).to({scaleX:0.7745,scaleY:0.7745,x:337.8393,y:251.5241},0).wait(1).to({scaleX:0.7713,scaleY:0.7713,x:338.75,y:252.2708},0).wait(1).to({scaleX:0.768,scaleY:0.768,x:339.6607,y:253.0176},0).wait(1).to({scaleX:0.7647,scaleY:0.7647,x:340.5714,y:253.7643},0).wait(1).to({scaleX:0.7615,scaleY:0.7615,x:341.4821,y:254.511},0).wait(1).to({scaleX:0.7582,scaleY:0.7582,x:342.3929,y:255.2577},0).wait(1).to({scaleX:0.7549,scaleY:0.7549,x:343.3036,y:256.0045},0).wait(1).to({scaleX:0.7517,scaleY:0.7517,x:344.2143,y:256.7512},0).wait(1).to({scaleX:0.7484,scaleY:0.7484,x:345.125,y:257.4979},0).wait(1).to({scaleX:0.7451,scaleY:0.7451,x:346.0357,y:258.2446},0).wait(1).to({scaleX:0.7418,scaleY:0.7418,x:346.9464,y:258.9914},0).wait(1).to({scaleX:0.7386,scaleY:0.7386,x:347.8571,y:259.7381},0).wait(1).to({scaleX:0.7353,scaleY:0.7353,x:348.7679,y:260.4848},0).wait(1).to({scaleX:0.732,scaleY:0.732,x:349.6786,y:261.2316},0).wait(1).to({scaleX:0.7288,scaleY:0.7288,x:350.5893,y:261.9783},0).wait(1).to({scaleX:0.7255,scaleY:0.7255,x:351.5,y:262.725},0).wait(1).to({scaleX:0.7222,scaleY:0.7222,x:352.4107,y:263.4717},0).wait(1).to({scaleX:0.719,scaleY:0.719,x:353.3214,y:264.2185},0).wait(1).to({scaleX:0.7157,scaleY:0.7157,x:354.2321,y:264.9652},0).wait(1).to({scaleX:0.7124,scaleY:0.7124,x:355.1429,y:265.7119},0).wait(1).to({scaleX:0.7092,scaleY:0.7092,x:356.0536,y:266.4586},0).wait(1).to({scaleX:0.7059,scaleY:0.7059,x:356.9643,y:267.2054},0).wait(1).to({scaleX:0.7026,scaleY:0.7026,x:357.875,y:267.9521},0).wait(1).to({scaleX:0.6994,scaleY:0.6994,x:358.7857,y:268.6988},0).wait(1).to({scaleX:0.6961,scaleY:0.6961,x:359.6964,y:269.4455},0).wait(1).to({scaleX:0.6928,scaleY:0.6928,x:360.6071,y:270.1923},0).wait(1).to({scaleX:0.6896,scaleY:0.6896,x:361.5179,y:270.939},0).wait(1).to({scaleX:0.6863,scaleY:0.6863,x:362.4286,y:271.6857},0).wait(1).to({scaleX:0.683,scaleY:0.683,x:363.3393,y:272.4324},0).wait(1).to({scaleX:0.6798,scaleY:0.6798,x:364.25,y:273.1792},0).wait(1).to({scaleX:0.6765,scaleY:0.6765,x:365.1607,y:273.9259},0).wait(1).to({scaleX:0.6732,scaleY:0.6732,x:366.0714,y:274.6726},0).wait(1).to({scaleX:0.67,scaleY:0.67,x:366.9821,y:275.4194},0).wait(1).to({scaleX:0.6667,scaleY:0.6667,x:367.8929,y:276.1661},0).wait(1).to({scaleX:0.6634,scaleY:0.6634,x:368.8036,y:276.9128},0).wait(1).to({scaleX:0.6602,scaleY:0.6602,x:369.7143,y:277.6595},0).wait(1).to({scaleX:0.6569,scaleY:0.6569,x:370.625,y:278.4063},0).wait(1).to({scaleX:0.6536,scaleY:0.6536,x:371.5357,y:279.153},0).wait(1).to({scaleX:0.6504,scaleY:0.6504,x:372.4464,y:279.8997},0).wait(1).to({scaleX:0.6471,scaleY:0.6471,x:373.3571,y:280.6464},0).wait(1).to({scaleX:0.6438,scaleY:0.6438,x:374.2679,y:281.3932},0).wait(1).to({scaleX:0.6405,scaleY:0.6405,x:375.1786,y:282.1399},0).wait(1).to({scaleX:0.6373,scaleY:0.6373,x:376.0893,y:282.8866},0).wait(1).to({scaleX:0.634,scaleY:0.634,x:377,y:283.6333},0).wait(1).to({scaleX:0.6307,scaleY:0.6307,x:377.9107,y:284.3801},0).wait(1).to({scaleX:0.6275,scaleY:0.6275,x:378.8214,y:285.1268},0).wait(1).to({scaleX:0.6242,scaleY:0.6242,x:379.7321,y:285.8735},0).wait(1).to({scaleX:0.6209,scaleY:0.6209,x:380.6429,y:286.6202},0).wait(1).to({scaleX:0.6177,scaleY:0.6177,x:381.5536,y:287.367},0).wait(1).to({scaleX:0.6144,scaleY:0.6144,x:382.4643,y:288.1137},0).wait(1).to({scaleX:0.6111,scaleY:0.6111,x:383.375,y:288.8604},0).wait(1).to({scaleX:0.6079,scaleY:0.6079,x:384.2857,y:289.6071},0).wait(1).to({scaleX:0.6046,scaleY:0.6046,x:385.1964,y:290.3539},0).wait(1).to({scaleX:0.6013,scaleY:0.6013,x:386.1071,y:291.1006},0).wait(1).to({scaleX:0.5981,scaleY:0.5981,x:387.0179,y:291.8473},0).wait(1).to({scaleX:0.5948,scaleY:0.5948,x:387.9286,y:292.5941},0).wait(1).to({scaleX:0.5915,scaleY:0.5915,x:388.8393,y:293.3408},0).wait(1).to({scaleX:0.5883,scaleY:0.5883,x:389.75,y:294.0875},0).wait(1).to({scaleX:0.585,scaleY:0.585,x:390.6607,y:294.8342},0).wait(1).to({scaleX:0.5817,scaleY:0.5817,x:391.5714,y:295.5809},0).wait(1).to({scaleX:0.5785,scaleY:0.5785,x:392.4821,y:296.3277},0).wait(1).to({scaleX:0.5752,scaleY:0.5752,x:393.3929,y:297.0744},0).wait(1).to({scaleX:0.5719,scaleY:0.5719,x:394.3036,y:297.8211},0).wait(1).to({scaleX:0.5687,scaleY:0.5687,x:395.2143,y:298.5679},0).wait(1).to({scaleX:0.5654,scaleY:0.5654,x:396.125,y:299.3146},0).wait(1).to({scaleX:0.5621,scaleY:0.5621,x:397.0357,y:300.0613},0).wait(1).to({scaleX:0.5589,scaleY:0.5589,x:397.9464,y:300.808},0).wait(1).to({scaleX:0.5556,scaleY:0.5556,x:398.8571,y:301.5548},0).wait(1).to({scaleX:0.5523,scaleY:0.5523,x:399.7679,y:302.3015},0).wait(1).to({scaleX:0.5491,scaleY:0.5491,x:400.6786,y:303.0482},0).wait(1).to({scaleX:0.5458,scaleY:0.5458,x:401.5893,y:303.7949},0).wait(1).to({scaleX:0.5425,scaleY:0.5425,x:402.5,y:304.5417},0).wait(1).to({scaleX:0.5392,scaleY:0.5392,x:403.4107,y:305.2884},0).wait(1).to({scaleX:0.536,scaleY:0.536,x:404.3214,y:306.0351},0).wait(1).to({scaleX:0.5327,scaleY:0.5327,x:405.2321,y:306.7819},0).wait(1).to({scaleX:0.5294,scaleY:0.5294,x:406.1429,y:307.5286},0).wait(1).to({scaleX:0.5262,scaleY:0.5262,x:407.0536,y:308.2753},0).wait(1).to({scaleX:0.5229,scaleY:0.5229,x:407.9643,y:309.022},0).wait(1).to({scaleX:0.5196,scaleY:0.5196,x:408.875,y:309.7688},0).wait(1).to({scaleX:0.5164,scaleY:0.5164,x:409.7857,y:310.5155},0).wait(1).to({scaleX:0.5131,scaleY:0.5131,x:410.6964,y:311.2622},0).wait(1).to({scaleX:0.5098,scaleY:0.5098,x:411.6071,y:312.0089},0).wait(1).to({scaleX:0.5066,scaleY:0.5066,x:412.5179,y:312.7557},0).wait(1).to({scaleX:0.5033,scaleY:0.5033,x:413.4286,y:313.5024},0).wait(1).to({scaleX:0.5,scaleY:0.5,x:414.3393,y:314.2491},0).wait(1).to({scaleX:0.4968,scaleY:0.4968,x:415.25,y:314.9958},0).wait(1).to({scaleX:0.4935,scaleY:0.4935,x:416.1607,y:315.7426},0).wait(1).to({scaleX:0.4902,scaleY:0.4902,x:417.0714,y:316.4893},0).wait(1).to({scaleX:0.487,scaleY:0.487,x:417.9821,y:317.236},0).wait(1).to({scaleX:0.4837,scaleY:0.4837,x:418.8929,y:317.9827},0).wait(1).to({scaleX:0.4804,scaleY:0.4804,x:419.8036,y:318.7295},0).wait(1).to({scaleX:0.4772,scaleY:0.4772,x:420.7143,y:319.4762},0).wait(1).to({scaleX:0.4739,scaleY:0.4739,x:421.625,y:320.2229},0).wait(1).to({scaleX:0.4706,scaleY:0.4706,x:422.5357,y:320.9696},0).wait(1).to({scaleX:0.4674,scaleY:0.4674,x:423.4464,y:321.7164},0).wait(1).to({scaleX:0.4641,scaleY:0.4641,x:424.3571,y:322.4631},0).wait(1).to({scaleX:0.4608,scaleY:0.4608,x:425.2679,y:323.2098},0).wait(1).to({scaleX:0.4576,scaleY:0.4576,x:426.1786,y:323.9566},0).wait(1).to({scaleX:0.4543,scaleY:0.4543,x:427.0893,y:324.7033},0).wait(1).to({scaleX:0.451,scaleY:0.451,x:428,y:325.45},0).wait(1).to({scaleX:1,scaleY:1,x:275,y:200},0).wait(1).to({scaleX:1.0001,scaleY:1.0001},0).wait(1).to({scaleX:1.0002,scaleY:1.0002},0).wait(2).to({scaleX:1.0003,scaleY:1.0003},0).wait(1).to({scaleX:1.0004,scaleY:1.0004},0).wait(1).to({scaleX:1.0005,scaleY:1.0005},0).wait(2).to({scaleX:1.0006,scaleY:1.0006},0).wait(1).to({scaleX:1.0007,scaleY:1.0007},0).wait(1).to({scaleX:1.0008,scaleY:1.0008},0).wait(1).to({scaleX:1.0009,scaleY:1.0009},0).wait(2).to({scaleX:1.001,scaleY:1.001},0).wait(1).to({scaleX:1.0011,scaleY:1.0011},0).wait(1).to({scaleX:1.0012,scaleY:1.0012},0).wait(1).to({scaleX:1.0013,scaleY:1.0013},0).wait(2).to({scaleX:1.0014,scaleY:1.0014},0).wait(1).to({scaleX:1.0015,scaleY:1.0015},0).wait(1).to({scaleX:1.0016,scaleY:1.0016},0).wait(2).to({scaleX:1.0017,scaleY:1.0017},0).wait(1).to({scaleX:1.0018,scaleY:1.0018},0).wait(1).to({scaleX:1.0019,scaleY:1.0019},0).wait(1).to({scaleX:1.002,scaleY:1.002},0).wait(2).to({scaleX:1.0021,scaleY:1.0021},0).wait(1).to({scaleX:1.0022,scaleY:1.0022},0).wait(1).to({scaleX:1.0023,scaleY:1.0023},0).wait(2).to({scaleX:1.0024,scaleY:1.0024},0).wait(1).to({scaleX:1.0025,scaleY:1.0025},0).wait(1).to({scaleX:1.0026,scaleY:1.0026},0).wait(1).to({scaleX:1.0027,scaleY:1.0027},0).wait(2).to({scaleX:1.0028,scaleY:1.0028},0).wait(1).to({scaleX:1.0029,scaleY:1.0029},0).wait(1).to({scaleX:1.003,scaleY:1.003},0).wait(2).to({scaleX:1.0031,scaleY:1.0031},0).wait(1).to({scaleX:1.0032,scaleY:1.0032},0).wait(1).to({scaleX:1.0033,scaleY:1.0033},0).wait(1).to({scaleX:1.0034,scaleY:1.0034},0).wait(2).to({scaleX:1.0035,scaleY:1.0035},0).wait(1).to({scaleX:1.0036,scaleY:1.0036},0).wait(1).to({scaleX:1.0037,scaleY:1.0037},0).wait(1).to({scaleX:1.0038,scaleY:1.0038},0).wait(2).to({scaleX:1.0039,scaleY:1.0039},0).wait(1).to({scaleX:1.004,scaleY:1.004},0).wait(1).to({scaleX:1.0041,scaleY:1.0041},0).wait(2).to({scaleX:1.0042,scaleY:1.0042},0).wait(1).to({scaleX:1.0043,scaleY:1.0043},0).wait(1).to({scaleX:1.0044,scaleY:1.0044},0).wait(1).to({scaleX:1.0045,scaleY:1.0045},0).wait(2).to({scaleX:1.0046,scaleY:1.0046},0).wait(1).to({scaleX:1.0047,scaleY:1.0047},0).wait(1).to({scaleX:1.0048,scaleY:1.0048},0).wait(2).to({scaleX:1.0049,scaleY:1.0049},0).wait(1).to({scaleX:1.005,scaleY:1.005},0).wait(1).to({scaleX:1.0051,scaleY:1.0051},0).wait(1).to({scaleX:1.0052,scaleY:1.0052},0).wait(2).to({scaleX:1.0053,scaleY:1.0053},0).wait(1).to({scaleX:1.0054,scaleY:1.0054},0).wait(1).to({scaleX:1.0055,scaleY:1.0055},0).wait(1).to({scaleX:1.0056,scaleY:1.0056},0).wait(1).to({scaleX:1,scaleY:1},0).wait(1).to({scaleX:0.9918,scaleY:0.9918,x:276.8231,y:198.2519},0).wait(1).to({scaleX:0.9835,scaleY:0.9835,x:278.6463,y:196.5038},0).wait(1).to({scaleX:0.9753,scaleY:0.9753,x:280.4694,y:194.7556},0).wait(1).to({scaleX:0.9671,scaleY:0.9671,x:282.2925,y:193.0075},0).wait(1).to({scaleX:0.9589,scaleY:0.9589,x:284.1156,y:191.2594},0).wait(1).to({scaleX:0.9506,scaleY:0.9506,x:285.9388,y:189.5113},0).wait(1).to({scaleX:0.9424,scaleY:0.9424,x:287.7619,y:187.7631},0).wait(1).to({scaleX:0.9342,scaleY:0.9342,x:289.585,y:186.015},0).wait(1).to({scaleX:0.9259,scaleY:0.9259,x:291.4081,y:184.2669},0).wait(1).to({scaleX:0.9177,scaleY:0.9177,x:293.2313,y:182.5188},0).wait(1).to({scaleX:0.9095,scaleY:0.9095,x:295.0544,y:180.7706},0).wait(1).to({scaleX:0.9013,scaleY:0.9013,x:296.8775,y:179.0225},0).wait(1).to({scaleX:0.893,scaleY:0.893,x:298.7006,y:177.2744},0).wait(1).to({scaleX:0.8848,scaleY:0.8848,x:300.5238,y:175.5263},0).wait(1).to({scaleX:0.8766,scaleY:0.8766,x:302.3469,y:173.7781},0).wait(1).to({scaleX:0.8683,scaleY:0.8683,x:304.17,y:172.03},0).wait(1).to({scaleX:0.8601,scaleY:0.8601,x:305.9931,y:170.2819},0).wait(1).to({scaleX:0.8519,scaleY:0.8519,x:307.8163,y:168.5338},0).wait(1).to({scaleX:0.8437,scaleY:0.8437,x:309.6394,y:166.7856},0).wait(1).to({scaleX:0.8354,scaleY:0.8354,x:311.4625,y:165.0375},0).wait(1).to({scaleX:0.8272,scaleY:0.8272,x:313.2856,y:163.2894},0).wait(1).to({scaleX:0.819,scaleY:0.819,x:315.1088,y:161.5413},0).wait(1).to({scaleX:0.8107,scaleY:0.8107,x:316.9319,y:159.7931},0).wait(1).to({scaleX:0.8025,scaleY:0.8025,x:318.755,y:158.045},0).wait(1).to({scaleX:0.7943,scaleY:0.7943,x:320.5781,y:156.2969},0).wait(1).to({scaleX:0.786,scaleY:0.786,x:322.4013,y:154.5488},0).wait(1).to({scaleX:0.7778,scaleY:0.7778,x:324.2244,y:152.8006},0).wait(1).to({scaleX:0.7696,scaleY:0.7696,x:326.0475,y:151.0525},0).wait(1).to({scaleX:0.7614,scaleY:0.7614,x:327.8706,y:149.3044},0).wait(1).to({scaleX:0.7531,scaleY:0.7531,x:329.6938,y:147.5563},0).wait(1).to({scaleX:0.7449,scaleY:0.7449,x:331.5169,y:145.8081},0).wait(1).to({scaleX:0.7367,scaleY:0.7367,x:333.34,y:144.06},0).wait(1).to({scaleX:0.7284,scaleY:0.7284,x:335.1631,y:142.3119},0).wait(1).to({scaleX:0.7202,scaleY:0.7202,x:336.9863,y:140.5638},0).wait(1).to({scaleX:0.712,scaleY:0.712,x:338.8094,y:138.8156},0).wait(1).to({scaleX:0.7038,scaleY:0.7038,x:340.6325,y:137.0675},0).wait(1).to({scaleX:0.6955,scaleY:0.6955,x:342.4556,y:135.3194},0).wait(1).to({scaleX:0.6873,scaleY:0.6873,x:344.2788,y:133.5713},0).wait(1).to({scaleX:0.6791,scaleY:0.6791,x:346.1019,y:131.8231},0).wait(1).to({scaleX:0.6708,scaleY:0.6708,x:347.925,y:130.075},0).wait(1).to({scaleX:0.6626,scaleY:0.6626,x:349.7481,y:128.3269},0).wait(1).to({scaleX:0.6544,scaleY:0.6544,x:351.5713,y:126.5788},0).wait(1).to({scaleX:0.6462,scaleY:0.6462,x:353.3944,y:124.8306},0).wait(1).to({scaleX:0.6379,scaleY:0.6379,x:355.2175,y:123.0825},0).wait(1).to({scaleX:0.6297,scaleY:0.6297,x:357.0406,y:121.3344},0).wait(1).to({scaleX:0.6215,scaleY:0.6215,x:358.8638,y:119.5863},0).wait(1).to({scaleX:0.6132,scaleY:0.6132,x:360.6869,y:117.8381},0).wait(1).to({scaleX:0.605,scaleY:0.605,x:362.51,y:116.09},0).wait(1).to({scaleX:0.5968,scaleY:0.5968,x:364.3331,y:114.3419},0).wait(1).to({scaleX:0.5886,scaleY:0.5886,x:366.1563,y:112.5938},0).wait(1).to({scaleX:0.5803,scaleY:0.5803,x:367.9794,y:110.8456},0).wait(1).to({scaleX:0.5721,scaleY:0.5721,x:369.8025,y:109.0975},0).wait(1).to({scaleX:0.5639,scaleY:0.5639,x:371.6256,y:107.3494},0).wait(1).to({scaleX:0.5556,scaleY:0.5556,x:373.4488,y:105.6013},0).wait(1).to({scaleX:0.5474,scaleY:0.5474,x:375.2719,y:103.8531},0).wait(1).to({scaleX:0.5392,scaleY:0.5392,x:377.095,y:102.105},0).wait(1).to({scaleX:0.531,scaleY:0.531,x:378.9181,y:100.3569},0).wait(1).to({scaleX:0.5227,scaleY:0.5227,x:380.7413,y:98.6088},0).wait(1).to({scaleX:0.5145,scaleY:0.5145,x:382.5644,y:96.8606},0).wait(1).to({scaleX:0.5063,scaleY:0.5063,x:384.3875,y:95.1125},0).wait(1).to({scaleX:0.498,scaleY:0.498,x:386.2106,y:93.3644},0).wait(1).to({scaleX:0.4898,scaleY:0.4898,x:388.0338,y:91.6162},0).wait(1).to({scaleX:0.4816,scaleY:0.4816,x:389.8569,y:89.8681},0).wait(1).to({scaleX:0.4734,scaleY:0.4734,x:391.68,y:88.12},0).wait(1).to({scaleX:0.4651,scaleY:0.4651,x:393.5031,y:86.3719},0).wait(1).to({scaleX:0.4569,scaleY:0.4569,x:395.3263,y:84.6238},0).wait(1).to({scaleX:0.4487,scaleY:0.4487,x:397.1494,y:82.8756},0).wait(1).to({scaleX:0.4404,scaleY:0.4404,x:398.9725,y:81.1275},0).wait(1).to({scaleX:0.4322,scaleY:0.4322,x:400.7956,y:79.3794},0).wait(1).to({scaleX:0.424,scaleY:0.424,x:402.6188,y:77.6313},0).wait(1).to({scaleX:0.4157,scaleY:0.4157,x:404.4419,y:75.8831},0).wait(1).to({scaleX:0.4075,scaleY:0.4075,x:406.265,y:74.135},0).wait(1).to({scaleX:0.3993,scaleY:0.3993,x:408.0881,y:72.3869},0).wait(1).to({scaleX:0.3911,scaleY:0.3911,x:409.9113,y:70.6388},0).wait(1).to({scaleX:0.3828,scaleY:0.3828,x:411.7344,y:68.8906},0).wait(1).to({scaleX:0.3746,scaleY:0.3746,x:413.5575,y:67.1425},0).wait(1).to({scaleX:0.3664,scaleY:0.3664,x:415.3806,y:65.3944},0).wait(1).to({scaleX:0.3581,scaleY:0.3581,x:417.2038,y:63.6463},0).wait(1).to({scaleX:0.3499,scaleY:0.3499,x:419.0269,y:61.8981},0).wait(1).to({scaleX:0.3417,scaleY:0.3417,x:420.85,y:60.15},0).wait(1).to({scaleX:1,scaleY:1,x:275,y:200},0).wait(1).to({scaleX:0.9999,scaleY:0.9999},0).wait(1).to({scaleX:0.9997,scaleY:0.9997},0).wait(1).to({scaleX:0.9996,scaleY:0.9996},0).wait(1).to({scaleX:0.9994,scaleY:0.9994},0).wait(1).to({scaleX:0.9993,scaleY:0.9993},0).wait(1).to({scaleX:0.9991,scaleY:0.9991},0).wait(1).to({scaleX:0.999,scaleY:0.999},0).wait(1).to({scaleX:0.9988,scaleY:0.9988},0).wait(1).to({scaleX:0.9987,scaleY:0.9987},0).wait(1).to({scaleX:0.9985,scaleY:0.9985},0).wait(1).to({scaleX:0.9984,scaleY:0.9984},0).wait(1).to({scaleX:0.9982,scaleY:0.9982},0).wait(1).to({scaleX:0.9981,scaleY:0.9981},0).wait(1).to({scaleX:0.9979,scaleY:0.9979},0).wait(1).to({scaleX:0.9978,scaleY:0.9978},0).wait(1).to({scaleX:0.9976,scaleY:0.9976},0).wait(1).to({scaleX:0.9975,scaleY:0.9975},0).wait(1).to({scaleX:0.9973,scaleY:0.9973},0).wait(1).to({scaleX:0.9972,scaleY:0.9972},0).wait(1).to({scaleX:0.997,scaleY:0.997},0).wait(1).to({scaleX:0.9969,scaleY:0.9969},0).wait(1).to({scaleX:0.9967,scaleY:0.9967},0).wait(1).to({scaleX:0.9966,scaleY:0.9966},0).wait(1).to({scaleX:0.9964,scaleY:0.9964},0).wait(1).to({scaleX:0.9963,scaleY:0.9963},0).wait(1).to({scaleX:0.9961,scaleY:0.9961},0).wait(1).to({scaleX:0.996,scaleY:0.996},0).wait(1).to({scaleX:0.9958,scaleY:0.9958},0).wait(1).to({scaleX:0.9957,scaleY:0.9957},0).wait(1).to({scaleX:0.9955,scaleY:0.9955},0).wait(1).to({scaleX:0.9954,scaleY:0.9954},0).wait(1).to({scaleX:0.9952,scaleY:0.9952},0).wait(1).to({scaleX:0.9951,scaleY:0.9951},0).wait(1).to({scaleX:0.9949,scaleY:0.9949},0).wait(1).to({scaleX:0.9948,scaleY:0.9948},0).wait(1).to({scaleX:0.9946,scaleY:0.9946},0).wait(1).to({scaleX:0.9945,scaleY:0.9945},0).wait(1).to({scaleX:0.9943,scaleY:0.9943},0).wait(1).to({scaleX:0.9942,scaleY:0.9942},0).wait(1).to({scaleX:0.994,scaleY:0.994},0).wait(1).to({scaleX:0.9939,scaleY:0.9939},0).wait(1).to({scaleX:0.9937,scaleY:0.9937},0).wait(1).to({scaleX:0.9936,scaleY:0.9936},0).wait(1).to({scaleX:0.9934,scaleY:0.9934},0).wait(1).to({scaleX:0.9933,scaleY:0.9933},0).wait(1).to({scaleX:0.9932,scaleY:0.9932},0).wait(1).to({scaleX:0.993,scaleY:0.993},0).wait(1).to({scaleX:0.9929,scaleY:0.9929},0).wait(1).to({scaleX:0.9927,scaleY:0.9927},0).wait(1).to({scaleX:0.9926,scaleY:0.9926},0).wait(1).to({scaleX:0.9924,scaleY:0.9924},0).wait(1).to({scaleX:0.9923,scaleY:0.9923},0).wait(1).to({scaleX:0.9921,scaleY:0.9921},0).wait(1).to({scaleX:0.992,scaleY:0.992},0).wait(1).to({scaleX:0.9918,scaleY:0.9918},0).wait(1).to({scaleX:0.9917,scaleY:0.9917},0).wait(1).to({scaleX:0.9915,scaleY:0.9915},0).wait(1).to({scaleX:0.9914,scaleY:0.9914},0).wait(1).to({scaleX:0.9912,scaleY:0.9912},0).wait(1).to({scaleX:0.9911,scaleY:0.9911},0).wait(1).to({scaleX:0.9909,scaleY:0.9909},0).wait(1).to({scaleX:0.9908,scaleY:0.9908},0).wait(1).to({scaleX:0.9906,scaleY:0.9906},0).wait(1).to({scaleX:0.9905,scaleY:0.9905},0).wait(1).to({scaleX:0.9903,scaleY:0.9903},0).wait(1).to({scaleX:0.9902,scaleY:0.9902},0).wait(1).to({scaleX:0.99,scaleY:0.99},0).wait(1).to({scaleX:0.9899,scaleY:0.9899},0).wait(1).to({scaleX:0.9897,scaleY:0.9897},0).wait(1).to({scaleX:0.9896,scaleY:0.9896},0).wait(1).to({scaleX:0.9894,scaleY:0.9894},0).wait(1).to({scaleX:0.9893,scaleY:0.9893},0).wait(1).to({scaleX:0.9891,scaleY:0.9891},0).wait(1).to({scaleX:0.989,scaleY:0.989},0).wait(1).to({scaleX:0.9888,scaleY:0.9888},0).wait(1).to({scaleX:0.9887,scaleY:0.9887},0).wait(1).to({scaleX:0.9885,scaleY:0.9885},0).wait(1).to({scaleX:0.9884,scaleY:0.9884},0).wait(1).to({scaleX:0.9882,scaleY:0.9882},0).wait(1).to({scaleX:0.9881,scaleY:0.9881},0).wait(1).to({scaleX:0.9879,scaleY:0.9879},0).wait(1).to({scaleX:0.9878,scaleY:0.9878},0).wait(1).to({scaleX:0.9876,scaleY:0.9876},0).wait(1).to({scaleX:0.9875,scaleY:0.9875},0).wait(1).to({scaleX:0.9873,scaleY:0.9873},0).wait(1).to({scaleX:0.9872,scaleY:0.9872},0).wait(1).to({scaleX:0.987,scaleY:0.987},0).wait(1).to({scaleX:0.9869,scaleY:0.9869},0).wait(1).to({scaleX:0.9867,scaleY:0.9867},0).wait(1).to({scaleX:0.9866,scaleY:0.9866},0).wait(1).to({scaleX:0.9864,scaleY:0.9864},0).wait(1).to({scaleX:0.9863,scaleY:0.9863},0).wait(1).to({scaleX:0.9862,scaleY:0.9862},0).wait(1).to({scaleX:0.986,scaleY:0.986},0).wait(1).to({scaleX:0.9859,scaleY:0.9859},0).wait(1).to({scaleX:0.9857,scaleY:0.9857},0).wait(1).to({scaleX:0.9856,scaleY:0.9856},0).wait(1).to({scaleX:0.9854,scaleY:0.9854},0).wait(1).to({scaleX:0.9853,scaleY:0.9853},0).wait(1).to({scaleX:0.9851,scaleY:0.9851},0).wait(1).to({scaleX:0.985,scaleY:0.985},0).wait(1).to({scaleX:0.9848,scaleY:0.9848},0).wait(1).to({scaleX:0.9847,scaleY:0.9847},0).wait(1).to({scaleX:0.9845,scaleY:0.9845},0).wait(1).to({scaleX:0.9844,scaleY:0.9844},0).wait(1).to({scaleX:0.9842,scaleY:0.9842},0).wait(1).to({scaleX:0.9841,scaleY:0.9841},0).wait(1).to({scaleX:0.9839,scaleY:0.9839},0).wait(1).to({scaleX:0.9838,scaleY:0.9838},0).wait(1).to({scaleX:0.9836,scaleY:0.9836},0).wait(1).to({scaleX:0.9835,scaleY:0.9835},0).wait(1).to({scaleX:0.9833,scaleY:0.9833},0).wait(1).to({scaleX:1,scaleY:1},0).wait(1).to({scaleX:0.9913,scaleY:0.9913,x:274.0581,y:201.7392},0).wait(1).to({scaleX:0.9825,scaleY:0.9825,x:273.1162,y:203.4784},0).wait(1).to({scaleX:0.9738,scaleY:0.9738,x:272.1743,y:205.2176},0).wait(1).to({scaleX:0.965,scaleY:0.965,x:271.2324,y:206.9568},0).wait(1).to({scaleX:0.9563,scaleY:0.9563,x:270.2905,y:208.696},0).wait(1).to({scaleX:0.9476,scaleY:0.9476,x:269.3487,y:210.4351},0).wait(1).to({scaleX:0.9388,scaleY:0.9388,x:268.4068,y:212.1743},0).wait(1).to({scaleX:0.9301,scaleY:0.9301,x:267.4649,y:213.9135},0).wait(1).to({scaleX:0.9214,scaleY:0.9214,x:266.523,y:215.6527},0).wait(1).to({scaleX:0.9126,scaleY:0.9126,x:265.5811,y:217.3919},0).wait(1).to({scaleX:0.9039,scaleY:0.9039,x:264.6392,y:219.1311},0).wait(1).to({scaleX:0.8951,scaleY:0.8951,x:263.6973,y:220.8703},0).wait(1).to({scaleX:0.8864,scaleY:0.8864,x:262.7554,y:222.6095},0).wait(1).to({scaleX:0.8777,scaleY:0.8777,x:261.8135,y:224.3487},0).wait(1).to({scaleX:0.8689,scaleY:0.8689,x:260.8716,y:226.0878},0).wait(1).to({scaleX:0.8602,scaleY:0.8602,x:259.9297,y:227.827},0).wait(1).to({scaleX:0.8515,scaleY:0.8515,x:258.9878,y:229.5662},0).wait(1).to({scaleX:0.8427,scaleY:0.8427,x:258.046,y:231.3054},0).wait(1).to({scaleX:0.834,scaleY:0.834,x:257.104,y:233.0446},0).wait(1).to({scaleX:0.8252,scaleY:0.8252,x:256.1622,y:234.7838},0).wait(1).to({scaleX:0.8165,scaleY:0.8165,x:255.2203,y:236.523},0).wait(1).to({scaleX:0.8078,scaleY:0.8078,x:254.2784,y:238.2622},0).wait(1).to({scaleX:0.799,scaleY:0.799,x:253.3365,y:240.0014},0).wait(1).to({scaleX:0.7903,scaleY:0.7903,x:252.3946,y:241.7405},0).wait(1).to({scaleX:0.7815,scaleY:0.7815,x:251.4527,y:243.4797},0).wait(1).to({scaleX:0.7728,scaleY:0.7728,x:250.5108,y:245.2189},0).wait(1).to({scaleX:0.7641,scaleY:0.7641,x:249.5689,y:246.9581},0).wait(1).to({scaleX:0.7553,scaleY:0.7553,x:248.627,y:248.6973},0).wait(1).to({scaleX:0.7466,scaleY:0.7466,x:247.6851,y:250.4365},0).wait(1).to({scaleX:0.7379,scaleY:0.7379,x:246.7432,y:252.1757},0).wait(1).to({scaleX:0.7291,scaleY:0.7291,x:245.8014,y:253.9149},0).wait(1).to({scaleX:0.7204,scaleY:0.7204,x:244.8595,y:255.6541},0).wait(1).to({scaleX:0.7116,scaleY:0.7116,x:243.9176,y:257.3932},0).wait(1).to({scaleX:0.7029,scaleY:0.7029,x:242.9757,y:259.1324},0).wait(1).to({scaleX:0.6942,scaleY:0.6942,x:242.0338,y:260.8716},0).wait(1).to({scaleX:0.6854,scaleY:0.6854,x:241.0919,y:262.6108},0).wait(1).to({scaleX:0.6767,scaleY:0.6767,x:240.15,y:264.35},0).wait(1).to({scaleX:0.668,scaleY:0.668,x:239.2081,y:266.0892},0).wait(1).to({scaleX:0.6592,scaleY:0.6592,x:238.2662,y:267.8284},0).wait(1).to({scaleX:0.6505,scaleY:0.6505,x:237.3243,y:269.5676},0).wait(1).to({scaleX:0.6417,scaleY:0.6417,x:236.3824,y:271.3068},0).wait(1).to({scaleX:0.633,scaleY:0.633,x:235.4405,y:273.046},0).wait(1).to({scaleX:0.6243,scaleY:0.6243,x:234.4987,y:274.7851},0).wait(1).to({scaleX:0.6155,scaleY:0.6155,x:233.5568,y:276.5243},0).wait(1).to({scaleX:0.6068,scaleY:0.6068,x:232.6149,y:278.2635},0).wait(1).to({scaleX:0.598,scaleY:0.598,x:231.673,y:280.0027},0).wait(1).to({scaleX:0.5893,scaleY:0.5893,x:230.7311,y:281.7419},0).wait(1).to({scaleX:0.5806,scaleY:0.5806,x:229.7892,y:283.4811},0).wait(1).to({scaleX:0.5718,scaleY:0.5718,x:228.8473,y:285.2203},0).wait(1).to({scaleX:0.5631,scaleY:0.5631,x:227.9054,y:286.9595},0).wait(1).to({scaleX:0.5544,scaleY:0.5544,x:226.9635,y:288.6987},0).wait(1).to({scaleX:0.5456,scaleY:0.5456,x:226.0216,y:290.4378},0).wait(1).to({scaleX:0.5369,scaleY:0.5369,x:225.0797,y:292.177},0).wait(1).to({scaleX:0.5281,scaleY:0.5281,x:224.1378,y:293.9162},0).wait(1).to({scaleX:0.5194,scaleY:0.5194,x:223.196,y:295.6554},0).wait(1).to({scaleX:0.5107,scaleY:0.5107,x:222.2541,y:297.3946},0).wait(1).to({scaleX:0.5019,scaleY:0.5019,x:221.3122,y:299.1338},0).wait(1).to({scaleX:0.4932,scaleY:0.4932,x:220.3703,y:300.873},0).wait(1).to({scaleX:0.4845,scaleY:0.4845,x:219.4284,y:302.6122},0).wait(1).to({scaleX:0.4757,scaleY:0.4757,x:218.4865,y:304.3514},0).wait(1).to({scaleX:0.467,scaleY:0.467,x:217.5446,y:306.0905},0).wait(1).to({scaleX:0.4582,scaleY:0.4582,x:216.6027,y:307.8297},0).wait(1).to({scaleX:0.4495,scaleY:0.4495,x:215.6608,y:309.5689},0).wait(1).to({scaleX:0.4408,scaleY:0.4408,x:214.7189,y:311.3081},0).wait(1).to({scaleX:0.432,scaleY:0.432,x:213.777,y:313.0473},0).wait(1).to({scaleX:0.4233,scaleY:0.4233,x:212.8351,y:314.7865},0).wait(1).to({scaleX:0.4145,scaleY:0.4145,x:211.8932,y:316.5257},0).wait(1).to({scaleX:0.4058,scaleY:0.4058,x:210.9514,y:318.2649},0).wait(1).to({scaleX:0.3971,scaleY:0.3971,x:210.0095,y:320.0041},0).wait(1).to({scaleX:0.3883,scaleY:0.3883,x:209.0676,y:321.7432},0).wait(1).to({scaleX:0.3796,scaleY:0.3796,x:208.1257,y:323.4824},0).wait(1).to({scaleX:0.3709,scaleY:0.3709,x:207.1838,y:325.2216},0).wait(1).to({scaleX:0.3621,scaleY:0.3621,x:206.2419,y:326.9608},0).wait(1).to({scaleX:0.3534,scaleY:0.3534,x:205.3,y:328.7},0).wait(1));

	// zahal_obj_
	this.zahal = new lib.Scene_1_zahal();
	this.zahal.name = "zahal";
	this.zahal.setTransform(-49.7,293,1,1,0,0,0,-49.7,293);
	this.zahal.depth = 0;
	this.zahal.isAttachedToCamera = 0
	this.zahal.isAttachedToMask = 0
	this.zahal.layerDepth = 0
	this.zahal.layerIndex = 0
	this.zahal.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.zahal).wait(1).to({regX:228.3,regY:322.7,x:228.3,y:322.7},0).wait(192).to({regX:-49.7,regY:293,x:-49.7,y:293},0).wait(1).to({regX:228.3,regY:322.7,x:228.3,y:322.7},0).wait(61).to({regX:-49.7,regY:293,x:-49.7,y:293},0).wait(788).to({regX:228.3,regY:322.7,x:228.3,y:322.7},0).wait(187));

	// butterfly_obj_
	this.butterfly = new lib.Scene_1_butterfly();
	this.butterfly.name = "butterfly";
	this.butterfly.depth = 0;
	this.butterfly.isAttachedToCamera = 0
	this.butterfly.isAttachedToMask = 0
	this.butterfly.layerDepth = 0
	this.butterfly.layerIndex = 1
	this.butterfly.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.butterfly).wait(721).to({regX:297.5,regY:204,x:297.5,y:204},0).wait(168).to({regX:0,regY:0,x:0,y:0},0).wait(1).to({regX:297.5,regY:204,x:297.5,y:204},0).wait(340));

	// grass_1_obj_
	this.grass_1 = new lib.Scene_1_grass_1();
	this.grass_1.name = "grass_1";
	this.grass_1.setTransform(218,292.1,1,1,0,0,0,218,292.1);
	this.grass_1.depth = 0;
	this.grass_1.isAttachedToCamera = 0
	this.grass_1.isAttachedToMask = 0
	this.grass_1.layerDepth = 0
	this.grass_1.layerIndex = 2
	this.grass_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.grass_1).wait(1).to({regX:290.7,regY:290.4,x:290.7,y:290.4},0).wait(192).to({regX:218,regY:292.1,x:218,y:292.1},0).wait(1).to({regX:290.7,regY:290.4,x:290.7,y:290.4},0).wait(526).to({regX:218,regY:292.1,x:218,y:292.1},0).wait(1).to({regX:290.7,regY:290.4,x:290.7,y:290.4},0).wait(509));

	// clouds_obj_
	this.clouds = new lib.Scene_1_clouds();
	this.clouds.name = "clouds";
	this.clouds.setTransform(482.5,111.6,1,1,0,0,0,482.5,111.6);
	this.clouds.depth = 0;
	this.clouds.isAttachedToCamera = 0
	this.clouds.isAttachedToMask = 0
	this.clouds.layerDepth = 0
	this.clouds.layerIndex = 3
	this.clouds.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.clouds).wait(1).to({regX:56.5,regY:406.1,x:56.5,y:406.1},0).wait(192).to({regX:482.5,regY:111.6,x:482.5,y:111.6},0).wait(1).to({regX:56.5,regY:406.1,x:56.5,y:406.1},0).wait(259).to({regX:482.5,regY:111.6,x:482.5,y:111.6},0).wait(153).to({regX:56.5,regY:406.1,x:56.5,y:406.1},0).wait(114).to({regX:482.5,regY:111.6,x:482.5,y:111.6},0).wait(1).to({regX:56.5,regY:406.1,x:56.5,y:406.1},0).wait(509));

	// sun_obj_
	this.sun = new lib.Scene_1_sun();
	this.sun.name = "sun";
	this.sun.setTransform(419.2,98.3,1,1,0,0,0,419.2,98.3);
	this.sun.depth = 0;
	this.sun.isAttachedToCamera = 0
	this.sun.isAttachedToMask = 0
	this.sun.layerDepth = 0
	this.sun.layerIndex = 4
	this.sun.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.sun).wait(338).to({regX:256.4,regY:346.8,x:256.4,y:346.8},0).wait(70).to({regX:419.2,regY:98.3,x:419.2,y:98.3},0).wait(198).to({regX:256.4,regY:346.8,x:256.4,y:346.8},0).wait(114).to({regX:419.2,regY:98.3,x:419.2,y:98.3},0).wait(510));

	// stars_obj_
	this.stars = new lib.Scene_1_stars();
	this.stars.name = "stars";
	this.stars.depth = 0;
	this.stars.isAttachedToCamera = 0
	this.stars.isAttachedToMask = 0
	this.stars.layerDepth = 0
	this.stars.layerIndex = 5
	this.stars.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.stars).wait(409).to({regX:288.5,regY:196.5,x:288.5,y:196.5},0).wait(195).to({regX:0,regY:0,x:0,y:0},0).wait(1).to({regX:288.5,regY:196.5,x:288.5,y:196.5},0).wait(114).to({_off:true},1).wait(510));

	// sky_obj_
	this.sky = new lib.Scene_1_sky();
	this.sky.name = "sky";
	this.sky.setTransform(290.9,204.8,1,1,0,0,0,290.9,204.8);
	this.sky.depth = 0;
	this.sky.isAttachedToCamera = 0
	this.sky.isAttachedToMask = 0
	this.sky.layerDepth = 0
	this.sky.layerIndex = 6
	this.sky.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.sky).wait(719).to({_off:true},1).wait(510));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-617.1,-35,1622.2,866.2);
// library properties:
lib.properties = {
	id: 'FCBE89EEFBB6420AAFE20F0F800F069D',
	width: 550,
	height: 400,
	fps: 24,
	color: "#66FFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/StoryBoard_atlas_1.png?1588273866979", id:"StoryBoard_atlas_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['FCBE89EEFBB6420AAFE20F0F800F069D'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;