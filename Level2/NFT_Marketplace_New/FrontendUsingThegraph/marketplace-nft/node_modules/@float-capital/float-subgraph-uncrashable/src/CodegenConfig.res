@val external process: 'a = "process"
let env = process["env"]

let graphManifest = env["MANIFEST"]->Option.getWithDefault("./subgraph.yaml")
let codegenConfigPath =
  env["CODEGEN_CONFIG_PATH"]->Option.getWithDefault("./uncrashable-config.yaml")
let generatedFolderName = env["GENERATED_FOLDER_NAME"]->Option.getWithDefault("generated")
let outputEntityFilePath = `./${generatedFolderName}`
let safeMode = env["SAFE_MODE"]->Option.getWithDefault("false")
