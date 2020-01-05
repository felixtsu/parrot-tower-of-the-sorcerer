namespace SpriteKind {
    export const Key = SpriteKind.create()
    export const Door = SpriteKind.create()
    export const Meat = SpriteKind.create()
    export const StairUp = SpriteKind.create()
    export const StairDown = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const Princess = SpriteKind.create()
    export const Trap = SpriteKind.create()
    export const Hole = SpriteKind.create()
    export const Ladder = SpriteKind.create()
    export const LadderOverHole = SpriteKind.create()
    export const Sword = SpriteKind.create()
    export const Shield = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ladder, function (sprite, otherSprite) {
    otherSprite.destroy()
    game.splash("You pick up a ladder.")
    hasLadder = true
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Trap, function (sprite, otherSprite) {
    game.splash("You are too heavy, the floor collasped.")
    otherSprite.setImage(img`
        d d d d d d d e e e d d d d d d
        d d d e e e e e f e e e e e d d
        d d e e f f f f f f f f f e e d
        d e e e f f f f f f f f f f e d
        e e f f f f f f f f f f f f e e
        e f f f f f f f f f f f f f f e
        e f f f f f f f f f f f f f f e
        e f f f f f f f f f f f f f f e
        e e f f f f f f f f f f f f f e
        d e f f f f f f f f f f f f e e
        d e f f f f f f f f f f f f e e
        d e e f f f f f f f f f f f e d
        d d e e f f f f f f f f f e e d
        d d d e e f f f f f f f e e d d
        d d d d e e e e e e f f e d d d
        d d d d d d d d d e e e d d d d
    `)
    scene.setTileAt(scene.getTile(cubicbird.tileColumnOfSprite(otherSprite), cubicbird.tileRowOfSprite(otherSprite)), 10)
    otherSprite.setKind(SpriteKind.Hole)
    controller.moveSprite(hero, 0, 0)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Hole, function (sprite, otherSprite) {
    if (hasLadder) {
        game.splash("You use the ladder to get across.")
        otherSprite.setKind(SpriteKind.LadderOverHole)
    } else {
        game.splash("You falls into the hole! Lost 50 hp >_<")
        info.changeLifeBy(-50)
        currentLevel = 0
        gotoLevel(0)
        controller.moveSprite(hero)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Sword, function (sprite, otherSprite) {
    game.splash("You've found your sword.")
    eraseSpriteTile(otherSprite)
    otherSprite.destroy()
    hasSword = true
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Shield, function (sprite, otherSprite) {
    game.splash("You've found your shield.")
    eraseSpriteTile(otherSprite)
    otherSprite.destroy()
    hasShield = true
})
function placeSwordAndShield () {
    if (scene.getTilesByType(1).length > 0) {
        scene.placeOnRandomTile(sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . f f f f . . . .
            . . . . . . f f f . . f . . . .
            . . . . . f f f . . . f f . . .
            . . . . . f f . . f f f f . . .
            . . . . . f f . . f . . f . . .
            . . . . f f f . f f . . f . . .
            . . . . f f f . f . f f f . . .
            . . . . f f . f f f f f . . . .
            . f f f f f f f f f f . . . . .
            . . f f f f f f f f . . . . . .
            . . . . f f f . . . . . . . . .
            . . . f f f f f . . . . . . . .
            . . f f f . . f . . . . . . . .
            . . f f . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Sword), 1)
    }
    if (scene.getTilesByType(13).length > 0) {
        scene.placeOnRandomTile(sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . f f f f f f f f f f f f .
            . . f . f f f f f f f f f . f .
            . . f . . . . f f . . . . . f .
            . . f . f f f f f f f f f . f .
            . . f . f f f f f f f f f . f .
            . . f . . . . f f . . . . . f .
            . . f . . . . f f . . . . f f .
            . . f . . . . f f . . . . f . .
            . . f f . . . f f . . . . f . .
            . . . f f . . f f . . . f f . .
            . . . . f . . f f . . . f . . .
            . . . . f f . . . f f f . . . .
            . . . . . f f f f . . . . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Shield), 13)
    }
}
function gotoLevel (climbingUp: number) {
    clearAllSprite()
    initLevel()
    setupHero(climbingUp)
    game.splash("Level ", convertToText(currentLevel + 1))
}
function placePrincess () {
    if (scene.getTilesByType(11).length > 0) {
        scene.placeOnRandomTile(sprites.create(img`
            . . . . . f f 4 4 f f . . . . .
            . . . . f 5 4 5 5 4 5 f . . . .
            . . . f e 4 5 5 5 5 4 e f . . .
            . . f b 3 e 4 4 4 4 e 3 b f . .
            . . f 3 3 3 3 3 3 3 3 3 3 f . .
            . f 3 3 e b 3 e e 3 b e 3 3 f .
            . f 3 3 f f e e e e f f 3 3 f .
            . f b b f b f e e f b f b b f .
            . f b b e 1 f 4 4 f 1 e b b f .
            f f b b f 4 4 4 4 4 4 f b b f f
            f b b f f f e e e e f f f b b f
            . f e e f b d d d d b f e e f .
            . . e 4 c d d d d d d c 4 e . .
            . . e f b d b d b d b b f e . .
            . . . f f 1 d 1 d 1 d f f . . .
            . . . . . f f b b f f . . . . .
        `, SpriteKind.Princess), 11)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Meat, function (sprite, otherSprite) {
    eraseSpriteTile(otherSprite)
    music.stopAllSounds()
    music.magicWand.play()
    otherSprite.destroy()
    info.changeLifeBy(30)
})
function placeHole () {
    if (scene.getTilesByType(10).length > 0) {
        scene.placeOnRandomTile(sprites.create(img`
            d d d d d d d e e e d d d d d d
            d d d e e e e e f e e e e e d d
            d d e e f f f f f f f f f e e d
            d e e e f f f f f f f f f f e d
            e e f f f f f f f f f f f f e e
            e f f f f f f f f f f f f f f e
            e f f f f f f f f f f f f f f e
            e f f f f f f f f f f f f f f e
            e e f f f f f f f f f f f f f e
            d e f f f f f f f f f f f f e e
            d e f f f f f f f f f f f f e e
            d e e f f f f f f f f f f f e d
            d d e e f f f f f f f f f e e d
            d d d e e f f f f f f f e e d d
            d d d d e e e e e e f f e d d d
            d d d d d d d d d e e e d d d d
        `, SpriteKind.Hole), 10)
    }
}
function placeBoss () {
    bossTiles = scene.getTilesByType(8)
    for (let value42 of bossTiles) {
        bossSprite = sprites.create(img`
            . . . . . f f f f . . . . . . .
            . . . . f f f f f f f . . . . .
            . . . f f . . . . . f f . . . .
            . . . f . . f . f . . f . . . .
            . . . f . . f . f . . f . . . .
            . . . f . f . . . f f f . f . .
            f . . f f . f f . . f . f f . .
            f . . . f f f f . f f . f f . .
            f f f f f . f f f f . f f f f .
            f . . . f f f f f f f f . . f .
            f . . f . f f f f f . . f f f f
            f . . f . f f f f f f . . f f f
            f . . f . . . f f . . f . . f f
            f f . f f . . f . f . f f . . f
            . f . . f . . f . f . . f f . .
            . . . . . . . f . . . . . . . .
        `, SpriteKind.Boss)
        value42.place(bossSprite)
    }
}
function setupHero (climbingUp: number) {
    if (climbingUp == 1) {
        stairUpTiles = scene.getTilesByType(12)
        if (stairUpTiles.length == 1) {
            scene.getTile(cubicbird.getTileColumn(stairUpTiles[0]) - 1, cubicbird.getTileRow(stairUpTiles[0])).place(hero)
        }
    } else if (climbingUp == -1) {
        stairUpTiles = scene.getTilesByType(5)
        if (stairUpTiles.length == 1) {
            scene.getTile(cubicbird.getTileColumn(stairUpTiles[0]) + 1, cubicbird.getTileRow(stairUpTiles[0])).place(hero)
        }
    }
}
function initLevel () {
    scene.setTileMap(levelTileMaps[currentLevel])
    scene.setTile(15, img`
        e e e 1 e e e e e e e e 1 e e e
        e e e 1 e e e e e e e e 1 e e e
        e e e 1 e e e e e e e e 1 e e e
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        e e e e e e e 1 e e e e e e e e
        e e e e e e e 1 e e e e e e e e
        e e e e e e e 1 e e e e e e e e
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        e e e 1 e e e e e e e e 1 e e e
        e e e 1 e e e e e e e e 1 e e e
        e e e 1 e e e e e e e e 1 e e e
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        e e e e e e e 1 e e e e e e e e
        e e e e e e e 1 e e e e e e e e
        e e e e e e e 1 e e e e e e e e
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    `, true)
    scene.setTile(2, img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `, false)
    scene.setTile(3, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, false)
    scene.setTile(7, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, false)
    scene.setTile(6, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, false)
    scene.setTile(8, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, false)
    scene.setTile(4, img`
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        . . f . . f . . f . . f . . f .
        . . f . . f . . f . . f . . f .
        . . f . . f . . f . . f . . f .
        . . f . . f . . f . . f . . f .
        . . f . . f . . f . . f . . f .
        . . f . . f . . f . . f . . f .
        . . f . . f . . f . . f . . f .
        . . f . . f . . f . . f . . f .
        . . f . . f . . f . . f . . f .
        . . f . . f . . f . . f . . f .
        . . f . . f . . f . . f . . f .
        . . f . . f . . f . . f . . f .
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
    `, true)
    scene.setTile(1, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, false)
    scene.setTile(5, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, false)
    scene.setTile(11, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, false)
    scene.setTile(10, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, false)
    scene.setTile(9, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, false)
    scene.setTile(14, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, false)
    scene.setBackgroundColor(13)
    placeLevelItems()
}
function placeLadder () {
    ladderTiles = scene.getTilesByType(14)
    for (let value7 of ladderTiles) {
        ladderSprite = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            e e e e e e e e e e e e e e e e
            e e e e e e e e e e e e e e e e
            . e e . . e e . . e e . . e e .
            . e e . . e e . . e e . . e e .
            . e e . . e e . . e e . . e e .
            . e e . . e e . . e e . . e e .
            . e e . . e e . . e e . . e e .
            . e e . . e e . . e e . . e e .
            e e e e e e e e e e e e e e e e
            e e e e e e e e e e e e e e e e
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Ladder)
        value7.place(ladderSprite)
    }
}
function placeTrap () {
    trapTiles = scene.getTilesByType(9)
    for (let value72 of trapTiles) {
        trapSprite = sprites.create(img`
            d d d d d d d d d d d d d d d d
            d d d d d d d d d d d d d d d d
            d d d d d d d d d d d d d d d d
            d d d d d d d d d d d d d d d d
            d d d d d d d d d d d d d d d d
            d d d d d d d d d d d d d d d d
            d d d d d d d d d d d d d d d d
            d d d d d d d d d d d d d d d d
            d d d d d d d d d d d d d d d d
            d d d d d d d d d d d d d d d d
            d d d d d d d d d d d d d d d d
            d d d d d d d d d d d d d d d d
            d d d d d d d d d d d d d d d d
            d d d d d d d d d d d d d d d d
            d d d d d d d d d d d d d d d d
            d d d d d d d d d d d d d d d d
        `, SpriteKind.Trap)
        value72.place(trapSprite)
    }
}
function setupLevelMaps () {
    currentLevel = 0
    levelTileMaps = [img`
        f f f f f f f f f f f f f f f f
        f 5 . 8 . . 6 . . . f 3 3 . e f
        f f f f f f f . . . f 3 3 . . f
        f 3 3 3 6 . . . . . f . . . . f
        f 3 3 3 f . . . . . f f f f 6 f
        f 3 3 3 f . . . . . . . . . . f
        f 3 3 3 f . f . . . . . . . . f
        f 3 3 3 f 2 f . . . . . . . . f
        f 3 3 3 f 7 f . . . . . . . . f
        f 3 3 3 f f f f f f f f f f . f
        f 3 3 3 f . . . 3 d 3 2 3 . . f
        f 3 3 3 f . 2 f f f f f f 4 f f
        f 3 3 3 f f . . . . f 7 . . . f
        f 3 3 3 f . . . . . f . . . . f
        f 3 3 3 f . 1 . . . f . . . . f
        f f f f f f f f f f f f f f f f
    `,img`
        f f f f f f f f f f f f f f f f
        f b 8 . . f 7 8 . . 8 . . 8 7 f
        f 8 . . . f 8 8 . . f . . 8 8 f
        f f f f 6 f . . . . f . . . . f
        f . . . . f . . . . f . . . . f
        f . . . . f . . . . f . . . . f
        f . . . . f . . . . f . . . . f
        f . . . . f . . . . f . . . . f
        f . . . . f . . . . f . . . . f
        f . . . . f . . . . f . . . . f
        f . . . . 6 . . . . f . . . . f
        f f f f f f f f f f f f f f . f
        f 8 8 8 7 8 8 8 8 8 8 8 8 9 . f
        f 8 f f f f f f f f f f f f f f
        f 8 . 3 3 3 3 3 3 3 3 3 3 . c f
        f f f f f f f f f f f f f f f f
    `]
}
function placeMeats () {
    meatTiles = scene.getTilesByType(3)
    for (let value32 of meatTiles) {
        meatSprite = sprites.create(img`
            . . 2 2 b b b b b . . . . . . .
            . 2 b 4 4 4 4 4 4 b . . . . . .
            2 2 4 4 4 4 d d 4 4 b . . . . .
            2 b 4 4 4 4 4 4 d 4 b . . . . .
            2 b 4 4 4 4 4 4 4 d 4 b . . . .
            2 b 4 4 4 4 4 4 4 4 4 b . . . .
            2 b 4 4 4 4 4 4 4 4 4 e . . . .
            2 2 b 4 4 4 4 4 4 4 b e . . . .
            . 2 b b b 4 4 4 b b b e . . . .
            . . e b b b b b b b e e . . . .
            . . . e e b 4 4 b e e e b . . .
            . . . . . e e e e e e b d b b .
            . . . . . . . . . . . b 1 1 1 b
            . . . . . . . . . . . c 1 d d b
            . . . . . . . . . . . c 1 b c .
            . . . . . . . . . . . . c c . .
        `, SpriteKind.Meat)
        value32.place(meatSprite)
    }
}
function placeLevelItems () {
    placeDoors()
    placeStairs()
    placeEnemies()
    placeKeys()
    placeMeats()
    placeBoss()
    placePrincess()
    placeTrap()
    placeHole()
    placeLadder()
    placeSwordAndShield()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Key, function (sprite, otherSprite) {
    eraseSpriteTile(otherSprite)
    music.stopAllSounds()
    music.powerUp.play()
    game.splash("You pick up a key.")
    otherSprite.destroy()
    currentKeys += 1
})
function placeEnemies () {
    enemyTiles = scene.getTilesByType(2)
    for (let value73 of enemyTiles) {
        enemySprite = sprites.create(img`
            . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . f f f f . . . . . . . . . .
            . . . . . . . . f f 1 1 1 1 f f . . . . . . . .
            . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . .
            . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . .
            . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . .
            . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . .
            . . . . . . f d d d 1 1 1 1 d d d f . . . . . .
            . . . . . . f b d b f d d f b d b f . . . . . .
            . . . . . . f c d c f 1 1 f c d c f . . . . . .
            . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . .
            . . . . . . f f f c d b 1 b d f f f f . . . . .
            . . . . f c 1 1 1 c b f b f c 1 1 1 c f . . . .
            . . . . f 1 b 1 b 1 f f f f 1 b 1 b 1 f . . . .
            . . . . f b f b f f f f f f b f b f b f . . . .
            . . . . . . . . . f f f f f f . . . . . . . . .
            . . . . . . . . . . . f f f . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . .
        `, SpriteKind.Enemy)
        value73.place(enemySprite)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.StairUp, function (sprite, otherSprite) {
    otherSprite.setFlag(SpriteFlag.Ghost, true)
    currentLevel += 1
    gotoLevel(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.StairDown, function (sprite, otherSprite) {
    otherSprite.setFlag(SpriteFlag.Ghost, true)
    currentLevel += -1
    gotoLevel(-1)
})
function eraseSpriteTile (sprite: Sprite) {
    scene.setTileAt(scene.getTile(Math.floor(sprite.x / 16), Math.floor(sprite.y / 16)), 0)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Door, function (sprite, otherSprite) {
    if (currentKeys > 0) {
        eraseSpriteTile(otherSprite)
        music.stopAllSounds()
        music.powerDown.play()
        otherSprite.destroy()
        currentKeys += -1
    } else {
        if (sprite.vx != 0) {
            sprite.x += sprite.vx / Math.abs(sprite.vx) * -4
        }
        if (sprite.vy != 0) {
            sprite.y += sprite.vy / Math.abs(sprite.vy) * -4
        }
        game.splash("The door is locked")
    }
})
function clearAllSprite () {
    spritesToClear = sprites.allOfKind(SpriteKind.Enemy)
    for (let value of spritesToClear) {
        value.destroy()
    }
    spritesToClear = sprites.allOfKind(SpriteKind.Key)
    for (let value2 of spritesToClear) {
        value2.destroy()
    }
    spritesToClear = sprites.allOfKind(SpriteKind.Door)
    for (let value3 of spritesToClear) {
        value3.destroy()
    }
    spritesToClear = sprites.allOfKind(SpriteKind.Meat)
    for (let value4 of spritesToClear) {
        value4.destroy()
    }
    spritesToClear = sprites.allOfKind(SpriteKind.Boss)
    for (let value5 of spritesToClear) {
        value5.destroy()
    }
    // spritesToClear =
    // sprites.allOfKind(SpriteKind.Player) for (let
    // value6 of spritesToClear) { value6.destroy() }
    spritesToClear = sprites.allOfKind(SpriteKind.StairUp)
    for (let value62 of spritesToClear) {
        value62.destroy()
    }
    spritesToClear = sprites.allOfKind(SpriteKind.StairDown)
    for (let value622 of spritesToClear) {
        value622.destroy()
    }
    spritesToClear = sprites.allOfKind(SpriteKind.Princess)
    for (let value623 of spritesToClear) {
        value623.destroy()
    }
    spritesToClear = sprites.allOfKind(SpriteKind.Trap)
    for (let value624 of spritesToClear) {
        value624.destroy()
    }
    spritesToClear = sprites.allOfKind(SpriteKind.Hole)
    for (let value625 of spritesToClear) {
        value625.destroy()
    }
    spritesToClear = sprites.allOfKind(SpriteKind.Ladder)
    for (let value626 of spritesToClear) {
        value626.destroy()
    }
    spritesToClear = sprites.allOfKind(SpriteKind.LadderOverHole)
    for (let value627 of spritesToClear) {
        value627.destroy()
    }
    spritesToClear = sprites.allOfKind(SpriteKind.Sword)
    for (let value628 of spritesToClear) {
        value628.destroy()
    }
    spritesToClear = sprites.allOfKind(SpriteKind.Shield)
    for (let value629 of spritesToClear) {
        value629.destroy()
    }
}
function placeDoors () {
    doorTiles = scene.getTilesByType(6)
    for (let value44 of doorTiles) {
        doorSprite = sprites.create(img`
            . . . 9 9 9 9 9 9 9 9 9 9 . . .
            . . 9 9 9 1 9 1 1 9 1 9 9 9 . .
            . 9 9 1 9 1 9 1 1 9 1 9 1 9 9 .
            9 9 9 1 9 1 9 1 1 9 1 9 1 9 9 9
            1 1 9 1 9 1 9 1 1 9 1 9 1 9 1 1
            1 1 9 1 9 1 9 1 1 9 1 9 1 9 1 1
            9 9 9 1 9 1 9 1 1 9 1 9 1 9 9 9
            1 1 9 1 9 1 9 1 1 9 1 9 1 9 1 1
            1 1 9 1 9 1 9 1 5 9 1 9 1 9 1 1
            9 9 9 1 9 1 9 1 1 9 1 9 1 9 9 9
            1 1 9 1 9 1 9 1 1 9 1 9 1 9 1 1
            9 9 9 9 9 1 9 1 1 9 1 9 9 9 9 9
            1 1 1 1 9 1 9 1 1 9 1 9 1 1 1 1
            9 9 9 9 9 9 9 1 1 9 9 9 9 9 9 9
            1 1 1 1 1 1 9 1 1 9 1 1 1 1 1 1
            9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        `, SpriteKind.Door)
        value44.place(doorSprite)
    }
}
scene.onHitTile(SpriteKind.Player, 4, function (sprite) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        game.splash("The door can only be opened from inside.")
    } else if (sprite.isHittingTile(CollisionDirection.Top)) {
        game.splash("Door is opened.")
        // todo BUG fix, may destroy wall instead of door
        scene.setTileAt(scene.getTile(cubicbird.tileColumnOfSprite(sprite), cubicbird.tileRowOfSprite(sprite) - 1), 0)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    eraseSpriteTile(otherSprite)
    music.stopAllSounds()
    music.wawawawaa.play()
    otherSprite.destroy()
    if (!(hasSword) && !(hasShield)) {
        game.splash("You fought enemy empty-handed, the enemy almost got you!")
        info.changeLifeBy(-40)
    } else if (!(hasShield)) {
        game.splash("You fought enemy without a shield, and took huge damage.")
        info.changeLifeBy(-30)
    } else if (!(hasSword)) {
        game.splash("You fought enemy without a sword, it was a long fight.")
        info.changeLifeBy(-35)
    } else {
        info.changeLifeBy(-20)
    }
})
function placeKeys () {
    keyTiles = scene.getTilesByType(7)
    for (let value22 of keyTiles) {
        keySprite = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . 5 5 5 5 . . 5 . 5 . 5 . . .
            . 5 5 5 5 5 5 . 5 . 5 . 5 . . .
            5 5 5 . . 5 5 5 5 5 5 5 5 5 . .
            5 5 . . . . 5 5 5 5 5 5 5 5 5 .
            5 5 5 . . 5 5 5 5 5 5 5 5 5 . .
            . 5 5 5 5 5 5 . . . . . . . . .
            . . 5 5 5 5 . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Key)
        value22.place(keySprite)
    }
}
function placeStairs () {
    if (scene.getTilesByType(5).length > 0) {
        scene.placeOnRandomTile(sprites.create(img`
            . . . . . 1 1 1 1 1 1 . . . . .
            . . . . d d d d d d d d . . . .
            . . . . 1 1 1 1 1 1 1 1 . . . .
            . . . . 1 1 1 1 1 1 1 1 . . . .
            . . . d d d d d d d d d d . . .
            . . . 1 1 1 1 1 1 1 1 1 1 . . .
            . . . 1 1 1 1 1 1 1 1 1 1 . . .
            . . d d d d d d d d d d d d . .
            . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
            . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
            . d d d d d d d d d d d d d d .
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            d d d d d d d d d d d d d d d d
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, SpriteKind.StairUp), 5)
    }
    if (scene.getTilesByType(12).length > 0) {
        scene.placeOnRandomTile(sprites.create(img`
            d d d d d d d d d d d d d d d d
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
            . d d d d d d d d d d d d d d .
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            . . d d d d d d d d d d d d . .
            . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
            . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
            . . . d d d d d d d d d d . . .
            . . . 1 1 1 1 1 1 1 1 1 1 . . .
            . . . 1 1 1 1 1 1 1 1 1 1 . . .
            . . . . d d d d d d d d . . . .
            . . . . 1 1 1 1 1 1 1 1 . . . .
            . . . . 1 1 1 1 1 1 1 1 . . . .
            . . . . . 1 1 1 1 1 1 . . . . .
        `, SpriteKind.StairDown), 12)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    eraseSpriteTile(otherSprite)
    music.stopAllSounds()
    music.siren.play()
    otherSprite.destroy()
    info.changeLifeBy(-49)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Princess, function (sprite, otherSprite) {
    game.over(true, effects.smiles)
})
let keySprite: Sprite = null
let keyTiles: tiles.Tile[] = []
let doorSprite: Sprite = null
let doorTiles: tiles.Tile[] = []
let spritesToClear: Sprite[] = []
let enemySprite: Sprite = null
let enemyTiles: tiles.Tile[] = []
let currentKeys = 0
let meatSprite: Sprite = null
let meatTiles: tiles.Tile[] = []
let trapSprite: Sprite = null
let trapTiles: tiles.Tile[] = []
let ladderSprite: Sprite = null
let ladderTiles: tiles.Tile[] = []
let levelTileMaps: Image[] = []
let stairUpTiles: tiles.Tile[] = []
let bossSprite: Sprite = null
let bossTiles: tiles.Tile[] = []
let hasShield = false
let hasSword = false
let currentLevel = 0
let hasLadder = false
let hero: Sprite = null
let stairDownTiles = []
info.setLife(50)
setupLevelMaps()
initLevel()
hero = sprites.create(img`
    . . . . . . f f f f . . . . . .
    . . . . f f f 2 2 f f f . . . .
    . . . f f f 2 2 2 2 f f f . . .
    . . f f f e e e e e e f f f . .
    . . f f e 2 2 2 2 2 2 e e f . .
    . . f e 2 f f f f f f 2 e f . .
    . . f f f f e e e e f f f f . .
    . f f e f b f 4 4 f b f e f f .
    . f e e 4 1 f d d f 1 4 e e f .
    . . f e e d d d d d d e e f . .
    . . . f e e 4 4 4 4 e e f . . .
    . . e 4 f 2 2 2 2 2 2 f 4 e . .
    . . 4 d f 2 2 2 2 2 2 f d 4 . .
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . .
    . . . . . f f f f f f . . . . .
    . . . . . f f . . f f . . . . .
`, SpriteKind.Player)
hero.z = 50
scene.cameraFollowSprite(hero)
controller.moveSprite(hero)
setupHero(0)
scene.getTile(5, 14).place(hero)
