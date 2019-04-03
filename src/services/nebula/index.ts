/**
 * Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import ShaderBox from "../../utils/shaderbox.js";
import { nebula as nebulaStyle } from "./style.css";

// @ts-ignore
import fragmentShader from "./fragment.glsl";

// @ts-ignore
import vertexShader from "./vertex.glsl";

export function run() {
  const shaderBox = new ShaderBox(vertexShader, fragmentShader, {
    canvas: document.querySelector("#nebula") as any,
    scaling: 1 / 5,
    // mediump precision will not be able to pass timestamps to the shader
    // with sufficient precision and will look like jank. So I moved the looping
    // code to JavaScript.
    timing: ts => Math.sin(ts / 200000),
    uniforms: ["contrast", "speed", "nebulaScale", "vortexInfluence"]
  });
  shaderBox.setUniform1f("contrast", 5);
  shaderBox.setUniform1f("speed", -40);
  shaderBox.setUniform1f("nebulaScale", 10);
  shaderBox.setUniform1f("vortexInfluence", 0.03);
  document.body.appendChild(shaderBox.canvas);
  shaderBox.canvas.id = "nebula";
  (shaderBox.canvas as any).shaderBox = shaderBox;
  shaderBox.canvas.classList.add(nebulaStyle);
  shaderBox.resize();
  shaderBox.start();
}