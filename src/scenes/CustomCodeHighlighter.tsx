import { CodeHighlighter, HighlightResult } from '@motion-canvas/2d';
import { useLogger } from '@motion-canvas/core';

interface LezerCache {
    code: string;
    colorLookup: Array<Node>;
}

class Node {
    startIndex: number
    length: number
    color: string
}

export class CustomCodeHighlighter implements CodeHighlighter<LezerCache | null>
{
    keywords: Set<string>
    keywords_controlFlow: Set<string>
    brackets: Set<string>
    operators: Set<string>
    builtin_types: Set<string>
    builtin_valueTypes: Set<string>;
    builtin_refTypes: Set<string>
    strings: Set<string>
    singleCharTokens: Set<string>

    custom_refTypes: Set<string>

    isFlooding: boolean
    floodColor: string

    color_keywords_and_types = "#569cd6"
    green = "#4ec9b0"
    yellow = "#dcdcaa"
    orange = "#d69d85"
    color_comment = "#57a64a"
    color_controlFlow = "#d8a0df"
    color_valueTypes = "#86c691"
    color_number = "#b5cea8"

    fallbackColor = "#dcdcdc";

    initialize(): boolean {
        return true;
    }
    prepare(code: string) {
        const colorLookup = new Array<Node>();

        const tokens = this.tokenize(code);

        let currentIndex = 0;
        for (var i = 0; i < tokens.length; i++) {
            const token = tokens[i];

            const node = new Node();
            node.startIndex = currentIndex;
            node.length = token.length;

            node.color = this.tryGetColor(tokens, i);
            if (node.color == null) node.color = this.fallbackColor;

            colorLookup.push(node);
            currentIndex += token.length;
        }

        return {
            code: code,
            colorLookup: colorLookup,
        };
    }
    highlight(index: number, cache: any): HighlightResult {

        const currentIndex = 0;
        let node: Node = null;

        for (var i = 0; i < cache.colorLookup.length; i++) {
            node = cache.colorLookup[i];

            if (currentIndex + node.startIndex >= index) {
                return {
                    color: node.color,
                    skipAhead: node.length,
                };
            }
        }

        return {
            color: "white",
            skipAhead: 1,
        };

    }


    tokenize(code: string): string[] {
        let words = new Array<string>();
        let word = "";

        for (var i = 0; i < code.length; i++) {

            const char = code[i];

            // If we started from terminator
            if (this.singleCharTokens.has(word)) {
                if (word != "") words.push(word);
                word = "";
            }


            // If we reached token terminator
            else if (this.singleCharTokens.has(char)) {
                if (word != "") words.push(word);
                word = "";
            }
            else if (this.tryGetColorSingle(word) != null || this.tryGetColorSingle(char) != null) {
                if (word != "") words.push(word);
                word = "";
            }

            word += char;
        }

        words.push(word);

        return words;
    }


    tryGetColor(tokens: string[], index: number): string {

        const token = tokens[index].trim();
        if (token == "") return null;

        const color = this.tryGetColorSingle(token);

        if (color == null) {
            const firstIndex = token.indexOf('"');
            const lastIndex = token.lastIndexOf('"');

            const stringColor = this.orange;

            // If single token string
            if (firstIndex != lastIndex) {
                return stringColor;
            }


            // If multi-token string
            else if (firstIndex != -1) {
                if (this.isFlooding) {
                    this.isFlooding = false;
                    return this.floodColor;
                }
                else {
                    this.isFlooding = true;
                    this.floodColor = stringColor;
                }
            }



            // If not a string
            else {
                const prevToken = tokens[index - 2];
                const nextToken = tokens[index + 1];

                if (prevToken == "class" || prevToken == ":") {
                    return this.green;
                }
                else if (nextToken == "(") {
                    return this.yellow;
                }
                else if (this.custom_refTypes.has(token)) {
                    return this.green;
                }

                //useLogger().info("Unknown: " + token)
            }
        }

        return this.isFlooding ? this.floodColor : color;
    }

    tryGetColorSingle(token: string): string {

        if (this.keywords.has(token) || this.builtin_types.has(token)) {
            return this.color_keywords_and_types;
        }
        else if (this.keywords_controlFlow.has(token)) {
            return this.color_controlFlow;
        }
        else if (this.brackets.has(token) || this.operators.has(token)) {
            return "#ccc"; // gray
        }
        else if (this.builtin_refTypes.has(token)) {
            return this.green;
        }
        else if (this.builtin_valueTypes != null && this.builtin_valueTypes.has(token)) {
            return this.color_valueTypes
        }

        // If number
        if (new RegExp('[0-9]').test(token)) {
            return this.color_number
        }

        return null;
    }

    tryFindUntilTerminator(tokens: string[], index: number, pattern: string): boolean {
        return this.tryGetIndexForwardUntilTerminator(tokens, index, pattern) != -1
    }


    tryGetIndexForwardUntilTerminator(tokens: string[], index: number, pattern: string): number {

        for (var i = index; i < tokens.length; i++) {
            const token = tokens[i];

            if (token == "\n") {
                return -1;
            }
            if (token.indexOf(pattern) != -1) {
                return i;
            }
        }

        return -1;
    }

    tryGetIndexBackUntilTerminator(tokens: string[], index: number, pattern: string): number {

        for (var i = index; i >= 0; i--) {
            const token = tokens[i];

            if (token == "\n") {
                return -1;
            }
            if (token.indexOf(pattern) != -1) {
                return i;
            }
        }

        return -1;
    }
}
