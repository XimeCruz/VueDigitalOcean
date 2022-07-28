<template>
    <div id="select">
      <div class="main">
        <div class="brandNav">
        </div>
        <div class="seat">
          <!-- zuowei_03 -->
          <!-- <img src="../assets/A.png"/> -->
          <div class="seat_wrap">
            <div class="seat_left">
              <div id="seatMap">
                <div class="seat-charts-row" v-for="(item,x) in seatOrder"  :key="x">
                  <div @click="userChoiceFn(x,y,subItem)" ref="allSeat" class="allPublicGray" v-for="(subItem,y) in getItems(item)" :key="y">
                    <div v-if="subItem =='a'" :class="{bgBlack: seatGrade[0].off}"><img src="../assets/A.png" width="50" height="50"/></div>
                    <div v-if="subItem =='b'" :class="{bgBlack: seatGrade[1].off}"><img src="../assets/A.png" width="50" height="50"/></div>
                    <div v-if="subItem =='c'" :class="{bgBlack: seatGrade[2].off}"><img src="../assets/A.png" width="50" height="50"/></div>
                    <div v-if="subItem =='_'"></div>
                  </div>
                </div>
              </div>
              <div class="seatStatus">
                <ul>
                  <li v-for="(item, index) in seatGrade" :key="index">
                    <span>{{item.price}}</span>
                    <span>{{item.grade}}</span>
                    <input @click="choiceGradeFn(index)" type="checkbox">
                  </li>
                </ul>
                <!-- seatG_03 -->
                <!-- <img src="../assets/A.png"/> -->
              </div>
            </div>
            <div class="seat_right">
                             <h3> Asiento seleccionado [{{seatNumber}}] </h3>
              <ul v-if="getSeatCode != []">
                <li v-for="(item, index) in getSeatCode" :key="index">
                                     <p> Asiento: {{item.col}} fila {{item.row}} número </p>
                                     <p> Precio: {{item.price}} </p>
                                     <p> Tribuna: Teatro Central </p>
                                     <p> Piso: Teatro </p>
                </li>
              </ul>
              <h1 v-if="seatNumber != 0">
                                 <p> Precio total: {{allMoney}} yuanes </p>
                                 <a @click="toOrder()" href="javascript:;"> Compra </a>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
 
<script>

  import router from '../router';
const URI = 'https://superticket-api-4rp34.ondigitalocean.app/compras/check/';

 // Esta matriz es el mapa de distribución de asientos, a = asientos de nivel A, etc., el subrayado_ representa un espacio en blanco
 // Una fila horizontal ocupa 32 posiciones
