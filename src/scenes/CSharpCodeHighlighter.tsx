import { CustomCodeHighlighter } from './CustomCodeHighlighter';

export class CSharpCodeHighlighter extends CustomCodeHighlighter {

    public constructor(
        private readonly refTypes: Set<string> = null
    ) {
        super()

        this.keywords = new Set(["new", "public", "private", "static", "class", "struct", "override", "abstract", "virtual"]);
        this.keywords_controlFlow = new Set(["return", "if", "else", "throw", "for", "while"]);
        this.brackets = new Set(["{", "}", "[", "]", "(", ")", ";", ":", ",", "."]);
        this.operators = new Set(["+", "-", "*", "/", "=", "==", "!=", ">", ">=", "<", "<=", "+=", "-=", "*=", "/=", "++", "--"]);
        this.builtin_types = new Set(["int", "float", "string", "void"]);
        this.builtin_refTypes = new Set(["Exception", "List", "Console", "StringBuilder"]);
        this.strings = new Set(["'", '"']);
        this.singleCharTokens = new Set([" ", "(", ")", ";", "\n"]);

        if (refTypes == null) {
            this.custom_refTypes = new Set()
        }
        else {
            this.custom_refTypes = refTypes
        }
    }
}

