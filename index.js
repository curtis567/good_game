var stats, pointLight
var drops = []
var count = 0
var rotateAngle = 0
var position_x = 0,
    position_y = 3,
    position_z = 0
//Create color palette
var Colors = {
    cyan: 0x248079,
    brown: 0xa98f78,
    brownDark: 0x9a6169,
    green: 0x65bb61,
    greenLight: 0xabd66a,
    blue: 0x6bc6ff,
    yellow: 0xfbeba6,
}

var scene = new THREE.Scene()
var h = window.innerHeight,
    w = window.innerWidth
var aspectRatio = w / h,
    fieldOfView = 50,
    nearPlane = 0.1,
    farPlane = 1000
var camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true })

renderer.setSize(w, h)
renderer.shadowMapEnabled = true
// 設定陰影貼圖種類
// 陰影的毛邊優化
renderer.shadowMap.type = 2
document.body.appendChild(renderer.domElement)
camera.position.set(-5, 6, 8)
// camera.position.set(0,0,8); // front
// camera.position.set(-10,.2,0); //left
// camera.position.set(0,10,0); //top
// camera.position.y=4;
camera.lookAt(new THREE.Vector3(0, 0, 0))

// 三軸座標輔助
// let axes = new THREE.AxesHelper(20)
// scene.add(axes)

// 建立 OrbitControls
cameraControl = new THREE.OrbitControls(camera, renderer.domElement)
cameraControl.enableDamping = true // 啟用阻尼效果,滑鼠拖曳靈敏度
// 是否可縮放
// cameraControl.enableZoom = true
// 設計相機距離原點最近距離
// cameraControl.minDistance = 3
// 設計相機距離原點最遠距離
cameraControl.maxDistance = 100
// 開啟右鍵拖移
cameraControl.enablePan = true
cameraControl.dampingFactor = 0.25 // 阻尼系數
// cameraControl.autoRotate = true // 啟用自動旋轉

// 設置環境光提供輔助柔和白光
var light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)

//  點光源
pointLight = new THREE.PointLight(0xffffff, 1, 100) // 顏色, 強度, 距離
pointLight.castShadow = true // 投影
scene.add(pointLight)

// 建立sun
const geometry_sun = new THREE.SphereGeometry(0.1, 360, 12)
const material_sun = new THREE.MeshBasicMaterial({ color: Colors.yellow })
const sun_mesh = new THREE.Mesh(geometry_sun, material_sun)
// sun_mesh.castShadow = true
sun_mesh.position.y = 6
scene.add(sun_mesh)

// sun移動
function pointLightAnimation() {
    if (rotateAngle > 2 * Math.PI) {
        rotateAngle = 0 // 超過 360 度後歸零
    } else {
        rotateAngle += 0.03 // 遞增角度
    }
    // 光源延橢圓軌道繞 Y 軸旋轉
    sun_mesh.position.x = 12 * Math.cos(rotateAngle)
    sun_mesh.position.z = 16 * Math.sin(rotateAngle)
    // 點光源位置與sun同步
    pointLight.position.copy(sun_mesh.position)
}

