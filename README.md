<div align="center">
  <img src="assets/logo.png"/>
  <br/>
  <b>A programming language with precision</b>
  <br/>
  <br/>
  <a href="https://github.com/cassidylang/cassidy/blob/master/LICENSE.md"><img src="https://img.shields.io/badge/license-Apache-blue.svg"/></a>
  <a href="https://github.com/cassidylang/cassidy"><img alt="language" src="https://img.shields.io/badge/language-Typescript-purple.svg"></a>
  <a href="https://github.com/cassidylang/cassidy/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/cassidylang/cassidy?color=gold"></a>
</div>

## Examples

<b>Hello, World!</b>

```C#
class Main {
    static void Main() {
        console.log("Hello, World!")
    }
}
```

<b>Class and OOP system</b>
  
```C#
class Item {
    public string name;
    public Item(string name) {
        this.name = name;
    }
}
// You can inherit a class like this
class Weapon : Item {
    public float damage;
    public Weapon(float damage, string name) : base(name) {
        this.damage = damage;
    }
    void dealDamage() {
        console.log(`Your ${name} deals ${damage} damage`)
    }
}

class Consumable : Item {
    public int useTime;
    public Consumable(int useTime, string name):base(name) {
        this.useTime = useTime;
    }
    void consume() {
        console.log(`You consumed`)
    }
}
// You can also inherit multiple classes
class ThrowingWeapon : Consumable,Weapon {
    public float speed;
    public ThrowingWeapon(float speed, int useTime, string name, float damage):base(useTime, name, damage) {
        this.speed = speed;
    }
}
```

## Copyrights and License
Copyrights © 2021 Cassidy

This project is licensed under the GNU GPLv3 License
