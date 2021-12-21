import { FunctionCall, FunctionDeclaration, Program, ReferenceCall, Statement, VariableDeclaration } from "./NodeType";
import { TokenType, ValueType } from "./Lexer";
import { API } from "./API";
function getIndent(count: number) {
    return new Array(count*4).fill(" ").join("")
}
class Codegen {
    code: string = "\"use strict\"";
    functionStack: FunctionDeclaration[] = [];
    varStack: VariableDeclaration[] = [];
    build(program: Program) {
        if (!program.statements.find(e=>e.constructor.name)) {
            throw new Error("Can't entry due to missing main")
        }
        program.statements.forEach(e=>{
            if (e.constructor.name === "FunctionDeclaration") {
                this.functionStack.push(e as FunctionDeclaration);
            } else if (e.constructor.name === "VariableDeclaration") {
                this.varStack.push(e as VariableDeclaration);
            }
        })
        program.statements.forEach(e=>{
            switch (e.constructor.name) {
                case "FunctionDeclaration":
                    this.code+=this.buildFunctionDeclaration(e as FunctionDeclaration, this.functionStack, this.varStack);
                    break;
            }
        });
        this.code+="\nmain()";
    }
    buildFunctionDeclaration(statement: FunctionDeclaration, kfunction: FunctionDeclaration[], kvar: VariableDeclaration[], indent = 0) {
        let returnType: TokenType, localfunction: FunctionDeclaration[] = [], localvar: VariableDeclaration[] = [],
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
        statement.body.statements.forEach(e=>{
            if (e.constructor.name === "FunctionDeclaration") {
                localfunction.push(e as FunctionDeclaration);
            } else if (e.constructor.name === "VariableDeclaration") {
                localvar.push(e as VariableDeclaration);
            }
        })
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
                    lcode+=this.buildFunctionDeclaration(e as FunctionDeclaration, [...kfunction,...localfunction], [...kvar,...localvar],indent+1);
                    break;
            }
        });
        return lcode;
    }
    buildArgs(statement: FunctionDeclaration, kfunction: FunctionDeclaration[], kvar: VariableDeclaration[]) {
        let lcode = "";
        statement.parameters.forEach(e=>{
            
        })
    }
    buildVarDeclaration(statement: VariableDeclaration, kfunction: FunctionDeclaration[], kvar: VariableDeclaration[], indent = 0) {
        let type: TokenType, cIndent = getIndent(indent);
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
                let val = this.buildReference(statement.value, kfunction, kvar);
                return `${cIndent}let ${statement.identifier} = ${statement.value}`
            default:

        }
    }
    buildReference(statement: ReferenceCall, kfunction: FunctionDeclaration[], kvar: VariableDeclaration[]) {
        switch(statement.constructor.name) {
            case "FunctionCall":
                let name: string = (statement as FunctionCall).identifier
                if (API.api[name]) {
                    
                }
                break;
            case "":
                break;
        }
    }
}