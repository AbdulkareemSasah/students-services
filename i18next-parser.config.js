module.exports = {
    input: ['./app/**/*.ts', './app/**/*.tsx','./components/**/*.ts', './components/**/*.tsx'], // Paths to files containing the translated texts
    locales: ['en', 'ar'], // Languages for which to create files
    sort: true, // Sort the texts
    keySeparator: '.', // Separator for keys in the files
    defaultValue: '', // Default value for texts
    nsSeparator: ':', // Separator for namespaces in the files
    resource: {
        // File configuration
        loadPath: '{{lng}}/translation.json',
        savePath: '{{lng}}/common.json',
    },
    getNamespace: (filePath) => {
        const match = /\/src\/(.*)\.[jt]sx?$/.exec(filePath);
        return match ? match[1] : 'common';
    },
    lexers: {
        hbs: ['HandlebarsLexer'],
        handlebars: ['HandlebarsLexer'],

        htm: ['HTMLLexer'],
        html: ['HTMLLexer'],

        mjs: ['JavascriptLexer'],
        js: ['JavascriptLexer'], // if you're writing jsx inside .js files, change this to JsxLexer
        ts: ['JavascriptLexer'],
        jsx: ['JsxLexer'],
        tsx: ['JsxLexer'],

        default: ['JavascriptLexer'],
    },
    output: 'public/locales/$LOCALE/$NAMESPACE.json',
};