# Install script for directory: /Users/kj/cs184/cs184-finalproj/surface/eng

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/Users/kj/cs184/cs184-finalproj/surface/eng")
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

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  # Include the install script for each subdirectory.
  include("/Users/kj/cs184/cs184-finalproj/surface/build/eng/deps/glew/cmake_install.cmake")
  include("/Users/kj/cs184/cs184-finalproj/surface/build/eng/deps/glfw/cmake_install.cmake")
  include("/Users/kj/cs184/cs184-finalproj/surface/build/eng/deps/assimp-3.3.1/cmake_install.cmake")
  include("/Users/kj/cs184/cs184-finalproj/surface/build/eng/deps/soil/cmake_install.cmake")
  include("/Users/kj/cs184/cs184-finalproj/surface/build/eng/src/cmake_install.cmake")

endif()

