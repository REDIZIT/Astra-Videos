import {styleTags, tags as t} from "@lezer/highlight"

export const jsonHighlighting = styleTags({
  String: t.string,
  Number: t.number,
  Bool: t.bool,
  PropertyName: t.propertyName,
  Null: t.null,
  ", :": t.separator,
  "[ ]": t.bracket,
  "{ }": t.brace,
  Comment: t.comment,
  TypeName: t.typeName,
  Identifier: t.className,
  Keyword: t.keyword,
  ControlFlowKeyword: t.controlKeyword,
  FunctionName: t.comment,
})
