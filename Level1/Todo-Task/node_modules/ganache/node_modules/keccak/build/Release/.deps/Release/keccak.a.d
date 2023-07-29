cmd_Release/keccak.a := ln -f "Release/obj.target/keccak.a" "Release/keccak.a" 2>/dev/null || (rm -rf "Release/keccak.a" && cp -af "Release/obj.target/keccak.a" "Release/keccak.a")
