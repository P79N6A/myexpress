define(function(){
    // var scene = new THREE.Scene();
    // var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // camera.position.z = 5;

    // //创建canvas
    // var renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);// 将renderer创建的canvas追加到body中
    
    
    // // create the cube we'll display on the canvas
    // var cube;

    // var loader = new THREE.TextureLoader();

    // loader.load( 'http://localhost:3000/express/static/img/walk-right.png', function (texture) {
    //     texture.wrapS = THREE.RepeatWrapping;
    //     texture.wrapT = THREE.RepeatWrapping;
    //     texture.repeat.set(2, 2);

    //     var geometry = new THREE.BoxGeometry(2.4, 2.4, 2.4);
    //     var material = new THREE.MeshLambertMaterial( { map: texture, shading: THREE.FlatShading } );
    //     cube = new THREE.Mesh(geometry, material);
    //     scene.add(cube);

    //     draw();
    // });


    // //add a couple of lights to the scene, to liven things up a bit; add the following blocks next
    // var light = new THREE.AmbientLight('rgb(255, 255, 255)'); // soft white light
    // scene.add(light);

    // var spotLight = new THREE.SpotLight('rgb(255, 255, 255)');
    // spotLight.position.set( 100, 1000, 1000 );
    // spotLight.castShadow = true;
    // scene.add(spotLight);

    // //
    // function draw() {
    //     cube.rotation.x += 0.01;
    //     cube.rotation.y += 0.01;
    //     renderer.render(scene, camera);
      
    //     requestAnimationFrame(draw);
    // }



    var SCREEN_WIDTH = window.innerWidth;
    var SCREEN_HEIGHT = window.innerHeight;
    var FLOOR = -250;
    var container,stats;
    var camera, scene;
    var renderer;
    var mesh, mesh2, helper;
    var mixer, facesClip, bonesClip;
    var mouseX = 0, mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var clock = new THREE.Clock();
    var domMemInfo = document.getElementById( 'meminfo' ),
        showMemInfo = false;
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    init();
    animate();
    function init() {
        container = document.getElementById( 'container' );
        camera = new THREE.PerspectiveCamera( 30, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
        camera.position.z = 2200;
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xffffff );
        scene.fog = new THREE.Fog( 0xffffff, 2000, 10000 );
        scene.add( camera );
        // GROUND
        var geometry = new THREE.PlaneBufferGeometry( 16000, 16000 );
        var material = new THREE.MeshPhongMaterial( { emissive: 0x888888 } );
        var ground = new THREE.Mesh( geometry, material );
        ground.position.set( 0, FLOOR, 0 );
        ground.rotation.x = -Math.PI/2;
        scene.add( ground );
        ground.receiveShadow = true;
        // LIGHTS
        scene.add( new THREE.HemisphereLight( 0x111111, 0x444444 ) );
        var light = new THREE.DirectionalLight( 0xebf3ff, 1.5 );
        light.position.set( 0, 140, 500 ).multiplyScalar( 1.1 );
        scene.add( light );
        light.castShadow = true;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        var d = 390;
        light.shadow.camera.left = -d;
        light.shadow.camera.right = d;
        light.shadow.camera.top = d * 1.5;
        light.shadow.camera.bottom = -d;
        light.shadow.camera.far = 3500;
        // RENDERER
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        renderer.domElement.style.position = "relative";
        container.appendChild( renderer.domElement );
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.shadowMap.enabled = true;
        // STATS
        stats = new Stats();
        container.appendChild( stats.dom );
        //
        var loader = new THREE.JSONLoader();
        loader.load( "models/skinned/knight.js", function ( geometry, materials ) {
            createScene( geometry, materials, 0, FLOOR, -300, 60 );
            // GUI
            initGUI();
        } );
        //
        window.addEventListener( 'resize', onWindowResize, false );
    }
    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    function createScene( geometry, materials, x, y, z, s ) {
        geometry.computeBoundingBox();
        var bb = geometry.boundingBox;
        for ( var i = 0; i < materials.length; i ++ ) {
            var m = materials[ i ];
            m.skinning = true;
            m.morphTargets = true;
            m.specular.setHSL( 0, 0, 0.1 );
            m.color.setHSL( 0.6, 0, 0.6 );
        }
        mesh = new THREE.SkinnedMesh( geometry, materials );
        mesh.name = "Knight Mesh";
        mesh.position.set( x, y - bb.min.y * s, z );
        mesh.scale.set( s, s, s );
        scene.add( mesh );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh2 = new THREE.SkinnedMesh( geometry, materials );
        mesh2.name = "Lil' Bro Mesh";
        mesh2.position.set( x - 240, y - bb.min.y * s, z + 500 );
        mesh2.scale.set( s / 2, s / 2, s / 2 );
        mesh2.rotation.y = THREE.Math.degToRad( 60 );
        mesh2.visible = false;
        mesh2.castShadow = true;
        mesh2.receiveShadow = true;
        scene.add( mesh2 );
        helper = new THREE.SkeletonHelper( mesh );
        helper.visible = false;
        scene.add( helper );
        mixer = new THREE.AnimationMixer( mesh );
        bonesClip = geometry.animations[0];
        facesClip = THREE.AnimationClip.CreateFromMorphTargetSequence( 'facialExpressions', mesh.geometry.morphTargets, 3 );
    }
    function initGUI() {
        var API = {
            'show model'    	: true,
            'show skeleton'		: false,
            'show 2nd model'	: false,
            'show mem. info'	: false
        };
        var gui = new dat.GUI();
        gui.add( API, 'show model' ).onChange( function() {
                mesh.visible = API[ 'show model' ];
        } );
        gui.add( API, 'show skeleton' ).onChange( function() {
                helper.visible = API[ 'show skeleton' ];
        } );
        gui.add( API, 'show 2nd model' ).onChange( function() {
                mesh2.visible = API[ 'show 2nd model' ];
        } );
        gui.add( API, 'show mem. info' ).onChange( function() {
            showMemInfo = API[ 'show mem. info' ];
            domMemInfo.style.display = showMemInfo ? 'block' : 'none';
        } );
        // utility function used for drop-down options lists in the GUI
        var objectNames = function( objects ) {
            var result = [];
            for ( var i = 0, n = objects.length; i !== n; ++ i ) {
                var obj = objects[ i ];
                result.push( obj && obj.name || '&lt;null&gt;' );
            }
            return result;
        };
        // creates gui folder with tests / examples for the action API
        var clipControl = function clipControl( gui, mixer, clip, rootObjects ) {
            var folder = gui.addFolder( "Clip '" + clip.name + "'" ),
                rootNames = objectNames( rootObjects ),
                rootName = rootNames[ 0 ],
                root = rootObjects[ 0 ],
                action = null,
                API = {
                    'play()': function play() {
                        action = mixer.clipAction( clip, root );
                        action.play();
                    },
                    'stop()': function() {
                        action = mixer.clipAction( clip, root );
                        action.stop();
                    },
                    'reset()': function() {
                        action = mixer.clipAction( clip, root );
                        action.reset();
                    },
                    get 'time ='() {
                        return action !== null ? action.time : 0;
                    },
                    set 'time ='( value ) {
                        action = mixer.clipAction( clip, root );
                        action.time = value;
                    },
                    get 'paused ='() {
                        return action !== null && action.paused;
                    },
                    set 'paused ='( value ) {
                        action = mixer.clipAction( clip, root );
                        action.paused = value;
                    },
                    get 'enabled ='() {
                        return action !== null && action.enabled;
                    },
                    set 'enabled ='( value ) {
                        action = mixer.clipAction( clip, root );
                        action.enabled = value;
                    },
                    get 'clamp ='() {
                        return action !== null ? action.clampWhenFinished : false;
                    },
                    set 'clamp ='( value ) {
                        action = mixer.clipAction( clip, root );
                        action.clampWhenFinished = value;
                    },
                    get 'isRunning() ='() {
                        return action !== null && action.isRunning();
                    },
                    set 'isRunning() ='( value ) {
                        alert( "Read only - this is the result of a method." );
                    },
                    'play delayed': function() {
                        action = mixer.clipAction( clip, root );
                        action.startAt( mixer.time + 0.5 ).play();
                    },
                    get 'weight ='() {
                        return action !== null ? action.weight : 1;
                    },
                    set 'weight ='( value ) {
                        action = mixer.clipAction( clip, root );
                        action.weight = value;
                    },
                    get 'eff. weight'() {
                        return action !== null ? action.getEffectiveWeight() : 1;
                    },
                    set 'eff. weight'( value ) {
                        action = mixer.clipAction( clip, root );
                        action.setEffectiveWeight( value );
                    },
                    'fade in': function() {
                        action = mixer.clipAction( clip, root );
                        action.reset().fadeIn( 0.25 ).play();
                    },
                    'fade out': function() {
                        action = mixer.clipAction( clip, root );
                        action.fadeOut( 0.25 ).play();
                    },
                    get 'timeScale ='() {
                        return ( action !== null ) ? action.timeScale : 1;
                    },
                    set 'timeScale ='( value ) {
                        action = mixer.clipAction( clip, root );
                        action.timeScale = value;
                    },
                    get 'eff.T.Scale'() {
                        return ( action !== null ) ? action.getEffectiveTimeScale() : 1;
                    },
                    set 'eff.T.Scale'( value ) {
                        action = mixer.clipAction( clip, root );
                        action.setEffectiveTimeScale( value );
                    },
                    'time warp': function() {
                        action = mixer.clipAction( clip, root );
                        var timeScaleNow = action.getEffectiveTimeScale();
                        var destTimeScale = timeScaleNow > 0 ? -1 : 1;
                        action.warp( timeScaleNow, destTimeScale, 4 ).play();
                    },
                    get 'loop mode'() {
                        return action !== null ? action.loop : THREE.LoopRepeat;
                    },
                    set 'loop mode'( value ) {
                        action = mixer.clipAction( clip, root );
                        action.loop = + value;
                    },
                    get 'repetitions'() {
                        return action !== null ? action.repetitions : Infinity;
                    },
                    set 'repetitions'( value ) {
                        action = mixer.clipAction( clip, root );
                        action.repetitions = + value;
                    },
                    get 'local root'() { return rootName; },
                    set 'local root'( value ) {
                        rootName = value;
                        root = rootObjects[ rootNames.indexOf( rootName ) ];
                        action = mixer.clipAction( clip, root );
                    }
                };
            folder.add( API, 'play()' );
            folder.add( API, 'stop()' );
            folder.add( API, 'reset()' );
            folder.add( API, 'time =', 0, clip.duration ).listen();
            folder.add( API, 'paused =' ).listen();
            folder.add( API, 'enabled =' ).listen();
            folder.add( API, 'clamp =' );
            folder.add( API, 'isRunning() =').listen();
            folder.add( API, 'play delayed' );
            folder.add( API, 'weight =', 0, 1 ).listen();
            folder.add( API, 'eff. weight', 0, 1 ).listen();
            folder.add( API, 'fade in' );
            folder.add( API, 'fade out' );
            folder.add( API, 'timeScale =', -2, 2).listen();
            folder.add( API, 'eff.T.Scale', -2, 2).listen();
            folder.add( API, 'time warp' );
            folder.add( API, 'loop mode', {
                "LoopOnce": THREE.LoopOnce,
                "LoopRepeat": THREE.LoopRepeat,
                "LoopPingPong": THREE.LoopPingPong
            } );
            folder.add( API, 'repetitions', 0, Infinity );
            folder.add( API, 'local root', rootNames );
            API[ 'play()' ]();
        }; // function clipControl
        // one folder per clip
        clipControl( gui, mixer, bonesClip, [ null, mesh, mesh2 ] );
        clipControl( gui, mixer, facesClip, [ null, mesh, mesh2 ] );
        var memoryControl = function( gui, mixer, clips, rootObjects ) {
            var clipNames = objectNames( clips ),
                rootNames = objectNames( rootObjects );
            var folder = gui.addFolder( "Memory Management" ),
                clipName 	= clipNames[ 0 ],
                clip 		= clips[ 0 ],
                rootName 	= rootNames[ 0 ],
                root		= rootObjects[ 0 ],
                API = {
                    get 'clip'() { return clipName; },
                    set 'clip'( value ) {
                        clipName = value;
                        clip = clips[ clipNames.indexOf( clipName ) ];
                    },
                    get 'root'() { return rootName; },
                    set 'root'( value ) {
                        rootName = value;
                        root = rootObjects[ rootNames.indexOf( rootName ) ];
                    },
                    'uncache clip': function() {
                        mixer.uncacheClip( clip );
                    },
                    'uncache root': function() {
                        mixer.uncacheRoot( root );
                    },
                    'uncache action': function() {
                        mixer.uncacheAction( clip, root );
                    }
                };
            folder.add( API, 'clip', clipNames );
            folder.add( API, 'root', rootNames );
            folder.add( API, 'uncache root' );
            folder.add( API, 'uncache clip' );
            folder.add( API, 'uncache action' );
        };
        memoryControl( gui, mixer,
                [ bonesClip, facesClip ], [ mesh, mesh2 ] );
    }
    function onDocumentMouseMove( event ) {
        mouseX = ( event.clientX - windowHalfX );
        mouseY = ( event.clientY - windowHalfY );
    }
    //
    function animate() {
        requestAnimationFrame( animate );
        stats.begin();
        render();
        stats.end();
        if ( showMemInfo ) {
            var s = mixer.stats,
                ciS = s.controlInterpolants;
            domMemInfo.innerHTML =
                    s.actions.inUse + " / " + s.actions.total + " actions " +
                    s.bindings.inUse + " / " + s.bindings.total + " bindings " +
                    ciS.inUse + " / " + ciS.total + " control interpolants";
        }
    }
    function render() {
        var delta = 0.75 * clock.getDelta();
        camera.position.x += ( mouseX - camera.position.x ) * .05;
        camera.position.y = THREE.Math.clamp( camera.position.y + ( - mouseY - camera.position.y ) * .05, 0, 1000 );
        camera.lookAt( scene.position );
        if( mixer ) {
            mixer.update( delta );
        }
        renderer.render( scene, camera );
    }
});