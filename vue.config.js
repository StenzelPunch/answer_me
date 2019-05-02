module.exports = {
    lintOnSave: true,
    publicPath: process.env.NODE_ENV === "production" ? "/answer_me/#/" : "/",
    outputDir: "docs",
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined,
    css: undefined
};