function ground() {
    // grassland left
    var geometry_left = new THREE.BoxGeometry(4.25, 0.2, 2)
    var material_grass = new THREE.MeshLambertMaterial({ color: Colors.greenLight })
    var ground_left = new THREE.Mesh(geometry_left, material_grass)
    ground_left.position.set(position_x + -2.125, position_y + 0.1, position_z + -6)
    ground_left.receiveShadow = true
    scene.add(ground_left)
    customizeShadow(ground_left, 0.25) // mess, opacity

    //river
    var geometry_river = new THREE.BoxGeometry(1, 0.1, 2)
    var material_river = new THREE.MeshLambertMaterial({ color: Colors.blue })
    var river = new THREE.Mesh(geometry_river, material_river)
    river.position.set(position_x + 0.5, position_y + 0.1, position_z + -6)
    river.receiveShadow = true
    scene.add(river)
    customizeShadow(river, 0.08) // mess, opacity

    //river bed
    var geometry_bed = new THREE.BoxGeometry(1, 0.05, 2)
    var bed = new THREE.Mesh(geometry_bed, material_grass)
    bed.position.set(position_x + 0.5, position_y + 0.025, position_z + -6)
    scene.add(bed)

    //grassland right
    var geometry_right = new THREE.BoxGeometry(3.25, 0.2, 2)
    var ground_right = new THREE.Mesh(geometry_right, material_grass)
    ground_right.position.set(position_x + 2.625, position_y + 0.1, position_z + -6)
    ground_right.receiveShadow = true
    scene.add(ground_right)
    customizeShadow(ground_right, 0.25) // mess, opacity

    // grassland down
    var geometry_down = new THREE.BoxGeometry(8.5, 3, 2)
    var ground_down = new THREE.Mesh(geometry_down, material_grass)
    ground_down.position.set(position_x + 0, position_y + -1.5, position_z + -6)
    // ground_down.receiveShadow = true
    scene.add(ground_down)
    customizeShadow(ground_down, 0.25)

    // lake
    const geometry_lake = new THREE.BoxGeometry(2.5, 0.2, 1.5)

    const mesh_lake = new THREE.Mesh(geometry_lake, material_river)
    mesh_lake.position.set(position_x + 0.5, position_y + -2.8, position_z - 4.25)
    mesh_lake.receiveShadow = true
    scene.add(mesh_lake)
    customizeShadow(mesh_lake, 0.08)

    // lake bed
    const geometry_lake_bed = new THREE.BoxGeometry(2.5, 0.1, 1.5)

    const mesh_lake_bed = new THREE.Mesh(geometry_lake_bed, material_grass)
    mesh_lake_bed.position.set(position_x + 0.5, position_y + -2.95, position_z - 4.25)
    mesh_lake_bed.receiveShadow = true
    scene.add(mesh_lake_bed)
    customizeShadow(mesh_lake_bed, 0.08)

    // ground
    const geometry_ground = new THREE.BoxGeometry(2.5, 0.4, 11)
    const mesh_ground = new THREE.Mesh(geometry_ground, material_grass)
    mesh_ground.receiveShadow = true
    mesh_ground.position.set(position_x + 0.5, position_y + -2.8, position_z + 2)
    scene.add(mesh_ground)
    customizeShadow(mesh_ground, 0.25)

    // ground right
    const geometry_ground_right = new THREE.BoxGeometry(2.5, 0.4, 12.5)
    const mesh_ground_right = new THREE.Mesh(geometry_ground_right, material_grass)
    mesh_ground_right.receiveShadow = true
    mesh_ground_right.position.set(position_x + 3, position_y + -2.8, position_z + 1.25)
    scene.add(mesh_ground_right)
    customizeShadow(mesh_ground_right, 0.25)

    // ground left
    const geometry_ground_left = new THREE.BoxGeometry(3.5, 0.4, 12.5)
    const mesh_groundleft = new THREE.Mesh(geometry_ground_left, material_grass)
    mesh_groundleft.receiveShadow = true
    mesh_groundleft.position.set(position_x - 2.5, position_y + -2.8, position_z + 1.25)
    scene.add(mesh_groundleft)
    customizeShadow(mesh_groundleft, 0.25)
}

