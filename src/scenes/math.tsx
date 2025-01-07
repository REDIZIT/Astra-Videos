import { CODE, makeScene2D, Layout, CodeHighlighter, HighlightResult, Code, LezerHighlighter, DefaultHighlightStyle } from '@motion-canvas/2d';
import { all, chain, createRef, easeInCubic, useLogger, waitFor } from '@motion-canvas/core';
import { CodeBlock } from '../components/codeblock';
import { colors } from '../utils/colorscheme'
import { HighlightStyle } from "@codemirror/language"
import { tags } from "@lezer/highlight"

import { Input, Parser, PartialParse, SyntaxNode, Tree, TreeFragment } from '@lezer/common';



export default makeScene2D(function* (view) {

    const ref_code = createRef<Code>()

    const highlighter = new TaggedCodeHighlighter(colors.codeStyle)

    view.add(<>
        <Code ref={ref_code} code="print 123" highlighter={highlighter} />
    </>)



    yield* waitFor(1)



    yield* ref_code().code("resolve 123", 1)
    yield* waitFor(1)

});

interface LezerCache {
    code: string;
    colorLookup: Array<Node>;
}

class Node {
    startIndex: number
    length: number
    color: string
}

export class TaggedCodeHighlighter implements CodeHighlighter<LezerCache | null> {

    keywords: Set<string>
    keywords_controlFlow: Set<string>
    brackets: Set<string>
    operators: Set<string>
    builtin_types: Set<string>
    builtin_refTypes: Set<string>
    strings: Set<string>

    custom_refTypes: Set<string>

    isFlooding: boolean
    floodColor: string

    darkBlue = "#569cd6"
    green = "#4ec9b0"
    yellow = "#dcdcaa"

    fallbackColor = "#dcdcdc"

    public constructor(
        private readonly style: HighlightStyle = DefaultHighlightStyle,
    ) {
        this.keywords = new Set(["new", "public", "private", "static", "class", "struct", "override", "abstract", "virtual"])
        this.keywords_controlFlow = new Set(["return", "if", "else", "throw", "for", "while"])
        this.brackets = new Set(["{", "}", "[", "]", "(", ")", ";", ":", ",", "."])
        this.operators = new Set(["+", "-", "*", "/", "=", "==", "!=", ">", ">=", "<", "<=", "+=", "-=", "*=", "/=", "++", "--"])
        this.builtin_types = new Set(["int", "float", "string", "void"])
        this.builtin_refTypes = new Set(["Exception", "List", "Console", "StringBuilder"])
        this.strings = new Set(["'", '"'])

        this.custom_refTypes = new Set()
    }

    initialize(): boolean {
        return true
    }
    prepare(code: string) {
        const colorLookup = new Array<Node>()

        const tokens = this.tokenize(code)

        let currentIndex = 0
        for (var i = 0; i < tokens.length; i++) {
            const token = tokens[i]

            const node = new Node()
            node.startIndex = currentIndex
            node.length = token.length

            node.color = this.tryGetColor(tokens, i)
            if (node.color == null) node.color = this.fallbackColor

            colorLookup.push(node)
            currentIndex += token.length
        }

        return {
            code: code,
            colorLookup: colorLookup,
        }
    }
    highlight(index: number, cache: any): HighlightResult {

        const currentIndex = 0
        let node: Node = null

        for (var i = 0; i < cache.colorLookup.length; i++) {
            node = cache.colorLookup[i]

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

        const singleCharTokens = new Set([" ", "(", ")", ";", "\n"])

        let words = new Array<string>()
        let word = ""

        for (var i = 0; i < code.length; i++) {

            const char = code[i]

            // If we started from terminator
            if (singleCharTokens.has(word)) {
                words.push(word)
                word = ""
            }
            // If we reached token terminator
            else if (singleCharTokens.has(char)) {
                words.push(word)
                word = ""
            }
            else if (this.tryGetColorSingle(word) != null || this.tryGetColorSingle(char) != null) {
                words.push(word)
                word = ""
            }

            word += char
        }

        

        words.push(word)

        return words
    }


    tryGetColor(tokens: string[], index: number): string {

        const token = tokens[index].trim()
        if (token == "") return null

        const color = this.tryGetColorSingle(token)

        if (color == null)
        {
            const firstIndex = token.indexOf('"')
            const lastIndex = token.lastIndexOf('"')

            const stringColor = "#d69d85"

            // If single token string
            if (firstIndex != lastIndex) {
                return stringColor
            }
            // If multi-token string
            else if (firstIndex != -1) {
                if (this.isFlooding) {
                    this.isFlooding = false;
                    return this.floodColor
                }
                else {
                    this.isFlooding = true
                    this.floodColor = stringColor
                }
            }
            // If not a string
            else
            {
                const prevToken = tokens[index - 2]
                const nextToken = tokens[index + 1]

                if (prevToken == "class" || prevToken == ":") {
                    return this.green
                }
                else if (nextToken == "(") {
                    return this.yellow
                }
                else if (this.custom_refTypes.has(token)) {
                    return this.green
                }

                //useLogger().info("Unknown: " + token)
            }
        }

        return this.isFlooding ? this.floodColor : color
    }

    tryGetColorSingle(token: string): string {

        if (this.keywords.has(token) || this.builtin_types.has(token)) {
            return this.darkBlue
        }
        else if (this.keywords_controlFlow.has(token)) {
            return "#d8a0df" // purple-pink
        }
        else if (this.brackets.has(token) || this.operators.has(token)) {
            return "#ccc" // gray
        }
        else if (this.builtin_refTypes.has(token)) {
            return this.green
        }

        // If number
        if (new RegExp('[0-9]').test(token)) {
            return "#b5cea8" // pale yellow
        }

        return null
    }
}