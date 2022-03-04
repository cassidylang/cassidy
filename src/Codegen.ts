import { Access, FunctionCall, FunctionDeclaration, ObjectReference, Program, ReferenceCall, Return, Statement, VariableDeclaration } from "./NodeType";
import { TokenType, ValueType } from "./Lexer";
import { API } from "./API";
function getIndent(count: number) {
    return new Array(count*4).fill(" ").join("")
}
class Codegen {
    code: string = "\"use strict\"";
    build(program: Program) {
        if (!program.statements.find(e=>e.constructor.name)) {
            throw new Error("Can't entry due to missing main")
        }
        program.statements.forEach(e=>{
            switch (e.constructor.name) {
                case "FunctionDeclaration":
                    this.code+=this.buildFunctionDeclaration(e as FunctionDeclaration);
                    break;
                case "VariableDeclaration":
                    this.code+=this.buildVarDeclaration(e as VariableDeclaration);
                    break;
            }
        });
        this.code+="\nmain()";
    }
    buildFunctionDeclaration(statement: FunctionDeclaration, indent = 0) {
        let returnType: TokenType,
            currentIndent = getIndent(indent), lcode = ""
        switch (statement.type) {
            case TokenType.INT:
            case TokenType.STRING:
            case TokenType.BOOL:
            case TokenType.VOID:
                returnType = statement.type;
                break;
            default:
                throw new Error("Bad type");
        }
        if ((!statement.body.statements.find(e=>e.constructor.name === "Return")) && returnType!==TokenType.VOID) {
            throw new Error("No return statement");
        }
        if ((statement.body.statements.find(e=>e.constructor.name === "Return")) && returnType===TokenType.VOID) {
            throw new Error("Void can't have return");
        }
        lcode+=`${currentIndent}\nfunction ${statement.identifier}()`;
        statement.body.statements.forEach(e=>{
            switch (e.constructor.name) {
                case "FunctionDeclaration":
                    lcode+=this.buildFunctionDeclaration(e as FunctionDeclaration,indent+1);
                    break;
                case "Access":
                case "FunctionCall":
                case "ObjectReference":
                    lcode+="\n"+"    "+currentIndent+this.buildReference(e);
                    break;
                case "VariableDeclaration":
                    lcode+="\n"+"    "+currentIndent+this.buildVarDeclaration(e as VariableDeclaration);
                    break;
                case "Return":
                    lcode+="\n"+"    "+currentIndent+this.buildReturn(e as Return);
                    break;
            }
        });
        return lcode;
    }
    buildArgs(statement: FunctionDeclaration) {
        let lcode: string[] = [];
        statement.parameters.forEach(e=>{
            lcode.push(e.identifier);
        });
        return lcode.join(",");
    }
    buildVarDeclaration(statement: VariableDeclaration) {
        let type: TokenType, cIndent = "";
        switch (statement.type) {
            case TokenType.INT:
            case TokenType.STRING:
            case TokenType.BOOL:
                type = statement.type;
                break;
            default:
                throw new Error("Bad type");
        }
        switch(typeof statement.value) {
            case "number":
                if (type===TokenType.INT) {
                    return `${cIndent}let ${statement.identifier} = ${statement.value}`
                } else {
                    throw new Error("Bad type");
                }
            case "string":
                if (type===TokenType.STRING) {
                    return `${cIndent}let ${statement.identifier} = ${statement.value}`
                } else {
                    throw new Error("Bad type");
                }
            case "boolean":
                if (type===TokenType.BOOL) {
                    return `${cIndent}let ${statement.identifier} = ${statement.value}`
                } else {
                    throw new Error("Bad type");
                }
            case "object":
                let val = this.buildReference(statement.value);
                return `${cIndent}let ${statement.identifier} = ${statement.value}`
            default:
                throw new Error("Bad type");
        }
    }
    buildReference(statement: ReferenceCall): string {
        switch(statement.constructor.name) {
            case "FunctionCall":
                let name: string = (statement as FunctionCall).identifier
                return `${name}(${(statement as FunctionCall).args.join(",")})`;
            case "Access":
                let left = this.buildReference((statement as Access).left),
                    right = this.buildReference((statement as Access).right);
                return `${left}.${right}`;
            case "ObjectReference":
                return (statement as ObjectReference).identifier;
            default:
                return "";
        }
    }
    buildReturn(statement: Return) {
        if (typeof statement.value === "object") {
            return `return ${this.buildReference(statement.value)}`
        } else {
            return `return ${statement.value}`
        }
    }
}