var seatOrder = [
  "_____aaaaa_____aaaa_____aaaa____",
  "___ccccccc____cccccc____ccccc___",
  "__aaaaaaaa___aaaaaaaa___aaaaaa__",
  "__cccccccc__bbbbbbbbbb__ccccccc_",
  "_aaccccccc_bbbbbbbbbbbb_ccccccca",
  "_aaccccccc_bbbbbbbbbbbb_ccccccca",
  "________________________________",
  "_aaaaaaaaa__cccccccccc__aaaaaaaa",
  "_aaaaaaaaa__cccccccccc__aaaaaaaa",
  "__aaaaaaaa___aaaaaaaa___aaaaaaa_",
  "__aaaaaaaa___aaaaaaaa___aaaaaaa_"
]
var seatGrade = [
  {
        'price': '120 yuanes',
        'grade': 'A grade',
        'off':false,
  },
  {
        'price': '100 yuanes',
        'grade': 'B grade',
        'off':false
  },
  {
         'price': '90 yuanes',
         'grade': 'C grade',
    'off':false
  }
]
export default {
    created(){
        this.getEvents();
    },
    
  name: 'Selection',
  data () {
    return {
             seatOrder, // matriz de distribución de asientos
             seatGrade, // Tres grados
             getSeatCode: [], // seleccionado
             seatNumber: 0, // Cantidad de asientos
             allMoney: 0, // precio total
             events:[],
            idEvent:0
    }
  },
  components: {
    
  },
  methods: {
    
    async getEvents(){
        const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" }
        };
        console.log(this.$route.params);
        const response = await fetch(URI + this.$route.params.id + "?entranceId="+this.$route.params.codEvent+"&amount="+this.$route.params.cant+"&csrf="+this.$route.params.csrf, requestOptions);
        const data = await response.json();
        console.log(data);
    },

    getRandomArbitrary(min, max) {
        return (Math.random() * (max - min) + min).toFixed();
        },
    accept: function(event_id){
        router.push({ name: 'Prices', params: { id: event_id}})
        },
         // Acercar, alejar y mover la página de selección de asientos
    bindScroll() {
             // Agregue eventos de clic y movimiento del mouse, monitoree estos dos eventos y mueva la interfaz modificando los valores superior e izquierdo de posición.
      var oImg = document.getElementById("seatMap");
      oImg.onmousedown = function(ev) {
        ev = ev || event;
        var disX = ev.clientX - oImg.offsetLeft;
        var disY = ev.clientY - oImg.offsetTop;
        if (oImg.setCapture) {
          oImg.setCapture();
        }
        document.onmousemove = function(ev) {
          ev = ev || event;
          oImg.style.left = ev.clientX - disX + "px";
          oImg.style.top = ev.clientY - disY + "px";
        };
        document.onmouseup = function() {
          document.onmousemove = document.onmouseup = null;
                     // Liberar captura global releaseCapture ();
          if (oImg.releaseCapture) {
            oImg.releaseCapture();
          }
        };
        return false;
      };
             // Escuche el evento de la rueda de desplazamiento y use la escala para operar la página para lograr acercar y alejar la interfaz.
      oImg.onmousewheel = fn;
      if (oImg.addEventListener) {
        oImg.addEventListener("DOMMouseScroll", fn, false);
      }
      var scaleSize = 1;
      function fn(ev) {
        ev = ev || event;
        var b = true;
                 if (ev.wheelDelta) {//ev.wheelDelta y ev.detail son compatibles
          b = ev.wheelDelta > 0 ? true : false;
        } else {
          b = ev.detail < 0 ? true : false;
        }
        if (b) {
          scaleSize += 0.03;
          scaleSize = scaleSize > 2 ? 2 : scaleSize;
        } else {
          scaleSize -= 0.03;
          scaleSize = scaleSize < 0.5 ? 0.5 : scaleSize;
        }
        this.style.transform = "scale(" + scaleSize + ")";
        if (ev.preventDefault) {
          ev.preventDefault();
        }
        return false;
      }
    },
         getItems (item) {// Método encapsulado para convertir una cadena en una matriz, atravesando cada elemento de la matriz
      return item.match(/[a-z_]{1}(\[[0-9a-z_]{0,}(,[0-9a-z_ ]+)?\])?/gi);
    },
         // Resaltado de tres niveles
         choiceGradeFn (index) {// Visualización de distribución de asientos de tres niveles
      this.seatGrade[index].off = !this.seatGrade[index].off
        //console.log(this.seatGrade[index].off, index)
    },
         userChoiceFn (x, y, subItem) {// x: una fila y: una columna subItem: cada div
      var price = 0
      if (subItem == 'a') {
        price = 120
      }else if(subItem == 'b'){
        price = 100
      }else {
        price = 90
      }
             var obj = {// Inserta los datos en la matriz de selección a la derecha cada vez
        'col':x,
        'row':y,
        'price':price,
                 'num': x + '-' + y // pasa al campo de fondo, según este campo, busca el asiento que el usuario quiere cancelar
      }
             var userSitNum = x * 32 + y // Calcula el subíndice del asiento en el que hizo clic el usuario actual
             let oDivs = document.getElementsByClassName ('allPublicGray') // Seleccionar todos los asientos
      //console.log(oDivs[userSitNum].off)
             oDivs [userSitNum] .off =! oDivs [userSitNum] .off // El usuario hace clic en el atributo personalizado del asiento actual para invertir, es decir, seleccionar y cancelar
      if(oDivs[userSitNum].off){
                     if (subItem == 'a' || subItem == 'b' || subItem == 'c') {// Sentencia haga clic en el espacio en blanco sin agregar información de antecedentes y asiento
                                 this.getSeatCode.push (obj) // haga clic para agregar información del asiento
 
                this.$refs.allSeat[userSitNum].innerHTML = '<img style="width: 16px;height: 16px" src="../../static/img/geted.png"/>'
 
                                 this.seatNumber = this.getSeatCode.length // Cantidad de asientos
                                 // Calcula el precio total
                                 var userPrice = this.getSeatCode.map (function (item, index) {// Obtenga el precio de cada artículo en la matriz para formar una nueva matriz
                                console.log(index)
                  return item.price
                })
                                 if (userPrice.length> 1) {// Juzgar cuando el usuario solo agrega un asiento reduce
                                         this.allMoney = userPrice.reduce (function (prev, next) {// Agrega los precios
                      return  prev + next
                    })
                }else if(userPrice.length == 1) {
                  this.allMoney = userPrice[0]
                }
                //console.log(userPrice)
          }
             } else {// El código en el juicio debajo de este else está duplicado, puede encapsularlo
        if (subItem == 'a'){
                var deleteArr = this.getSeatCode.filter (function (item, index) {// Filtra la información del asiento cancelada por el usuario
                  console.log(index)
                  return item.num == x+'-'+y
                })
                //console.log(deleteArr)
                this.getSeatCode.remove(deleteArr[0])
                                 this.seatNumber = this.getSeatCode.length // Calcula el número total de asientos seleccionados por el usuario
                                 // Calcula el precio total
                                 userPrice = this.getSeatCode.map (function (item, index) {// Obtenga el precio de cada artículo en la matriz para formar una nueva matriz
                  console.log(index)
                  return item.price
                })
                if(userPrice.length > 1){
                                     this.allMoney = userPrice.reduce (function (prev, next) {// Agrega los precios
                    return  prev + next
                  })
                }else if(userPrice.length == 1) {
                  this.allMoney = userPrice[0]
                }
          this.$refs.allSeat[userSitNum].innerHTML = '<img style="width: 16px;height: 16px" src="../../static/img/A.png"/>'
        }else if(subItem == 'b'){
                deleteArr = this.getSeatCode.filter(function (item,index) {
                  console.log(index)
                  return item.num == x+'-'+y
                })
                this.getSeatCode.remove(deleteArr[0])
                                 this.seatNumber = this.getSeatCode.length // Calcula el número total de asientos seleccionados por el usuario
                                 // Calcula el precio total
                                 userPrice = this.getSeatCode.map (function (item, index) {// Obtenga el precio de cada artículo en la matriz para formar una nueva matriz
                  console.log(index)
                  return item.price
                })
                if(userPrice.length > 1){
                                     this.allMoney = userPrice.reduce (function (prev, next) {// Agrega los precios
                    return  prev + next
                  })
                }else if(userPrice.length == 1) {
                  this.allMoney = userPrice[0]
                }
          this.$refs.allSeat[userSitNum].innerHTML = '<img style="width: 16px;height: 16px" src="../../static/img/B.png"/>'
        }else if(subItem == 'c'){
                deleteArr = this.getSeatCode.filter(function (item,index) {
                  console.log(index)
                  return item.num == x+'-'+y
                })
                this.getSeatCode.remove(deleteArr[0])
                                 this.seatNumber = this.getSeatCode.length // Calcula el número total de asientos seleccionados por el usuario
                                 // Calcula el precio total
                                 userPrice = this.getSeatCode.map (function (item, index) {// Obtenga el precio de cada artículo en la matriz para formar una nueva matriz
                  console.log(index)
                  return item.price
                })
                if(userPrice.length > 1){
                                     this.allMoney = userPrice.reduce (function (prev, next) {// Agrega los precios
                    return  prev + next
                  })
                }else if(userPrice.length == 1) {
                  this.allMoney = userPrice[0]
                }
          this.$refs.allSeat[userSitNum].innerHTML = '<img style="width: 16px;height: 16px" src="../../static/img/C.png"/>'
        }
      }
      //console.log(this.getSeatCode)
    },
         toOrder () {// Haga clic para comprar
      this.$router.push('/order')
      this.$store.commit('getSitcode',this.getSeatCode)
      //console.log(this.$store.state.sitCode)
    },
  },
  mounted () {
    this.bindScroll()
         // Inicialmente todos los asientos están deseleccionados
         // Debería ser que el backend devuelva una matriz de asientos seleccionados al front-end, y el front-end identificará los asientos seleccionados y los establecerá como de solo lectura. El algoritmo aquí es x * 32 + y = el subíndice de el asiento seleccionado
    let oDivs = document.getElementsByClassName('allPublicGray')
    for (var i = 0; i < oDivs.length ; i++){
      oDivs[i].off = false
    }
    Array.prototype.indexOf = function(val) {   
      for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
      }
      return -1;
    }
         Array.prototype.remove = function (val) {// La matriz encapsulada elimina el método de elemento especificado, llamado en la línea 217
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    }
  }
}
</script>
 
