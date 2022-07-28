<template>
    <div class="d-flex justify-content-center">
        <v-container>
        <v-img
          :src="require('../assets/captura.png')"
          class="my-3"
          contain
          height="400"
        />
            <v-card
            class="mx-auto my-4"
            color="#F9E931"
            dark
            max-width="400"
        >
            <v-card-actions>
            <v-list-item class="grow">
                <v-list-item-avatar >
                <v-icon
                large
                color="black"
                >
                event_seat
                </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                <span style="color: black">Platea</span>
                </v-list-item-content>

                <v-row
                align="center"
                justify="end"
                >
                    <v-btn
                    depressed
                    color="black"
                    v-on:click="sell('platea')"
                    >
                    VENDER
                    </v-btn>
                </v-row>
            </v-list-item>
            </v-card-actions>
        </v-card>
        
        <v-card
            class="mx-auto my-4"
            color="#50AD38"
            dark
            max-width="400"
        >
            <v-card-actions>
            <v-list-item class="grow">
                <v-list-item-avatar >
                <v-icon
                large
                color="black"
                >
                event_seat
                </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                <span style="color: black">Palco</span>
                </v-list-item-content>

                <v-row
                align="center"
                justify="end"
                >
                    <v-btn
                    depressed
                    disabled
                    color="black"
                    >
                    VENDER
                    </v-btn>
                </v-row>
            </v-list-item>
            </v-card-actions>
        </v-card>

        <v-card
            class="mx-auto my-4"
            color="#0C71B9"
            dark
            max-width="400"
        >
            <v-card-actions>
            <v-list-item class="grow">
                <v-list-item-avatar >
                <v-icon
                large
                color="black"
                >
                event_seat
                </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                <span style="color: black">Anfiteatro</span>
                </v-list-item-content>

                <v-row
                align="center"
                justify="end"
                >
                    <v-btn
                    depressed
                    disabled
                    color="black"
                    >
                    VENDER
                    </v-btn>
                </v-row>
            </v-list-item>
            </v-card-actions>
        </v-card>

        <v-card
            class="mx-auto my-4"
            color="#C0292E"
            dark
            max-width="400"
        >
            <v-card-actions>
            <v-list-item class="grow">
                <v-list-item-avatar >
                <v-icon
                large
                color="black"
                >
                event_seat
                </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                <span style="color: black">Galeria</span>
                </v-list-item-content>

                <v-row
                align="center"
                justify="end"
                >
                    <v-btn
                    depressed
                    disabled
                    color="black"
                    >
                    VENDER
                    </v-btn>
                </v-row>
            </v-list-item>
            </v-card-actions>
        </v-card>       
    </v-container>
    </div>
    
</template>
<script>
import router from '../router';

const URI = 'https://superticket-api-4rp34.ondigitalocean.app/compras/load/';
export default {
    created() {
        this.getInformationEvent();
    },
    data: () => ({
        select: null,
        crf: 'caLYjH4w0mSMiUaZXuzkFrPVCrihBAqn',
        info: [],
        idEvent: 0,
    }),
    methods: {
        async getInformationEvent() {
            //const si cambia
            const response = await fetch(URI + this.$route.params.id+'?shortname=pruebas');
            const data = await response.json();
            console.log(data.csrf);
            this.idEvent=this.$route.params.id;
            this.crf=data.csrf;
            this.info=data.data;
        },
        sell: function(type_seat){
            console.log(this.crf)
            router.push({ name: 'Ticket', params: { id: this.$route.params.id, tipo:type_seat,csrf: this.crf }})
        }
        
    },
}
</script>
 <style>
     .text-platea{
          color:"#000000"
     }
</style>