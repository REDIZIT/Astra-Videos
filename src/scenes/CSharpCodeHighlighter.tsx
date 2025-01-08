import { CustomCodeHighlighter } from './CustomCodeHighlighter';

export class CSharpCodeHighlighter extends CustomCodeHighlighter {

    public constructor(
        private readonly refTypes: Set<string> = null
    ) {
        super()

        this.keywords = new Set(["new", "public", "private", "static", "class", "struct", "override", "abstract", "virtual", "base", "this" ]);
        this.keywords_controlFlow = new Set(["return", "if", "else", "throw", "foreach", "for ", "while"]);
        this.brackets = new Set(["{", "}", "[", "]", "(", ")", ";", ":", ",", "."]);
        this.operators = new Set(["+", "-", "*", "/", "=", "==", "!=", ">", ">=", "<", "<=", "+=", "-=", "*=", "/=", "++", "--"]);
        this.builtin_types = new Set(["int", "float", "string", "void", "null"]);
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

    tryGetColor(tokens: string[], index: number): string {

        const commentFirstIndex = this.tryGetIndexBackUntilTerminator(tokens, index, "/")
        
        if (commentFirstIndex != -1)
        {
            // If tokens[index] is second '/'
            let commentSecondIndex = this.tryGetIndexBackUntilTerminator(tokens, commentFirstIndex - 1, "/")
            if (commentSecondIndex != -1) {
                return this.color_comment
            }

            // If tokens[index] is first '/'
            commentSecondIndex = this.tryGetIndexForwardUntilTerminator(tokens, commentFirstIndex + 1, "/")
            if (commentSecondIndex != -1) {
                return this.color_comment
            }
        }

        return super.tryGetColor(tokens, index)
    }
}