Cow = function() {
    this.threegroup = new THREE.Group()

    var body = new THREE.BoxGeometry(0.1, 0.1, 0.1)
    var face = new THREE.BoxGeometry(0.1, 0.1, 0.1)
    var spot = new THREE.BoxGeometry(0.05, 0.05, 0.05)
    var b_eyes = new THREE.BoxGeometry(0.01, 0.01, 0.01)
    var tail = new THREE.BoxGeometry(0.03, 0.01, 0.01)
    var leg = new THREE.BoxGeometry(0.03, 0.05, 0.03)
    this.whiteMat = new THREE.MeshLambertMaterial({
        color: 0xffffff,
    })
    this.pinkMat = new THREE.MeshLambertMaterial({
        color: 0xfaa288,
    })
    this.blackMat = new THREE.MeshLambertMaterial({
        color: 0x000000,
    })
    this.greyMat = new THREE.MeshLambertMaterial({
        color: 0x999999,
    })
    // Body
    this.body_Mesh = new THREE.Mesh(body, this.whiteMat)
    this.body_Mesh.position.set(position_x, position_y - 2, position_z)
    this.body_Mesh.castShadow = true

    // Face
    this.face_Mesh = new THREE.Mesh(face, this.pinkMat)
    this.face_Mesh.position.set(position_x + 0.1, position_y - 2, position_z)
    this.face_Mesh.castShadow = true

    // Eyes
    this.eye_Mesh = new THREE.Mesh(spot, this.whiteMat)
    this.eye_Mesh.scale.set(1, 1, 0.5)
    this.eye_Mesh.position.set(position_x + 0.1, position_y - 1.973, position_z + 0.04)
    this.eye_Mesh.castShadow = true
    this.rightEye = this.eye_Mesh.clone()
    this.rightEye.position.z = position_z - 0.04

    // Black eyes
    this.b_eye_Mesh = new THREE.Mesh(b_eyes, this.blackMat)
    this.b_eye_Mesh.scale.set(1, 1, 0.5)
    this.b_eye_Mesh.position.set(position_x + 0.1, position_y - 1.973, position_z + 0.055)
    this.b_eye_Mesh.castShadow = true
    this.r_b_eye_Mesh = this.b_eye_Mesh.clone()
    this.r_b_eye_Mesh.position.z = position_z - 0.055

    // SPOTS
    this.spot1 = new THREE.Mesh(spot, this.blackMat)
    this.spot1.position.set(position_x, position_y - 1.974, position_z - 0.026)
    this.spot2 = new THREE.Mesh(spot, this.blackMat)
    this.spot2.scale.set(0.5, 0.5, 0.5)
    this.spot2.position.set(position_x - 0.04, position_y - 2.02, position_z - 0.026)
    this.spot3 = new THREE.Mesh(spot, this.blackMat)
    this.spot3.scale.set(0.75, 0.75, 0.75)
    this.spot3.position.set(position_x, position_y - 2.032, position_z + 0.033)

    // tail
    this.tail_mesh = new THREE.Mesh(tail, this.whiteMat)
    this.tail_mesh.position.set(position_x - 0.068, position_y - 1.97, position_z + 0.01)

    // LEGS
    this.leg1 = new THREE.Mesh(leg, this.pinkMat)
    this.leg1.position.set(position_x - 0.035, position_y - 2.06, position_z + 0.02)
    this.leg2 = this.leg1.clone()
    this.leg2.position.x = position_x + 0.06
    this.leg3 = this.leg1.clone()
    this.leg3.position.z = position_z - 0.02
    this.leg4 = this.leg3.clone()
    this.leg4.position.x = position_x + 0.06

    // horn
    this.rightHorn = new THREE.Mesh(spot, this.greyMat)
    this.rightHorn.position.set(position_x + 0.065, position_y - 1.94, position_z + 0.025)
    this.rightHorn.scale.set(0.4, 0.4, 0.4)
    this.leftHorn = this.rightHorn.clone()
    this.leftHorn.position.z = position_z - 0.025

    // NOSTRILS
    this.rightnostril1 = new THREE.Mesh(spot, this.blackMat)
    this.rightnostril1.position.set(position_x + 0.145, position_y - 1.965, position_z + 0.035)
    this.rightnostril1.scale.set(0.4, 0.4, 0.4)
    this.leftnostril1 = this.rightnostril1.clone()
    this.leftnostril1.position.z = position_z - 0.035

    // EARS
    this.leftEar = new THREE.Mesh(spot, this.pinkMat)
    this.leftEar.position.set(position_x + 0.05, position_y - 1.99, position_z + 0.065)
    this.leftEar.scale.set(0.4, 0.8, 0.4)
    this.rightEar = this.leftEar.clone()
    this.rightEar.position.z = position_z - 0.065

    // MOUTH
    this.mouth = new THREE.Mesh(spot, this.blackMat)
    this.mouth.position.set(position_x + 0.145, position_y - 2.025, position_z)
    this.mouth.scale.set(0.6, 0.6, 0.6)
    this.mouth2 = new THREE.Mesh(spot, this.pinkMat)
    this.mouth2.position.set(position_x + 0.13, position_y - 2.04, position_z)
    this.mouth2.scale.set(0.8, 0.8, 0.8)
    this.mouthgroup = new THREE.Group()
    this.mouthgroup.add(this.mouth)
    this.mouthgroup.add(this.mouth2)

    this.threegroup.add(this.body_Mesh)
    this.threegroup.add(this.face_Mesh)
    this.threegroup.add(this.eye_Mesh)
    this.threegroup.add(this.rightEye)
    this.threegroup.add(this.b_eye_Mesh)
    this.threegroup.add(this.r_b_eye_Mesh)
    this.threegroup.add(this.spot1)
    this.threegroup.add(this.spot2)
    this.threegroup.add(this.spot3)
    this.threegroup.add(this.tail_mesh)
    this.threegroup.add(this.tail_mesh)
    this.threegroup.add(this.leg1)
    this.threegroup.add(this.leg2)
    this.threegroup.add(this.leg3)
    this.threegroup.add(this.leg4)
    this.threegroup.add(this.rightHorn)
    this.threegroup.add(this.leftHorn)
    this.threegroup.add(this.rightnostril1)
    this.threegroup.add(this.leftnostril1)
    this.threegroup.add(this.leftEar)
    this.threegroup.add(this.rightEar)
    this.threegroup.add(this.mouthgroup)
}