<style scoped lang="scss">
#select{
  background: #f5f5f5 ;
  .main{
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .brandNav{
      margin-bottom: 40px;
      .el-breadcrumb{
        margin-left: 15px;
      }
    }
    .seat{
      background: #fff;
      margin-bottom: 20px;
      &>img{
        width: 1202px;
      }
      .seat_wrap{
        display: flex;
        justify-content: space-between;
        .seat_left{
          width: 1000px;
          height: 674px;
          background: #fff;
          position: relative;
          overflow: hidden;
          #seatMap{
            width: 800px;
            height: 574px;
            position: absolute;
            left: 100px;
            top: 50px;
            .seat-charts-row{
              margin-bottom: 32px;
            }
            .allPublicGray{
              width: 18px;
              height: 18px;
              display: inline-block;
              margin-right: 7px;
              text-align: center;
              line-height: 18px;
              img{
                width:16px;
                height: 16px;
                display: inline-block;
              }
            }
            .bgBlack{
              background: url("../assets/A.png") no-repeat;
              background-size: 18px;
            }
          }
          .seatStatus {
            position: absolute;
            border: 1px solid red;
            width: 200px;
            height: 200px;
            left: 0;
            bottom: 0;
            background: #fff;
            border-radius: 8px;
            &>img{
              margin-left: 20px;
            }
            ul{
              font-size: 12px;
              margin: 20px;
              border-bottom: 1px solid #ccc;
              li{
                margin-bottom: 10px;
                padding: 0 5px;
                span:first-of-type{
                  background: red;
                  display: inline-block;
                  width: 56px;
                  text-align: center;
                }
                span:last-of-type{
                  font-weight: bold;
                  padding-left: 10px;
                }
                input{
                  margin-left: 10px;
                }
              }
              li:nth-of-type(2){
                span:first-of-type{
                  background: #fd68a6;
                }
              }
              li:nth-of-type(3){
                span:first-of-type{
                  background: #65a9fd;
                }
              }
            }
          }
        }
        .seat_right{
          width: 200px;
          height: 674px;
          background: #efefef;
          overflow:auto ;
          h3{
            background: #eee;
            height: 30px;
            line-height: 30px;
            font-size: 17px;
            text-align: center;
            font-weight: normal;
            margin-bottom: 10px;
          }
          h1{
            text-align: center;
            p{
              font-size: 16px;
              color: red;
              height: 40px;
              line-height: 40px;
            }
            a{
              display: block;
              width: 100px;
              height: 32px;
              text-align: center;
              line-height: 32px;
              margin: 0 auto;
              font-size: 14px;
              color: #fff;
              background: red;
              border-radius: 5px;
            }
          }
          ul{
            font-size: 14px;
            li{
              border-bottom: 1px solid #ccc;
              margin-bottom: 10px;
              padding-left: 10px;
              border-radius: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
