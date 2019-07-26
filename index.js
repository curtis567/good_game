let stats, pointLight
let rotateAngle = 0
let position_x = 0,
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

// // grassland left
// var geometry_left = new THREE.BoxGeometry(2, 0.2, 2)
// var material_grass = new THREE.MeshLambertMaterial({ color: Colors.greenLight })
// var ground_left = new THREE.Mesh(geometry_left, material_grass)
// ground_left.position.set(position_x + -1, position_y + 0.1, position_z + -6)
// ground_left.receiveShadow = true
// scene.add(ground_left)
// customizeShadow(ground_left, 0.25) // mess, opacity

// //river
// var geometry_river = new THREE.BoxGeometry(1, 0.1, 2)
// var material_river = new THREE.MeshLambertMaterial({ color: Colors.blue })
// var river = new THREE.Mesh(geometry_river, material_river)
// river.position.set(position_x + 0.5, position_y + 0.1, position_z + -6)
// river.receiveShadow = true
// scene.add(river)
// customizeShadow(river, 0.08) // mess, opacity

// //river bed
// var geometry_bed = new THREE.BoxGeometry(1, 0.05, 2)
// var bed = new THREE.Mesh(geometry_bed, material_grass)
// bed.position.set(position_x + 0.5, position_y + 0.025, position_z + -6)
// scene.add(bed)

// //grassland right
// var geometry_right = new THREE.BoxGeometry(1, 0.2, 2)
// var ground_right = new THREE.Mesh(geometry_right, material_grass)
// ground_right.position.set(position_x + 1.5, position_y + 0.1, position_z + -6)
// ground_right.receiveShadow = true
// scene.add(ground_right)
// customizeShadow(ground_right, 0.25) // mess, opacity

// // grassland down
// var geometry_down = new THREE.BoxGeometry(4, 3, 2)
// var ground_down = new THREE.Mesh(geometry_down, material_grass)
// ground_down.position.set(position_x + 0, position_y + -1.5, position_z + -6)
// // ground_down.receiveShadow = true
// scene.add(ground_down)
// customizeShadow(ground_down, 0.25)

// // 樹物件
// var tree = function(x, z) {
//     this.x = x
//     this.z = z
//     //trunk
//     // 馮氏材質設為棕色
//     var material_trunk = new THREE.MeshLambertMaterial({ color: Colors.brownDark })
//     // 宣告樹幹幾何大小
//     var geometry_trunk = new THREE.BoxGeometry(0.15, 0.15, 0.15)
//     // 樹幹
//     var trunk = new THREE.Mesh(geometry_trunk, material_trunk)
//     trunk.position.set(position_x + this.x, position_y + 0.275, position_z + this.z)
//     // 樹幹影子
//     trunk.castShadow = true
//     // 接收其他元素投影的效果
//     // trunk.receiveShadow = true
//     scene.add(trunk)

//     //leaves
//     // 數
//     // 馮氏材質設為綠色
//     var material_leaves = new THREE.MeshLambertMaterial({ color: Colors.green })
//     // 宣告樹葉幾何大小
//     var geometry_leaves = new THREE.BoxGeometry(0.25, 0.4, 0.25)
//     // 樹葉
//     var leaves = new THREE.Mesh(geometry_leaves, material_leaves)
//     leaves.position.set(position_x + this.x, position_y + 0.2 + 0.15 + 0.4 / 2, position_z + this.z)
//     // 樹葉影子
//     leaves.castShadow = true
//     customizeShadow(leaves, 0.25) // mess, opacity
//     scene.add(leaves)
// }
// // 樹的位置
// // left
// tree(-1.75, -6.85)
// tree(-1.75, -6.15)
// tree(-1.5, -6.5)
// tree(-1.5, -5.6)
// tree(-1.25, -6.85)
// tree(-1.25, -5.25)
// tree(-0.75, -6.85)
// tree(-0.75, -6.25)
// tree(-0.25, -6.85)
// // right
// tree(1.25, -6.85)
// tree(1.25, -5.25)
// tree(1.5, -6.5)
// tree(1.75, -6.85)
// tree(1.75, -5.65)

// // lake
// const geometry_lake = new THREE.CylinderGeometry(1.4, 1.4, 0.2, 360, 1, false, 249.75, Math.PI)

// const mesh_lake = new THREE.Mesh(geometry_lake, material_river)
// mesh_lake.position.set(position_x + 0.5, position_y + -2.9, position_z - 5.01)
// mesh_lake.receiveShadow = true
// scene.add(mesh_lake)
// customizeShadow(mesh_lake, 0.08)

