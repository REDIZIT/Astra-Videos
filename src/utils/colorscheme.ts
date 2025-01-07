import { HighlightStyle } from "@codemirror/language"
import { tags } from "@lezer/highlight"

export const catpuccinColors = generateColorSchemeFromBase16([
    "#1e1e2e", // 0x0 base
    "#181825", // 0x1 mantle
    "#313244", // 0x2 surface0
    "#45475a", // 0x3 surface1
    "#585b70", // 0x4 surface2
    "#cdd6f4", // 0x5 text
    "#f5e0dc", // 0x6 rosewater
    "#b4befe", // 0x7 lavender
    "#f38ba8", // 0x8 red
    "#fab387", // 0x9 peach
    "#d69d85", // 0xA yellow
    "#4ec9b0", // 0xB green
    "#57a64a", // 0xC teal
    "#569cd6", // 0xD blue
    "#cba6f7", // 0xE mauve
    "#d8a0df", // 0xF flamingo
]);

export const colors = catpuccinColors;

export function generateColorSchemeFromBase16(scheme: string[]) {
    return {
        base16: scheme,
        codeStyle: generateCodeStyleFromBase16(scheme),

        background: scheme[0x0],
        backgroundAlt: scheme[0x1],
        foreground: scheme[0x5],
        foregroundAlt: scheme[0x4],

        red: scheme[0x8],
        green: scheme[0xB],
        yellow: scheme[0xA],
        blue: scheme[0xD],
        magenta: scheme[0xE],
        cyan: scheme[0xC],
    }
}

export function generateCodeStyleFromBase16(scheme: string[]): HighlightStyle {
    return HighlightStyle.define(
        [
            {
                tag: [tags.comment],
                color: scheme[0xC],
                fontStyle: "italic",
            },
            {
                tag: [tags.invalid],
                color: scheme[0x4],
                borderBottom: `1px dotted ${scheme[0x8]}`,
            },
            {
                tag: [
                    tags.paren, tags.brace, tags.bracket,
                    tags.separator, tags.name,
                ],
                color: scheme[0x5],
            },
            {
                tag: [tags.operator, tags.operatorKeyword],
                color: scheme[0x7],
            },
            {
                tag: [tags.variableName],
                color: scheme[0x8]
            },
            {
                // string interpolation braces
                tag: [tags.special(tags.brace)],
                color: scheme[0x8],
            },
            {
                tag: [
                    tags.atom, tags.bool, tags.constant(tags.variableName),
                    tags.special(tags.variableName), tags.number
                ],
                color: scheme[0x9],
            },
            {
                tag: [tags.link],
                color: scheme[0x9],
                textDecoration: "underline",
                textUnderlinePosition: "under",
            },
            {
                tag: [tags.className],
                color: scheme[0xB],
            },
            {
                tag: [tags.string],
                color: scheme[0xA],
            },
            {
                tag: [tags.regexp, tags.escape],
                color: scheme[0xC],
            },
            {
                tag: [tags.propertyName],
                color: scheme[0xD],
            },
            {
                tag: [tags.heading],
                color: scheme[0xD],
                fontWeight: "bold",
            },
            {
                tag: [tags.typeName], // string, int
                color: scheme[0xD],
            },
            {
                tag: [tags.keyword], // public, private, class
                color: scheme[0xD],
            },
            {
                tag: [tags.controlKeyword], // return
                color: scheme[0xF],
            },
            {
                tag: [tags.tagName],
                color: scheme[0xF],
            },
        ]
    )
}