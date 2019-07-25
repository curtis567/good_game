let stats
//Create color palette
var Colors = {
    cyan: 0x248079,
    brown: 0xa98f78,
    brownDark: 0x9a6169,
    green: 0x65bb61,
    greenLight: 0xabd66a,
    blue: 0x6bc6ff,
}

var scene = new THREE.Scene()
var h = window.innerHeight,
    w = window.innerWidth
var aspectRatio = w / h,
    fieldOfView = 25,
    nearPlane = 0.1,
    farPlane = 1000
var camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true })
renderer.setSize(w, h)
renderer.shadowMapEnabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
document.body.appendChild(renderer.domElement)
camera.position.set(-5, 6, 8)
// camera.position.set(0,0,8); // front
// camera.position.set(-10,.2,0); //left
// camera.position.set(0,10,0); //top
// camera.position.y=4;
camera.lookAt(new THREE.Vector3(0, 0, 0))

//Ambient light
var light = new THREE.AmbientLight(0xffffff, 0.5)

var shadowLight = new THREE.DirectionalLight(0xffffff, 0.5)
shadowLight.position.set(200, 200, 200)
shadowLight.castShadow = true

var backLight = new THREE.DirectionalLight(0xffffff, 0.2)
backLight.position.set(-100, 200, 50)
backLight.castShadow = true
scene.add(backLight)
scene.add(light)
scene.add(shadowLight)

// grassland left
var geometry_left = new THREE.BoxGeometry(2, 0.2, 2)
var material_grass = new THREE.MeshLambertMaterial({ color: Colors.greenLight })
var ground_left = new THREE.Mesh(geometry_left, material_grass)
ground_left.position.set(-1, 0.1, 0)
scene.add(ground_left)
customizeShadow(ground_left, 0.25) // mess, opacity

//river
var geometry_river = new THREE.BoxGeometry(1, 0.1, 2)
var material_river = new THREE.MeshLambertMaterial({ color: Colors.blue })
var river = new THREE.Mesh(geometry_river, material_river)
river.position.set(0.5, 0.1, 0)
scene.add(river)
customizeShadow(river, 0.08) // mess, opacity
//river bed
var geometry_bed = new THREE.BoxGeometry(1, 0.05, 2)
var bed = new THREE.Mesh(geometry_bed, material_grass)
bed.position.set(0.5, 0.025, 0)
scene.add(bed)

//grassland right
var geometry_right = new THREE.BoxGeometry(1, 0.2, 2)
var ground_right = new THREE.Mesh(geometry_right, material_grass)
ground_right.position.set(1.5, 0.1, 0)
scene.add(ground_right)
customizeShadow(ground_right, 0.25) // mess, opacity


// 樹物件
var tree = function(x, z) {
    this.x = x
    this.z = z

    //trunk
    // 馮氏材質設為棕色
    var material_trunk = new THREE.MeshLambertMaterial({ color: Colors.brownDark })
    // 宣告樹幹幾何大小
    var geometry_trunk = new THREE.BoxGeometry(0.15, 0.15, 0.15)
    // 樹幹
    var trunk = new THREE.Mesh(geometry_trunk, material_trunk)
    trunk.position.set(this.x, 0.275, this.z)
    // 樹幹影子
    trunk.castShadow = true
    trunk.receiveShadow = true
    scene.add(trunk)

    //leaves
    // 數
    // 馮氏材質設為綠色
    var material_leaves = new THREE.MeshLambertMaterial({ color: Colors.green })
    // 宣告樹葉幾何大小
    var geometry_leaves = new THREE.BoxGeometry(0.25, 0.4, 0.25)
    // 樹葉
    var leaves = new THREE.Mesh(geometry_leaves, material_leaves)
    leaves.position.set(this.x, 0.2 + 0.15 + 0.4 / 2, this.z)
    // 樹葉影子
    leaves.castShadow = true
    customizeShadow(leaves, 0.25) // mess, opacity
    scene.add(leaves)
}
// 樹的位置
// left
tree(-1.75, -0.85)
tree(-1.75, -0.15)
tree(-1.5, -0.5)
tree(-1.5, 0.4)
tree(-1.25, -0.85)
tree(-1.25, 0.75)
tree(-0.75, -0.85)
tree(-0.75, -0.25)
tree(-0.25, -0.85)
// right
tree(1.25, -0.85)
tree(1.25, 0.75)
tree(1.5, -0.5)
tree(1.75, -0.85)
tree(1.75, 0.35)

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

