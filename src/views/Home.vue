<template>
    <v-container>
        <v-row>
            <v-col v-for="event in events" v-bind:key="event.id" cols="12" sm="6" xl="3" lg="4" md="6" class="mb-6">
                <v-card
                    class="mx-auto"
                    elevation="0"
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="text-h5 mb-1">
                        {{event.nombre}}
                        </v-list-item-title>
                        <v-list-item-subtitle class="text-caption">{{(new Date(event.fechas[0].inicio_evento)).toLocaleString()}} </v-list-item-subtitle>
                        <!--v-list-item-content class="text-body-2">{{event.eventType.value}}</v-list-item-content-->
                    </v-list-item-content>

                    <v-list-item-avatar
                        tile
                        size="80"
                        color="grey"
                    >
                    <v-img :src="''+event.imagen_home"></v-img>
                    </v-list-item-avatar>
                    </v-list-item>
                    <v-btn
                        color="primary"
                        v-on:click="accept(event.id)"
                        elevation="0"
                        text
                        class="accept-button"
                    >
                        Vender Tickets
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import router from '../router';
//const URI = 'https://superticket.com.bo/api/fechaseventos/';
export default {
    created(){
        this.getEvents();
    },
    
  data: () => ({
    events:[],
    idEvent:0
  }),
  methods:{
    async getEvents(){
        const data = [
        {
            fechas : [
            {
                "url": "https://superticket.com.bo/api/fechaseventos/1/",
                "evento": {
                "nombre": "Plácido Domingo",
                "imagen_home": "https://superticket.com.bo/media/imagenes_eventos/home/2022/06/PD.jpeg"
                },
                "id": 1,
                "inicio_evento": "2022-10-14 00:00:00+00:00"
            }
            ],
            nombre : "Plácido Domingo",
            imagen_home: "https://superticket.com.bo/media/imagenes_eventos/home/2022/06/PD.jpeg",
            url: "https://superticket.com.bo/api/eventos/1/",
            id: 1
        },
        {
            fechas: [
            {
                url: "https://superticket.com.bo/api/fechaseventos/3/",
                evento: {
                    nombre: "Evento de Prueba Numerado ",
                    imagen_home: "https://superticket.com.bo/media/imagenes_eventos/home/2022/06/EVENTO_DE_PRUEBA.jpeg"
                },
                id: 3,
                inicio_evento: "2023-01-01 02:00:00+00:00"
            }
            ],
            nombre: "Evento de Prueba Numerado ",
            imagen_home: "https://superticket.com.bo/media/imagenes_eventos/home/2022/06/EVENTO_DE_PRUEBA.jpeg",
            url: "https://superticket.com.bo/api/eventos/3/",
            id : 3
        },
         {
            fechas: [
            {
                url: "https://superticket.com.bo/api/fechaseventos/40/",
                evento: {
                nombre: "Nuestra Boda (Expositores)",
                imagen_home: "https://superticket.com.bo/media/imagenes_eventos/home/2022/07/NuestraBoda.jpeg"
                },
                id: 40,
                "inicio_evento": "2022-09-17 18:30:00+00:00"
            }
            ],
            nombre: "Nuestra Boda (Expositores)",
            imagen_home: "https://superticket.com.bo/media/imagenes_eventos/home/2022/07/NuestraBoda.jpeg",
            url: "https://superticket.com.bo/api/eventos/40/",
            id: 40
        },
        {
            fechas: [
            {
                url: "https://superticket.com.bo/api/fechaseventos/41/",
                evento: {
                nombre: "Héroes del Rock",
                imagen_home: "https://superticket.com.bo/media/imagenes_eventos/home/2022/07/WhatsApp_Image_2022-07-04_at_12.20.09_PM.jpeg"
                },
                id: 41,
                inicio_evento: "2022-07-31 00:00:00+00:00"
            }
            ],
            nombre: "Héroes del Rock",
            imagen_home: "https://superticket.com.bo/media/imagenes_eventos/home/2022/07/WhatsApp_Image_2022-07-04_at_12.20.09_PM.jpeg",
            url: "https://superticket.com.bo/api/eventos/41/",
            id: 41
        },
        {
            fechas: [
            {
                url: "https://superticket.com.bo/api/fechaseventos/45/",
                evento: {
                nombre: "Star Wars Sinfónico",
                imagen_home: "https://superticket.com.bo/media/imagenes_eventos/home/2022/07/SuperTicket_Home_ctnufAB.jpeg"
                },
                id: 45,
                inicio_evento: "2022-07-24 00:00:00+00:00"
            }
            ],
            nombre: "Star Wars Sinfónico",
            imagen_home: "https://superticket.com.bo/media/imagenes_eventos/home/2022/07/SuperTicket_Home_ctnufAB.jpeg",
            url: "https://superticket.com.bo/api/eventos/45/",
            id: 45
        },
        {
            fechas: [
            {
                url: "https://superticket.com.bo/api/fechaseventos/47/",
                evento: {
                nombre: "Guerra Musical de los 80s (28)",
                imagen_home: "https://superticket.com.bo/media/imagenes_eventos/home/2022/07/1_vGshz6g.jpg"
                },
                id: 47,
                inicio_evento: "2022-07-29 00:00:00+00:00"
            }
            ],
            nombre: "Guerra Musical de los 80s (28)",
            imagen_home: "https://superticket.com.bo/media/imagenes_eventos/home/2022/07/1_vGshz6g.jpg",
            url: "https://superticket.com.bo/api/eventos/47/",
            id: 47
        },
        {
            fechas: [
            {
                url: "https://superticket.com.bo/api/fechaseventos/48/",
                evento: {
                nombre: "Guerra Musical de los 80s (29)",
                imagen_home: "https://superticket.com.bo/media/imagenes_eventos/home/2022/07/2_KY0fygg.jpg"
                },
                id: 48,
                inicio_evento: "2022-07-30 00:00:00+00:00"
            }
            ],
            nombre: "Guerra Musical de los 80s (29)",
            imagen_home: "https://superticket.com.bo/media/imagenes_eventos/home/2022/07/2_KY0fygg.jpg",
            url: "https://superticket.com.bo/api/eventos/48/",
            id: 48
        },
        {
            fechas: [
            {
                url: "https://superticket.com.bo/api/fechaseventos/49/",
                evento: {
                nombre: "Guerra Musical de los 80s (30)",
                imagen_home: "https://superticket.com.bo/media/imagenes_eventos/home/2022/07/3.jpg"
                },
                id: 49,
                inicio_evento: "2022-07-31 00:00:00+00:00"
            }
            ],
            nombre: "Guerra Musical de los 80s (30)",
            imagen_home: "https://superticket.com.bo/media/imagenes_eventos/home/2022/07/3.jpg",
            url: "https://superticket.com.bo/api/eventos/49/",
            id: 49
        },
        {
            fechas: [
            {
                url: "https://superticket.com.bo/api/fechaseventos/53/",
                evento: {
                nombre: "Star Wars Sinfónico",
                imagen_home: "https://superticket.com.bo/media/imagenes_eventos/home/2022/07/SuperTicket_Home_szfRtHr.jpeg"
                },
                id: 53,
                "inicio_evento": "2022-09-03 00:00:00+00:00"
            }
            ],
            "nombre": "Star Wars Sinfónico",
            "imagen_home": "https://superticket.com.bo/media/imagenes_eventos/home/2022/07/SuperTicket_Home_szfRtHr.jpeg",
            "url": "https://superticket.com.bo/api/eventos/52/",
            "id": 52
        }];
        console.log(data[0].fechas[0].inicio_evento);
        const dateString = new Date(data[0].fechas[0].inicio_evento);
        //const changedDate = dateString.replace(/(..)\/(..)\/(....) (..):(..)/, '$3-$2-$1 $4:$5');
        //var date = new Date(changedDate);
        //console.log(date.getTime());
        console.log(dateString.toLocaleString());
        //const response = await fetch(URI);
        //console.log(response);
        //const data = await response.json();
        //console.log(data);
        this.events = data;
        
        
        //this.events = data.content;
        //console.log(events);
        
    },

    getRandomArbitrary(min, max) {
        return (Math.random() * (max - min) + min).toFixed();
        },
    accept: function(event_id){
        //router.push({path:'ticket'})
        //router.push({ name: 'Ticket', params: { id: ticket_id } })  router
        //router.push({ name: 'Ticket', params: { id: event_id, ticket: new TicketModel(event_id,'Kalamarka','dddd',[30,45,50]) }})
        router.push({ name: 'Prices', params: { id: event_id}})
        }
  }

}
</script>
<style lang="sass">
@import "@/styles/home/_home.sass"  
</style>