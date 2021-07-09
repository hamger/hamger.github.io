const { engines } = require("./package");
const version = engines.node;

// node 要求指定版本
if (process.version !== version) {
    console.error(`The engine "node" is incompatible with this module. Expected version "${version}". Got "${process.version}"`);
    process.exit(1);
}





