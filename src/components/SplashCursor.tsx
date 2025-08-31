import React, { useEffect, useRef } from "react";

type RGB = { r: number; g: number; b: number };

export type SplashCursorProps = {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: RGB;
  TRANSPARENT?: boolean;
  className?: string;
};

function SplashCursor({
  SIM_RESOLUTION = 96,
  DYE_RESOLUTION = 640,
  CAPTURE_RESOLUTION = 384,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 4000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 8,
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT = true,
  className,
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function pointerPrototype(this: any) {
      this.id = -1;
      this.texcoordX = 0;
      this.texcoordY = 0;
      this.prevTexcoordX = 0;
      this.prevTexcoordY = 0;
      this.deltaX = 0;
      this.deltaY = 0;
      this.down = false;
      this.moved = false;
      this.color = [0, 0, 0];
    }

    let config = {
      SIM_RESOLUTION,
      DYE_RESOLUTION,
      CAPTURE_RESOLUTION,
      DENSITY_DISSIPATION,
      VELOCITY_DISSIPATION,
      PRESSURE,
      PRESSURE_ITERATIONS,
      CURL,
      SPLAT_RADIUS,
      SPLAT_FORCE,
      SHADING,
      COLOR_UPDATE_SPEED,
      PAUSED: false,
      BACK_COLOR,
      TRANSPARENT,
    } as any;

    let pointers: any[] = [new (pointerPrototype as any)()];

    function getWebGLContext(canvasEl: HTMLCanvasElement) {
      const params: WebGLContextAttributes = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };
      let gl = canvasEl.getContext("webgl2", params) as WebGL2RenderingContext | null;
      const isWebGL2 = !!gl;
      if (!isWebGL2) {
        gl =
          (canvasEl.getContext("webgl", params) as unknown as WebGL2RenderingContext) ||
          (canvasEl.getContext("experimental-webgl", params) as unknown as WebGL2RenderingContext);
      }

      let halfFloat: any;
      let supportLinearFiltering: any;
      if ((gl as any).getParameter) {
        if (isWebGL2) {
          (gl as any).getExtension("EXT_color_buffer_float");
          supportLinearFiltering = (gl as any).getExtension("OES_texture_float_linear");
        } else {
          halfFloat = (gl as any).getExtension("OES_texture_half_float");
          supportLinearFiltering = (gl as any).getExtension("OES_texture_half_float_linear");
        }
        (gl as any).clearColor(0.0, 0.0, 0.0, 1.0);
      }

      const halfFloatTexType = (isWebGL2
        ? (gl as any).HALF_FLOAT
        : halfFloat && halfFloat.HALF_FLOAT_OES) as number;
      let formatRGBA: any;
      let formatRG: any;
      let formatR: any;

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl as any, (gl as any).RGBA16F, (gl as any).RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl as any, (gl as any).RG16F, (gl as any).RG, halfFloatTexType);
        formatR = getSupportedFormat(gl as any, (gl as any).R16F, (gl as any).RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl as any, (gl as any).RGBA, (gl as any).RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl as any, (gl as any).RGBA, (gl as any).RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl as any, (gl as any).RGBA, (gl as any).RGBA, halfFloatTexType);
      }

      return {
        gl: gl as any,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering,
        },
      } as const;
    }

    function getSupportedFormat(gl: any, internalFormat: number, format: number, type: number) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case gl.R16F:
            return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
          case gl.RG16F:
            return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
          default:
            return null;
        }
      }
      return { internalFormat, format };
    }

    function supportRenderTextureFormat(gl: any, internalFormat: number, format: number, type: number) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      return status === gl.FRAMEBUFFER_COMPLETE;
    }

    function hashCode(s: string) {
      if (s.length === 0) return 0;
      let hash = 0;
      for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0; // Convert to 32bit int
      }
      return hash;
    }

    class Material {
      vertexShader: any;
      fragmentShaderSource: any;
      programs: any[];
      activeProgram: any;
      uniforms: any;
      constructor(vertexShader: any, fragmentShaderSource: any) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
        this.programs = [];
        this.activeProgram = null;
        this.uniforms = [];
      }
      setKeywords(keywords: string[]) {
        let hash = 0;
        for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);
        let program = this.programs[hash];
        if (program == null) {
          let fragmentShader = compileShader((gl as any).FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
          program = createProgram(this.vertexShader, fragmentShader);
          this.programs[hash] = program;
        }
        if (program === this.activeProgram) return;
        this.uniforms = getUniforms(program);
        this.activeProgram = program;
      }
      bind() {
        (gl as any).useProgram(this.activeProgram);
      }
    }

    class Program {
      uniforms: any;
      program: any;
      constructor(vertexShader: any, fragmentShader: any) {
        this.uniforms = {};
        this.program = createProgram(vertexShader, fragmentShader);
        this.uniforms = getUniforms(this.program);
      }
      bind() {
        (gl as any).useProgram(this.program);
      }
    }

    function createProgram(vertexShader: any, fragmentShader: any) {
      let program = (gl as any).createProgram();
      (gl as any).attachShader(program, vertexShader);
      (gl as any).attachShader(program, fragmentShader);
      (gl as any).linkProgram(program);
      if (!(gl as any).getProgramParameter(program, (gl as any).LINK_STATUS))
        console.trace((gl as any).getProgramInfoLog(program));
      return program;
    }

    function getUniforms(program: any) {
      let uniforms: any = [];
      let uniformCount = (gl as any).getProgramParameter(program, (gl as any).ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        let uniformName = (gl as any).getActiveUniform(program, i).name;
        uniforms[uniformName] = (gl as any).getUniformLocation(program, uniformName);
      }
      return uniforms;
    }

    function compileShader(type: any, source: string, keywords?: string[] | null) {
      source = addKeywords(source, keywords || undefined);
      const shader = (gl as any).createShader(type);
      (gl as any).shaderSource(shader, source);
      (gl as any).compileShader(shader);
      if (!(gl as any).getShaderParameter(shader, (gl as any).COMPILE_STATUS))
        console.trace((gl as any).getShaderInfoLog(shader));
      return shader;
    }

    function addKeywords(source: string, keywords?: string[]) {
      if (!keywords) return source;
      let keywordsString = "";
      keywords.forEach((keyword) => {
        keywordsString += "#define " + keyword + "\n";
      });
      return keywordsString + source;
    }

  const { gl, ext } = getWebGLContext(canvas);
    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
    }

    const baseVertexShader = compileShader(
      (gl as any).VERTEX_SHADER,
      `
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;

        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `
    );

    const copyShader = compileShader(
      (gl as any).FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;

        void main () {
            gl_FragColor = texture2D(uTexture, vUv);
        }
      `
    );

    const clearShader = compileShader(
      (gl as any).FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;

        void main () {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }
      `
    );

    const displayShaderSource = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uDithering;
      uniform vec2 ditherScale;
      uniform vec2 texelSize;

      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
      }

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb;
              vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb;
              vec3 bc = texture2D(uTexture, vB).rgb;

              float dx = length(rc) - length(lc);
              float dy = length(tc) - length(bc);

              vec3 n = normalize(vec3(dx, dy, length(texelSize)));
              vec3 l = vec3(0.0, 0.0, 1.0);

              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
              c *= diffuse;
          #endif

          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `;

    const splatShader = compileShader(
      (gl as any).FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;

        void main () {
            vec2 p = vUv - point.xy;
            p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
      `
    );

    const advectionShader = compileShader(
      (gl as any).FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform vec2 dyeTexelSize;
        uniform float dt;
        uniform float dissipation;

        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
            vec2 st = uv / tsize - 0.5;
            vec2 iuv = floor(st);
            vec2 fuv = fract(st);

            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
            vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
            vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }

        void main () {
            #ifdef MANUAL_FILTERING
                vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
                vec4 result = bilerp(uSource, coord, dyeTexelSize);
            #else
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                vec4 result = texture2D(uSource, coord);
            #endif
            float decay = 1.0 + dissipation * dt;
            gl_FragColor = result / decay;
        }
      `,
      (ext as any).supportLinearFiltering ? null : ["MANUAL_FILTERING"]
    );

    const divergenceShader = compileShader(
      (gl as any).FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).x;
            float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y;
            float B = texture2D(uVelocity, vB).y;

            vec2 C = texture2D(uVelocity, vUv).xy;
            if (vL.x < 0.0) { L = -C.x; }
            if (vR.x > 1.0) { R = -C.x; }
            if (vT.y > 1.0) { T = -C.y; }
            if (vB.y < 0.0) { B = -C.y; }

            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `
    );

    const curlShader = compileShader(
      (gl as any).FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).y;
            float R = texture2D(uVelocity, vR).y;
            float T = texture2D(uVelocity, vT).x;
            float B = texture2D(uVelocity, vB).x;
            float vorticity = R - L - T + B;
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
      `
    );

    const vorticityShader = compileShader(
      (gl as any).FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;

        void main () {
            float L = texture2D(uCurl, vL).x;
            float R = texture2D(uCurl, vR).x;
            float T = texture2D(uCurl, vT).x;
            float B = texture2D(uCurl, vB).x;
            float C = texture2D(uCurl, vUv).x;

            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            force /= length(force) + 0.0001;
            force *= curl * C;
            force.y *= -1.0;

            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity += force * dt;
            velocity = min(max(velocity, -1000.0), 1000.0);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `
    );

    const pressureShader = compileShader(
      (gl as any).FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            float C = texture2D(uPressure, vUv).x;
            float divergence = texture2D(uDivergence, vUv).x;
            float pressure = (L + R + B + T - divergence) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
      `
    );

    const gradientSubtractShader = compileShader(
      (gl as any).FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity.xy -= vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `
    );

    const blit = (() => {
      (gl as any).bindBuffer((gl as any).ARRAY_BUFFER, (gl as any).createBuffer());
      (gl as any).bufferData(
        (gl as any).ARRAY_BUFFER,
        new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
        (gl as any).STATIC_DRAW
      );
      (gl as any).bindBuffer((gl as any).ELEMENT_ARRAY_BUFFER, (gl as any).createBuffer());
      (gl as any).bufferData(
        (gl as any).ELEMENT_ARRAY_BUFFER,
        new Uint16Array([0, 1, 2, 0, 2, 3]),
        (gl as any).STATIC_DRAW
      );
      (gl as any).vertexAttribPointer(0, 2, (gl as any).FLOAT, false, 0, 0);
      (gl as any).enableVertexAttribArray(0);
      return (target: any, clear = false) => {
        if (target == null) {
          (gl as any).viewport(0, 0, (gl as any).drawingBufferWidth, (gl as any).drawingBufferHeight);
          (gl as any).bindFramebuffer((gl as any).FRAMEBUFFER, null);
        } else {
          (gl as any).viewport(0, 0, target.width, target.height);
          (gl as any).bindFramebuffer((gl as any).FRAMEBUFFER, target.fbo);
        }
        if (clear) {
          (gl as any).clearColor(0.0, 0.0, 0.0, 1.0);
          (gl as any).clear((gl as any).COLOR_BUFFER_BIT);
        }
        (gl as any).drawElements((gl as any).TRIANGLES, 6, (gl as any).UNSIGNED_SHORT, 0);
      };
    })();

    let dye: any, velocity: any, divergence: any, curl: any, pressure: any;

    const copyProgram = new Program(baseVertexShader, copyShader);
    const clearProgram = new Program(baseVertexShader, clearShader);
    const splatProgram = new Program(baseVertexShader, splatShader);
    const advectionProgram = new Program(baseVertexShader, advectionShader);
    const divergenceProgram = new Program(baseVertexShader, divergenceShader);
    const curlProgram = new Program(baseVertexShader, curlShader);
    const vorticityProgram = new Program(baseVertexShader, vorticityShader);
    const pressureProgram = new Program(baseVertexShader, pressureShader);
    const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);
    const displayMaterial = new Material(baseVertexShader, displayShaderSource);

    function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      (gl as any).activeTexture((gl as any).TEXTURE0);
      let texture = (gl as any).createTexture();
      (gl as any).bindTexture((gl as any).TEXTURE_2D, texture);
      (gl as any).texParameteri((gl as any).TEXTURE_2D, (gl as any).TEXTURE_MIN_FILTER, param);
      (gl as any).texParameteri((gl as any).TEXTURE_2D, (gl as any).TEXTURE_MAG_FILTER, param);
      (gl as any).texParameteri((gl as any).TEXTURE_2D, (gl as any).TEXTURE_WRAP_S, (gl as any).CLAMP_TO_EDGE);
      (gl as any).texParameteri((gl as any).TEXTURE_2D, (gl as any).TEXTURE_WRAP_T, (gl as any).CLAMP_TO_EDGE);
      (gl as any).texImage2D((gl as any).TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

      let fbo = (gl as any).createFramebuffer();
      (gl as any).bindFramebuffer((gl as any).FRAMEBUFFER, fbo);
      (gl as any).framebufferTexture2D((gl as any).FRAMEBUFFER, (gl as any).COLOR_ATTACHMENT0, (gl as any).TEXTURE_2D, texture, 0);
      (gl as any).viewport(0, 0, w, h);
      (gl as any).clear((gl as any).COLOR_BUFFER_BIT);

      let texelSizeX = 1.0 / w;
      let texelSizeY = 1.0 / h;
      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX,
        texelSizeY,
        attach(id: number) {
          (gl as any).activeTexture((gl as any).TEXTURE0 + id);
          (gl as any).bindTexture((gl as any).TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);
      return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read() {
          return fbo1;
        },
        set read(value) {
          fbo1 = value;
        },
        get write() {
          return fbo2;
        },
        set write(value) {
          fbo2 = value;
        },
        swap() {
          let temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    function resizeFBO(target: any, w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      let newFBO = createFBO(w, h, internalFormat, format, type, param);
      copyProgram.bind();
      (gl as any).uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
      blit(newFBO);
      return newFBO;
    }

    function resizeDoubleFBO(target: any, w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      if (target.width === w && target.height === h) return target;
      target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
      target.write = createFBO(w, h, internalFormat, format, type, param);
      target.width = w;
      target.height = h;
      target.texelSizeX = 1.0 / w;
      target.texelSizeY = 1.0 / h;
      return target;
    }

    function updateKeywords() {
      let displayKeywords: string[] = [];
      if (config.SHADING) displayKeywords.push("SHADING");
      displayMaterial.setKeywords(displayKeywords);
    }

  updateKeywords();

  function getResolution(resolution: number) {
      let aspectRatio = (gl as any).drawingBufferWidth / (gl as any).drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
      const min = Math.round(resolution);
      const max = Math.round(resolution * aspectRatio);
      if ((gl as any).drawingBufferWidth > (gl as any).drawingBufferHeight)
        return { width: max, height: min };
      else return { width: min, height: max };
    }

    function initFramebuffers() {
      // Skip if canvas has no size yet
      if ((canvas.width || 0) < 2 || (canvas.height || 0) < 2) return;
      let simRes = getResolution(config.SIM_RESOLUTION);
      let dyeRes = getResolution(config.DYE_RESOLUTION);
      const texType = (ext as any).halfFloatTexType;
      const rgba = (ext as any).formatRGBA;
      const rg = (ext as any).formatRG;
      const r = (ext as any).formatR;
      const filtering = (ext as any).supportLinearFiltering ? (gl as any).LINEAR : (gl as any).NEAREST;
      (gl as any).disable((gl as any).BLEND);

      if (!dye)
        dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
      else
        dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);

      if (!velocity)
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
      else
        velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);

      divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, (gl as any).NEAREST);
      curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, (gl as any).NEAREST);
      pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, (gl as any).NEAREST);
    }

  function scaleByPixelRatio(input: number) {
      const pixelRatio = window.devicePixelRatio || 1;
      return Math.floor(input * pixelRatio);
    }

    function calcDeltaTime() {
      let now = Date.now();
      let dt = (now - lastUpdateTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastUpdateTime = now;
      return dt;
    }

    function resizeCanvas() {
      const baseW = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth;
      const baseH = canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight;
      let width = scaleByPixelRatio(baseW);
      let height = scaleByPixelRatio(baseH);
      // ensure minimal non-zero size
      width = Math.max(width, 2);
      height = Math.max(height, 2);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }
      return false;
    }

    function updateColors(dt: number) {
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
      if (colorUpdateTimer >= 1) {
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
        pointers.forEach((p) => {
          p.color = generateColor();
        });
      }
    }

    function applyInputs() {
      pointers.forEach((p) => {
        if (p.moved) {
          p.moved = false;
          splatPointer(p);
        }
      });
    }

    function step(dt: number) {
      if (!velocity || !dye) return;
      (gl as any).disable((gl as any).BLEND);
      curlProgram.bind();
      (gl as any).uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      (gl as any).uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl);

      vorticityProgram.bind();
      (gl as any).uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      (gl as any).uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
      (gl as any).uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      (gl as any).uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      (gl as any).uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();

      divergenceProgram.bind();
      (gl as any).uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      (gl as any).uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);

      clearProgram.bind();
      (gl as any).uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
      (gl as any).uniform1f(clearProgram.uniforms.value, config.PRESSURE);
      blit(pressure.write);
      pressure.swap();

      pressureProgram.bind();
      (gl as any).uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      (gl as any).uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        (gl as any).uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }

      gradienSubtractProgram.bind();
      (gl as any).uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      (gl as any).uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
      (gl as any).uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      advectionProgram.bind();
      (gl as any).uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (!(ext as any).supportLinearFiltering)
        (gl as any).uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      let velocityId = velocity.read.attach(0);
      (gl as any).uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
      (gl as any).uniform1i(advectionProgram.uniforms.uSource, velocityId);
      (gl as any).uniform1f(advectionProgram.uniforms.dt, dt);
      (gl as any).uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      if (!(ext as any).supportLinearFiltering)
        (gl as any).uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      (gl as any).uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
      (gl as any).uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
      (gl as any).uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(dye.write);
      dye.swap();
    }

    function render(target: any) {
      (gl as any).blendFunc((gl as any).ONE, (gl as any).ONE_MINUS_SRC_ALPHA);
      (gl as any).enable((gl as any).BLEND);
      drawDisplay(target);
    }

    function drawDisplay(target: any) {
      let width = target == null ? (gl as any).drawingBufferWidth : target.width;
      let height = target == null ? (gl as any).drawingBufferHeight : target.height;
      displayMaterial.bind();
      if (config.SHADING)
        (gl as any).uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);
      (gl as any).uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
      blit(target);
    }

    function splatPointer(pointer: any) {
      let dx = pointer.deltaX * config.SPLAT_FORCE;
      let dy = pointer.deltaY * config.SPLAT_FORCE;
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    }

    function clickSplat(pointer: any) {
      const color = generateColor();
      color.r *= 10.0;
      color.g *= 10.0;
      color.b *= 10.0;
      let dx = 10 * (Math.random() - 0.5);
      let dy = 30 * (Math.random() - 0.5);
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
    }

    function splat(x: number, y: number, dx: number, dy: number, color: RGB) {
      splatProgram.bind();
      (gl as any).uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      (gl as any).uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
      (gl as any).uniform2f(splatProgram.uniforms.point, x, y);
      (gl as any).uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
      (gl as any).uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
      blit(velocity.write);
      velocity.swap();

      (gl as any).uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
      (gl as any).uniform3f(splatProgram.uniforms.color, (color as any).r, (color as any).g, (color as any).b);
      blit(dye.write);
      dye.swap();
    }

    function correctRadius(radius: number) {
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) radius *= aspectRatio;
      return radius;
    }

    function updatePointerDownData(pointer: any, id: number, posX: number, posY: number) {
      pointer.id = id;
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor();
    }

    function updatePointerMoveData(pointer: any, posX: number, posY: number, color: RGB) {
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
      pointer.color = color as any;
    }

    function updatePointerUpData(pointer: any) {
      pointer.down = false;
    }

    function correctDeltaX(delta: number) {
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio < 1) delta *= aspectRatio;
      return delta;
    }

    function correctDeltaY(delta: number) {
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) delta /= aspectRatio;
      return delta;
    }

    function generateColor(): RGB {
      let c = HSVtoRGB(Math.random(), 1.0, 1.0) as any;
      c.r *= 0.15;
      c.g *= 0.15;
      c.b *= 0.15;
      return c as RGB;
    }

    function HSVtoRGB(h: number, s: number, v: number) {
      let r: number, g: number, b: number, i: number, f: number, p: number, q: number, t: number;
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
        default:
          r = v; g = v; b = v;
          break;
      }
      return { r, g, b };
    }

    function wrap(value: number, min: number, max: number) {
      const range = max - min;
      if (range === 0) return min;
      return ((value - min) % range) + min;
    }

  let lastUpdateTime = Date.now();
    let colorUpdateTimer = 0.0;
    let rafId = 0;
  let lastFrame = 0;
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const maxFps = prefersReducedMotion ? 24 : 36; // lower cap for perf

    function updateFrame() {
      if (!activeRef.current) {
        rafId = requestAnimationFrame(updateFrame);
        return;
      }
      const now = performance.now();
      const elapsed = now - lastFrame;
      if (elapsed < 1000 / maxFps) {
        rafId = requestAnimationFrame(updateFrame);
        return;
      }
      lastFrame = now;
      const dt = calcDeltaTime();
      if (resizeCanvas()) initFramebuffers();
      if (!velocity || !dye) {
        // try to initialize once more and skip this frame
        initFramebuffers();
        rafId = requestAnimationFrame(updateFrame);
        return;
      }
      updateColors(dt);
      applyInputs();
      step(dt);
      render(null);
      rafId = requestAnimationFrame(updateFrame);
    }

    // Event handlers
    const onMouseDown = (e: MouseEvent) => {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      updatePointerDownData(pointer, -1, posX, posY);
      clickSplat(pointer);
    };

    const onFirstMouseMove = (e: MouseEvent) => {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      let color = generateColor();
      updateFrame();
      updatePointerMoveData(pointer, posX, posY, color);
      document.body.removeEventListener("mousemove", onFirstMouseMove as any);
    };

    const onMouseMove = (e: MouseEvent) => {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      let color = (pointer as any).color;
      updatePointerMoveData(pointer, posX, posY, color);
    };

    const onFirstTouchStart = (e: TouchEvent) => {
      const touches = e.targetTouches;
      let pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        let posX = scaleByPixelRatio(touches[i].clientX);
        let posY = scaleByPixelRatio(touches[i].clientY);
        updateFrame();
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);
      }
      document.body.removeEventListener("touchstart", onFirstTouchStart as any);
    };

    const onTouchStart = (e: TouchEvent) => {
      const touches = e.targetTouches;
      let pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        let posX = scaleByPixelRatio(touches[i].clientX);
        let posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      const touches = e.targetTouches;
      let pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        let posX = scaleByPixelRatio(touches[i].clientX);
        let posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerMoveData(pointer, posX, posY, (pointer as any).color);
      }
    };

    const onTouchEnd = (_e: TouchEvent) => {
      let pointer = pointers[0];
      updatePointerUpData(pointer);
    };

    window.addEventListener("mousedown", onMouseDown);
    document.body.addEventListener("mousemove", onFirstMouseMove as any);
    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("touchstart", onFirstTouchStart as any);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove, { passive: true } as any);
    window.addEventListener("touchend", onTouchEnd);

  // Initialize once before starting loop
  resizeCanvas();
  initFramebuffers();
  updateFrame();

    // Visibility pause/resume
    const onVisibility = () => {
      activeRef.current = !document.hidden && !prefersReducedMotion;
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousedown", onMouseDown);
      document.body.removeEventListener("mousemove", onFirstMouseMove as any);
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("touchstart", onFirstTouchStart as any);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove as any);
  window.removeEventListener("touchend", onTouchEnd);
  document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    SHADING,
    COLOR_UPDATE_SPEED,
    BACK_COLOR,
    TRANSPARENT,
  ]);

  return (
    <div
      className={[
        "absolute inset-0 pointer-events-none z-[5]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <canvas ref={canvasRef} id="fluid" className="w-full h-full block" />
    </div>
  );
}

export default SplashCursor;
