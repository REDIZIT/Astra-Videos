import { CustomCodeHighlighter } from './CustomCodeHighlighter';


export class NasmCodeHighlighter extends CustomCodeHighlighter {

    instructions: Set<string>;

    public constructor(
        private readonly refTypes: Set<string> = null
    ) {
        super();

        this.keywords = new Set(["mov", "global"]);
        this.keywords_controlFlow = new Set(["ret", "call", "syscall"]);
        this.brackets = new Set(["{", "}", "[", "]", "(", ")", ";", ":", ",", "."]);
        this.operators = new Set(["+", "-", "*", "/"]);
        this.builtin_types = new Set(["qword", "db", "resb"]);
        this.builtin_refTypes = new Set(["Exception", "List", "Console", "StringBuilder"]);
        this.strings = new Set(["'", '"']);
        this.singleCharTokens = new Set([" ", "(", ")", ";", "\n"]);
        this.instructions = new Set(["mov", "add", "sub", "mul", "imul", "push", "pop", "xor", "lea"]);

        if (refTypes == null) {
            this.custom_refTypes = new Set();
        }
        else {
            this.custom_refTypes = refTypes;
        }
    }

    tryGetColor(tokens: string[], index: number): string {

        const token = tokens[index];

        if (this.instructions.has(token)) {
            return this.yellow;
        }

        // Comments
        if (token.indexOf(';') != -1) {
            this.isFlooding = true;
            this.floodColor = this.color_comment;
            return this.floodColor;
        }

        // Sections
        if (this.tryFindUntilTerminator(tokens, index, ":") || token == "section") {
            this.isFlooding = true;
            this.floodColor = this.color_controlFlow;
            return this.floodColor;
        }

        if (token.indexOf("\n") != -1) {
            this.isFlooding = false;
        }

        // Registries
        if (this.isFlooding == false && token.match(/\b([re]?[abcds][xhl]|[re]?[sd]i|[re]bp|[re]sp|r(8|9|10)[bwd]?)\b/)) {
            return this.orange;
        }

        return super.tryGetColor(tokens, index);
    }

    tryFindUntilTerminator(tokens: string[], index: number, pattern: string): boolean {

        for (var i = index; i < tokens.length; i++) {
            const token = tokens[i];

            if (token == "\n") {
                return false;
            }
            if (token.indexOf(pattern) != -1) {
                return true;
            }
        }

        return false;
    }
}