// // ground
// const geometry_ground = new THREE.CylinderGeometry(3, 1.4, 0.2, 360, 1, false, 249.75, Math.PI)
// const mesh_ground = new THREE.Mesh(geometry_ground, material_grass)
// mesh_ground.position.set(position_x, position_y - 3, position_z)
// mesh_ground.receiveShadow = true
// mesh_ground.position.set(position_x + 0.5, position_y + -2.9, position_z - 5.01)
// scene.add(mesh_ground)
// customizeShadow(mesh_ground, 0.25)

// // 幀數監測
// function initStats() {
//     const stats = new Stats()
//     stats.setMode(0)
//     document.getElementById('stats').appendChild(stats.domElement)
//     return stats
// }
// stats = initStats()

// function customizeShadow(t, a) {
//     //opacity, target mesh
//     var material_shadow = new THREE.ShadowMaterial({ opacity: a })
//     var mesh_shadow = new THREE.Mesh(t.geometry, material_shadow)
//     mesh_shadow.position.set(t.position.x, t.position.y, t.position.z)
//     mesh_shadow.receiveShadow = true
//     scene.add(mesh_shadow)
// }

// // 橋馮氏材質設為棕色
// var material_wood = new THREE.MeshLambertMaterial({ color: Colors.brown })

// //bridge - wood block
// for (var i = 0; i < 6; i++) {
//     var geometry_block = new THREE.BoxGeometry(0.15, 0.02, 0.4)
//     var block = new THREE.Mesh(geometry_block, material_wood)
//     block.position.set(position_x + 0 + 0.2 * i, position_y + 0.21, position_z + -5.8)
//     block.castShadow = true
//     block.receiveShadow = true
//     scene.add(block)
// }

// //bridge - rail
// var geometry_rail_v = new THREE.BoxGeometry(0.04, 0.3, 0.04)
// var rail_1 = new THREE.Mesh(geometry_rail_v, material_wood)
// rail_1.position.set(position_x + -0.1, position_y + 0.35, position_z + -5.6)
// rail_1.castShadow = true
// customizeShadow(rail_1, 0.2)
// scene.add(rail_1)

// var rail_2 = new THREE.Mesh(geometry_rail_v, material_wood)
// rail_2.position.set(position_x + 1.1, position_y + 0.35, position_z + -5.6)
// rail_2.castShadow = true
// customizeShadow(rail_2, 0.2)
// scene.add(rail_2)

// var rail_3 = new THREE.Mesh(geometry_rail_v, material_wood)
// rail_3.position.set(position_x + -0.1, position_y + 0.35, position_z + -6)
// rail_3.castShadow = true
// customizeShadow(rail_3, 0.2)
// scene.add(rail_3)

// var rail_4 = new THREE.Mesh(geometry_rail_v, material_wood)
// rail_4.position.set(position_x + 1.1, position_y + 0.35, position_z + -6)
// rail_4.castShadow = true
// customizeShadow(rail_4, 0.2)
// scene.add(rail_4)

// var geometry_rail_h = new THREE.BoxGeometry(1.2, 0.04, 0.04)
// var rail_h1 = new THREE.Mesh(geometry_rail_h, material_wood)
// rail_h1.position.set(position_x + 0.5, position_y + 0.42, position_z + -5.6)
// rail_h1.castShadow = true
// customizeShadow(rail_h1, 0.2)
// scene.add(rail_h1)

// var rail_h2 = new THREE.Mesh(geometry_rail_h, material_wood)
// rail_h2.position.set(position_x + 0.5, position_y + 0.42, position_z + -6)
// rail_h2.castShadow = true
// customizeShadow(rail_h2, 0.2)
// scene.add(rail_h2)

// // 三軸座標輔助
// let axes = new THREE.AxesHelper(20)
// scene.add(axes)

// // 建立 OrbitControls
// cameraControl = new THREE.OrbitControls(camera)
// cameraControl.enableDamping = true // 啟用阻尼效果,滑鼠拖曳靈敏度
// // 是否可縮放
// // cameraControl.enableZoom = true
// // 設計相機距離原點最近距離
// // cameraControl.minDistance = 3
// // 設計相機距離原點最遠距離
// cameraControl.maxDistance = 100
// 開啟右鍵拖移
// cameraControl.enablePan = true
// cameraControl.dampingFactor = 0.25 // 阻尼系數
// cameraControl.autoRotate = true // 啟用自動旋轉

var drops = []

// 瀑布
var Drop = function() {
    this.geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)
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

var count = 0
var render = function() {
    pointLightAnimation()
    cameraControl.update()
    stats.update()
    // 瀑布數量
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
    requestAnimationFrame(render)
    renderer.render(scene, camera)
}
render()
