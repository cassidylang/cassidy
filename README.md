<div align="center">
  <img src="assets/logo.png"/>
  <br/>
  <b>A programming language with precision for the web</b>
  <br/>
  <br/>
  <a href="https://github.com/cassidylang/cassidy/blob/master/LICENSE.md"><img src="https://img.shields.io/badge/license-GPLv3-blue.svg"/></a>
  <a href="https://github.com/cassidylang/cassidy"><img alt="language" src="https://img.shields.io/badge/language-Typescript-purple.svg"></a>
  <a href="https://github.com/cassidylang/cassidy/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/cassidylang/cassidy?color=gold"></a>
  <a href="https://github.com/cassidylang/cassidy/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>
  <a href="https://discord.gg/sjMVQP43zD"><img src="https://img.shields.io/discord/825295074967289886.svg"/></a>
  <a href="https://github.com/cassidylang/cassidy"><img src="https://img.shields.io/github/repo-size/cassidylang/cassidy"/></a>
</div>


## What is Cassidy?
Cassidy was originally created as a language that brings the idea of C#, combined with the unique features from Javascript. But over the time, we have realized that the we should bring the core ideology behind it to the web, granting safety and the ability to work with teams easily.

So overall, it aims to bring safety to web projects, while helping teams works together more efficiently through its beautiful object models, and modern features that are missing from Javascript, while remaining Javascript! It's still in development, so there are currently no usable build, but we are pushing hard to get Cassidy released.

## What comes with devkit?
When the project is finished, you should have access to:
- A command line interface
- A compiler
- Utilities 
 
## Examples

<b>A basic Hello, World! program:</b>

```C#
// Class-based object oriented programming
class Main {
    static void Main() {
        // Compatible with Javascript's API
        console.log("Hello, World!")
    }
}
```

<b>Class and OOP system represented by a small game development example:</b>
  
```C#
class Item {
    // Property definition
    public string name;
    // Method definition
    public Item(string name) {
        this.name = name;
    }
}
// Inheritance
class Weapon : Item {
    public float damage;
    public Weapon(float damage, string name) : base(name) {
        this.damage = damage;
    }
    // Private method
    void dealDamage() {
        console.log(`Your ${name} deals ${damage} damage`)
    }
}
```

## Contributing to Cassidy!
Cassidy is a bulky and complex project, we really appreciate any help in the development process.

### Support us!
You can also support us just by starring the repo and sharing the project with your friends, co-workers, even your boss.

## The authors
- anapple96 - Co-founder and lead developer of the project.
- nguyenphuminh - Co-founder of the project.

## Copyrights and License
Copyrights © 2021 The Cassidy Authors

This project is licensed under the GNU GPLv3 License