function createCows(x, z, r) {
    this.x = x
    this.z = z
    cow = new Cow()
    cow.threegroup.position.set(position_x + this.x, position_y - 3.5, position_z + this.z)
    cow.threegroup.rotateY(Math.PI / r)
    scene.add(cow.threegroup)
}

function build_Cows() {
    for (let i = 1; i < 10; i++) {
        var cow_x = -4 + Math.random() * 8
        var cow_z = -3 + Math.random() * 10
        var cow_r = -3 + Math.random() * 6
        createCows(cow_x, cow_z, cow_r)
    }
}

// 樹物件
function tree(x, z) {
    this.x = x
    this.z = z
    //trunk
    // 馮氏材質設為棕色
    var material_trunk = new THREE.MeshLambertMaterial({ color: Colors.brownDark })
    // 宣告樹幹幾何大小
    var geometry_trunk = new THREE.BoxGeometry(0.15, 0.15, 0.15)
    // 樹幹
    var trunk = new THREE.Mesh(geometry_trunk, material_trunk)
    trunk.position.set(position_x + this.x, position_y + 0.275, position_z + this.z)
    // 樹幹影子
    trunk.castShadow = true
    // 接收其他元素投影的效果
    // trunk.receiveShadow = true
    scene.add(trunk)

    //leaves
    // 數
    // 馮氏材質設為綠色
    var material_leaves = new THREE.MeshLambertMaterial({ color: Colors.green })
    // 宣告樹葉幾何大小
    var geometry_leaves = new THREE.BoxGeometry(0.25, 0.4, 0.25)
    // 樹葉
    var leaves = new THREE.Mesh(geometry_leaves, material_leaves)
    leaves.position.set(position_x + this.x, position_y + 0.2 + 0.15 + 0.4 / 2, position_z + this.z)
    // 樹葉影子
    leaves.castShadow = true
    customizeShadow(leaves, 0.25) // mess, opacity
    scene.add(leaves)
}

function build_tree() {
    for (let i = 1; i < 30; i++) {
        var tree_x = 1.25 + Math.random() * 2.75
        var tree_y = -5.25 + Math.random() * -1.6
        tree(tree_x, tree_y)
    }
    for (let i = 1; i < 30; i++) {
        var tree_x = -0.25 + Math.random() * -3.75
        var tree_y = -5.25 + Math.random() * -1.6
        tree(tree_x, tree_y)
    }
}
// 幀數監測
function initStats() {
    const stats = new Stats()
    stats.setMode(0)
    document.getElementById('stats').appendChild(stats.domElement)
    return stats
}
stats = initStats()

function customizeShadow(t, a) {
    //opacity, target mesh
    var material_shadow = new THREE.ShadowMaterial({ opacity: a })
    var mesh_shadow = new THREE.Mesh(t.geometry, material_shadow)
    mesh_shadow.position.set(t.position.x, t.position.y, t.position.z)
    mesh_shadow.receiveShadow = true
    scene.add(mesh_shadow)
}

