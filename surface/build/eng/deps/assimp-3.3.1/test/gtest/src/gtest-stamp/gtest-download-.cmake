

set(command "/usr/local/Cellar/cmake/3.10.2/bin/cmake;-P;/Users/kj/cs184/cs184-finalproj/surface/build/eng/deps/assimp-3.3.1/test/gtest/tmp/gtest-gitclone.cmake")
execute_process(
  COMMAND ${command}
  RESULT_VARIABLE result
  OUTPUT_FILE "/Users/kj/cs184/cs184-finalproj/surface/build/eng/deps/assimp-3.3.1/test/gtest/src/gtest-stamp/gtest-download-out.log"
  ERROR_FILE "/Users/kj/cs184/cs184-finalproj/surface/build/eng/deps/assimp-3.3.1/test/gtest/src/gtest-stamp/gtest-download-err.log"
  )
if(result)
  set(msg "Command failed: ${result}\n")
  foreach(arg IN LISTS command)
    set(msg "${msg} '${arg}'")
  endforeach()
  set(msg "${msg}\nSee also\n  /Users/kj/cs184/cs184-finalproj/surface/build/eng/deps/assimp-3.3.1/test/gtest/src/gtest-stamp/gtest-download-*.log")
  message(FATAL_ERROR "${msg}")
else()
  set(msg "gtest download command succeeded.  See also /Users/kj/cs184/cs184-finalproj/surface/build/eng/deps/assimp-3.3.1/test/gtest/src/gtest-stamp/gtest-download-*.log")
  message(STATUS "${msg}")
endif()
