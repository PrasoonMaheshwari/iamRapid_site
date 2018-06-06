# CMake generated Testfile for 
# Source directory: /home/ubuntu/workspace/cmake-3.11.3
# Build directory: /home/ubuntu/workspace/cmake-3.11.3
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
include("/home/ubuntu/workspace/cmake-3.11.3/Tests/EnforceConfig.cmake")
add_test(SystemInformationNew "/home/ubuntu/workspace/cmake-3.11.3/bin/cmake" "--system-information" "-G" "Unix Makefiles")
subdirs("Source/kwsys")
subdirs("Utilities/KWIML")
subdirs("Utilities/cmlibrhash")
subdirs("Utilities/cmzlib")
subdirs("Utilities/cmcurl")
subdirs("Utilities/cmcompress")
subdirs("Utilities/cmexpat")
subdirs("Utilities/cmbzip2")
subdirs("Utilities/cmliblzma")
subdirs("Utilities/cmlibarchive")
subdirs("Utilities/cmjsoncpp")
subdirs("Utilities/cmlibuv")
subdirs("Source/CursesDialog/form")
subdirs("Source")
subdirs("Utilities")
subdirs("Tests")
subdirs("Auxiliary")
