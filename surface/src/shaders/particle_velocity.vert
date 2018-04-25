#version 330 core
layout (location = 0) in vec3 pos;
layout (location = 1) in vec3 n;
layout (location = 2) in vec2 tex;
layout (location = 3) in vec3 offset;
layout (location = 4) in vec3 vel;

out vec3 normal;
out vec3 frag_pos;
out vec3 velocity;

uniform mat4 view;
uniform mat4 projection;

void main() {
    
}