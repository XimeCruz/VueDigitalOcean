<template>
    <div class="d-flex justify-content-center">
        <v-container>
            <v-row class="" no-gutters  justify="space-around">
                <v-col cols="10" sm="7" lg="8" xl="6" md="8">
                    <v-card
                    class="mx-auto"
                    elevation="0"
                    >
                    <v-card-title class="mb-3">Seleccione el tipo de lugar del evento:</v-card-title>
                        <v-row no-gutters align="center" justify="center" class="mx-16 mb-6"
                        v-for="(item,index) in tiposEvent" v-bind:key="item.index">
                            
                                <v-col cols="12" xl="9" lg="9" md="6" sm="7">
                                    {{item}}
                                </v-col>
                                <v-col cols="5" xl="3" lg="3" md="6" sm="5">
                                    <v-btn
                                            :disabled="btnDisabled(index)"
                                            class="mb-3"
                                            color="primary"
                                            v-on:click="sell(index)"
                                        >
                                        VENDER
                                        </v-btn>
                                </v-col>
                        </v-row>
                    </v-card>
                    
                </v-col>
            </v-row>
        <!-- <v-img
          :src="require('../assets/captura.png')"
          class="my-3"
          contain
          height="400"
        /> -->
        
            
    </v-container>
    </div>
    
</template>
<script>
import router from '../router';

const URI = 'https://superticket-api-4rp34.ondigitalocean.app/compras/load/';
const URI2 = 'https://superticket-api-4rp34.ondigitalocean.app/compras/sector/';
export default {
    created() {
        this.getInformationEvent();
    },
    data: () => ({
        select: null,
        crf: 'DD1loSI0nUgWYt3OqBstZTql7qVVpoAh',
        info: [],
        idEvent: 0,
        tiposEvent: [],
        statusEvent:[],
        idSectores: []
    }),
    methods: {
        async getInformationEvent() {
            //const si cambia
            const response = await fetch(URI + this.$route.params.id+'?shortname=pruebas');
            const data = await response.json();
            console.log(data.data.nom_sectores);
            //:disabled="btnDisabled(index)"
            console.log(data.data.lista_cupos_sector.platea[0]);
            this.tiposEvent=data.data.nom_sectores;
            this.idSectores=data.data.id_sectores;
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            };
            for (var i = 0; i < this.idSectores.length; i++) {
                console.log(this.idSectores[i])
                const response2 = await fetch(URI2 + this.$route.params.id+'?sector='+this.idSectores[i]+'&csrf=PwIYHsT04M2RzQovsLuSnn8LyFBsj6ak',requestOptions);
                const data2 = await response2.json();

                var tamTipoEvento = data2.nombre_entrada;
                console.log(tamTipoEvento.length);
                if(tamTipoEvento.length!==0){
                    this.statusEvent.push("true")
                }
                else{
                    this.statusEvent.push("false")
                }                
            }
            console.log(this.statusEvent)
            this.idEvent=this.$route.params.id;
            this.crf=data.csrf;
            this.info=data.data;
        },
        sell: function(type_seat){
            console.log(this.crf)
            router.push({ name: 'Ticket', params: { id: this.$route.params.id, tipo:this.idSectores[type_seat],csrf: this.crf }})
        },
        btnDisabled: function(index){
            console.log(this.statusEvent[index])
            
            if(this.statusEvent[index]==='true'){
                return false;
            }
            else{
                return true;
            }
        }
        
    },
}
</script>
 <style>
     .text-platea{
          color:"#000000"
     }
</style>