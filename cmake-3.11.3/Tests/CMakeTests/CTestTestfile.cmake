# CMake generated Testfile for 
# Source directory: /home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests
# Build directory: /home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(CMake.List "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/ListTest.cmake")
add_test(CMake.VariableWatch "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/VariableWatchTest.cmake")
add_test(CMake.Include "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/IncludeTest.cmake")
add_test(CMake.FindBase "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/FindBaseTest.cmake")
add_test(CMake.Toolchain "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/ToolchainTest.cmake")
add_test(CMake.GetFilenameComponentRealpath "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/GetFilenameComponentRealpathTest.cmake")
add_test(CMake.Version "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/VersionTest.cmake")
add_test(CMake.Message "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/MessageTest.cmake")
add_test(CMake.File "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/FileTest.cmake")
add_test(CMake.ImplicitLinkInfo "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/ImplicitLinkInfoTest.cmake")
add_test(CMake.ModuleNotices "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/ModuleNoticesTest.cmake")
add_test(CMake.GetProperty "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/GetPropertyTest.cmake")
add_test(CMake.If "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/IfTest.cmake")
add_test(CMake.String "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/StringTest.cmake")
add_test(CMake.Math "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/MathTest.cmake")
add_test(CMake.CMakeMinimumRequired "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/CMakeMinimumRequiredTest.cmake")
add_test(CMake.CompilerIdVendor "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/CompilerIdVendorTest.cmake")
add_test(CMake.ProcessorCount "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-DKWSYS_TEST_EXE=/home/ubuntu/workspace/cmake-3.11.3/Source/kwsys/cmsysTestsCxx" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/ProcessorCountTest.cmake")
add_test(CMake.PushCheckState "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/PushCheckStateTest.cmake")
add_test(CMake.While "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/WhileTest.cmake")
add_test(CMake.CMakeHostSystemInformation "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/CMakeHostSystemInformationTest.cmake")
add_test(CMake.FileDownload "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/FileDownloadTest.cmake")
set_tests_properties(CMake.FileDownload PROPERTIES  PASS_REGULAR_EXPRESSION "file already exists with expected MD5 sum")
add_test(CMake.FileDownloadBadHash "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/FileDownloadBadHashTest.cmake")
set_tests_properties(CMake.FileDownloadBadHash PROPERTIES  WILL_FAIL "TRUE")
add_test(CMake.FileUpload "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/FileUploadTest.cmake")
add_test(CMake.ELF "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/ELFTest.cmake")
add_test(CMake.EndStuff "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-Ddir:STRING=/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/EndStuffTest" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/EndStuffTest.cmake")
add_test(CMake.GetPrerequisites "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-DConfiguration:STRING=" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/GetPrerequisitesTest.cmake")
add_test(CMake.PolicyCheck "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-DCMake_BINARY_DIR:PATH=/home/ubuntu/workspace/cmake-3.11.3" "-DCMake_SOURCE_DIR:PATH=/home/ubuntu/workspace/cmake-3.11.3" "-DGIT_EXECUTABLE:STRING=/usr/bin/git" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/PolicyCheckTest.cmake")
add_test(CMake.CheckSourceTree "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "-DCMake_BINARY_DIR:PATH=/home/ubuntu/workspace/cmake-3.11.3" "-DCMake_SOURCE_DIR:PATH=/home/ubuntu/workspace/cmake-3.11.3" "-DGIT_EXECUTABLE:STRING=/usr/bin/git" "-DHOME:STRING=/home/ubuntu" "-P" "/home/ubuntu/workspace/cmake-3.11.3/Tests/CMakeTests/CheckSourceTreeTest.cmake")
