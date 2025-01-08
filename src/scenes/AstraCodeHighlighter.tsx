import { CustomCodeHighlighter } from './CustomCodeHighlighter';

export class AstraCodeHighlighter extends CustomCodeHighlighter {

    custom_functions: Set<string>

    public constructor(
        private readonly refTypes: Set<string> = null
    ) {
        super();

        this.keywords = new Set(["new", "public", "private", "static", "class", "struct", "override", "abstract", "virtual", "base", "this"]);
        this.keywords_controlFlow = new Set(["return", "if", "else", "throw", "foreach", "for", "while"]);
        this.brackets = new Set(["{", "}", "[", "]", "(", ")", ";", ":", ",", "."]);
        this.operators = new Set(["+", "-", "*", "/", "=", "==", "!=", ">", ">=", "<", "<=", "+=", "-=", "*=", "/=", "++", "--"]);
        this.builtin_types = new Set(["int", "float", "string", "void", "null", "var"]);
        this.builtin_refTypes = new Set([]);
        this.builtin_valueTypes = new Set(["program", "myStruct"]);
        this.strings = new Set(["'", '"']);
        this.singleCharTokens = new Set([" ", "(", ")", ";", "\n"]);

        this.custom_functions = new Set(["print", "reverse"])

        if (refTypes == null) {
            this.custom_refTypes = new Set();
        }
        else {
            this.custom_refTypes = refTypes;
        }
    }

    tryGetColor(tokens: string[], index: number): string {

        const commentFirstIndex = this.tryGetIndexBackUntilTerminator(tokens, index, "/");

        if (commentFirstIndex != -1) {
            // If tokens[index] is second '/'
            let commentSecondIndex = this.tryGetIndexBackUntilTerminator(tokens, commentFirstIndex - 1, "/");
            if (commentSecondIndex != -1) {
                return this.color_comment;
            }

            // If tokens[index] is first '/'
            commentSecondIndex = this.tryGetIndexForwardUntilTerminator(tokens, commentFirstIndex + 1, "/");
            if (commentSecondIndex != -1) {
                return this.color_comment;
            }
        }

        if (tokens[index] == "i" && !isNaN(parseFloat(tokens[index + 1]))) {
            return this.color_keywords_and_types
        }

        const color = super.tryGetColor(tokens, index)
        if (color == null) {
            if (this.custom_functions.has(tokens[index])) {
                return this.yellow
            }
        }

        if (color == this.color_number && (tokens[index - 1] == "i" || tokens[index - 2] == "i")) {
            return this.color_keywords_and_types
        }

        return color
    }
}