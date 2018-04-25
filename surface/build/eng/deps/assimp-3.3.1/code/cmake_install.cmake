# Install script for directory: /Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/usr/local")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "FALSE")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib" TYPE STATIC_LIBRARY FILES "/Users/kj/cs184/cs184-finalproj/surface/build/eng/deps/assimp-3.3.1/code/libassimp.a")
  if(EXISTS "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/libassimp.a" AND
     NOT IS_SYMLINK "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/libassimp.a")
    execute_process(COMMAND "/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/ranlib" "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/libassimp.a")
  endif()
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xassimp-devx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/assimp" TYPE FILE FILES
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/anim.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/ai_assert.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/camera.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/color4.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/color4.inl"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/config.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/defs.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/cfileio.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/light.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/material.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/material.inl"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/matrix3x3.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/matrix3x3.inl"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/matrix4x4.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/matrix4x4.inl"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/mesh.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/postprocess.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/quaternion.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/quaternion.inl"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/scene.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/metadata.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/texture.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/types.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/vector2.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/vector2.inl"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/vector3.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/vector3.inl"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/version.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/cimport.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/importerdesc.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/Importer.hpp"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/DefaultLogger.hpp"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/ProgressHandler.hpp"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/IOStream.hpp"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/IOSystem.hpp"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/Logger.hpp"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/LogStream.hpp"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/NullLogger.hpp"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/cexport.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/Exporter.hpp"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xassimp-devx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/assimp/Compiler" TYPE FILE FILES
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/Compiler/pushpack1.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/Compiler/poppack1.h"
    "/Users/kj/cs184/cs184-finalproj/surface/eng/deps/assimp-3.3.1/code/../include/assimp/Compiler/pstdint.h"
    )
endif()

