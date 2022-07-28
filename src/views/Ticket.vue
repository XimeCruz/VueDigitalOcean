<template>
    
    <v-container>
        <v-row class="" no-gutters  justify="space-around">
            <v-col cols="10" sm="7" lg="8" xl="6" md="8">
                
                <v-card
                    class="mx-auto"
                    elevation="0"
                >
                <v-card-title class="mb-6">Seleccione los asientos</v-card-title>

                        <!-- <v-combobox

                            v-model="select"
                            label="Tipo de Ticket"
                            :items="items"                
                            class="mx-12 mb-6"
                            color="primary"
                            outlined
                        >
                        </v-combobox> -->
                
                <!-- <v-row no-gutters align="center"
      justify="center"
                    class="mx-12 mb-6">
                    <v-col cols="12" xl="9" lg="9" md="6" sm="7">
                        <v-slider
                        v-model="count"
                        color="primary"
                        track-color="secondary"
                        label="Cantidad"
                        min="1"
                        max="10"
                        thumb-label
                        ></v-slider>
                    </v-col>
                    <v-col cols="5" xl="3" lg="3" md="6" sm="5">
                        <v-text-field
                            label="Cantidad"
                            v-model="count"
                            type="number"
                            readonly
                            placeholder="Placeholder"
                            outlined
                        ></v-text-field>
                    </v-col>
                </v-row> -->
                <v-row>
                    <!-- <div id="seatMap">
                        <div class="seat-charts-row" v-for="(item,x) in seatOrder"  :key="x">
                            <div @click="userChoiceFn(x,y,subItem)" ref="allSeat" class="allPublicGray" v-for="(subItem,y) in getItems(item)" :key="y">
                                <div v-if="subItem =='a'" :class="{bgBlack: seatGrade[0].off}"><img src="../assets/A.png" width="50" height="50"/></div>
                                <div v-if="subItem =='b'" :class="{bgBlack: seatGrade[1].off}"><img src="../assets/A.png" width="50" height="50"/></div>
                                <div v-if="subItem =='c'" :class="{bgBlack: seatGrade[2].off}"><img src="../assets/A.png" width="50" height="50"/></div>
                                <div v-if="subItem =='_'"></div>
                            </div>
                        </div>
                    </div> -->
                    <ChooseSeats1/>
                </v-row>
                        <!-- <v-text-field
                            class="mx-12"
                            label="Precio Total"
                            :value="getTotalPrice()+' Bs.'"
                            readonly
                            placeholder="Placeholder"
                            outlined
                        ></v-text-field>
                <v-row align="center" justify="center">
                    <v-btn  class="mb-6" color="primary" v-on:click="accept">
                    Comprar
                </v-btn>
                </v-row> -->
                <!-- <v-row align="center" justify="center">
                    <v-btn  class="mb-6" color="primary" v-on:click="sell()">
                        Comprar
                    </v-btn>
                </v-row> -->
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
//import Seat from "./Seat.vue";
import router from '../router';
import ChooseSeats1 from './ChooseSeats.vue';
const URI = 'https://superticket-api-4rp34.ondigitalocean.app/compras/sector/';
const URI2 = 'https://superticket-api-4rp34.ondigitalocean.app/compras/check/';
const URI3 = 'https://superticket-api-4rp34.ondigitalocean.app/compras/finalizar/';

export default {
    created() {
        this.getTickets();
    },
    data: () => ({
        select: null,
        count: 1,
        items: [],
        precios: [],
        tipo: [],
        idTickets: [],
        cantidad: 10,
        codTicket: 96,
        seatChooose: null,
        persona: {
            nombre_apellido: "test test",
            email: "test@test.com",
            documento: "111111111",
            telefono: "1111111",
            ciudad: "La Paz"
        }

    }),
    methods: {
        async getTickets() {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            };
            console.log(this.$route.params);
            const response = await fetch(URI + this.$route.params.id + "?sector=" + this.$route.params.tipo + "&csrf=" + this.$route.params.csrf + "", requestOptions);
            
            const data = await response.json();
            data.id_entrada.forEach(element => {
                this.idTickets.push(element);
            });
            data.nombre_entrada.forEach(element => {
                this.tipo.push(element);
            });
            data.precio_entrada.forEach(element => {
                this.precios.push(element);
            });
            for (var i = 0; i < 3; i++) {
                this.items.push(this.tipo[i] + " - " + this.precios[i]);
            }
        },
        getTotalPrice() {
            if (this.select == null) {
                return 0;
            }
            var index = this.items.indexOf(this.select);
            this.codTicket = this.idTickets[index];
            return this.precios[index] * this.count;
        },
        sell: function () {
            router.push({ name: "Choose", params: { id: this.$route.params.id, codEvent: this.codTicket, cant: this.count, csrf: this.$route.params.csrf } });
        },
        async accept() {
            const requestOptions2 = {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            };
            const response2 = await fetch(URI2 + this.$route.params.id + "?entranceId="+this.codTicket+"&amount="+this.count+"&csrf="+this.$route.params.csrf, requestOptions2);
            const data2 = await response2.json();
            console.log(data2)
            const seats = (data2.disponibles).split(',');
            const seatChoose=[]
            console.log(seats);
            seats.forEach((seat, index) => {
                if(index<this.count){
                    console.log('Indice: ' + index + ' Valor: ' + seat);
                    seatChoose.push(seat)
                }
            });
            console.log(seatChoose)
            this.seatChooose = seatChoose.join();
            console.log(this.seatChooose);

            const response3 = await fetch(URI3 + this.$route.params.id + "?eventId=" + this.$route.params.id + 
            "&payload=" + this.persona +"&entranceId=" + this.codTicket +"&sector=" + this.$route.params.tipo +
            "&amount=" + this.count +"&shortname=pruebas&seats="+this.seatChooose+
            "&csrf=" + this.$route.params.csrf, requestOptions2);
            const data3 = await response3.json();
            console.log(data3)


            // const formData = new FormData();
            // formData.append(key, value);

            // const response = await fetch(url, {
            //     method: "POST",
            //     body: formData,
            // });

            // var index = this.items.indexOf(this.select);
            // console.log(this.idTickets[index]);
            // console.log(this.select);
            // console.log(this.getTotalPrice());
            // if (this.select != null && this.getTotalPrice() != 0) {
            //     console.log("send");
            //     window.Payment.postMessage(JSON.stringify({
            //         "count": this.count,
            //         "totalPrice": this.getTotalPrice(),
            //         "item": this.select,
            //         "description": this.count,
            //     }));
            // }
        }
    },
    components: {ChooseSeats1}
}
</script>