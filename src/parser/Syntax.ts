/**
 * Syntax (BNF):
 * arithmetic => <mexpr>(<assign><mexpr>)
 * mexpr => <term>(<+|-><term>)
 * term => <factor>(<*|/><factor>)
 * factor => <variable|numeric|return|mexpr>(<**><variable|numeric|return|mexpr>)
 * return => <identifier><lparen><parameter>(<,><parameter>)[]<rparen>
 * variable => <identifier>
 * numeric => <int|float>
 * parameter => <variable>|<value>
 * value => <string|int|float|bool>
 * letter => "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"
 * synbol => "\"" | "\'" | "\n" | "(" | ")" | "[" | "]" | "{" | "}" | "." | ";" | ":" | "," | "<" | ">" | "\\" | "/" | "?" | "-" | "_" | "=" | "+" | "`" | "~" | "@" | "#" | "$" | "%" | "^" | "&" | "*"
 * digit => "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
 * int => <digit>[]
 * float => <digit>[]<.><digit>[]
 * string => <letter|symbol>[]
 * function => <public|private|protected|abstract><static><async><type><identifier><lparen><parameter>(<,><parameter>)[]<rparen><lcurly><body><rcurly>
 */