import {styleTags, tags as t} from "@lezer/highlight"

export const jsonHighlighting = styleTags({
  String: t.string,
  Number: t.number,
  Bool: t.bool,
  Register: t.variableName,
  Null: t.null,
  ", :": t.separator,
  "[ ]": t.bracket,
  "{ }": t.brace,
  Comment: t.comment,
  TypeName: t.typeName,
  Identifier: t.number,
  Keyword: t.keyword,
  ControlFlowKeyword: t.controlKeyword,
  FunctionName: t.comment,
})
