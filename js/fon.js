function getPoint() {
    var u = Math.random();
    var v = Math.random();
    var theta = u * 2.0 * Math.PI;
    var phi = Math.acos(2.0 * v - 1.0);
    var r = Math.cbrt(Math.random());
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    var sinPhi = Math.sin(phi);
    var cosPhi = Math.cos(phi);
    var x = r * sinPhi * cosTheta;
    var y = r * sinPhi * sinTheta;
    var z = r * cosPhi;
    return { x: x, y: y, z: z };
  }

  class Sketch {
    constructor(options) {
      this.scene = new THREE.Scene();

      this.container = options.dom;
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
      this.renderer.setSize(this.width, this.height);
      this.renderer.setClearColor(0x000000, 1);

      this.container.appendChild(this.renderer.domElement);

      this.camera = new THREE.PerspectiveCamera(
        70,
        this.width / this.height,
        0.01,
        1000
      );

      this.camera.position.set(0, 0, 3);

      this.time = 0;
      this.mouse = { x: 0, y: 0 };

      this.addObjects();
      this.resize();
      this.render();
      this.setupResize();
      this.addMouseEvents();
      this.animateText();
    }

    setupResize() {
      window.addEventListener("resize", this.resize.bind(this));
    }

    resize() {
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;
      this.renderer.setSize(this.width, this.height);
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
    }

    addMouseEvents() {
      window.addEventListener("mousemove", (event) => {
        this.mouse.x = (event.clientX / this.width) * 2 - 1;
        this.mouse.y = -(event.clientY / this.height) * 2 + 1;
      });
    }

    addObjects() {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load('https://threejs.org/examples/textures/sprites/disc.png');

      this.material = new THREE.PointsMaterial({
        size: 0.02,
        sizeAttenuation: true,
        map: texture,
        alphaTest: 0.5,
        transparent: true,
        vertexColors: true,
      });

      this.geometry = new THREE.BufferGeometry();
      let vertices = [];
      let colors = [];

      for (let i = 0; i < 5000; i++) {
        let p = getPoint();
        vertices.push(4 * p.x, 4 * p.y, 4 * p.z);

        // Random color
        colors.push(1, 1, 0);
      }

      this.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(vertices, 3)
      );
      this.geometry.setAttribute(
        'color',
        new THREE.Float32BufferAttribute(colors, 3)
      );

      this.points = new THREE.Points(this.geometry, this.material);
      this.scene.add(this.points);
    }

    animateText() {
      const textElements = document.querySelectorAll('.section');
      console.log(textElements)
      textElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('text-visible');
        }, index * 1000);
      });
    }

    render() {
      this.time += 0.01;

      // Интерактивность: вращение сцены на основе движения мыши
      this.scene.rotation.x = this.mouse.y * 0.5;
      this.scene.rotation.y = this.mouse.x * 0.5;

      // Анимация появления частиц
      const positions = this.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(this.time + i) * 0.001; // x
        positions[i + 1] += Math.cos(this.time + i) * 0.001; // y
        positions[i + 2] += Math.sin(this.time + i) * 0.002; // z
      }
      this.geometry.attributes.position.needsUpdate = true;

      requestAnimationFrame(this.render.bind(this));
      this.renderer.render(this.scene, this.camera);
    }
  }

  new Sketch({
    dom: document.getElementById("container"),
  });