function bridge() {
    //bridge - rail
    var geometry_rail_v = new THREE.BoxGeometry(0.04, 0.3, 0.04)
    // 橋馮氏材質設為棕色
    var material_wood = new THREE.MeshLambertMaterial({ color: Colors.brown })
    var rail_1 = new THREE.Mesh(geometry_rail_v, material_wood)
    rail_1.position.set(position_x + -0.1, position_y + 0.35, position_z + -5.6)
    rail_1.castShadow = true
    customizeShadow(rail_1, 0.2)
    scene.add(rail_1)

    var rail_2 = new THREE.Mesh(geometry_rail_v, material_wood)
    rail_2.position.set(position_x + 1.1, position_y + 0.35, position_z + -5.6)
    rail_2.castShadow = true
    customizeShadow(rail_2, 0.2)
    scene.add(rail_2)

    var rail_3 = new THREE.Mesh(geometry_rail_v, material_wood)
    rail_3.position.set(position_x + -0.1, position_y + 0.35, position_z + -6)
    rail_3.castShadow = true
    customizeShadow(rail_3, 0.2)
    scene.add(rail_3)

    var rail_4 = new THREE.Mesh(geometry_rail_v, material_wood)
    rail_4.position.set(position_x + 1.1, position_y + 0.35, position_z + -6)
    rail_4.castShadow = true
    customizeShadow(rail_4, 0.2)
    scene.add(rail_4)

    var geometry_rail_h = new THREE.BoxGeometry(1.2, 0.04, 0.04)
    var rail_h1 = new THREE.Mesh(geometry_rail_h, material_wood)
    rail_h1.position.set(position_x + 0.5, position_y + 0.42, position_z + -5.6)
    rail_h1.castShadow = true
    customizeShadow(rail_h1, 0.2)
    scene.add(rail_h1)

    var rail_h2 = new THREE.Mesh(geometry_rail_h, material_wood)
    rail_h2.position.set(position_x + 0.5, position_y + 0.42, position_z + -6)
    rail_h2.castShadow = true
    customizeShadow(rail_h2, 0.2)
    scene.add(rail_h2)
    //bridge - wood block
    for (var i = 0; i < 6; i++) {
        var geometry_block = new THREE.BoxGeometry(0.15, 0.02, 0.4)
        var block = new THREE.Mesh(geometry_block, material_wood)
        block.position.set(position_x + 0 + 0.2 * i, position_y + 0.21, position_z + -5.8)
        block.castShadow = true
        block.receiveShadow = true
        scene.add(block)
    }
}

function Drop() {
    this.geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)
    var material_river = new THREE.MeshLambertMaterial({ color: Colors.blue })
    this.drop = new THREE.Mesh(this.geometry, material_river)
    this.drop.position.set(
        position_x + Math.random(0.1, 0.9),
        position_y + 0.1,
        position_z + -5 + (Math.random() - 0.5) * 0.1
    )
    scene.add(this.drop)
    this.speed = 0
    // 長度
    this.lifespan = Math.random() * 43 + 50

    this.update = function() {
        this.speed += 0.0007
        this.lifespan--
        this.drop.position.x += (0.5 - this.drop.position.x) / 70
        this.drop.position.y -= this.speed
    }
}

function build_drop() {
    if (count % 3 == 0) {
        for (var i = 0; i < 25; i++) {
            drops.push(new Drop())
        }
    }
    count++
    for (var i = 0; i < drops.length; i++) {
        drops[i].update()
        if (drops[i].lifespan < 0) {
            scene.remove(scene.getObjectById(drops[i].drop.id))
            drops.splice(i, 1)
        }
    }
}
var angleLegs = 0
function loop() {
    angleLegs += 0.2
    var sin = Math.sin(angleLegs)
    var cos = Math.cos(angleLegs)

    cow.threegroup.position.y = -0.5 + +cos * -0.02
    cow.tail_mesh.rotation.z = (sin * Math.PI) / 3
    cow.leg1.position.x = -0.025 + cos * 0.01
    cow.leg2.position.x = 0.025 + sin * 0.01
    cow.leg3.position.x = -0.025 + sin * 0.01
    cow.leg4.position.x = 0.025 + cos * 0.01
    cow.leftEar.rotation.x = (10 + sin * Math.PI) / 4.5
    cow.rightEar.rotation.x = (10 + sin * Math.PI) / -4.5
    cow.mouth.position.y = 0.97 + sin * 0.01
    cow.mouth.scale.set(0.6, 0.25 + Math.abs(cos) * 0.25, 0.6)

    requestAnimationFrame(loop)
    render()
}

function render() {
    pointLightAnimation()
    if (cameraControl) cameraControl.update()
    stats.update()
    // build_drop()
    renderer.render(scene, camera)
}

ground()
build_Cows()
bridge()
build_tree()
loop()
