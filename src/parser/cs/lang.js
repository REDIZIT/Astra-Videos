// This file was generated by lezer-generator. You probably shouldn't edit it.
import {LRParser} from "@lezer/lr"
import {jsonHighlighting} from "./highlight"
export const parser = LRParser.deserialize({
  version: 14,
  states: "bOVQPOOOOQO'#Ck'#CkQOQPOO",
  stateData: "w~O^OS~OQPORPOSPOTPOUPOVPOWPOXPOYPOZPO~O",
  goto: "d`PPPPPPPPPPPPPPPaRQO",
  nodeNames: "⚠ Program Comment Keyword ControlFlowKeyword Bool Null Number String TypeName FunctionName Identifier",
  maxTerm: 15,
  propSources: [jsonHighlighting],
  skippedNodes: [0],
  repeatNodeCount: 0,
  tokenData: "Ag~RpXY#VYZ#V]^#Vpq#[rs$k}!O&X!P!Q(R!Q!R&b!R!['p!b!c+i!c!d,h!e!f-y!g!h/Z!i!j0]!n!o1b!o!p1t!u!v2W!v!w4R!y!z7Q#T#U7j#V#W8k#X#Y9T#Y#Z9l#]#^;O#b#c;X#c#d;y#d#e<u#f#g>g#g#h?V#h#i@O#j#k@q#k#lAT~#[O^~~#aP^~!v!w#d~#gP#c#d#j~#mP#_#`#p~#sP#X#Y#v~#yP#b#c#|~$PP#]#^$S~$VP#n#o$Y~$]P#X#Y$`~$cPxy$f~$kOY~~$nWpq%Wqr%Wrs%ps#O%W#O#P%{#P;'S%W;'S;=`%u<%lO%W~%ZVpq%Wqr%Wrs%ps#O%W#P;'S%W;'S;=`%u<%lO%W~%uOW~~%xP;=`<%l%W~&OP#b#c&R~&UPrs%p~&[Q!Q!R&b!R!['p~&gRV~!O!P&p!g!h'U#X#Y'U~&sP!Q![&v~&{RV~!Q![&v!g!h'U#X#Y'U~'XR{|'b}!O'b!Q!['h~'eP!Q!['h~'mPV~!Q!['h~'uSV~!O!P&p!Q!['p!g!h'U#X#Y'U~(UQz{([!P!Q*z~(_ZXY([YZ([]^([pq([qr([sz([z{)Q{#O([#P;'S([;'S;=`*t<%lO([~)T]XY([YZ([]^([pq([qr([sz([z{)Q{!P([!P!Q)|!Q#O([#P;'S([;'S;=`*t<%lO([~*RZQ~XY([YZ([]^([pq([qr([sz([z{)Q{#O([#P;'S([;'S;=`*t<%lO([~*wP;=`<%l([~+PUQ~pq*zqr*zs#O*z#P;'S*z;'S;=`+c<%lO*z~+fP;=`<%l*z~+lPrs+o~+rYXY+oYZ+o]^+opq+oqr+ors%ps#O+o#P;'S+o;'S;=`,b<%lO+o~,eP;=`<%l+o~,kQ#W#X,q#d#e,w~,tP#W#X$f~,zP#d#e,}~-QP#X#Y-T~-WP#b#c-Z~-^P#W#X-a~-dP!n!o-g~-jP#]#^-m~-pP#b#c-s~-vP#X#Y$f~-|P#c#d.P~.SQ#a#b.Y#b#c.l~.]P#d#e.`~.cP#]#^.f~.iP#`#a-s~.oP#g#h.r~.uP#c#d.x~.{P#`#a/O~/RP#X#Y/U~/ZOZ~~/^P#l#m/a~/dP#V#W/g~/jP#X#Y/m~/pP#d#e/s~/vP#h#i/y~/|P#]#^0P~0SP#c#d0V~0YP#b#c/U~0`P#X#Y0c~0fP#b#c0i~0lP#X#Y0o~0rP#f#g0u~0xP#T#U0{~1OP#h#i1R~1UQ#X#Y$f#c#d1[~1_P#f#g/U~1eP#]#^1h~1kP#g#h1n~1qP#h#i/U~1wP#T#U1z~1}P#]#^2Q~2TP#b#c$f~2ZQ#d#e2a#h#i2s~2dP#`#a2g~2jP#]#^2m~2pP#h#i$f~2vP#f#g2y~2|P#]#^3P~3SP#b#c3V~3YP#Z#[3]~3`P!d!e3c~3fP#i#j3i~3lP#]#^3o~3rP#`#a3u~3xP#W#X3{~4OP#X#Y1[~4UQ#c#d4[#f#g6t~4_Q!u!v4e#_#`5T~4hP#h#i4k~4nP#f#g4q~4tP#]#^4w~4zP#b#c4}~5QP#Z#[$f~5WP#X#Y5Z~5^P#b#c5a~5dTYZ/Upq/U!`!a/U#R#S5s#]#^6]~5vP!r!s5y~5|P#f#g6P~6SP#]#^6V~6YP#b#c1n~6`P#n#o6c~6fP#X#Y6i~6nQY~!n!o-g#f#g/U~6wP#]#^6z~6}P#a#b$f~7TP#f#g7W~7ZP#]#^7^~7aP#h#i7d~7gP#X#Y-a~7mP#U#V7p~7sP#g#h7v~7yP#h#i7|~8PP#f#g8S~8VP#T#U8Y~8]P#V#W8`~8cP#h#i8f~8kOR~~8nP#`#a8q~8tP#T#U8w~8zP#g#h8}~9QP#g#h8f~9WP#`#a9Z~9^P#g#h9a~9dP#X#Y9g~9lOS~~9oR#T#U9x#`#a:a#c#d:x~9{P#`#a:O~:RP#g#h:U~:XP#X#Y:[~:aOT~~:dP#c#d:g~:jP#T#U:m~:pP#h#i:s~:xOX~~:{P#f#g9g~;RQ#Y#Z9g#b#c:m~;[Q#X#Y;b#i#j;h~;eP#k#l8f~;kP#`#a;n~;qP#`#a;t~;yOU~~;|P#j#k<P~<SP#X#Y<V~<YP#f#g<]~<`P#f#g<c~<fP#]#^<i~<lP#W#X<o~<rP#X#Y8f~<xR#c#d=R#f#g=e#i#j=}~=UP#]#^=X~=[P#b#c=_~=bP#h#i3{~=hP#]#^=k~=nP#j#k=q~=tP#T#U=w~=zP#h#i<o~>QP#U#V>T~>WP#`#a>Z~>^P#]#^>a~>dP#V#W8f~>jP#X#Y>m~>pP#h#i>s~>vP#i#j>y~>|P#f#g?P~?SP#b#c9g~?YP#h#i?]~?`Q#T#U?f#f#g?l~?iP#h#i>Z~?oP#]#^?r~?uP#b#c?x~?{P#Z#[:s~@RQ#[#]@X#f#g@k~@[P#f#g@_~@bP#c#d@e~@hP#k#l9g~@nP#i#j:U~@tP#c#d@w~@zP#]#^@}~AQP#W#X8f~AWP#[#]AZ~A^P#]#^Aa~AdP#`#a9a",
  tokenizers: [0],
  topRules: {"Program":[0,1]},
  tokenPrec: 0
})