var material_wood = new THREE.MeshLambertMaterial({ color: Colors.brown })

//bridge - wood block
for (var i = 0; i < 6; i++) {
    var geometry_block = new THREE.BoxGeometry(0.15, 0.02, 0.4)
    var block = new THREE.Mesh(geometry_block, material_wood)
    block.position.set(0 + 0.2 * i, 0.21, 0.2)
    block.castShadow = true
    block.receiveShadow = true
    scene.add(block)
}
//bridge - rail
var geometry_rail_v = new THREE.BoxGeometry(0.04, 0.3, 0.04)
var rail_1 = new THREE.Mesh(geometry_rail_v, material_wood)
rail_1.position.set(-0.1, 0.35, 0.4)
rail_1.castShadow = true
customizeShadow(rail_1, 0.2)
scene.add(rail_1)

var rail_2 = new THREE.Mesh(geometry_rail_v, material_wood)
rail_2.position.set(1.1, 0.35, 0.4)
rail_2.castShadow = true
customizeShadow(rail_2, 0.2)
scene.add(rail_2)

var rail_3 = new THREE.Mesh(geometry_rail_v, material_wood)
rail_3.position.set(-0.1, 0.35, 0)
rail_3.castShadow = true
customizeShadow(rail_3, 0.2)
scene.add(rail_3)

var rail_4 = new THREE.Mesh(geometry_rail_v, material_wood)
rail_4.position.set(1.1, 0.35, 0)
rail_4.castShadow = true
customizeShadow(rail_4, 0.2)
scene.add(rail_4)

var geometry_rail_h = new THREE.BoxGeometry(1.2, 0.04, 0.04)
var rail_h1 = new THREE.Mesh(geometry_rail_h, material_wood)
rail_h1.position.set(0.5, 0.42, 0.4)
rail_h1.castShadow = true
customizeShadow(rail_h1, 0.2)
scene.add(rail_h1)

var rail_h2 = new THREE.Mesh(geometry_rail_h, material_wood)
rail_h2.position.set(0.5, 0.42, 0)
rail_h2.castShadow = true
customizeShadow(rail_h2, 0.2)
scene.add(rail_h2)

// 三軸座標輔助
let axes = new THREE.AxesHelper(20)
scene.add(axes)

// 建立 OrbitControls
cameraControl = new THREE.OrbitControls(camera)
cameraControl.enableDamping = true // 啟用阻尼效果
cameraControl.dampingFactor = 0.25 // 阻尼系數
// cameraControl.autoRotate = true // 啟用自動旋轉

var Drop = function() {
    this.geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)
    this.drop = new THREE.Mesh(this.geometry, material_river)
    this.drop.position.set(Math.random(0.1, 0.9), 0.1, 1 + (Math.random() - 0.5) * 0.1)
    scene.add(this.drop)
    this.speed = 0
    this.lifespan = Math.random() * 50 + 50

    this.update = function() {
        this.speed += 0.0007
        this.lifespan--
        this.drop.position.x += (0.5 - this.drop.position.x) / 70
        this.drop.position.y -= this.speed
    }
}
var drops = []

var count = 0
var render = function() {
    cameraControl.update()
    stats.update()
    requestAnimationFrame(render)
    if (count % 3 == 0) {
        for (var i = 0; i < 5; i++) {
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
    renderer.render(scene, camera)
}
render()
