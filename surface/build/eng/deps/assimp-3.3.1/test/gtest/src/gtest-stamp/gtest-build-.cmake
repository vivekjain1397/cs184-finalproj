

set(command "${make}")
execute_process(
  COMMAND ${command}
  RESULT_VARIABLE result
  OUTPUT_FILE "/Users/kj/cs184/cs184-finalproj/surface/build/eng/deps/assimp-3.3.1/test/gtest/src/gtest-stamp/gtest-build-out.log"
  ERROR_FILE "/Users/kj/cs184/cs184-finalproj/surface/build/eng/deps/assimp-3.3.1/test/gtest/src/gtest-stamp/gtest-build-err.log"
  )
if(result)
  set(msg "Command failed: ${result}\n")
  foreach(arg IN LISTS command)
    set(msg "${msg} '${arg}'")
  endforeach()
  set(msg "${msg}\nSee also\n  /Users/kj/cs184/cs184-finalproj/surface/build/eng/deps/assimp-3.3.1/test/gtest/src/gtest-stamp/gtest-build-*.log")
  message(FATAL_ERROR "${msg}")
else()
  set(msg "gtest build command succeeded.  See also /Users/kj/cs184/cs184-finalproj/surface/build/eng/deps/assimp-3.3.1/test/gtest/src/gtest-stamp/gtest-build-*.log")
  message(STATUS "${msg}")
endif()
