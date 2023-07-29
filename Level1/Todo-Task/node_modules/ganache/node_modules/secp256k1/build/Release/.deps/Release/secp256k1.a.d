cmd_Release/secp256k1.a := ln -f "Release/obj.target/secp256k1.a" "Release/secp256k1.a" 2>/dev/null || (rm -rf "Release/secp256k1.a" && cp -af "Release/obj.target/secp256k1.a" "Release/secp256k1.a")
