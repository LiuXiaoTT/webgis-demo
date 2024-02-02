uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_cameraPosition;

// 点击小人时的颜色
const vec3 SELECTED_COLOR = vec3(1.0, 0.0, 0.0);

// 小人的位置
const vec3 LITTLE_MAN_POSITION = vec3(-75.59777, 40.03883, 1000.0);

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  // 计算像素位置
  vec2 uv = fragCoord.xy / u_resolution.xy;

  // 计算相机到小人的距离
  float distanceToLittleMan = length(u_cameraPosition - LITTLE_MAN_POSITION);

  // 计算小人的大小
  float littleManSize = 100.0 / distanceToLittleMan;

  // 计算小人的位置
  vec2 littleManPosition = (LITTLE_MAN_POSITION.xy / LITTLE_MAN_POSITION.z) * u_resolution.xy / 2.0 + u_resolution.xy / 2.0;

  // 计算小人到像素的距离
  float distanceToLittleManPixel = length(fragCoord.xy - littleManPosition);

  // 计算小人的颜色
  vec3 littleManColor = vec3(0.0);
  if (distanceToLittleManPixel < littleManSize) {
    littleManColor = SELECTED_COLOR;
  }

  // 输出像素颜色
  fragColor = vec4(littleManColor, 1.0);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}