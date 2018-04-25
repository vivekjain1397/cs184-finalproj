#version 330 core

uniform vec2 focalLength;
// uniform vec2 texelSize;

uniform float timeStep;
uniform sampler2D depthTexture;

//See "Screen Space Fluid Rendering with Curvature Flow"
//by W. J. Van Der Laan, S. Green, M. Sainz. 
void main()
{
    // float depth = texture(depthTexture, gl_TexCoord[0]).x;
    // vec2 screenSize = textureSize(depthTexture, 0);
	// vec2 texelSize = 1.0 / (screenSize);
    
    const bool WRITE_CURVATURE_TO_COLOR_TEXTURE = false;
    if(WRITE_CURVATURE_TO_COLOR_TEXTURE && depth == gl_DepthRange.far)
    {
        gl_FragDepth = depth;
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
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
        vec2 upLeftTexel = texCoord+ vec2(ttexelUnit.x, texelUnite.y);
        vec2 upRightTexel = texCoord + vec2(-texelUnit.x, texelSize.y);
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

    // float depth = texture(depthTexture, gl_TexCoord[0]).x;
    // vec2 screenSize = textureSize(depthTexture, 0);
	// vec2 texelSize = 1.0 / (screenSize);
    
    // const bool WRITE_CURVATURE_TO_COLOR_TEXTURE = false;
    // if(WRITE_CURVATURE_TO_COLOR_TEXTURE && depth == gl_DepthRange.far)
    // {
    //     gl_FragDepth = depth;
    //     gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    //     return;
    // }
    
    // if(depth == gl_DepthRange.far) discard;
    
    // vec2 upTexel = texCoord[0].xy + vec2(0, texelSize.y); //change to texcoord
    // vec2 downTexel = gl_TexCoord[0].xy + vec2(0, -texelSize.y);
    // vec2 leftTexel = gl_TexCoord[0].xy + vec2(texelSize.x, 0);
    // vec2 rightTexel = gl_TexCoord[0].xy + vec2(-texelSize.x, 0);

    // float upDepth = texture(depthTexture, upTexel).x;
    // float downDepth = texture(depthTexture, downTexel).x;
    // float leftDepth = texture(depthTexture, leftTexel).x;
    // float rightDepth = texture(depthTexture, rightTexel).x;
    
    // //First order partial derivatives
    // float dz_dx = (leftDepth + depth)*0.5 - (depth + rightDepth)*0.5;
    // float dz_dy = (upDepth + depth)*0.5 - (depth + downDepth)*0.5;
    
    // //Second order partial derivatives
    // float d2z_dx2 = (leftDepth - 2.0*depth + rightDepth);	//d2z_dx2 == d^2z / dx^2
    // float d2z_dy2 = (upDepth - 2.0*depth + downDepth);	
    
    // float Cx = (2.0 / focalLength.x) * texelSize.x;		//texelSize.x == (1.0 / screenWidthInPixels)
    // float Cy = (2.0 / focalLength.y) * texelSize.y;		//texelSize.y == (1.0 / screenHeightInPixels)
    // float CxSquared = Cx*Cx;
    // float CySquared = Cy*Cy;
    
    // float D = CySquared*dz_dx*dz_dx + CxSquared*dz_dy*dz_dy + CxSquared*CySquared*depth*depth;
    
    // float dD_dx;
    // float dD_dy;
    // {
    //     vec2 upLeftTexel = gl_TexCoord[0].xy + vec2(texelSize.x, texelSize.y);
    //     vec2 upRightTexel = gl_TexCoord[0].xy + vec2(-texelSize.x, texelSize.y);
    //     vec2 downLeftTexel = gl_TexCoord[0].xy + vec2(texelSize.x, -texelSize.y);
    //     vec2 downRightTexel = gl_TexCoord[0].xy + vec2(-texelSize.x, -texelSize.y);
    
    //     float upLeftDepth = texture(depthTexture, upLeftTexel).x;
    //     float upRightDepth = texture(depthTexture, upRightTexel).x;
    //     float downLeftDepth = texture(depthTexture, downLeftTexel).x;
    //     float downRightDepth = texture(depthTexture, downRightTexel).x;
        
    //     //Mixed partial derivatives
    //     float d2z_dxdy = (upLeftDepth - downLeftDepth - upRightDepth + downRightDepth)*0.25;
    //     float d2z_dydx = d2z_dxdy;
    
    //     dD_dx = 2.0*CySquared*d2z_dx2*dz_dx + 2.0*CxSquared*d2z_dxdy*dz_dy + 2.0*CxSquared*CySquared*dz_dx*depth;	
    //     dD_dy = 2.0*CySquared*d2z_dydx*dz_dx + 2.0*CxSquared*d2z_dy2*dz_dy + 2.0*CxSquared*CySquared*dz_dy*depth;	
    // }
    
    // float Ex = 0.5*dz_dx*dD_dx - d2z_dx2*D;
    // float Ey = 0.5*dz_dy*dD_dy - d2z_dy2*D;
    
    // float doubleH = (Cy*Ex + Cx*Ey) / pow(D, 1.5);
    // float H = doubleH*0.5;	//H should be in [-1, 1]

    // //If abs(H) is high, neighboring depths are likely part of another surface(discontinuous depth)
    // const float H_THRESHOLD = 1.0;
    // gl_FragDepth = ( abs(H) < H_THRESHOLD ) ? depth - H*timeStep : depth;
    // //gl_FragDepth = ( abs(H) < H_THRESHOLD ) ? (upDepth + downDepth + leftDepth + rightDepth + depth)*0.20 : depth;
    
    // if(WRITE_CURVATURE_TO_COLOR_TEXTURE)
    // {
    //     if( abs(H) < H_THRESHOLD )
    //     {
    //         float curvature = H;
    //         float r = (curvature < 0) ? abs(curvature) : 0.0;
    //         float g = (curvature > 0) ? abs(curvature) : 0.0;
                
    //         gl_FragColor = vec4( vec3(r, g, 0.0), 1.0 );
    //     }
    //     else gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    // }
}