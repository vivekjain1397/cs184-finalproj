#version 330 core

in vec3 normal;
in vec3 frag_pos;

in vec2 texCoord;
in vec3 eyeSpacePos;
in vec4 in_color;

out vec4 color;

uniform vec3 light_color;
uniform vec3 light_pos;
uniform vec3 view_pos;

uniform sampler2D backgroundTexture;
uniform sampler2D depthTexture;
uniform sampler2D thicknessTexture;
uniform samplerCube reflectionTexture;

uniform float particle_radius; 
uniform mat4 view; 
uniform mat4 projection;

//curvature variables
uniform vec2 focalLength;
// uniform vec2 texelSize;

uniform float timeStep;

vec4 uvToEye(vec2 uv, float depth)
{
	vec4 clipSpacePos;
	clipSpacePos.xy = uv.xy * 2.0f - 1.0f;
	clipSpacePos.z = depth;
	clipSpacePos.w = 1;
	vec4 hPos = inverse(projection) * clipSpacePos;
	return vec4(hPos.xyz / hPos.w, 1);
}

vec4 getEyePos(vec2 uv)
{
	return uvToEye(uv, texture(depthTexture, uv).x);
}

void main() {

    vec2 screenSize = textureSize(depthTexture, 0);
	vec2 texelUnit = 1.0 / (screenSize);
	vec2 screenCoord = gl_FragCoord.xy * texelUnit;
	float depth = texture(depthTexture, screenCoord).x;
    
    // vec3 object_color = vec3(.04f, 0.41f, 0.58f);
    // vec3 light_dir = normalize(light_pos - frag_pos); 

    // vec2 uv = texCoord * 2.0 - 1.0;
	// // if (dot(uv, uv) > 10) discard;

    // // ------- Reconstruct normal -------
	
	// vec2 texelUnitX = vec2(texelUnit.x, 0);
	// vec2 texelUnitY = vec2(0, texelUnit.y);
	
	// calculate eye-space position from depth
	// vec4 posEye = uvToEye(screenCoord, depth);
	
	// // calculate differences
	// vec4 ddx = getEyePos(screenCoord + texelUnitX) - posEye;
	// vec4 ddx2 = posEye - getEyePos(screenCoord - texelUnitX);
	// if (abs(ddx.z) > abs(ddx2.z)) {
	// 	ddx = ddx2;
	// }
	
	// vec4 ddy = getEyePos(screenCoord + texelUnitY) - posEye;
	// vec4 ddy2 = posEye - getEyePos(screenCoord - texelUnitY);
	// if (abs(ddy2.z) < abs(ddy.z)) {
	// 	ddy = ddy2;
	// }
	
	// // Calculate world space normal
	// mat4 invView = inverse(view);
	// vec3 N = vec3(invView * vec4(normalize(cross(ddx.xyz, ddy.xyz)), 0));
	
	// // DEBUG: Render normal
	// //N = (N + vec3(1)) / 2.0;
	// //fragColor = vec4(N, 1);
	// //return;

  
	// // ------- Render -------

	// vec4 viewPos;

	// // Light direction
	// vec4 lightDir = vec4(-.2, 1, 1, 0);
	// vec3 viewDirection = normalize(vec3(invView * vec4(0.0, 0.0, 0.0, 1.0) - posEye));
	
	// float fresnelPwr = .8;
	// float fresnel = (1 - fresnelPwr) + fresnelPwr
	// 	* pow(1 - dot(N, viewDirection), 5);

	// float ambientPwr = .15;
	// float attenuation = .2;
	
	// // AMBIENT
	// vec3 ambient = vec3(ambientPwr);

	// // DIFFUSE
	// float diffPwr = attenuation * max(0.0, dot(N, lightDir.xyz));
	// vec3 diffuse = diffPwr * (invView * posEye).y * vec3(.01, .02, .03);
	
	// // CUBEMAP REFLECTION
	// // vec3 refDir = reflect(viewDirection, N);
	// // if (refDir.y > .5) refDir.y = -refDir.y;
	// // diffuse = diffuse + fresnel * texture(reflectionTexture, refDir).xyz;

	// // // BACKGROUND DISTORTION
	// // float thickness = texture(thicknessTexture, screenCoord).x;
	// // float distPwr = 1 - thickness;
	// // diffuse = (1 - distPwr) * diffuse + distPwr * texture(backgroundTexture,
	// // 	screenCoord + N.xy * .025 * thickness).xyz;

	// // DEBUG: Color due to absorbation
	// //fragColor = vec4(mix(vec3(1), diffuse, thickness), 1);
	// //return;

	// // SPECULAR
	// vec3 specular = vec3(0);
	// vec3 lightSpec = vec3(.5);
	// vec3 matSpec = vec3(1.0);
	// float matShininess = 1;
	// if (dot(N, lightDir.xyz) >= 0.0) {
	// 	specular = attenuation * lightSpec * matSpec
	// 		* pow(max(0.0, dot(reflect(-lightDir.xyz, N), viewDirection)), matShininess);
	// }
	// color = vec4(ambient + diffuse + specular, 1.0);

    //curvature
    // float depth = texture(depthTexture, texCoord).x;
    // vec2 screenSize = textureSize(depthTexture, 0);
	// vec2 texelSize = 1.0 / (screenSize);
    
    const bool WRITE_CURVATURE_TO_COLOR_TEXTURE = false;
    if(WRITE_CURVATURE_TO_COLOR_TEXTURE && depth == gl_DepthRange.far)
    {
        gl_FragDepth = depth;
        color = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }
    
    if(depth == gl_DepthRange.far) discard;
    
    vec2 upTexel = texCoord + vec2(0, texelUnit.y); //change to texcoord
    vec2 downTexel = texCoord + vec2(0, -texelUnit.y);
    vec2 leftTexel = texCoord + vec2(texelUnit.x, 0);
    vec2 rightTexel = texCoord + vec2(-texelUnit.x, 0);

    float upDepth = texture(depthTexture, upTexel).x;
    float downDepth = texture(depthTexture, downTexel).x;
    float leftDepth = texture(depthTexture, leftTexel).x;
    float rightDepth = texture(depthTexture, rightTexel).x;
    
    //First order partial derivatives
    float dz_dx = (leftDepth + depth)*0.5 - (depth + rightDepth)*0.5;
    float dz_dy = (upDepth + depth)*0.5 - (depth + downDepth)*0.5;
    
    //Second order partial derivatives
    float d2z_dx2 = (leftDepth - 2.0*depth + rightDepth);	//d2z_dx2 == d^2z / dx^2
    float d2z_dy2 = (upDepth - 2.0*depth + downDepth);	
    
    float Cx = (2.0 / focalLength.x) * texelUnit.x;		//texelSize.x == (1.0 / screenWidthInPixels)
    float Cy = (2.0 / focalLength.y) * texelUnit.y;		//texelSize.y == (1.0 / screenHeightInPixels)
    float CxSquared = Cx*Cx;
    float CySquared = Cy*Cy;
    
    float D = CySquared*dz_dx*dz_dx + CxSquared*dz_dy*dz_dy + CxSquared*CySquared*depth*depth;
    
    float dD_dx;
    float dD_dy;
    {
        vec2 upLeftTexel = texCoord+ vec2(texelUnit.x, texelUnit.y);
        vec2 upRightTexel = texCoord + vec2(-texelUnit.x, texelUnit.y);
        vec2 downLeftTexel = texCoord + vec2(texelUnit.x, -texelUnit.y);
        vec2 downRightTexel = texCoord + vec2(-texelUnit.x, -texelUnit.y);
    
        float upLeftDepth = texture(depthTexture, upLeftTexel).x;
        float upRightDepth = texture(depthTexture, upRightTexel).x;
        float downLeftDepth = texture(depthTexture, downLeftTexel).x;
        float downRightDepth = texture(depthTexture, downRightTexel).x;
        
        //Mixed partial derivatives
        float d2z_dxdy = (upLeftDepth - downLeftDepth - upRightDepth + downRightDepth)*0.25;
        float d2z_dydx = d2z_dxdy;
    
        dD_dx = 2.0*CySquared*d2z_dx2*dz_dx + 2.0*CxSquared*d2z_dxdy*dz_dy + 2.0*CxSquared*CySquared*dz_dx*depth;	
        dD_dy = 2.0*CySquared*d2z_dydx*dz_dx + 2.0*CxSquared*d2z_dy2*dz_dy + 2.0*CxSquared*CySquared*dz_dy*depth;	
    }
    
    float Ex = 0.5*dz_dx*dD_dx - d2z_dx2*D;
    float Ey = 0.5*dz_dy*dD_dy - d2z_dy2*D;
    
    float doubleH = (Cy*Ex + Cx*Ey) / pow(D, 1.5);
    float H = doubleH*0.5;	//H should be in [-1, 1]

    //If abs(H) is high, neighboring depths are likely part of another surface(discontinuous depth)
    const float H_THRESHOLD = 1.0;
    gl_FragDepth = ( abs(H) < H_THRESHOLD ) ? depth - H*timeStep : depth;
    //gl_FragDepth = ( abs(H) < H_THRESHOLD ) ? (upDepth + downDepth + leftDepth + rightDepth + depth)*0.20 : depth;
    
    if(WRITE_CURVATURE_TO_COLOR_TEXTURE)
    {
    if( abs(H) < H_THRESHOLD )
    {
        float curvature = H;
        float r = (curvature < 0) ? abs(curvature) : 0.0;
        float g = (curvature > 0) ? abs(curvature) : 0.0;
            
        color = vec4( vec3(r, g, 0.0), 1.0 );
    }
    else color = vec4(0.0, 0.0, 0.0, 1.0);
    }

}